
'use client'

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Users,
  Megaphone,
  Link as LinkIcon,
  GraduationCap,
  Calendar,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  HomeIcon,
  Info,
  BookOpen,
  Check,
  Download,
  X,
  Target
} from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
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

const facultyData = [
  { name: 'প্রধান শিক্ষক', message: 'দীর্ঘদিন পরে কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়ের ওয়েব সাইট সম্প্রতি খোলা হয়েছে। এটা বিদ্যালয়ের জন্য উজ্জ্বল মাইল ফলক।', image: 'https://placehold.co/100x100', dataAiHint: 'teacher portrait' },
  { name: 'সহকারী প্রধান শিক্ষক', message: 'তথ্য প্রযুক্তির যুগে প্রবেশ করতে পেরে আমরা আনন্দিত। এর মাধ্যমে স্কুলের কার্যক্রম আরও গতিশীল হবে।', image: 'https://placehold.co/100x100', dataAiHint: 'teacher portrait' },
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
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
    )
    const [notices, setNotices] = useState<Notice[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [showMarquee, setShowMarquee] = useState(true);
    const marqueeText = "সরকারি ও বেসরকারি মাধ্যমিক বিদ্যালয়ে-২০২৫ শিক্ষাবর্ষে ভর্তি বিজ্ঞপ্তি ও নিয়মাবলী সংক্রান্ত। আমাদের ওয়েবসাইটে আপনাকে স্বাগত…(সাইট ডেভেলপমেন্টের কাজ চলছে) *** "


    const getNotices = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const noticesCollectionRef = collection(db, 'notices');
            const q = query(noticesCollectionRef, orderBy('createdAt', 'desc'), limit(5));
            const data = await getDocs(q);
            const filteredData: Notice[] = data.docs.map((doc) => {
                const docData = doc.data();
                return {
                    id: doc.id,
                    date: docData.date,
                    title: docData.title,
                } as Notice;
            });
            setNotices(filteredData);
        } catch (error) {
            console.error("Error fetching notices:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getNotices();
    }, [getNotices]);

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Header />
      <main className="flex-1">
        
        <section className="relative w-full shadow-md">
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                >
                <CarouselContent>
                    <CarouselItem>
                        <Image
                            src="https://placehold.co/1920x400"
                            alt="School building"
                            width={1920}
                            height={400}
                            className="w-full h-auto max-h-[400px] object-cover"
                            data-ai-hint="school building"
                        />
                         <div className='absolute bottom-4 left-4 bg-primary/80 text-white py-2 px-4 rounded-md'>
                            <p className='font-bold text-lg'>প্রশাসনিক ভবন</p>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                         <Image
                            src="https://placehold.co/1920x400"
                            alt="School campus"
                            width={1920}
                            height={400}
                            className="w-full h-auto max-h-[400px] object-cover"
                            data-ai-hint="school campus"
                        />
                         <div className='absolute bottom-4 left-4 bg-primary/80 text-white py-2 px-4 rounded-md'>
                            <p className='font-bold text-lg'>স্কুল ক্যাম্পাস</p>
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </section>

        {/* Marquee */}
       {showMarquee && (
        <div className="bg-blue-600 text-white shadow-md my-4">
          <div className="container mx-auto flex h-12 items-center overflow-hidden">
            <span className="text-sm font-bold bg-blue-800 text-white px-3 py-1.5 rounded-md flex-shrink-0 whitespace-nowrap">
              জরুরী ঘোষণা
            </span>
            <div className="ml-4 relative flex-grow h-full flex items-center overflow-hidden">
                <div className="w-full flex items-center">
                   <div className="animate-marquee whitespace-nowrap flex">
                      <span className="mx-4">{marqueeText}</span>
                      <span className="mx-4">{marqueeText}</span>
                  </div>
                </div>
            </div>
            <button onClick={() => setShowMarquee(false)} className='text-white hover:bg-blue-700 p-1 rounded-full'>
                <X className='w-4 h-4' />
            </button>
          </div>
        </div>
        )}


        <div className="container mx-auto px-4 py-8 grid lg:grid-cols-4 gap-6">
          
          <div className="lg:col-span-3 space-y-6">
            {/* About Section */}
            <Card className="shadow-lg">
                <CardHeader className='bg-blue-600 text-white rounded-t-lg'>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <HomeIcon className="w-5 h-5" />
                        প্রতিষ্ঠানের ইতিহাস
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-5 gap-6 pt-6">
                    <div className='md:col-span-2'>
                         <Image src="https://placehold.co/400x300" alt="প্রতিষ্ঠানের ইতিহাস" width={400} height={300} className="w-full h-auto object-cover rounded-lg shadow-md" data-ai-hint="historic building" />
                    </div>
                    <div className="md:col-span-3 space-y-3">
                      <p className="text-muted-foreground leading-relaxed">
                      কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়টি ১৮৩২ খ্রি: সালে প্রতিষ্ঠিত। বিগত ১৯/০৩/১৯৯১খ্রি: সনে প্রতিষ্ঠানটি জাতীয় করণ করা হয়। বিদ্যালয়ে ৬ষ্ঠ থেকে ১০ম শ্রেণি পর্যন্ত পাঠদান চালু আছে। বিদ্যালয়টিতে বর্তমানে ৭১৭ জন ছাত্র-ছাত্রী অধ্যয়নরত এবং একুশজন শিক্ষকের স্থলে ১২ জন শিক্ষক, শিক্ষিকা কর্মরত আছেন। বিদ্যালয়ের তিন তলা ভবনটি একটি দু'তলা ভবন একটি, হাফ বিল্ডিং তিনটি, খেলার মাঠ একটি ও বিদ্যালয় প্রাঙ্গনে দুইটি শহীদ মিনার রয়েছে।
                      </p>
                       <Button asChild variant="link" size="sm" className="p-0 h-auto">
                            <Link href="/about">
                                বিস্তারিত পড়ুন <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                       </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Teachers */}
             <div className="grid md:grid-cols-2 gap-6">
                 {facultyData.map((faculty, index) => (
                    <Card key={index} className="shadow-lg">
                        <CardHeader className='bg-blue-600 text-white rounded-t-lg'>
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                {index === 0 ? 'প্রধান শিক্ষকের বাণী' : 'সহকারী প্রধান শিক্ষকের বাণী' }
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                           <Image src={faculty.image} alt={faculty.name} width={80} height={80} className="rounded-md border-2 border-accent" data-ai-hint={faculty.dataAiHint} />
                           <div className='space-y-2 text-center sm:text-left'>
                               <p className='text-sm text-muted-foreground italic'>"{faculty.message}"</p>
                               <Button asChild variant="link" className="p-0 h-auto text-primary hover:underline">
                                 <Link href={index === 0 ? "/principals-message" : "/vice-principals-message"}>বিস্তারিত</Link>
                               </Button>
                           </div>
                        </CardContent>
                    </Card>
                 ))}
             </div>

             {/* Corner Cards */}
             <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                    <CardHeader className='bg-red-600 text-white rounded-t-lg border-b-4 border-red-800'>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <GraduationCap className="w-5 h-5" />
                            শিক্ষার্থীদের কর্নার
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4 pt-6">
                        <Image src="https://placehold.co/100x100" alt="শিক্ষার্থীদের কর্নার" width={100} height={100} className="w-20 h-20 object-cover rounded-lg" data-ai-hint="students icon" />
                        <div className="space-y-2">
                        {[
                          {label: 'শ্রেণিভিত্তিক শিক্ষার্থী', href: '#'}, 
                          {label: 'ক্লাস রুটিন', href: '/class-routine'}, 
                          {label: 'ছুটির তালিকা', href: '#'}, 
                          {label: 'নোটিশ', href: '/notices'}
                        ].map(item => (
                             <Link href={item.href} key={item.label} className="flex items-center text-sm text-gray-700 hover:text-primary gap-2">
                                <Check className="w-4 h-4 text-red-500" />
                                {item.label}
                            </Link>
                        ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardHeader className='bg-green-600 text-white rounded-t-lg border-b-4 border-green-800'>
                        <CardTitle className="text-lg flex items-center gap-2">
                           <Users className="w-5 h-5" />
                            শিক্ষকমন্ডলীদের কর্ণার
                        </CardTitle>
                    </CardHeader>
                     <CardContent className="flex items-center gap-4 pt-6">
                         <Image src="https://placehold.co/100x100" alt="শিক্ষকমন্ডলীদের কর্ণার" width={100} height={100} className="w-20 h-20 object-cover rounded-lg" data-ai-hint="teachers icon" />
                        <div className="space-y-2">
                        {[
                          {label: 'শিক্ষকমন্ডলী', href: '/teachers'}, 
                          {label: 'স্টাফ', href: '/staff'}, 
                          {label: 'শিক্ষক/কর্মচারী সংখ্যা', href: '#'}, 
                          {label: 'SMS ALERT', href: '#'}
                        ].map(item => (
                             <Link href={item.href} key={item.label} className="flex items-center text-sm text-gray-700 hover:text-primary gap-2">
                                <Check className="w-4 h-4 text-green-500" />
                                {item.label}
                            </Link>
                        ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardHeader className='bg-orange-500 text-white rounded-t-lg border-b-4 border-orange-700'>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Download className="w-5 h-5" />
                            সকল ডাউনলোড
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4 pt-6">
                        <Image src="https://placehold.co/100x100" alt="সকল ডাউনলোড" width={100} height={100} className="w-20 h-20 object-cover rounded-lg" data-ai-hint="download icon" />
                        <div className="space-y-2">
                        {[
                            {label: 'ডাউনলোড', href: '#'},
                            {label: 'পরীক্ষার রুটিন', href: '#'},
                            {label: 'ভর্তি', href: '#'},
                        ].map(item => (
                             <Link href={item.href} key={item.label} className="flex items-center text-sm text-gray-700 hover:text-primary gap-2">
                                <Check className="w-4 h-4 text-orange-500" />
                                {item.label}
                            </Link>
                        ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardHeader className='bg-purple-600 text-white rounded-t-lg border-b-4 border-purple-800'>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <BookOpen className="w-5 h-5" />
                             একাডেমিক তথ্য
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4 pt-6">
                        <Image src="https://placehold.co/100x100" alt="একাডেমিক তথ্য" width={100} height={100} className="w-20 h-20 object-cover rounded-lg" data-ai-hint="calendar icon" />
                        <div className="space-y-2">
                        {[
                          {label: 'প্রতিষ্ঠানের ইতিহাস', href: '/history'}, 
                          {label: 'পরীক্ষার ফলাফল', href: '/results'}, 
                          {label: 'নোটিশ', href: '/notices'}, 
                          {label: 'ছুটির দিন', href: '#'},
                          {label: 'একাডেমিক ক্যালেন্ডার', href: '#'}, 
                        ].map(item => (
                             <Link href={item.href} key={item.label} className="flex items-center text-sm text-gray-700 hover:text-primary gap-2">
                                <Check className="w-4 h-4 text-purple-500" />
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
                            className="flex items-center gap-2 p-2.5 text-sm font-medium border rounded-md hover:bg-muted transition-colors"
                        >
                             <Target className="w-4 h-4 text-blue-600" />
                             {link.title}
                        </Link>
                    ))}
                 </CardContent>
               </Card>
              <Card className="shadow-lg">
                <CardHeader className='bg-blue-600 text-white rounded-t-lg'>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Megaphone className="w-5 h-5" />
                        নোটিশ বোর্ড
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3 bg-gray-100">
                    {isLoading ? (
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                    ) : notices.length > 0 ? (
                      notices.map((notice) => (
                        <Link href="/notices" key={notice.id} className="block text-sm text-gray-700 hover:text-primary gap-2">
                           <div className="flex items-start gap-2">
                             <Target className="w-4 h-4 mt-1 flex-shrink-0 text-gray-500" />
                             <p>{notice.title}</p>
                           </div>
                        </Link>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">কোনো নোটিশ নেই।</p>
                    )}
                </CardContent>
              </Card>

               <Card className="shadow-lg">
                <CardHeader className='bg-blue-600 text-white rounded-t-lg'>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <LinkIcon className="w-5 h-5" />
                        গুরুত্বপূর্ণ লিংক
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                     {resourceLinks.map((link, index) => (
                        <Link href="#" key={index} className="flex items-center text-sm text-muted-foreground hover:text-primary gap-2 border-b last:border-b-0 py-1.5">
                            <ChevronRight className="w-4 h-4 text-primary" />
                            {link.title}
                        </Link>
                    ))}
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className='bg-blue-600 text-white rounded-t-lg'>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <LinkIcon className="w-5 h-5" />
                        অফিসিয়াল লিংক
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                     {officialLinks.map((link, index) => (
                        <Link href="#" key={index} className="flex items-center text-sm text-muted-foreground hover:text-primary gap-2 border-b last:border-b-0 py-1.5">
                            <ChevronRight className="w-4 h-4 text-primary" />
                            {link.title}
                        </Link>
                    ))}
                </CardContent>
              </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

    