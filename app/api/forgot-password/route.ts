import { sendPasswordResetEmail } from '@/lib/email';
import clientPromise from '@/lib/mongodb';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const users = db.collection('users');

    // Check if user exists
    const user = await users.findOne({ email });
    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        { message: 'If an account with that email exists, a password reset link has been sent.' },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // Store reset token in database
    await users.updateOne(
      { email },
      {
        $set: {
          resetToken,
          resetTokenExpiry,
        }
      }
    );

    // Create reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    // Send password reset email using Resend
    try {
      console.log('Attempting to send email to:', email);
      console.log('Reset URL:', resetUrl);
      console.log('Resend API Key configured:', !!process.env.RESEND_API_KEY);
      console.log('Email From:', process.env.EMAIL_FROM);
      
      await sendPasswordResetEmail(email, resetUrl);
      console.log('Password reset email sent successfully to:', email);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      
      // If it's a configuration error, still return success to user
      if (emailError instanceof Error && emailError.message.includes('RESEND_API_KEY')) {
        console.warn('Resend not configured - email functionality disabled');
        console.log('For testing, reset URL is:', resetUrl);
        // Still return success to user for security (don't reveal if email failed)
      } else {
        return NextResponse.json(
          { error: 'Failed to send password reset email. Please try again later.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { message: 'If an account with that email exists, a password reset link has been sent.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 