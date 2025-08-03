import Link from 'next/link';
import { School } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-headline text-xl font-bold text-primary">
            <School className="h-6 w-6 text-accent" />
            এডমিন প্যানেল
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            সাইট দেখুন
          </Link>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
