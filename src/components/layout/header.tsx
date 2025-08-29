
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/logo';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Info, Users, Newspaper, ImageIcon as GalleryIcon, Phone, GraduationCap } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'প্রচ্ছদ', icon: Home },
  { href: '/history', label: 'প্রতিষ্ঠানের ইতিহাস', icon: Info },
  { href: '/teachers', label: 'শিক্ষকমন্ডলী', icon: Users },
  { href: '/notices', label: 'নোটিশ', icon: Newspaper },
  { href: '/results', label: 'পরীক্ষার ফলাফল', icon: GraduationCap },
  { href: '/gallery', label: 'ফটো', icon: GalleryIcon },
  { href: '/contact', label: 'যোগাযোগ', icon: Phone },
];


export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="relative text-white py-2 px-4">
        <Image 
            src="https://placehold.co/1280x200"
            alt="Header background"
            layout="fill"
            objectFit='cover'
            className='absolute top-0 left-0 -z-10'
            data-ai-hint='green gradient'
        />
        <div className="flex flex-col items-center justify-center relative z-10">
          <p className='text-lg'>গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</p>
          <div className="flex items-center gap-4 pt-2">
            <Link href="/" className='flex-shrink-0'>
              <Logo className="h-20 w-auto" />
            </Link>
            <div className='text-center'>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়</h1>
                <p className="text-md text-green-200">কেন্দুয়া, নেত্রকোণা | স্থাপিত: ১৮৩২</p>
            </div>
        </div>
        </div>
      </div>
      
      <div className="bg-gray-800 text-gray-100 hidden md:block">
        <div className="flex h-14 items-center justify-start">
            <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
                <Button key={link.label} asChild variant="ghost" 
                  className={cn(
                    "hover:bg-gray-700 text-base text-white hover:text-white",
                    link.href === pathname ? 'bg-gray-700' : ''
                  )}>
                    <Link href={link.href} className="flex items-center gap-2">
                        <link.icon className='w-4 h-4' />
                        {link.label}
                    </Link>
                </Button>
            ))}
            </nav>
        </div>
      </div>

       <div className="md:hidden flex justify-end items-center h-16 bg-gray-800 text-white px-4">
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="outline" size="icon" className='bg-transparent text-white border-white'>
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">মেনু খুলুন</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left" className='bg-gray-800 text-white border-r-gray-700'>
                  <div className='p-6'>
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                          <Link 
                            key={link.label} 
                            href={link.href} 
                            className={cn(
                              "text-lg font-medium transition-colors hover:text-green-400 flex items-center gap-3 p-2 rounded-md",
                              pathname === link.href ? 'bg-gray-700 text-green-400' : 'text-white'
                            )}
                          >
                             <link.icon className='w-5 h-5' />
                            {link.label}
                          </Link>
                        ))}
                    </nav>
                  </div>
                </SheetContent>
            </Sheet>
        </div>
    </header>
  );
}

    