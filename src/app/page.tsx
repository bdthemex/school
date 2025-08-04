
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
  BookOpen
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
}

const facultyData = [
  { name: 'প্রধান শিক্ষক', message: 'দীর্ঘদিন পরে কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়ের ওয়েব সাইট সম্প্রতি খোলা হয়েছে। এটা বিদ্যালয়ের জন্য উজ্জ্বল মাইল ফলক।', image: 'https://placehold.co/100x100', dataAiHint: 'teacher portrait' },
  { name: 'সহকারী প্রধান শিক্ষক', message: 'তথ্য প্রযুক্তির যুগে প্রবেশ করতে পেরে আমরা আনন্দিত। এর মাধ্যমে স্কুলের কার্যক্রম আরও গতিশীল হবে।', image: 'https://placehold.co/100x100', dataAiHint: 'teacher portrait' },
];

const resourceLinks = [
    { title: 'প্রধানমন্ত্রীর শিক্ষা সহায়তা ট্রাস্ট'},
    { title: 'উপবৃত্তি তথ্য'},
    { title: 'বৃত্তি তথ্য'},
    { title: 'শিক্ষক বাতায়ন'},
]

const officialLinks = [
    { title: 'ভর্তির আবেদন'},
    { title: 'পরীক্ষার ফলাফল'},
    { title: 'ময়মনসিংহ বোর্ড'},
    { title: 'মাধ্যমিক ও উচ্চ শিক্ষা অধিদপ্তর'},
    { title: 'ব্যানবেইস'},
]

const heroSlides = [
    {
        image: "https://placehold.co/1920x800",
        title: "কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়",
        subtitle: "নেত্রকোণা",
        dataAiHint: "school building"
    },
    {
        image: "https://placehold.co/1920x800",
        title: "ঐতিহ্য ও আধুনিকতার সমন্বয়",
        subtitle: "১৮৩২ সাল থেকে শিক্ষায় अग्रणी",
        dataAiHint: "school campus students"
    },
    {
        image: "https://placehold.co/1920x800",
        title: "জ্ঞানভিত্তিক সমাজ গঠনে আমরা",
        subtitle: "আপনার সন্তানের উজ্জ্বল ভবিষ্যতের জন্য",
        dataAiHint: "classroom students"
    }
]

