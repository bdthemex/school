
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/logo';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Info, Users, Newspaper, ImageIcon as GalleryIcon, Phone, GraduationCap, Building, ChevronDown, ChevronRight, MessageSquare, Video, BookOpen, Star, UserSquare, History } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const navLinks = [
  { href: '/', label: 'প্রচ্ছদ', icon: Home },
  {
    label: 'আমাদের সম্পর্কে',
    icon: Info,
    children: [
      { href: '/history', label: 'প্রতিষ্ঠানের ইতিহাস', icon: History },
      { href: '/principals-message', label: 'প্রধান শিক্ষকের বাণী', icon: MessageSquare },
      { href: '/vice-principals-message', label: 'সহকারী প্রধান শিক্ষকের বাণী', icon: MessageSquare },
    ],
  },
   {
    label: 'শিক্ষার্থী',
    icon: GraduationCap,
    children: [
        { href: '/class-routine', label: 'ক্লাস রুটিন', icon: UserSquare },
        { href: '#', label: 'কৃতি শিক্ষার্থী', icon: Star },
    ]
  },
  {
    label: 'শিক্ষকমন্ডলী',
    icon: Users,
    children: [
      { href: '/teachers', label: 'শিক্ষক পরিচিতি', icon: Users },
      { href: '/staff', label: 'কর্মচারী পরিচিতি', icon: UserSquare },
    ],
  },
  { href: '/notices', label: 'নোটিশ', icon: Newspaper },
  { href: '/results', label: 'পরীক্ষার ফলাফল', icon: GraduationCap },
  {
    label: 'গ্যালারি',
    icon: GalleryIcon,
    children: [
      { href: '/gallery', label: 'ফটো গ্যালারি', icon: GalleryIcon },
      { href: '#', label: 'ভিডিও গ্যালারি', icon: Video },
    ],
  },
   {
    label: 'অন্যান্য',
    icon: BookOpen,
    children: [
        { href: '#', label: 'একাডেমিক ক্যালেন্ডার', icon: UserSquare },
        { href: '#', label: 'ছুটির তালিকা', icon: Star },
    ]
  },
  { href: '/contact', label: 'যোগাযোগ', icon: Phone },
];


export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="relative text-white py-2 px-4">
        <Image 
            src="https://placehold.co/1280x200"
            alt="Header background"
            fill
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
        <div className="container mx-auto flex h-14 items-center justify-start">
            <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
                link.children ? (
                    <DropdownMenu key={link.label}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="hover:bg-gray-700 text-base text-white hover:text-white flex items-center gap-1">
                                <link.icon className='w-4 h-4' />
                                {link.label}
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-800 text-white border-gray-700">
                            {link.children.map(child => (
                                <DropdownMenuItem key={child.label} asChild className='hover:!bg-gray-700 focus:!bg-gray-700 focus:!text-white hover:!text-white'>
                                    <Link href={child.href} className='flex items-center gap-2'>
                                        <child.icon className='w-4 h-4' />
                                        {child.label}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button key={link.label} asChild variant="ghost" 
                    className={cn(
                        "hover:bg-gray-700 text-base text-white hover:text-white",
                        link.href === pathname ? 'bg-gray-700' : ''
                    )}>
                        <Link href={link.href!} className="flex items-center gap-2">
                            <link.icon className='w-4 h-4' />
                            {link.label}
                        </Link>
                    </Button>
                )
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
                <SheetContent side="left" className='bg-gray-800 text-white border-r-gray-700 p-0 pt-6'>
                    <nav className="flex flex-col gap-1 px-2">
                        {navLinks.map((link) => (
                          link.children ? (
                            <Collapsible key={link.label} className="w-full">
                              <CollapsibleTrigger className="w-full">
                                <div className={cn(
                                    "text-lg font-medium transition-colors hover:text-green-400 flex items-center justify-between gap-3 p-2 rounded-md",
                                    pathname.startsWith(link.children.map(c => c.href).join()) ? 'bg-gray-700 text-green-400' : 'text-white'
                                  )}>
                                  <div className="flex items-center gap-3">
                                    <link.icon className='w-5 h-5' />
                                    {link.label}
                                  </div>
                                  <ChevronRight className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                                </div>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <div className="flex flex-col gap-1 pl-8 pr-2 py-2 border-l border-gray-600 ml-4">
                                {link.children.map(child => (
                                  <Link 
                                    key={child.label} 
                                    href={child.href} 
                                    className={cn(
                                      "text-base font-medium transition-colors hover:text-green-400 flex items-center gap-3 p-2 rounded-md",
                                      pathname === child.href ? 'bg-gray-700 text-green-400' : 'text-white'
                                    )}
                                  >
                                    <child.icon className='w-4 h-4' />
                                    {child.label}
                                  </Link>
                                ))}
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          ) : (
                            <Link 
                              key={link.label} 
                              href={link.href!}
                              className={cn(
                                "text-lg font-medium transition-colors hover:text-green-400 flex items-center gap-3 p-2 rounded-md",
                                pathname === link.href ? 'bg-gray-700 text-green-400' : 'text-white'
                              )}
                            >
                               <link.icon className='w-5 h-5' />
                              {link.label}
                            </Link>
                          )
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    </header>
  );
}
