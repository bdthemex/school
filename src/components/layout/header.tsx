'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/logo';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Shield } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'হোম' },
  { href: '#about', label: 'আমাদের কথা' },
  { href: '#notices', label: 'নোটিশ' },
  { href: '#gallery', label: 'গ্যালারি' },
  { href: '#contact', label: 'যোগাযোগ' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium transition-colors hover:text-accent">
              {link.label}
            </Link>
          ))}
          <Button variant="outline" size="sm" asChild className="border-accent text-accent hover:bg-accent hover:text-primary">
            <Link href="/admin">
              <Shield className="mr-2 h-4 w-4" />
              এডমিন
            </Link>
          </Button>
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-primary text-primary-foreground">
              <nav className="flex flex-col gap-6 pt-10">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-lg font-medium transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                ))}
                 <Button variant="outline" asChild className="border-accent text-accent hover:bg-accent hover:text-primary">
                  <Link href="/admin">
                    <Shield className="mr-2 h-4 w-4" />
                    এডমিন
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
