import { logAuditEvent } from '@/lib/audit-log';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  try {
    // Get the session using getServerSession
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in' },
        { status: 401 }
      );
    }

    // Check if user has admin role
    const userRole = (session.user as any)?.role;
    if (userRole !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const users = db.collection('users');

    // Get all users (excluding password field for security)
    const allUsers = await users.find(
      {},
      { 
        projection: { 
          password: 0, // Exclude password field
          resetToken: 0, // Exclude reset token
          resetTokenExpiry: 0 // Exclude reset token expiry
        } 
      }
    ).toArray();

    // Get user statistics
    const totalUsers = allUsers.length;
    const adminUsers = allUsers.filter((user: any) => user.role === 'admin').length;
    const regularUsers = allUsers.filter((user: any) => user.role === 'user').length;

    const stats = {
      total: totalUsers,
      admins: adminUsers,
      users: regularUsers,
    };

    return NextResponse.json({
      users: allUsers,
      stats,
      message: 'Users retrieved successfully'
    });

  } catch (error) {
    console.error('Admin users API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in' },
        { status: 401 }
      );
    }
    const userRole = (session.user as any)?.role;
    if (userRole !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }
    const { action, userId, newRole } = await request.json();
    if (!action || !userId) {
      return NextResponse.json(
        { error: 'Action and userId are required' },
        { status: 400 }
      );
    }
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection('users');
    switch (action) {
      case 'updateRole':
        if (!newRole || !['user', 'admin'].includes(newRole)) {
          return NextResponse.json(
            { error: 'Invalid role. Must be "user" or "admin"' },
            { status: 400 }
          );
        }
        // Prevent admin from making themselves a user (compare ObjectId as string)
        const sessionUserId = (session.user as any)?._id || (session.user as any)?.id;
        if ((userId === sessionUserId?.toString()) && newRole === 'user') {
          return NextResponse.json(
            { error: 'Another admin can only make you a user. You cannot make yourself a user.' },
            { status: 400 }
          );
        }
        const userToUpdate = await users.findOne({ _id: new ObjectId(userId) });
        if (!userToUpdate) {
          return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
          );
        }
        const result = await users.updateOne(
          { _id: new ObjectId(userId) },
          { $set: { role: newRole } }
        );
        await logAuditEvent({
          user: session.user?.email || 'unknown',
          action: 'USER_ROLE_CHANGED',
          details: `Changed user ${userToUpdate.email} role from ${userToUpdate.role} to ${newRole}`,
          severity: 'high',
          req: request,
        });
        return NextResponse.json({
          message: `User role updated to ${newRole} successfully`
        });
      case 'deleteUser':
        // Prevent admin from deleting themselves
        const sessionEmail = session.user?.email;
        const userToDelete = await users.findOne({ _id: new ObjectId(userId) });
        if (userToDelete?.email === sessionEmail) {
          return NextResponse.json(
            { error: 'Cannot delete your own account' },
            { status: 400 }
          );
        }
        const deleteResult = await users.deleteOne({ _id: new ObjectId(userId) });
        if (deleteResult.deletedCount === 0) {
          return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
          );
        }
        await logAuditEvent({
          user: session.user?.email || 'unknown',
          action: 'USER_DELETED',
          details: `Deleted user account for ${userToDelete?.email}`,
          severity: 'high',
          req: request,
        });
        return NextResponse.json({
          message: 'User deleted successfully'
        });
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Admin users API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 