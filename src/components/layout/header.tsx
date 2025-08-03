'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/logo';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Info, Users, Newspaper, Image as ImageIcon, Briefcase, Phone, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { href: '/', label: 'প্রচ্ছদ', icon: Home },
  { href: '#about', label: 'প্রতিষ্ঠানের ইতিহাস', icon: Info },
  { 
    label: 'শিক্ষকমণ্ডলী', 
    icon: Users,
    subLinks: [
        { href: '#', label: 'শিক্ষক পরিচিতি' },
        { href: '#', label: 'কর্মচারী পরিচিতি' },
    ]
  },
  { href: '#notices', label: 'নোটিশ', icon: Newspaper },
  { href: '#results', label: 'পরীক্ষার ফলাফল' },
  { href: '#gallery', label: 'ফটো', icon: ImageIcon },
  { href: '#video', label: 'ভিডিও' },
  { href: '#others', label: 'অন্যান্য' },
  { href: '#blog', label: 'ব্লগ' },
  { href: '#contact', label: 'যোগাযোগ', icon: Phone },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-md">
      <div className="bg-accent/80 text-primary-foreground py-1">
        <div className="container mx-auto px-4 flex justify-between items-center text-xs">
          <span>গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</span>
        </div>
      </div>

      <div className="container mx-auto px-4 flex items-center py-2">
        <Link href="/" className="flex items-center gap-3">
          <Logo className="h-14 w-auto" />
          <div>
            <h1 className="text-2xl font-bold text-red-600">কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়</h1>
            <p className="text-sm text-muted-foreground">কেন্দুয়া, নেত্রকোণা, স্থাপিত: ১৮৩২ খ্রিস্টাব্দ</p>
          </div>
        </Link>
      </div>
      
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto flex h-12 items-center justify-between px-4">
            <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
                link.subLinks ? (
                    <DropdownMenu key={link.label}>
                        <DropdownMenuTrigger asChild>
                           <Button variant="ghost" className="hover:bg-primary/80 hover:text-primary-foreground focus-visible:ring-0">
                                {link.label}
                                <ChevronDown className="ml-1 h-4 w-4" />
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {link.subLinks.map(subLink => (
                                <DropdownMenuItem key={subLink.label} asChild>
                                    <Link href={subLink.href}>{subLink.label}</Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button key={link.label} asChild variant="ghost" className="hover:bg-primary/80 hover:text-primary-foreground">
                        <Link href={link.href}>
                            {link.label}
                        </Link>
                    </Button>
                )
            ))}
            </nav>
            <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-primary text-primary-foreground">
                <nav className="flex flex-col gap-4 pt-10">
                    {navLinks.map((link) => (
                    <Link key={link.label} href={link.href || '#'} className="text-lg font-medium transition-colors hover:text-accent flex items-center gap-2">
                        {link.icon && <link.icon className="h-5 w-5" />}
                        {link.label}
                    </Link>
                    ))}
                </nav>
                </SheetContent>
            </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
