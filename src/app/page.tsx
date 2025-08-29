
'use client'

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
} from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Skeleton } from '@/components/ui/skeleton';

interface Notice {
  id: string;
  date: string;
  title: string;
  createdAt?: Timestamp;
}

const demoNotices: Notice[] = [
    { id: '1', date: '২০২৪-০৭-২৬', title: '২০২৫ শিক্ষাবর্ষে ৬ষ্ঠ থেকে ৯ম শ্রেণিতে ভর্তির বিজ্ঞপ্তি।' },
    { id: '2', date: '২০২৪-০৭-২৫', title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা-২০২৪ এর পুরস্কার বিতরণী অনুষ্ঠান।' },
    { id: '3', date: '২০২৪-০৭-২৪', title: 'অভিভাবক সমাবেশ এবং ফলাফল প্রকাশ সংক্রান্ত নোটিশ।' },
    { id: '4', date: '২০২৪-০৭-২৩', title: 'ডেঙ্গু প্রতিরোধে সচেতনতামূলক কার্যক্রম গ্রহণ প্রসঙ্গে।' },
    { id: '5', date: '২০২৪-০৭-২২', title: 'বর্ষাকালীন ছুটি ও গ্রীষ্মকালীন অবকাশের নোটিশ।' },
];

const facultyData = [
  { name: 'প্রধান শিক্ষক', title: 'প্রধান শিক্ষকের বাণী', message: 'দীর্ঘদিন পরে কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়ের ওয়েব সাইট সম্প্রতি খোলা হয়েছে। এটা বিদ্যালয়ের জন্য উজ্জ্বল মাইল ফলক।', image: 'https://kjsghs.edu.bd/wp-content/uploads/2022/10/Mr.-Baten-Sir-3-1.jpg', dataAiHint: 'teacher portrait', link: '/principals-message' },
  { name: 'সহকারী প্রধান শিক্ষক', title: 'সহকারী প্রধান শিক্ষকের বাণী', message: 'তথ্য প্রযুক্তির যুগে প্রবেশ করতে পেরে আমরা আনন্দিত। এর মাধ্যমে স্কুলের কার্যক্রম আরও গতিশীল হবে।', image: 'https://picsum.photos/100/100?random=2', dataAiHint: 'teacher portrait', link: '/vice-principals-message' },
];

const importantSiteLinks = [
    { title: 'নোটিশ', href: '/notices' },
    { title: 'পরীক্ষার ফলাফল', href: '/results' },
    { title: 'কৃতি শিক্ষার্থী', href: '#' },
    { title: 'ছুটির দিন', href: '#' },
    { title: 'যোগাযোগ', href: '/contact' },
]

const resourceLinks = [
    { title: 'প্রধানমন্ত্রীর শিক্ষা সহায়তা ট্রাস্ট'},
    { title: 'উপবৃত্তি তথ্য'},
    { title: 'বৃত্তি তথ্য'},
]

const officialLinks = [
    { title: 'ভর্তির আবেদন'},
    { title: 'পরীক্ষার ফলাফল'},
    { title: 'ময়মনসিংহ বোর্ড'},
    { title: 'মাধ্যমিক ও উচ্চ শিক্ষা অধিদপ্তর'},
    { title: 'ব্যানবেইস'},
]

export default function Home() {
    const heroCarouselPlugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
    )
     const facultyCarouselPlugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
    )
    const [notices, setNotices] = useState<Notice[]>(demoNotices.slice(0, 5))
    const [isLoading, setIsLoading] = useState(false)
    const [showMarquee, setShowMarquee] = useState(true);
    const marqueeText = "সরকারি ও বেসরকারি মাধ্যমিক বিদ্যালয়ে-২০২৫ শিক্ষাবর্ষে ভর্তি বিজ্ঞপ্তি ও নিয়মাবলী সংক্রান্ত। আমাদের ওয়েবসাইটে আপনাকে স্বাগত…(সাইট ডেভেলপমেন্টের কাজ চলছে) *** "

  return (
    <main>
      <div className='p-4'>
        <section className="relative w-full shadow-md">
            <Carousel
                plugins={[heroCarouselPlugin.current]}
                className="w-full"
                >
                <CarouselContent>
                    <CarouselItem>
                        <Image
                            src="https://picsum.photos/1280/400?random=11"
                            alt="School classroom"
                            width={1280}
                            height={400}
                            className="w-full h-auto max-h-[400px] object-cover"
                            data-ai-hint="school classroom students"
                        />
                        <div className='absolute bottom-4 left-4 bg-primary/80 text-white py-2 px-4 rounded-md'>
                            <p className='font-bold text-lg'>আমাদের শ্রেণীকক্ষ</p>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <Image
                            src="https://picsum.photos/1280/400?random=12"
                            alt="School library"
                            width={1280}
                            height={400}
                            className="w-full h-auto max-h-[400px] object-cover"
                            data-ai-hint="school library books"
                        />
                        <div className='absolute bottom-4 left-4 bg-primary/80 text-white py-2 px-4 rounded-md'>
                            <p className='font-bold text-lg'>সমৃদ্ধ লাইব্রেরি</p>
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
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
            {/* About Section */}
            <Card className="shadow-lg">
                <CardHeader className='bg-primary text-primary-foreground rounded-t-lg p-4'>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <HomeIcon className="w-5 h-5" />
                        প্রতিষ্ঠানের ইতিহাস
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-5 gap-6 pt-6">
                    <div className='md:col-span-2'>
                         <Image src="https://kjsghs.edu.bd/wp-content/uploads/2022/10/school-front-gate-1.jpg" alt="প্রতিষ্ঠানের ইতিহাস" width={400} height={300} className="w-full h-auto object-cover rounded-lg shadow-md" data-ai-hint="historic building" />
                    </div>
                    <div className="md:col-span-3 space-y-3">
                      <p className="text-foreground leading-relaxed text-base">
                      কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়টি ১৮৩২ সালে প্রতিষ্ঠিত হয়। এটি এই অঞ্চলের অন্যতম প্রাচীন এবং স্বনামধন্য একটি শিক্ষা প্রতিষ্ঠান। ১৯ মার্চ, ১৯৯১ সালে প্রতিষ্ঠানটি জাতীয়করণ করা হয়। বর্তমানে বিদ্যালয়ে ৬ষ্ঠ থেকে ১০ম শ্রেণি পর্যন্ত পাঠদান করা হয় এবং প্রায় ৭১৭ জন শিক্ষার্থী অধ্যয়নরত আছে। অভিজ্ঞ শিক্ষকমণ্ডলীর মাধ্যমে পরিচালিত এই বিদ্যালয়ে বর্তমানে ১২ জন শিক্ষক কর্মরত রয়েছেন। বিদ্যালয়টিতে একটি তিন তলা ভবন, একটি দোতলা ভবন, তিনটি হাফ বিল্ডিং, একটি খেলার মাঠ এবং দুইটি শহীদ মিনার রয়েছে।
                      </p>
                       <Button asChild variant="link" size="sm" className="p-0 h-auto">
                            <Link href="/about">
                                বিস্তারিত পড়ুন <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                       </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Teachers Messages Carousel */}
             <Carousel
                opts={{ loop: true, align: "start" }}
                plugins={[facultyCarouselPlugin.current]}
                className="w-full"
             >
                <CarouselContent className="-ml-2 md:-ml-4">
                     {facultyData.map((faculty, index) => (
                        <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2">
                            <Card className="shadow-lg h-full">
                                <CardHeader className='bg-primary text-primary-foreground rounded-t-lg p-4'>
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <Users className="w-5 h-5" />
                                        {faculty.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                                   <Image src={faculty.image} alt={faculty.name} width={80} height={80} className="rounded-md border-2 border-accent" data-ai-hint={faculty.dataAiHint} />
                                   <div className='space-y-2 text-center sm:text-left'>
                                       <p className='text-base text-foreground italic text-justify leading-relaxed'>"{faculty.message}"</p>
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

             {/* Corner Cards */}
             <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                    <CardHeader className='bg-primary text-primary-foreground rounded-t-lg p-4'>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <GraduationCap className="w-5 h-5" />
                            শিক্ষার্থীদের কর্নার
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4 pt-6">
                        <Image src="https://picsum.photos/100/100?random=3" alt="শিক্ষার্থীদের কর্নার" width={100} height={100} className="w-20 h-20 object-cover rounded-lg" data-ai-hint="students icon" />
                        <div className="space-y-2">
                        {[
                          {label: 'শ্রেণিভিত্তিক শিক্ষার্থী', href: '#'}, 
                          {label: 'ক্লাস রুটিন', href: '/class-routine'}, 
                          {label: 'ছুটির তালিকা', href: '#'}, 
                          {label: 'নোটিশ', href: '/notices'}
                        ].map(item => (
                             <Link href={item.href} key={item.label} className="flex items-center text-base text-foreground hover:text-primary gap-2">
                                <Check className="w-4 h-4 text-accent" />
                                {item.label}
                            </Link>
                        ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardHeader className='bg-primary text-primary-foreground rounded-t-lg p-4'>
                        <CardTitle className="text-lg flex items-center gap-2">
                           <Users className="w-5 h-5" />
                            শিক্ষকমন্ডলীদের কর্ণার
                        </CardTitle>
                    </CardHeader>
                     <CardContent className="flex items-center gap-4 pt-6">
                         <Image src="https://picsum.photos/100/100?random=4" alt="শিক্ষকমন্ডলীদের কর্ণার" width={100} height={100} className="w-20 h-20 object-cover rounded-lg" data-ai-hint="teachers icon" />
                        <div className="space-y-2">
                        {[
                          {label: 'শিক্ষকমন্ডলী', href: '/teachers'}, 
                          {label: 'স্টাফ', href: '/staff'}, 
                          {label: 'শিক্ষক/কর্মচারী সংখ্যা', href: '#'}, 
                          {label: 'SMS ALERT', href: '#'}
                        ].map(item => (
                             <Link href={item.href} key={item.label} className="flex items-center text-base text-foreground hover:text-primary gap-2">
                                <Check className="w-4 h-4 text-accent" />
                                {item.label}
                            </Link>
                        ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardHeader className='bg-primary text-primary-foreground rounded-t-lg p-4'>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Download className="w-5 h-5" />
                            সকল ডাউনলোড
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4 pt-6">
                        <Image src="https://picsum.photos/100/100?random=5" alt="সকল ডাউনলোড" width={100} height={100} className="w-20 h-20 object-cover rounded-lg" data-ai-hint="download icon" />
                        <div className="space-y-2">
                        {[
                            {label: 'ডাউনলোড', href: '#'},
                            {label: 'পরীক্ষার রুটিন', href: '#'},
                            {label: 'ভর্তি', href: '#'},
                        ].map(item => (
                             <Link href={item.href} key={item.label} className="flex items-center text-base text-foreground hover:text-primary gap-2">
                                <Check className="w-4 h-4 text-accent" />
                                {item.label}
                            </Link>
                        ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardHeader className='bg-primary text-primary-foreground rounded-t-lg p-4'>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <BookOpen className="w-5 h-5" />
                             একাডেমিক তথ্য
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4 pt-6">
                        <Image src="https://picsum.photos/100/100?random=6" alt="একাডেমিক তথ্য" width={100} height={100} className="w-20 h-20 object-cover rounded-lg" data-ai-hint="calendar icon" />
                        <div className="space-y-2">
                        {[
                          {label: 'প্রতিষ্ঠানের ইতিহাস', href: '/history'}, 
                          {label: 'পরীক্ষার ফলাফল', href: '/results'}, 
                          {label: 'নোটিশ', href: '/notices'}, 
                          {label: 'ছুটির দিন', href: '#'},
                          {label: 'একাডেমিক ক্যালেন্ডার', href: '#'}, 
                        ].map(item => (
                             <Link href={item.href} key={item.label} className="flex items-center text-base text-foreground hover:text-primary gap-2">
                                <Check className="w-4 h-4 text-accent" />
                                {item.label}
                            </Link>
                        ))}
                        </div>
                    </CardContent>
                </Card>
             </div>
          </div>

          <aside className="lg:col-span-1 space-y-6">
               <Card className="shadow-lg">
                 <CardContent className="p-2 space-y-2">
                    {importantSiteLinks.map((link) => (
                        <Link
                            href={link.href}
                            key={link.title}
                            className="flex items-center gap-2 p-2.5 text-base font-medium border rounded-md hover:bg-muted transition-colors text-foreground"
                        >
                             <Target className="w-4 h-4 text-primary" />
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
                    {isLoading ? (
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                    ) : notices.length > 0 ? (
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
                     {resourceLinks.map((link, index) => (
                        <Link href="#" key={index} className="flex items-center text-base text-foreground hover:text-primary gap-2 border-b last:border-b-0 py-1.5">
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
                     {officialLinks.map((link, index) => (
                        <Link href="#" key={index} className="flex items-center text-base text-foreground hover:text-primary gap-2 border-b last:border-b-0 py-1.5">
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
  );

}