export default function Home() {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
    )
    const [notices, setNotices] = useState<Notice[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getNotices = async () => {
            setIsLoading(true);
            try {
                const noticesCollectionRef = collection(db, 'notices')
                const q = query(noticesCollectionRef, orderBy('createdAt', 'desc'), limit(5))
                const data = await getDocs(q)
                const filteredData = data.docs.map((doc) => {
                    const docData = doc.data();
                    return {
                      id: doc.id,
                      date: docData.date, 
                      title: docData.title,
                    } as Notice
                  })
                setNotices(filteredData)
            } catch (error) {
                console.error("Error fetching notices:", error)
            } finally {
                setIsLoading(false);
            }
        }
        getNotices()
    }, [])

    const marqueeNotices = notices.map(n => n.title).join(' *** ');

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-1">
        
        <section className="relative h-[60vh] w-full">
            <Carousel
                plugins={[plugin.current]}
                className="w-full h-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.play}
            >
                <CarouselContent className="h-full">
                    {heroSlides.map((slide, index) => (
                        <CarouselItem key={index} className="h-full">
                            <div className="relative h-full flex items-center justify-center text-center bg-gray-900">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="absolute inset-0 z-0 opacity-40"
                                    data-ai-hint={slide.dataAiHint}
                                />
                                <div className="z-10 text-white p-4 space-y-4">
                                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">{slide.title}</h1>
                                    <p className="text-xl md:text-2xl">{slide.subtitle}</p>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>

        {/* Marquee */}
        <div className="bg-primary text-primary-foreground shadow-md">
          <div className="container mx-auto flex h-12 items-center overflow-hidden">
            <span className="text-sm font-bold bg-accent text-accent-foreground px-3 py-1 rounded-md flex-shrink-0 whitespace-nowrap">
              জরুরী ঘোষণা
            </span>
            <div className="ml-4 relative flex-grow h-full flex items-center overflow-hidden">
              {isLoading ? (
                <Skeleton className="h-4 w-full" />
              ) : notices.length > 0 ? (
                <div className="w-full flex items-center">
                   <div className="animate-marquee whitespace-nowrap flex">
                      <span className="mx-4">{marqueeNotices}</span>
                      <span className="mx-4">{marqueeNotices}</span>
                  </div>
                </div>
              ) : (
                <div className="w-full text-center">
                  <span>কোনো নতুন নোটিশ নেই</span>
                </div>
              )}
            </div>
          </div>
        </div>


        <div className="container mx-auto px-4 py-12 grid lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-3 space-y-8">
            {/* About Section */}
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2 text-primary">
                        <HomeIcon className="w-6 h-6" />
                        আমাদের সম্পর্কে
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-5 gap-6">
                    <div className='md:col-span-2'>
                         <Image src="https://placehold.co/400x300" alt="প্রতিষ্ঠানের ইতিহাস" width={400} height={300} className="w-full h-auto object-cover rounded-lg" data-ai-hint="historic building" />
                    </div>
                    <div className="md:col-span-3 space-y-3">
                      <p className="text-muted-foreground leading-relaxed">
                      কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়টি ১৮৩২ সালে প্রতিষ্ঠিত হয় এবং ১৯৯১ সালে জাতীয়করণ করা হয়। বর্তমানে এখানে ৬ষ্ঠ থেকে ১০ম শ্রেণি পর্যন্ত পাঠদান করা হয়। विद्यालयটিতে বর্তমানে ৭১৭ জন ছাত্র-ছাত্রী অধ্যয়নরত এবং ১২ জন শিক্ষক কর্মরত আছেন। আমাদের লক্ষ্য মানসম্মত শিক্ষা প্রদান করে শিক্ষার্থীদের ভবিষ্যৎ উজ্জ্বল করা।
                      </p>
                       <Button asChild variant="outline" size="sm" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                            <Link href="/about">
                                বিস্তারিত পড়ুন <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                       </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Teachers */}
             <div className="grid md:grid-cols-2 gap-8">
                 {facultyData.map((faculty, index) => (
                    <Card key={index} className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2 text-primary">
                                <Users className="w-5 h-5" />
                                {index === 0 ? 'প্রধান শিক্ষকের বাণী' : 'সহকারী প্রধান শিক্ষকের বাণী' }
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col sm:flex-row items-center gap-4">
                           <Image src={faculty.image} alt={faculty.name} width={100} height={100} className="rounded-full border-4 border-accent" data-ai-hint={faculty.dataAiHint} />
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
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
                            <GraduationCap className="w-5 h-5" />
                            শিক্ষার্থীদের কর্নার
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {[
                          {label: 'ক্লাস রুটিন', href: '/class-routine'}, 
                          {label: 'সিলেবাস', href: '#'}, 
                          {label: 'ভর্তি তথ্য', href: '#'}, 
                          {label: 'ফলাফল', href: '/results'}
                        ].map(item => (
                             <Link href={item.href} key={item.label} className="flex items-center text-sm text-gray-700 hover:text-primary gap-2">
                                <ChevronRight className="w-4 h-4 text-blue-600" />
                                {item.label}
                            </Link>
                        ))}
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-green-100 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2 text-green-800">
                           <BookOpen className="w-5 h-5" />
                            একাডেমিক তথ্য
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {[
                          {label: 'নোটিশ', href: '/notices'}, 
                          {label: 'ছুটির তালিকা', href: '#'}, 
                          {label: 'একাডেমিক ক্যালেন্ডার', href: '#'}, 
                          {label: 'সহশিক্ষা কার্যক্রম', href: '#'}
                        ].map(item => (
                             <Link href={item.href} key={item.label} className="flex items-center text-sm text-gray-700 hover:text-primary gap-2">
                                <ChevronRight className="w-4 h-4 text-green-600" />
                                {item.label}
                            </Link>
                        ))}
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2 text-yellow-800">
                            <Info className="w-5 h-5" />
                             অন্যান্য তথ্য
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {[
                          {label: 'শিক্ষক পরিচিতি', href: '/teachers'}, 
                          {label: 'গ্যালারি', href: '/gallery'}, 
                          {label: 'ব্লগ', href: '#'}, 
                          {label: 'যোগাযোগ', href: '/contact'}
                        ].map(item => (
                             <Link href={item.href} key={item.label} className="flex items-center text-sm text-gray-700 hover:text-primary gap-2">
                                <ChevronRight className="w-4 h-4 text-yellow-600" />
                                {item.label}
                            </Link>
                        ))}
                    </CardContent>
                </Card>
             </div>


          </div>

          <aside className="lg:col-span-1 space-y-6">
              <Card className="shadow-lg">
                <CardHeader className='bg-primary text-primary-foreground rounded-t-lg'>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Megaphone className="w-5 h-5" />
                        নোটিশ বোর্ড
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                    {isLoading ? (
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                    ) : notices.length > 0 ? (
                      notices.map((notice) => (
                        <Link href="/notices" key={notice.id} className="block p-2 rounded-md hover:bg-muted transition-colors">
                            <p className="text-sm font-medium text-foreground hover:text-primary">{notice.title}</p>
                            <p className="text-xs text-muted-foreground">{notice.date}</p>
                        </Link>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">কোনো নোটিশ নেই।</p>
                    )}
                    <Button asChild variant="outline" size="sm" className='w-full border-primary text-primary hover:bg-primary hover:text-white'>
                      <Link href="/notices">সকল নোটিশ</Link>
                    </Button>
                </CardContent>
              </Card>

               <Card className="shadow-lg">
                <CardHeader className='bg-primary text-primary-foreground rounded-t-lg'>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <LinkIcon className="w-5 h-5" />
                        গুরুত্বপূর্ণ লিংক
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                     {resourceLinks.map((link, index) => (
                        <Link href="#" key={index} className="flex items-center text-sm text-muted-foreground hover:text-primary gap-2">
                            <ChevronRight className="w-4 h-4 text-primary" />
                            {link.title}
                        </Link>
                    ))}
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className='bg-primary text-primary-foreground rounded-t-lg'>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <LinkIcon className="w-5 h-5" />
                        অফিসিয়াল লিংক
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                     {officialLinks.map((link, index) => (
                        <Link href="#" key={index} className="flex items-center text-sm text-muted-foreground hover:text-primary gap-2">
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
