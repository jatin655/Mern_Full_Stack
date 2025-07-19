'use client';

import { EnhancedFooter } from "@/components/enhanced-footer";
import GooeyNav from "@/components/gooey-nav";
import Particles from "@/components/particles-background";
import SplitText from "@/components/SplitText";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signOut, useSession } from 'next-auth/react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
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

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [usersData, setUsersData] = useState<UsersData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/login');
      return;
    }

    // Check if user is admin
    const isAdmin = session.user && 'role' in session.user && (session.user as any).role === 'admin';
    if (!isAdmin) {
      router.push('/dashboard');
      return;
    }

    fetchUsers();
  }, [session, status, router]);

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
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  const isAdmin = session.user && 'role' in session.user && (session.user as any).role === 'admin';
  if (!isAdmin) {
    return null;
  }

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Admin", href: "/admin" },
    { label: "Users", href: "/admin/users" },
  ];

  const currentUser = { 
    name: session.user?.name || session.user?.email || 'Admin User', 
    role: (session.user as any)?.role || 'admin',
    email: session.user?.email || 'No email'
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-black/50 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-xl font-bold text-white hover:text-gray-300 transition-colors drop-shadow-2xl"
              >
                MERN Tutorial
              </Link>
            </div>

            <div className="hidden md:flex items-center">
              <GooeyNav items={navItems} initialActiveIndex={4} />
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-200">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <span className="text-sm font-medium text-white">
                    {currentUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <span className="text-sm font-medium drop-shadow-lg">{currentUser.name}</span>
                <Button onClick={() => signOut({ callbackUrl: '/login' })}>Sign Out</Button>
              </div>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="icon" className="text-gray-200 hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Particles
            particleCount={200}
            particleColors={["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe"]}
            speed={0.035}
            particleSpread={20}
            alphaParticles={true}
            particleBaseSize={65}
            disableRotation={true}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="space-y-2">
              <SplitText
                text="User Management"
                className="text-3xl sm:text-4xl font-bold text-white drop-shadow-2xl"
                splitType="words"
                delay={150}
                duration={0.8}
                from={{ opacity: 0, y: 60 }}
                to={{ opacity: 1, y: 0 }}
                textAlign="center"
              />
              <SplitText
                text="Manage all users, roles, and permissions"
                className="text-lg text-gray-100 drop-shadow-xl"
                splitType="words"
                delay={100}
                duration={0.6}
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                textAlign="center"
              />
            </div>

            {/* Statistics Cards */}
            {usersData && (
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
                    <p className="text-purple-200">Administrators</p>
                  </CardContent>
                </Card>
                <Card className="bg-green-500/10 border-green-400/20">
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-green-400">{usersData.stats.users}</div>
                    <p className="text-green-200">Regular Users</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Users Table */}
            <Card className="bg-black/5 backdrop-blur-[2px] border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">All Users</CardTitle>
                <CardDescription className="text-gray-200">
                  View and manage user accounts and roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center p-8">
                    <div className="text-white">Loading users...</div>
                  </div>
                ) : error ? (
                  <div className="p-4 bg-red-500/10 border border-red-400/20 rounded-md">
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
                  </div>
                ) : usersData ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left p-4 text-white font-medium">User</th>
                          <th className="text-left p-4 text-white font-medium">Email</th>
                          <th className="text-left p-4 text-white font-medium">Role</th>
                          <th className="text-left p-4 text-white font-medium">Provider</th>
                          <th className="text-left p-4 text-white font-medium">Created</th>
                          <th className="text-left p-4 text-white font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersData.users.map((user) => (
                          <tr key={user._id} className="border-b border-white/5 hover:bg-white/5">
                            <td className="p-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-medium text-white">
                                    {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                                  </span>
                                </div>
                                <div>
                                  <div className="font-medium text-white">{user.name || 'No Name'}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-gray-300">{user.email}</td>
                            <td className="p-4">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                user.role === 'admin' 
                                  ? 'bg-purple-500/20 text-purple-300' 
                                  : 'bg-blue-500/20 text-blue-300'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="p-4">
                              {user.provider ? (
                                <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300">
                                  {user.provider}
                                </span>
                              ) : (
                                <span className="text-gray-400 text-sm">Credentials</span>
                              )}
                            </td>
                            <td className="p-4 text-gray-300 text-sm">
                              {formatDate(user.createdAt)}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                {user.role === 'user' ? (
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
                                )}
                                
                                {user.email !== session?.user?.email && (
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
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            {/* Back to Admin Dashboard */}
            <div className="flex justify-center">
              <Button 
                asChild
                className="bg-blue-600/60 hover:bg-blue-700/70"
              >
                <Link href="/admin">Back to Admin Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <EnhancedFooter />
    </div>
  );
} 