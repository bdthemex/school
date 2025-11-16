'use server';

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
  Plane,
  Phone,
  Award,
  Trophy
} from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import type { LucideProps } from 'lucide-react';
import Marquee from '@/components/layout/marquee';
import { getSheetData, objectify } from '@/lib/data-loader';
import HeroCarousel from '@/components/layout/hero-carousel';
import FacultyCarousel from '@/components/layout/faculty-carousel';

const IconMap = {
    Megaphone,
    Trophy,
    Award,
    Plane,
    Phone,
    GraduationCap,
    Users,
    Download,
    BookMarked,
    BookOpen
};

type IconName = keyof typeof IconMap;

interface Notice {
  id: string;
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
    marqueeText: string;
}

interface InfoBox {
    _key: string;
    title: string;
    icon: IconName;
    image: string;
    links: { _key: string; label: string; href: string }[];
}

const IconComponent = ({ name, ...props }: { name: IconName } & LucideProps) => {
    const Icon = IconMap[name];
    if (!Icon) return <BookOpen {...props} />; // Fallback icon
    return <Icon {...props} />;
};

export default async function Home() {
    const [homepageData, noticesData, messagesData, settingsData] = await Promise.all([
        getSheetData('homepage'),
        getSheetData('notices'),
        getSheetData('messages'),
        getSheetData('settings')
    ]);

    const content: HomepageContent = {
        heroSlider: homepageData.filter((r: any) => r.type === 'heroSlider').map((r: any) => ({ _key: r.key, image: r.value, caption: r.value2, alt: r.value3 })),
        historySection: {
            image: homepageData.find((r: any) => r.key === 'image')?.value || '',
            summary: homepageData.find((r: any) => r.key === 'summary')?.value || '',
            linkText: homepageData.find((r: any) => r.key === 'linkText')?.value || '',
            linkHref: homepageData.find((r: any) => r.key === 'linkHref')?.value || '',
        },
        importantLinks: homepageData.filter((r: any) => r.type === 'importantLink').map((r: any) => ({ _key: r.key, title: r.value, href: r.value2, icon: r.value3 as IconName })),
        resourceLinks: homepageData.filter((r: any) => r.type === 'resourceLink').map((r: any) => ({ _key: r.key, title: r.value, href: r.value2 })),
        officialLinks: homepageData.filter((r: any) => r.type === 'officialLink').map((r: any) => ({ _key: r.key, title: r.value, href: r.value2 })),
        marqueeText: objectify(settingsData).marqueeText || ''
    };
    
    const notices: Notice[] = (noticesData || []).slice(0, 5).map((n: any) => ({ id: n.id, title: n.title }));
    
    const principalMsg = messagesData.find((m: any) => m.key === 'principal');
    const vicePrincipalMsg = messagesData.find((m: any) => m.key === 'vicePrincipal');
    
    const faculty: FacultyMessage[] = [];
    if(principalMsg) faculty.push({
        _id: "principal",
        name: principalMsg.name,
        title: "প্রধান শিক্ষকের বাণী",
        link: "/principals-message",
        quote: principalMsg.quote,
        image: principalMsg.image,
    });
     if(vicePrincipalMsg) faculty.push({
        _id: "vice-principal",
        name: vicePrincipalMsg.name,
        title: "সহকারী প্রধান শিক্ষকের বাণী",
        link: "/vice-principals-message",
        quote: vicePrincipalMsg.quote,
        image: vicePrincipalMsg.image,
    });

    const infoBoxes: InfoBox[] = [
        { 
            _key: 'ib1', 
            title: 'শিক্ষার্থীদের কর্নার',
            icon: 'GraduationCap' as IconName,
            image: `https://picsum.photos/seed/ib1/100/100`,
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
            image: `https://picsum.photos/seed/ib2/100/100`,
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
            image: `https://picsum.photos/seed/ib3/100/100`,
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
            image: `https://picsum.photos/seed/ib4/100/100`,
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
            <HeroCarousel slides={content.heroSlider} />
        </section>

        {content.marqueeText && <Marquee text={content.marqueeText} />}

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
                            src={content?.historySection?.image || "https://picsum.photos/400/300"} 
                            alt="প্রতিষ্ঠানের ইতিহাস" 
                            width={400} 
                            height={300} 
                            className="w-full h-auto object-cover rounded-lg shadow-md" 
                         />
                    </div>
                    <div className="md:col-span-3 space-y-3">
                      <p className="text-foreground leading-relaxed text-base text-justify">
                        {content?.historySection?.summary || "লোড হচ্ছে..."}
                      </p>
                       <Button asChild variant="link" size="sm" className="p-0 h-auto">
                            <Link href={content?.historySection?.linkHref || "/about"}>
                                {content?.historySection?.linkText || "বিস্তারিত পড়ুন"} <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                       </Button>
                    </div>
                </CardContent>
            </Card>

             <FacultyCarousel faculty={faculty} />

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
                    {content?.importantLinks?.map((link) => (
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
                        <Link href={`/notices/${notice.id}`} key={notice.id} className="block text-base text-foreground hover:text-primary gap-2">
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
                     {content?.resourceLinks?.map((link) => (
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
                     {content?.officialLinks?.map((link) => (
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
