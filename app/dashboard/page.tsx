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

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/login');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Admin", href: "/admin" },
  ];

  const currentUser = { 
    name: session.user?.name || session.user?.email || 'User', 
    role: (session.user as any)?.role || 'user',
    email: session.user?.email || 'No email'
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
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
              <GooeyNav items={navItems} initialActiveIndex={2} />
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

      <main className="flex-1 relative overflow-hidden pt-8">
        <div className="absolute inset-0 z-0">
          <Particles
            particleCount={200}
            particleColors={["#f59e0b", "#fbbf24", "#fcd34d", "#fde68a"]}
            speed={0.035}
            particleSpread={20}
            alphaParticles={true}
            particleBaseSize={65}
            disableRotation={true}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="space-y-4 text-center">
              <SplitText
                text="Welcome to Your Dashboard"
                className="text-3xl sm:text-4xl font-bold text-white"
                splitType="words"
                delay={150}
                duration={0.8}
                from={{ opacity: 0, y: 60 }}
                to={{ opacity: 1, y: 0 }}
                textAlign="center"
              />
              <SplitText
                text="Manage your account and explore the application"
                className="text-lg text-gray-100"
                splitType="words"
                delay={100}
                duration={0.6}
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                textAlign="center"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-black/5 backdrop-blur-[2px] border border-white/10 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-white">User Profile</CardTitle>
                  <CardDescription className="text-gray-200">Your account information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium text-white">
                          {currentUser.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-white">{currentUser.name}</p>
                        <p className="text-sm text-gray-300">{currentUser.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        currentUser.role === 'admin' 
                          ? 'bg-purple-500/20 text-purple-300' 
                          : 'bg-blue-500/20 text-blue-300'
                      }`}>
                        {currentUser.role}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/5 backdrop-blur-[2px] border border-white/10 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                  <CardDescription className="text-gray-200">Common tasks and navigation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full bg-blue-600/60 hover:bg-blue-700/70" asChild>
                      <Link href="/">Go to Home</Link>
                    </Button>
                    <Button variant="outline" className="w-full bg-white/5 hover:bg-white/10 text-white" asChild>
                      <Link href="/about">About Page</Link>
                    </Button>
                    {currentUser.role === 'admin' && (
                      <Button variant="outline" className="w-full bg-purple-600/20 hover:bg-purple-700/30 text-purple-300" asChild>
                        <Link href="/admin">Admin Panel</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/5 backdrop-blur-[2px] border border-white/10 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-white">Account Settings</CardTitle>
                  <CardDescription className="text-gray-200">Manage your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full bg-white/5 hover:bg-white/10 text-white">
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="w-full bg-white/5 hover:bg-white/10 text-white">
                      Change Password
                    </Button>
                    <Button 
                      onClick={() => signOut({ callbackUrl: '/login' })}
                      variant="outline" 
                      className="w-full bg-red-600/20 hover:bg-red-700/30 text-red-300"
                    >
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <EnhancedFooter />
    </div>
  );
} 