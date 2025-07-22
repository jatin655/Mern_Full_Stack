'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  provider?: string;
}

interface UsersData {
  users: User[];
  stats: {
    total: number;
    admins: number;
    users: number;
  };
  message: string;
}

export default function UsersList() {
  const { data: session } = useSession();
  const [usersData, setUsersData] = useState<UsersData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const isAdmin = session?.user && (session.user as any).role === 'admin';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/users');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch users');
      }
      
      const data = await response.json();
      setUsersData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    try {
      setActionLoading(userId);
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'updateRole',
          userId,
          newRole,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update role');
      }

      // Refresh users list
      await fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update role');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      setActionLoading(userId);
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'deleteUser',
          userId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete user');
      }

      // Refresh users list
      await fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-white">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-500/10 border-red-400/20">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-300">{error}</p>
          </div>
          <Button 
            onClick={fetchUsers} 
            className="mt-4 bg-red-600/60 hover:bg-red-700/70"
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!usersData) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-500/10 border-blue-400/20">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-400">{usersData.stats.total}</div>
            <p className="text-blue-200">Total Users</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-500/10 border-purple-400/20">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-400">{usersData.stats.admins}</div>
            <p className="text-purple-200">Admins</p>
          </CardContent>
        </Card>
        <Card className="bg-green-500/10 border-green-400/20">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-400">{usersData.stats.users}</div>
            <p className="text-green-200">Regular Users</p>
          </CardContent>
        </Card>
      </div>

      {/* Users List */}
      <Card className="bg-black/5 backdrop-blur-[2px] border border-white/10">
        <CardHeader>
          <CardTitle className="text-white">User Management</CardTitle>
          <CardDescription className="text-gray-200">
            Manage user roles and accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {usersData.users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{user.name || 'No Name'}</h3>
                      <p className="text-sm text-gray-300">{user.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.role === 'admin' 
                            ? 'bg-purple-500/20 text-purple-300' 
                            : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {user.role}
                        </span>
                        {user.provider && (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300">
                            {user.provider}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {isAdmin && user.email !== session?.user?.email && (
                    user.role === 'user' ? (
                      <Button
                        size="sm"
                        onClick={() => handleRoleUpdate(user._id, 'admin')}
                        disabled={actionLoading === user._id}
                        className="bg-purple-600/60 hover:bg-purple-700/70"
                      >
                        {actionLoading === user._id ? 'Updating...' : 'Make Admin'}
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleRoleUpdate(user._id, 'user')}
                        disabled={actionLoading === user._id}
                        className="bg-blue-600/60 hover:bg-blue-700/70"
                      >
                        {actionLoading === user._id ? 'Updating...' : 'Make User'}
                      </Button>
                    )
                  )}
                  {isAdmin && user.email !== session?.user?.email && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteUser(user._id)}
                      disabled={actionLoading === user._id}
                      className="border-red-400/30 text-red-400 hover:bg-red-500/10"
                    >
                      {actionLoading === user._id ? 'Deleting...' : 'Delete'}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 