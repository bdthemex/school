
'use client'

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  Megaphone,
  Link as LinkIcon,
  BookOpen,
  Check,
  Download,
  X,
  Target,
  HomeIcon,
  GraduationCap,
  ChevronRight,
  BookMarked,
  ClipboardList,
  Trophy,
  Award,
  Plane,
  Phone,
} from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import type { LucideProps } from 'lucide-react';

// Import data from JSON files
import homepageContentData from '@/data/homepage.json';
import noticesData from '@/data/notices.json';
import messagesData from '@/data/messages.json';

// Dynamically import icons to fix the chunk loading issue
const icons = {
  Megaphone: lazy(() => import('lucide-react').then(module => ({ default: module.Megaphone }))),
  Trophy: lazy(() => import('lucide-react').then(module => ({ default: module.Trophy }))),
  Award: lazy(() => import('lucide-react').then(module => ({ default: module.Award }))),
  Plane: lazy(() => import('lucide-react').then(module => ({ default: module.Plane }))),
  Phone: lazy(() => import('lucide-react').then(module => ({ default: module.Phone }))),
  GraduationCap: lazy(() => import('lucide-react').then(module => ({ default: module.GraduationCap }))),
  Users: lazy(() => import('lucide-react').then(module => ({ default: module.Users }))),
  Download: lazy(() => import('lucide-react').then(module => ({ default: module.Download }))),
  BookMarked: lazy(() => import('lucide-react').then(module => ({ default: module.BookMarked }))),
  // Add other icons used in homepage.json here if needed
} as const;

type IconName = keyof typeof icons;


interface Notice {
  _id: string;
  title: string;
}

interface FacultyMessage {
    _id: string;
    name: string;
    quote: string;
    image: string;
    link: string;
    title: string;
}

interface LinkItem {
    _key: string;
    title: string;
    href: string;
    icon?: IconName;
}

interface HomepageContent {
    heroSlider: {
        _key: string;
        image: string;
        caption: string;
        alt: string;
    }[];
    historySection: {
        image: string;
        summary: string;
        linkText: string;
        linkHref: string;
    };
    importantLinks: LinkItem[];
    resourceLinks: LinkItem[];
    officialLinks: LinkItem[];
}

function getHomepageData(): { notices: Notice[], content: HomepageContent, faculty: FacultyMessage[] } {
  const notices = noticesData.slice(0, 5).map(n => ({ _id: n._id, title: n.title }));
  const content: HomepageContent = homepageContentData;
  const faculty: FacultyMessage[] = [
    {
      _id: "principal",
      name: messagesData.principal.name,
      title: "প্রধান শিক্ষকের বাণী",
      link: "/principals-message",
      quote: messagesData.principal.quote,
      image: messagesData.principal.image,
    },
    {
      _id: "vice-principal",
      name: messagesData.vicePrincipal.name,
      title: "সহকারী প্রধান শিক্ষকের বাণী",
      link: "/vice-principals-message",
      quote: messagesData.vicePrincipal.quote,
      image: messagesData.vicePrincipal.image,
    }
  ];
  return { notices, content, faculty };
}

const IconComponent = ({ name, ...props }: { name: IconName } & LucideProps) => {
    const Icon = icons[name];
    if (!Icon) return <BookOpen {...props} />; // Fallback icon

    return (
        <Suspense fallback={<BookOpen {...props} />}>
            <Icon {...props} />
        </Suspense>
    );
};


