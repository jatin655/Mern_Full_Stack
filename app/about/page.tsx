"use client";

// Add this at the top of the file if you haven't already, for TypeScript support
// (Recommended: move this to a .d.ts file in your project root)
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { url: string };
    }
  }
}

import { EnhancedFooter } from "@/components/enhanced-footer";
import GooeyNav from "@/components/gooey-nav";
import Particles from "@/components/particles-background";
import SplitText from "@/components/SplitText";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SplineOrb from "../components/SplineOrb";
import ClientAboutContent from "./components/ClientAboutContent";

export function SplineRobotNew() {
  return (
    <spline-viewer
      url="https://prod.spline.design/hFaKCEniTn9gijel/scene.splinecode"
      style={{ width: '100%', height: '100%' }}
    ></spline-viewer>
  );
}

export default function AboutPage() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Admin", href: "/admin" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-black/50 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center min-w-0">
              <Link
                href="/"
                className="text-xl font-bold text-white hover:text-gray-300 transition-colors drop-shadow-2xl"
              >
                MERN Tutorial
              </Link>
            </div>

            {/* Desktop Navigation with GooeyNav - Centered */}
            <div className="hidden md:flex flex-1 justify-center items-center">
              <GooeyNav items={navItems} initialActiveIndex={1} />
            </div>

            {/* Client-side auth component */}
            <div className="flex items-center min-w-0 justify-end">
            <ClientAboutContent />
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

          {/* Mobile Navigation */}
          <div className="md:hidden border-t bg-black/80 backdrop-blur-md border-white/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              >
                Home
              </Link>
              <Link href="/about" className="block px-3 py-2 text-base font-medium text-white bg-white/10 rounded-md">
                About
              </Link>
              <Link
                href="/dashboard"
                className="block px-3 py-2 text-base font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/admin"
                className="block px-3 py-2 text-base font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              >
                Admin
              </Link>
              {/* Mobile auth component */}
              <ClientAboutContent mobile />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden pt-8">
        {/* Particles Background */}
        <div className="absolute inset-0 z-0">
          <Particles
            particleCount={260}
            particleColors={["#06b6d4", "#22d3ee", "#67e8f9", "#a5f3fc"]}
            speed={0.05}
            particleSpread={18}
            alphaParticles={true}
            particleBaseSize={85}
          />
        </div>

        {/* Content and Orb Layout */}
        <div className="relative z-10 bg-black/5 backdrop-blur-[2px] mt-8 flex flex-row gap-4 items-start">
          {/* Left: Main Content in a container */}
          <div className="flex-1 max-w-4xl pl-12 pr-8">
            <div className="bg-black/80 rounded-xl shadow-lg border border-white/10 p-10">
              {/* Page Title */}
              <div className="mb-12">
                <SplitText
                  text="About This Project"
                  className="text-4xl sm:text-5xl font-bold text-white mb-4 text-left"
                  splitType="words"
                  delay={150}
                  duration={0.8}
                  from={{ opacity: 0, y: 60 }}
                  to={{ opacity: 1, y: 0 }}
                  textAlign="left"
                />
                <div className="w-24 h-1 bg-cyan-400 rounded-full mb-8"></div>
              </div>
              {/* Main Description */}
              <div className="bg-black/60 rounded-lg shadow-sm border border-white/10 p-8 mb-8">
                <p className="text-lg text-gray-100 leading-relaxed mb-6 drop-shadow-xl">
                  This is a comprehensive full-stack web application built with modern technologies including <span className="font-semibold text-green-400 drop-shadow-lg">MongoDB</span> for database management, <span className="font-semibold text-cyan-400 drop-shadow-lg">React</span> for dynamic user interfaces, <span className="font-semibold text-yellow-400 drop-shadow-lg">Node.js</span> for server-side runtime, and <span className="font-semibold text-white drop-shadow-lg">Next.js</span> for the React framework with enhanced features.
                </p>
                <p className="text-lg text-gray-100 leading-relaxed drop-shadow-xl">
                  This project serves as both a learning platform and a practical demonstration of how these technologies work together to create scalable, maintainable, and performant web applications.
                </p>
              </div>
              {/* Modern Practices Section */}
              <div className="bg-black/60 rounded-lg shadow-sm border border-white/10 p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center drop-shadow-2xl">
                  <svg className="w-6 h-6 text-cyan-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Modern Practices Used
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Server-Side Rendering */}
                  <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-xl">Server-Side Rendering</h3>
                    <p className="text-gray-200 text-sm leading-relaxed drop-shadow-lg">Leveraging Next.js App Router for improved SEO, faster initial page loads, and better user experience through pre-rendered content and optimized performance.</p>
                  </div>
                  {/* Secure Authentication */}
                  <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-xl">Secure Authentication</h3>
                    <p className="text-gray-200 text-sm leading-relaxed drop-shadow-lg">Implementation of robust authentication systems with encrypted passwords, secure session management, and JWT tokens to protect user data and ensure secure access.</p>
                  </div>
                  {/* Role-Based Access */}
                  <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-xl">Role-Based Access</h3>
                    <p className="text-gray-200 text-sm leading-relaxed drop-shadow-lg">Sophisticated authorization system with different user roles and permissions, ensuring users can only access features and data appropriate to their access level.</p>
                  </div>
                </div>
              </div>
              {/* Call to Action */}
              <div className="text-left mt-12">
                <p className="text-gray-200 mb-6 drop-shadow-xl">Ready to explore the application?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-start">
                  <Button size="lg" className="bg-blue-600/60 hover:bg-blue-700/70 backdrop-blur-sm border border-blue-400/30 text-white font-semibold shadow-2xl" asChild>
                    <Link href="/register">Get Started</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm border border-white/20 shadow-2xl" asChild>
                    <Link href="/">Back to Home</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Right: Spline Orbs (scrolls with content) */}
          <div className="hidden lg:flex flex-col items-center justify-center w-[500px] ml-4 space-y-12">
            <div className="w-full h-[500px]">
              <SplineOrb />
            </div>
            <div className="w-full h-[500px]">
              <SplineRobotNew />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <EnhancedFooter />
    </div>
  );
}
