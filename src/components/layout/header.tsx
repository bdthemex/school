
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Info, Users, Newspaper, ImageIcon as GalleryIcon, Phone, GraduationCap, ChevronDown, ChevronRight, MessageSquare, Video, BookOpen, Star, UserSquare, History, CalendarCheck, Plane } from 'lucide-react';
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
import React, { useState, useEffect } from 'react';

interface NavItem {
    _key: string;
    label: string;
    href?: string;
    children?: NavItem[];
}

interface SiteSettings {
    logo: string;
    headerBanner: string;
}

// A map to get icons for navigation items
const iconMap: { [key: string]: React.ElementType } = {
  'প্রচ্ছদ': Home,
  'আমাদের সম্পর্কে': Info,
  'প্রতিষ্ঠানের ইতিহাস': History,
  'প্রধান শিক্ষকের বাণী': MessageSquare,
  'সহকারী প্রধান শিক্ষকের বাণী': MessageSquare,
  'শিক্ষার্থী': GraduationCap,
  'ক্লাস রুটিন': UserSquare,
  'কৃতি শিক্ষার্থী': Star,
  'শিক্ষকমন্ডলী': Users,
  'শিক্ষক পরিচিতি': Users,
  'কর্মচারী পরিচিতি': UserSquare,
  'নোটিশ': Newspaper,
  'পরীক্ষার ফলাফল': GraduationCap,
  'গ্যালারি': GalleryIcon,
  'ফটো গ্যালারি': GalleryIcon,
  'ভিডিও গ্যালারি': Video,
  'অন্যান্য': BookOpen,
  'একাডেমিক ক্যালেন্ডার': CalendarCheck,
  'ছুটির তালিকা': Plane,
  'যোগাযোগ': Phone,
};


function getHeaderData(): { navItems: NavItem[], settings: SiteSettings } {
    const navItems: NavItem[] = [
      { _key: "n1", label: "প্রচ্ছদ", href: "/" },
      { 
        _key: "n2", 
        label: "আমাদের সম্পর্কে",
        children: [
          { _key: "s1", label: "আমাদের সম্পর্কে", href: "/about" },
          { _key: "s2", label: "প্রতিষ্ঠানের ইতিহাস", href: "/history" },
          { _key: "s3", label: "প্রধান শিক্ষকের বাণী", href: "/principals-message" },
          { _key: "s4", label: "সহকারী প্রধান শিক্ষকের বাণী", href: "/vice-principals-message" },
        ]
      },
      { 
        _key: "n3", 
        label: "শিক্ষার্থী",
        children: [
            { _key: "s5", label: 'ক্লাস রুটিন', href: '/class-routine' },
            { _key: "s6", label: 'কৃতি শিক্ষার্থী', href: '/successful-students' },
        ]
      },
      { 
        _key: "n4", 
        label: "শিক্ষকমন্ডলী",
        children: [
          { _key: "s7", label: "শিক্ষক পরিচিতি", href: "/teachers" },
          { _key: "s8", label: "কর্মচারী পরিচিতি", href: "/staff" },
        ]
      },
      { _key: "n5", label: "নোটিশ", href: "/notices" },
      { _key: "n6", label: "পরীক্ষার ফলাফল", href: "/results" },
      { 
        _key: "n7", 
        label: "গ্যালারি",
        children: [
          { _key: "s9", label: "ফটো গ্যালারি", href: "/gallery" },
          { _key: "s10", label: "ভিডিও গ্যালারি", href: "/video-gallery" },
        ]
      },
      { 
        _key: "n8", 
        label: "অন্যান্য",
        children: [
            { _key: "s11", label: "একাডেমিক ক্যালেন্ডার", href: "/academic-calendar" },
            { _key: "s12", label: "ছুটির তালিকা", href: "/holiday-list" },
        ]
      },
      { _key: "n9", label: "যোগাযোগ", href: "/contact" },
    ];
    
    const settings: SiteSettings = {
        logo: "https://picsum.photos/40/40?random=logo",
        headerBanner: "https://picsum.photos/1280/250?random=banner",
    };
    
    return { navItems, settings };
}