export default function Home() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [homepageContent, setHomepageContent] = useState<HomepageContent | null>(null);
    const [facultyMessages, setFacultyMessages] = useState<FacultyMessage[]>([]);
    const heroCarouselPlugin = useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
    );
    const facultyCarouselPlugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
    );
    const [showMarquee, setShowMarquee] = useState(true);

    useEffect(() => {
        const { notices, content, faculty } = getHomepageData();
        setNotices(notices);
        setHomepageContent(content);
        setFacultyMessages(faculty);
    }, []);

    const marqueeText = "সরকারি ও বেসরকারি মাধ্যমিক বিদ্যালয়ে-২০২৫ শিক্ষাবর্ষে ভর্তি বিজ্ঞপ্তি ও নিয়মাবলী সংক্রান্ত। আমাদের ওয়েবসাইটে আপনাকে স্বাগত…(সাইট ডেভেলপমেন্টের কাজ চলছে) *** "

    // This data is now hardcoded as requested, to avoid Sanity dependency.
    const infoBoxes = [
        { 
            _key: 'ib1', 
            title: 'শিক্ষার্থীদের কর্নার',
            icon: 'GraduationCap' as IconName,
            image: `https://picsum.photos/100/100?random=ib1`,
            links: [
              {_key: 'ibl1', label: 'শ্রেণিভিত্তিক শিক্ষার্থী', href: '#'}, 
              {_key: 'ibl2', label: 'ক্লাস রুটিন', href: '/class-routine'}, 
              {_key: 'ibl3', label: 'ছুটির তালিকা', href: '/holiday-list'}, 
              {_key: 'ibl4', label: 'নোটিশ', href: '/notices'}
            ]
        },
        { 
            _key: 'ib2', 
            title: 'শিক্ষকমন্ডলীদের কর্ণার',
            icon: 'Users' as IconName,
            image: `https://picsum.photos/100/100?random=ib2`,
            links: [
              {_key: 'ibl5', label: 'শিক্ষকমন্ডলী', href: '/teachers'}, 
              {_key: 'ibl6', label: 'স্টাফ', href: '/staff'}, 
              {_key: 'ibl7', label: 'শিক্ষক/কর্মচারী সংখ্যা', href: '#'}, 
              {_key: 'ibl8', label: 'SMS ALERT', href: '#'}
            ]
        },
        { 
            _key: 'ib3', 
            title: 'সকল ডাউনলোড',
            icon: 'Download' as IconName,
            image: `https://picsum.photos/100/100?random=ib3`,
            links: [
                {_key: 'ibl9', label: 'ডাউনলোড', href: '#'},
                {_key: 'ibl10', label: 'পরীক্ষার রুটিন', href: '#'},
                {_key: 'ibl11', label: 'ভর্তি', href: '#'},
            ]
        },
        { 
            _key: 'ib4', 
            title: 'একাডেমিক তথ্য',
            icon: 'BookMarked' as IconName,
            image: `https://picsum.photos/100/100?random=ib4`,
            links: [
              {_key: 'ibl12', label: 'প্রতিষ্ঠানের ইতিহাস', href: '/history'}, 
              {_key: 'ibl13', label: 'পরীক্ষার ফলাফল', href: '/results'}, 
              {_key: 'ibl14', label: 'নোটিশ', href: '/notices'}, 
              {_key: 'ibl15', label: 'একাডেমিক ক্যালেন্ডার', href: '/academic-calendar'}, 
            ]
        }
    ];


  return (
    <main>
      <div className="pt-0 px-4 pb-4">
        <section className="relative w-full">
            <Suspense fallback={<div className="w-full h-[400px] bg-muted animate-pulse" />}>
                <Carousel
                    plugins={[heroCarouselPlugin.current]}
                    className="w-full"
                    >
                    <CarouselContent>
                        {homepageContent?.heroSlider && homepageContent.heroSlider.length > 0 ? homepageContent.heroSlider.map(slide => (
                            <CarouselItem key={slide._key}>
                                <Image
                                    src={slide.image}
                                    alt={slide.alt || 'Slider image'}
                                    width={1280}
                                    height={400}
                                    className="w-full h-auto max-h-[400px] object-cover"
                                    priority
                                />
                                {slide.caption && (
                                    <div className='absolute bottom-4 left-4 bg-primary/80 text-white py-2 px-4 rounded-md'>
                                        <p className='font-bold text-lg'>{slide.caption}</p>
                                    </div>
                                )}
                            </CarouselItem>
                        )) : (
                            <CarouselItem>
                                <Image
                                    src="https://picsum.photos/1280/400?random=11"
                                    alt="Placeholder"
                                    width={1280}
                                    height={400}
                                    className="w-full h-auto max-h-[400px] object-cover"
                                    priority
                                />
                            </CarouselItem>
                        )}
                    </CarouselContent>
                </Carousel>
            </Suspense>
        </section>

        {showMarquee && (
        <div className="my-4">
            <div className="bg-muted flex h-12 items-center overflow-hidden shadow-sm">
                <div className="relative bg-primary text-primary-foreground px-4 py-3 flex items-center">
                    <span className="text-base font-bold whitespace-nowrap">জরুরী ঘোষণা</span>
                    <div className="absolute right-[-24px] top-0 h-full w-6 bg-primary" style={{ clipPath: 'polygon(100% 50%, 0 0, 0 100%)' }}></div>
                </div>
                <div className="ml-4 relative flex-grow h-full flex items-center overflow-hidden">
                    <div className="w-full flex items-center">
                    <div className="animate-marquee whitespace-nowrap flex text-foreground text-base">
                        <span className="mx-4">{marqueeText}</span>
                        <span className="mx-4">{marqueeText}</span>
                    </div>
                    </div>
                </div>
                <button onClick={() => setShowMarquee(false)} className='bg-primary text-primary-foreground hover:bg-primary/90 p-3 h-full flex items-center'>
                    <X className='w-4 h-4' />
                </button>
            </div>
        </div>
        )}

        <div className="grid lg:grid-cols-4 gap-6 pb-4">
          
          <div className="lg:col-span-3 space-y-6">
            <Card className="shadow-lg">
                <CardHeader className='bg-primary text-primary-foreground rounded-t-lg p-4'>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <HomeIcon className="w-5 h-5" />
                        প্রতিষ্ঠানের ইতিহাস
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-5 gap-6 pt-6">
                    <div className='md:col-span-2'>
                         <Image 
                            src={homepageContent?.historySection?.image || "https://picsum.photos/400/300"} 
                            alt="প্রতিষ্ঠানের ইতিহাস" 
                            width={400} 
                            height={300} 
                            className="w-full h-auto object-cover rounded-lg shadow-md" 
                         />
                    </div>
                    <div className="md:col-span-3 space-y-3">
                      <p className="text-foreground leading-relaxed text-base text-justify">
                        {homepageContent?.historySection?.summary || "লোড হচ্ছে..."}
                      </p>
                       <Button asChild variant="link" size="sm" className="p-0 h-auto">
                            <Link href={homepageContent?.historySection?.linkHref || "/about"}>
                                {homepageContent?.historySection?.linkText || "বিস্তারিত পড়ুন"} <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                       </Button>
                    </div>
                </CardContent>
            </Card>

             <Carousel
                opts={{ loop: true, align: "start" }}
                plugins={[facultyCarouselPlugin.current]}
                className="w-full"
             >
                <CarouselContent className="-ml-2 md:-ml-4">
                     {facultyMessages.map((faculty, index) => (
                        <CarouselItem key={faculty._id || index} className="pl-2 md:pl-4 md:basis-1/2">
                            <Card className="shadow-lg h-full">
                                <CardHeader className='bg-primary text-primary-foreground rounded-t-lg p-4'>
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <Users className="w-5 h-5" />
                                        {faculty.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                                   <Image 
                                    src={faculty.image} 
                                    alt={faculty.name} 
                                    width={80} 
                                    height={80} 
                                    className="rounded-md border-2 border-accent"
                                    data-ai-hint="teacher portrait"
                                   />
                                   <div className='space-y-2 text-center sm:text-left'>
                                       <p className='text-base text-foreground italic text-justify leading-relaxed'>"{faculty.quote}"</p>
                                       <Button asChild variant="link" className="p-0 h-auto text-primary hover:underline">
                                         <Link href={faculty.link}>বিস্তারিত</Link>
                                       </Button>
                                   </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                     ))}
                </CarouselContent>
             </Carousel>

             <div className="grid md:grid-cols-2 gap-6">
                {infoBoxes.map(box => (
                    <Card key={box._key} className="shadow-lg">
                        <CardHeader className='bg-primary text-primary-foreground rounded-t-lg p-4'>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <IconComponent name={box.icon} className="w-5 h-5" />
                                {box.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center gap-4 pt-6">
                            <Image 
                                src={box.image}
                                alt={box.title} 
                                width={100} 
                                height={100} 
                                className="w-20 h-20 object-cover rounded-lg" 
                            />
                            <div className="space-y-2">
                                {box.links.map(link => (
                                    <Link href={link.href} key={link._key} className="flex items-center text-base text-foreground hover:text-primary gap-2">
                                        <Check className="w-4 h-4 text-accent" />
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
             </div>
          </div>

          <aside className="lg:col-span-1 space-y-6">
               <Card className="shadow-lg">
                 <CardContent className="p-2 space-y-2">
                    {homepageContent?.importantLinks?.map((link) => (
                        <Link
                            href={link.href}
                            key={link._key}
                            className="flex items-center gap-2 p-2.5 text-base font-medium border rounded-md hover:bg-muted transition-colors text-foreground"
                        >
                             {link.icon && <IconComponent name={link.icon} className="w-4 h-4 text-primary" />}
                             {link.title}
                        </Link>
                    ))}
                 </CardContent>
               </Card>
              <Card className="shadow-lg">
                <CardHeader className='bg-primary text-primary-foreground rounded-t-lg p-4'>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Megaphone className="w-5 h-5" />
                        নোটিশ বোর্ড
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3 bg-muted/50">
                    {notices.length > 0 ? (
                      notices.map((notice) => (
                        <Link href={`/notices/${notice._id}`} key={notice._id} className="block text-base text-foreground hover:text-primary gap-2">
                           <div className="flex items-start gap-2">
                             <Target className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                             <p>{notice.title}</p>
                           </div>
                        </Link>
                      ))
                    ) : (
                      <p className="text-sm text-center text-foreground py-4">কোনো নোটিশ নেই।</p>
                    )}
                </CardContent>
              </Card>

               <Card className="shadow-lg">
                <CardHeader className='bg-primary text-primary-foreground rounded-t-lg p-4'>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <LinkIcon className="w-5 h-5" />
                        গুরুত্বপূর্ণ লিংক
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                     {homepageContent?.resourceLinks?.map((link) => (
                        <Link href={link.href} key={link._key} className="flex items-center text-base text-foreground hover:text-primary gap-2 border-b last:border-b-0 py-1.5">
                            <ChevronRight className="w-4 h-4 text-primary" />
                            {link.title}
                        </Link>
                    ))}
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className='bg-primary text-primary-foreground rounded-t-lg p-4'>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <LinkIcon className="w-5 h-5" />
                        অফিসিয়াল লিংক
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                     {homepageContent?.officialLinks?.map((link) => (
                        <Link href={link.href} key={link._key} className="flex items-center text-base text-foreground hover:text-primary gap-2 border-b last:border-b-0 py-1.5">
                            <ChevronRight className="w-4 h-4 text-primary" />
                            {link.title}
                        </Link>
                    ))}
                </CardContent>
              </Card>
          </aside>
        </div>
      </div>
    </main>
  )
}
