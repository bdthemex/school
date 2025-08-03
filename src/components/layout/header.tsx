
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/logo';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Info, Users, Newspaper, ImageIcon as GalleryIcon, Video, MoreHorizontal, Phone, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'প্রচ্ছদ' },
  { 
    label: 'আমাদের সম্পর্কে',
    subLinks: [
        { href: '/about', label: 'আমাদের সম্পর্কে' },
        { href: '/history', label: 'প্রতিষ্ঠানের ইতিহাস' },
        { href: '/principals-message', label: 'প্রধান শিক্ষকের বাণী' },
        { href: '/vice-principals-message', label: 'সহকারী প্রধান শিক্ষকের বাণী' },
    ]
  },
  { 
    label: 'একাডেমিক', 
    subLinks: [
        { href: '/teachers', label: 'শিক্ষক পরিচিতি' },
        { href: '/staff', label: 'কর্মচারী পরিচিতি' },
        { href: '/class-routine', label: 'ক্লাস রুটিন' },
    ]
  },
  { href: '/notices', label: 'নোটিশ'},
  { href: '/results', label: 'ফলাফল' },
  { href: '/gallery', label: 'গ্যালারি' },
  { href: '/contact', label: 'যোগাযোগ' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-4">
          <Logo className="h-16 w-auto" />
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়</h1>
            <p className="text-sm text-muted-foreground">EIIN: 113026 | স্থাপিত: ১৮৩২</p>
          </div>
        </Link>
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">মেনু খুলুন</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className='p-6'>
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                          <Link 
                            key={link.label} 
                            href={link.href || '#'} 
                            className={cn(
                              "text-lg font-medium transition-colors hover:text-primary",
                              (link.href === pathname || (link.subLinks && link.subLinks.some(sl => sl.href === pathname))) ? 'text-primary' : 'text-foreground'
                            )}
                          >
                            {link.label}
                          </Link>
                        ))}
                    </nav>
                  </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
      
      <div className="bg-primary text-primary-foreground hidden md:block">
        <div className="container mx-auto flex h-14 items-center justify-center px-4">
            <nav className="flex items-center gap-2">
            {navLinks.map((link) => (
                link.subLinks ? (
                    <DropdownMenu key={link.label}>
                        <DropdownMenuTrigger asChild>
                           <Button 
                              variant="ghost" 
                              className={cn(
                                "hover:bg-accent/20 focus-visible:ring-0 text-base",
                                (link.subLinks && link.subLinks.some(sl => sl.href === pathname)) ? 'bg-accent/20' : ''
                              )}
                            >
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
                    <Button key={link.label} asChild variant="ghost" 
                      className={cn(
                        "hover:bg-accent/20 text-base",
                        link.href === pathname ? 'bg-accent/20' : ''
                      )}>
                        <Link href={link.href}>
                            {link.label}
                        </Link>
                    </Button>
                )
            ))}
            </nav>
        </div>
      </div>
    </header>
  );
}

    