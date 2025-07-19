'use client';

import { EnhancedFooter } from "@/components/enhanced-footer";
import GooeyNav from "@/components/gooey-nav";
import Particles from "@/components/particles-background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Admin", href: "/admin" },
  ];

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    // Register user
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Registration failed');
      setLoading(false);
      return;
    }

    setSuccess('Registration successful! Redirecting to login...');
    setLoading(false);
    setTimeout(() => {
      router.push('/login');
    }, 1500);
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
              <GooeyNav items={navItems} initialActiveIndex={0} />
            </div>
            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-gray-200 hover:text-white hover:bg-white/10 backdrop-blur-sm drop-shadow-lg"
                asChild
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                className="bg-blue-600/60 hover:bg-blue-700/70 backdrop-blur-sm border border-blue-400/30 text-white font-semibold shadow-xl"
                asChild
              >
                <Link href="/register">Register</Link>
              </Button>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 relative flex items-center justify-center py-12 overflow-hidden">
        {/* Particles Background */}
        <div className="absolute inset-0 z-0">
          <Particles
            particleCount={320}
            particleColors={["#34d399", "#6ee7b7", "#a7f3d0", "#10b981"]}
            speed={0.06}
            particleSpread={16}
            alphaParticles={true}
            particleBaseSize={95}
          />
        </div>
        {/* Content overlay */}
        <div className="relative z-10">
          <div className="w-full max-w-md mx-auto px-4">
            {/* Registration Card */}
            <Card className="shadow-2xl border-0 bg-black/5 backdrop-blur-[2px] border border-white/10">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-white drop-shadow-2xl">Create Account</CardTitle>
                <CardDescription className="text-gray-100 drop-shadow-xl">
                  Join our MERN tutorial platform and start learning today
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Error Message Area */}
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-400/20 rounded-md backdrop-blur-sm">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-sm text-red-300">{error}</p>
                    </div>
                  </div>
                )}
                {/* Success Message Area */}
                {success && (
                  <div className="p-3 bg-green-500/10 border border-green-400/20 rounded-md backdrop-blur-sm">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <p className="text-sm text-green-300">{success}</p>
                    </div>
                  </div>
                )}
                {/* Registration Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-100 drop-shadow-lg">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors backdrop-blur-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-100 drop-shadow-lg">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors backdrop-blur-sm"
                      placeholder="Enter your email address"
                    />
                  </div>
                  {/* Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-100 drop-shadow-lg">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors backdrop-blur-sm"
                      placeholder="Create a secure password"
                    />
                    <p className="text-xs text-gray-300 drop-shadow-lg">
                      Password should be at least 8 characters long
                    </p>
                  </div>
                  {/* Terms and Conditions */}
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      required
                      className="mt-1 h-4 w-4 text-blue-600 border-white/20 bg-white/5 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-200 drop-shadow-lg">
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-400 hover:text-blue-300 underline drop-shadow-lg">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline drop-shadow-lg">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  {/* Register Button */}
                  <Button
                    type="submit"
                    className="w-full py-2.5 text-base font-medium bg-blue-600/60 hover:bg-blue-700/70 backdrop-blur-sm border border-blue-400/30 text-white font-semibold shadow-2xl"
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
                {/* Login Link */}
                <div className="text-center pt-4 border-t border-white/20">
                  <p className="text-sm text-gray-200 drop-shadow-lg">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-blue-400 hover:text-blue-300 font-medium underline drop-shadow-lg"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      {/* Footer */}
      <EnhancedFooter />
    </div>
  );
} 