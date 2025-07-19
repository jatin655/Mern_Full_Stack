'use client';

import { Button } from "@/components/ui/button";
import { signOut, useSession } from 'next-auth/react';
import Link from "next/link";

interface ClientAboutContentProps {
  mobile?: boolean;
}

export default function ClientAboutContent({ mobile = false }: ClientAboutContentProps) {
  const { data: session, status } = useSession();
  
  const currentUser = session?.user ? {
    name: session.user.name || session.user.email || 'User',
    email: session.user.email || 'No email',
    role: (session.user as any)?.role || 'user'
  } : null;

  if (mobile) {
    return (
      <>
        {session ? (
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center space-x-2 text-gray-200">
              <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-white">
                  {currentUser?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <span className="text-sm font-medium">{currentUser?.name}</span>
            </div>
            <Button 
              onClick={() => signOut({ callbackUrl: '/login' })}
              variant="ghost"
              size="sm"
              className="text-gray-200 hover:text-white hover:bg-white/10"
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="flex space-x-2 px-3 py-2">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="flex-1 text-gray-200 hover:text-white hover:bg-white/10"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button size="sm" asChild className="flex-1 bg-blue-600/60 hover:bg-blue-700/70">
              <Link href="/register">Register</Link>
            </Button>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-4">
      {session ? (
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-200">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
              <span className="text-sm font-medium text-white">
                {currentUser?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <span className="text-sm font-medium drop-shadow-lg">{currentUser?.name}</span>
          </div>
          <Button 
            onClick={() => signOut({ callbackUrl: '/login' })}
            variant="ghost"
            className="text-gray-200 hover:text-white hover:bg-white/10 backdrop-blur-sm drop-shadow-lg"
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
} 