export default function Header() {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);
  const [navLinks, setNavLinks] = useState<NavItem[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const { navItems, settings } = getHeaderData();
    setNavLinks(navItems);
    setSiteSettings(settings);

    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const renderIcon = (label: string) => {
    const Icon = iconMap[label] || Info; // Default icon
    return <Icon className="w-4 h-4" />;
  };

  const renderMobileIcon = (label: string) => {
      const Icon = iconMap[label] || Info;
      return <Icon className="w-5 h-5" />;
  }

  return (
      <header className="w-full z-40 px-4 pt-4">
        <div className="hidden md:block relative w-full h-[200px]">
            {siteSettings?.headerBanner ? (
                <Image 
                    src={siteSettings.headerBanner}
                    alt="Header Banner"
                    fill
                    style={{objectFit: 'cover'}}
                    priority
                />
            ) : (
                 <Image 
                    src="https://picsum.photos/1280/250"
                    alt="Header Banner"
                    fill
                    style={{objectFit: 'cover'}}
                    priority
                />
            )}
        </div>
        
        {/* Placeholder for fixed menu on desktop */}
        <div className={cn("hidden md:block", isSticky && "h-16")} />

        <div className={cn(
          "w-full transition-all duration-300",
          isSticky ? "fixed top-0 left-1/2 -translate-x-1/2 max-w-7xl z-50 md:shadow-lg md:bg-[#0a2342] md:px-4" : "bg-[#0a2342]"
          )}>
          <div className="hidden md:block">
              <nav className="container mx-auto flex items-center gap-1 p-2.5">
              {navLinks.map((link) => (
                  link.children ? (
                      <DropdownMenu key={link.label}>
                          <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className={cn("hover:bg-[#8B0000] text-base hover:text-white flex items-center gap-1", isSticky ? 'text-white' : 'text-white')}>
                                  {renderIcon(link.label)}
                                  {link.label}
                                  <ChevronDown className="h-4 w-4" />
                              </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-background text-foreground border-none">
                              {link.children.map(child => (
                                  <DropdownMenuItem key={child.label} asChild className={'hover:!bg-[#8B0000] focus:!bg-[#8B0000] focus:!text-white hover:!text-white'}>
                                      <Link href={child.href || '#'} className='flex items-center gap-2'>
                                          {renderIcon(child.label)}
                                          {child.label}
                                      </Link>
                                  </DropdownMenuItem>
                              ))}
                          </DropdownMenuContent>
                      </DropdownMenu>
                  ) : (
                      <Button key={link.label} asChild variant="ghost" 
                      className={cn(
                          "hover:bg-[#8B0000] text-base hover:text-white",
                           isSticky ? 'text-white' : 'text-white',
                          link.href === pathname ? 'bg-[#8B0000] text-white' : ''
                      )}>
                          <Link href={link.href || '#'} className="flex items-center gap-2">
                              {renderIcon(link.label)}
                              {link.label}
                          </Link>
                      </Button>
                  )
              ))}
              </nav>
            </div>

            <div className="md:hidden flex justify-between items-center h-16 bg-[#0a2342] text-white px-4">
                  <Link href="/" className="flex items-center gap-2">
                    {siteSettings?.logo ? (
                        <Image src={siteSettings.logo} alt="logo" width={40} height={40} />
                    ) : (
                        <Home className="w-8 h-8" />
                    )}
                  </Link>
                  <Sheet>
                      <SheetTrigger asChild>
                      <Button variant="outline" size="icon" className='bg-transparent text-white border-white hover:bg-opacity-80 hover:text-white'>
                          <Menu className="h-6 w-6" />
                          <span className="sr-only">মেনু খুলুন</span>
                      </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className='bg-[#0a2342] text-white border-r-gray-700 p-0 pt-6'>
                          <nav className="flex flex-col gap-1 px-2">
                              {navLinks.map((link) => (
                                link.children ? (
                                  <Collapsible key={link.label} className="w-full">
                                    <CollapsibleTrigger asChild>
                                      <div className={cn(
                                          "text-lg font-medium transition-colors hover:bg-opacity-80 flex items-center justify-between gap-3 p-2 rounded-md group"
                                        )}>
                                        <div className="flex items-center gap-3">
                                          {renderMobileIcon(link.label)}
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
                                          href={child.href || '#'}
                                          className={cn(
                                            "text-base font-medium transition-colors hover:bg-opacity-80 flex items-center gap-3 p-2 rounded-md",
                                            pathname === child.href ? 'bg-[#8B0000] text-white' : 'text-white'
                                          )}
                                        >
                                          {renderMobileIcon(child.label)}
                                          {child.label}
                                        </Link>
                                      ))}
                                      </div>
                                    </CollapsibleContent>
                                  </Collapsible>
                                ) : (
                                  <Link 
                                    key={link.label} 
                                    href={link.href || '#'}
                                    className={cn(
                                      "text-lg font-medium transition-colors hover:bg-opacity-80 flex items-center gap-3 p-2 rounded-md",
                                      pathname === link.href ? 'bg-[#8B0000] text-white' : 'text-white'
                                    )}
                                  >
                                    {renderMobileIcon(link.label)}
                                    {link.label}
                                  </Link>
                                )
                              ))}
                          </nav>
                      </SheetContent>
                  </Sheet>
              </div>
        </div>
      </header>
  );
}
