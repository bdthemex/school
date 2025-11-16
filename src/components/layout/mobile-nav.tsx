'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from '@/lib/utils';
import { DesktopNav } from './header';
import { Home, Info, Users, Newspaper, ImageIcon as GalleryIcon, Phone, GraduationCap, ChevronDown, ChevronRight, MessageSquare, Video, BookOpen, Star, UserSquare, History, CalendarCheck, Plane, FilePlus2, Menu } from 'lucide-react';

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

const renderMobileIcon = (label: string) => {
    const Icon = iconMap[label] || Info;
    return <Icon className="w-5 h-5" />;
}

export default function MobileNav({ navLinks, settings }: { navLinks: NavItem[], settings: SiteSettings }) {
    const [isSticky, setIsSticky] = React.useState(false);
    const pathname = usePathname();

    React.useEffect(() => {
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

    return (
        <>
            <div className={cn("hidden md:block", isSticky && "h-16")} />

            <div className={cn(
            "w-full transition-all duration-300",
            isSticky ? "fixed top-0 left-1/2 -translate-x-1/2 max-w-7xl z-50 md:shadow-lg md:bg-[#0a2342] md:px-4" : "bg-[#0a2342]"
            )}>
                
                <DesktopNav navLinks={navLinks} isSticky={isSticky} />

                {/* Mobile Nav */}
                <div className="md:hidden flex justify-between items-center h-16 bg-[#0a2342] text-white px-4">
                    <Link href="/" className="flex items-center gap-2">
                        {settings?.logo ? (
                            <Image src={settings.logo} alt="logo" width={40} height={40} />
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
                                                pathname === child.href ? 'bg-[#8B0000] text-white' : 'bg-transparent text-white'
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
                                        pathname === link.href ? 'bg-[#8B0000] text-white' : 'bg-transparent text-white'
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
        </>
    );
};
