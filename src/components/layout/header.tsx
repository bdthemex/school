import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { getSheetData, buildNestedNav, objectify } from '@/lib/data-loader';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, Info, Users, Newspaper, ImageIcon as GalleryIcon, Phone, GraduationCap, ChevronDown, MessageSquare, Video, BookOpen, Star, UserSquare, History, CalendarCheck, Plane, FilePlus2 } from 'lucide-react';
import MobileNav from './mobile-nav';

interface NavItem {
    _key: string;
    label: string;
    href?: string;
    children?: NavItem[];
}

interface SiteSettings {
    logo?: string;
    headerBanner?: string;
}

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
  'নমুনা পৃষ্ঠা': FilePlus2,
};

const renderIcon = (label: string) => {
    const Icon = iconMap[label] || Info; // Default icon
    return <Icon className="w-4 h-4" />;
};


// Main server component for the header
export default async function Header() {
    const [navData, settingsData] = await Promise.all([
        getSheetData('header_nav'),
        getSheetData('settings')
    ]);
    
    const navLinks = buildNestedNav(navData);
    const siteSettings: SiteSettings = objectify(settingsData);

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
                    <div className="w-full h-full bg-muted animate-pulse" />
                )}
            </div>
            
            <MobileNav navLinks={navLinks} settings={siteSettings} />
        </header>
    );
}

// Keeping the desktop nav part of MobileNav component to handle sticky logic together.
export function DesktopNav({ navLinks, isSticky }: { navLinks: NavItem[], isSticky: boolean }) {
    const pathname = (typeof window !== 'undefined' && window.location.pathname) || '';
    return (
        <div className="hidden md:block">
            <nav className="container mx-auto flex items-center flex-wrap justify-center gap-1 p-2.5">
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
    );
}
