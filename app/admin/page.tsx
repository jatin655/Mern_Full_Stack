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
import { useEffect } from 'react';
import UsersList from './components/UsersList';

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log('Session data:', session);
    console.log('Session user:', session?.user);
  }, [session]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  // Check if user is admin
  const isAdmin = session.user && 'role' in session.user && (session.user as any).role === 'admin';
  
  if (!isAdmin) {
    router.push('/dashboard');
    return null;
  }

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Admin", href: "/admin" },
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
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-xl font-bold text-white hover:text-gray-300 transition-colors drop-shadow-2xl"
              >
                MERN Tutorial
              </Link>
            </div>

            {/* Desktop Navigation with GooeyNav */}
            <div className="hidden md:flex items-center">
              <GooeyNav items={navItems} initialActiveIndex={3} />
            </div>

            {/* User Menu */}
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

            {/* Mobile Menu Button */}
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
      <main className="flex-1 relative overflow-hidden pt-8">
        {/* Particles Background */}
        <div className="absolute inset-0 z-0">
          <Particles
            particleCount={200}
            particleColors={["#ef4444", "#f87171", "#fca5a5", "#fecaca"]}
            speed={0.035}
            particleSpread={20}
            alphaParticles={true}
            particleBaseSize={65}
            disableRotation={true}
          />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="space-y-4 text-center">
              <SplitText
                text="Admin Dashboard"
                className="text-3xl sm:text-4xl font-bold text-white"
                splitType="words"
                delay={150}
                duration={0.8}
                from={{ opacity: 0, y: 60 }}
                to={{ opacity: 1, y: 0 }}
                textAlign="center"
              />
              <SplitText
                text="Manage users, roles, and system settings"
                className="text-lg text-gray-100"
                splitType="words"
                delay={100}
                duration={0.6}
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                textAlign="center"
              />
            </div>

            {/* Welcome Card */}
            <Card className="bg-black/5 backdrop-blur-[2px] border border-white/10 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white drop-shadow-xl">Welcome, Admin!</CardTitle>
                <CardDescription className="text-gray-200 drop-shadow-lg">
                  You are logged in as: {currentUser.email}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-200">
                    This is the admin dashboard. You have full administrative privileges.
                  </p>
                  <div className="text-sm text-gray-300">
                    <p>User Role: {currentUser.role}</p>
                    <p>User Name: {currentUser.name}</p>
                  </div>
                  <div className="flex space-x-4">
                    <Button 
                      onClick={() => signOut({ callbackUrl: '/login' })}
                      className="bg-red-600/60 hover:bg-red-700/70"
                    >
                      Sign Out
                    </Button>
                    <Button 
                      asChild
                      className="bg-blue-600/60 hover:bg-blue-700/70"
                    >
                      <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                    <Button 
                      asChild
                      className="bg-purple-600/60 hover:bg-purple-700/70"
                    >
                      <Link href="/admin/users">Manage Users</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Users Management Section */}
            <UsersList />
          </div>
        </div>
      </main>

      {/* Footer */}
      <EnhancedFooter />
    </div>
  );
}
