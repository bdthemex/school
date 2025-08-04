
'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { School, LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast"


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        if (pathname !== '/admin') {
          router.push('/admin');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, pathname]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "সফল",
        description: "সফলভাবে লগআউট করা হয়েছে।",
      })
      router.push('/admin');
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "ত্রুটি",
        description: "লগআউট করতে সমস্যা হয়েছে।",
        variant: "destructive",
      })
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-muted/40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4 text-lg">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!user && pathname !== '/admin') {
    return null; // or a loading spinner, redirect is handled in useEffect
  }
  
  if (!user && pathname === '/admin') {
    return <>{children}</>;
  }


  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/admin/dashboard" className="flex items-center gap-2 text-xl font-bold text-primary">
            <School className="h-6 w-6 text-accent" />
            এডমিন প্যানেল
          </Link>
          <div className="flex items-center gap-4">
             <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                সাইট দেখুন
             </Link>
             <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                লগআউট
             </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
