
'use client'

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  BookOpen,
  Users,
  Megaphone,
  FileText,
  Link as LinkIcon,
  Image as ImageIcon,
  GraduationCap,
  Award,
  Calendar,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Download,
  CheckCircle,
  Home as HomeIcon,
  Info
} from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import React from 'react';

const noticeData = [
  {
    date: '২০২৪-০৭-২২',
    title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা',
  },
  {
    date: '২০২৪-০৭-২০',
    title: 'ছুটির নোটিশ',
  },
  {
    date: '২০২৪-০৭-১৮',
    title: 'ফলাফল প্রকাশ',
  },
  {
    date: '২০২৪-০৭-১৫',
    title: 'নতুন ভর্তি সংক্রান্ত বিজ্ঞপ্তি',
  },
];

const facultyData = [
  { name: 'প্রধান শিক্ষক', subject: 'ব্যবস্থাপনা', image: 'https://placehold.co/100x100', dataAiHint: 'teacher portrait' },
  { name: 'সহকারী প্রধান শিক্ষক', subject: 'ইংরেজি', image: 'https://placehold.co/100x100', dataAiHint: 'teacher portrait' },
];

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

const heroSlides = [
    {
        image: "https://placehold.co/1920x800",
        title: "প্রশাসনিক ভবন",
        dataAiHint: "school building"
    },
    {
        image: "https://placehold.co/1920x800",
        title: "লাইব্রেরি",
        dataAiHint: "school library"
    },
    {
        image: "https://placehold.co/1920x800",
        title: "খেলার মাঠ",
        dataAiHint: "school playground"
    }
]

export default function Home() {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
    )
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        
        <section className="relative h-[50vh] w-full">
            <Carousel
                plugins={[plugin.current]}
                className="w-full h-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.play}
            >
                <CarouselContent className="h-full">
                    {heroSlides.map((slide, index) => (
                        <CarouselItem key={index} className="h-full">
                            <div className="relative h-full flex items-center justify-center text-center bg-gray-400">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="absolute -z-10 opacity-40"
                                    data-ai-hint={slide.dataAiHint}
                                />
                                <div className="bg-black/30 p-4 rounded-lg">
                                    <h1 className="text-3xl md:text-5xl font-bold text-white">{slide.title}</h1>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>

        {/* Marquee */}
        <div className="bg-white shadow-md overflow-hidden">
            <div className="container mx-auto px-4 flex items-center py-2">
                <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-md flex-shrink-0">জরুরী ঘোষণা</span>
                <div className="ml-4 overflow-hidden flex-grow">
                    <p className="text-sm text-foreground whitespace-nowrap animate-marquee">মাধ্যমিক বিদ্যালয়ে-২০২৫ শিক্ষাবর্ষে ভর্তি বিজ্ঞপ্তি ও নিয়মাবলী সংক্রান্ত।</p>
                </div>
            </div>
        </div>


        <div className="container mx-auto px-4 py-8 grid lg:grid-cols-4 gap-6">
          
          <div className="lg:col-span-3 space-y-8">
            {/* About Section */}
            <Card>
                <CardHeader className='bg-primary text-primary-foreground rounded-t-lg'>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <HomeIcon className="w-5 h-5" />
                        প্রতিষ্ঠানের ইতিহাস
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 grid md:grid-cols-3 gap-6">
                    <div className='md:col-span-1'>
                         <Image src="https://placehold.co/400x300" alt="প্রতিষ্ঠানের ইতিহাস" width={400} height={300} className="w-full h-auto object-cover rounded-md" data-ai-hint="historic building" />
                    </div>
                    <div className="md:col-span-2 space-y-3">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                      কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়টি ১৮৩২ খ্রি: সালে প্রতিষ্ঠিত। বিগত ১৯/০৩/১৯৯১খ্রি: সনে প্রতিষ্ঠানটি জাতীয় করণ করা হয়। বিদ্যালয়ে ৬ষ্ঠ থেকে ১০ম শ্রেণি পর্যন্ত পাঠদান চালু আছে। বিদ্যালয়টিতে বর্তমানে ৭১৭ জন ছাত্র-ছাত্রী অধ্যয়নরত এবং একুশজন শিক্ষকের স্থলে ১২ জন শিক্ষক, শিক্ষিকা কর্মরত আছেন। বিদ্যালয়ের তিন তলা ভবনটি একটি দু’তলা ভবন একটি, হাফ বিল্ডিং তিনটি, খেলার মাঠ একটি ও বিদ্যালয় প্রাঙ্গনে দুইটি শহীদ মিনার রয়েছে।
                      </p>
                       <Button variant="link" className="p-0 h-auto text-red-500">বিস্তারিত</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Teachers */}
             <div className="grid md:grid-cols-2 gap-6">
                 {facultyData.map((faculty, index) => (
                    <Card key={index}>
                        <CardHeader className='bg-primary text-primary-foreground rounded-t-lg'>
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                {index === 0 ? 'প্রধান শিক্ষকের বাণী' : 'সহকারী প্রধান শিক্ষকের বাণী' }
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 flex gap-4">
                           <Image src={faculty.image} alt={faculty.name} width={100} height={100} className="rounded-md border-2 border-accent" data-ai-hint={faculty.dataAiHint} />
                           <div className='space-y-2'>
                               <p className='text-sm text-muted-foreground'>দীর্ঘদিন পরে কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়ের ওয়েব সাইট সম্প্রতি খোলা হয়েছে। এটা বিদ্যালয়ের জন্য উজ্জ্বল মাইল ফলক।</p>
                               <Button variant="link" className="p-0 h-auto text-red-500">বিস্তারিত</Button>
                           </div>
                        </CardContent>
                    </Card>
                 ))}
             </div>

             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-[#fde8e8]">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2 text-[#d94645]">
                            <Users className="w-5 h-5" />
                            শিক্ষার্থীদের কর্ণার
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {['শ্রেণিভিত্তিক শিক্ষার্থী', 'ক্লাশ রুটিন', 'ছুটির তালিকা', 'নোটিশ'].map(item => (
                             <Link href="#" key={item} className="flex items-center text-sm text-gray-700 hover:text-primary gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                {item}
                            </Link>
                        ))}
                    </CardContent>
                </Card>
                <Card className="bg-[#e8fdef]">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2 text-[#34a853]">
                            <Users className="w-5 h-5" />
                            শিক্ষকমন্ডলীদের কর্ণার
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {['শিক্ষকমন্ডলী', 'স্টাফ', 'শিক্ষক/কর্মচারী সংখ্যা', 'SMS ALERT'].map(item => (
                             <Link href="#" key={item} className="flex items-center text-sm text-gray-700 hover:text-primary gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                {item}
                            </Link>
                        ))}
                    </CardContent>
                </Card>
                <Card className="bg-[#fef8e4]">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2 text-[#e37400]">
                            <Info className="w-5 h-5" />
                             একাডেমিক তথ্য
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {['প্রতিষ্ঠানের ইতিহাস', 'পরীক্ষার ফলাফল', 'নোটিশ', 'ছুটির দিন', 'একাডেমিক ক্যালেন্ডার'].map(item => (
                             <Link href="#" key={item} className="flex items-center text-sm text-gray-700 hover:text-primary gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                {item}
                            </Link>
                        ))}
                    </CardContent>
                </Card>
             </div>


          </div>

          <aside className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader className='bg-primary text-primary-foreground rounded-t-lg'>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Megaphone className="w-5 h-5" />
                        নোটিশ বোর্ড
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                    {noticeData.map((notice, index) => (
                        <Link href="#" key={index} className="flex items-center text-sm text-muted-foreground hover:text-primary gap-2">
                            <ChevronRight className="w-4 h-4 text-red-500" />
                            {notice.title}
                        </Link>
                    ))}
                    <Button variant="outline" size="sm" className='w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white'>সকল নোটিশ</Button>
                </CardContent>
              </Card>

               <Card>
                <CardHeader className='bg-primary text-primary-foreground rounded-t-lg'>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <LinkIcon className="w-5 h-5" />
                        গুরুত্বপূর্ণ লিংক
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                     {resourceLinks.map((link, index) => (
                        <Link href="#" key={index} className="flex items-center text-sm text-muted-foreground hover:text-primary gap-2">
                            <ChevronRight className="w-4 h-4 text-red-500" />
                            {link.title}
                        </Link>
                    ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='bg-primary text-primary-foreground rounded-t-lg'>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <LinkIcon className="w-5 h-5" />
                        অফিসিয়াল লিংক
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                     {officialLinks.map((link, index) => (
                        <Link href="#" key={index} className="flex items-center text-sm text-muted-foreground hover:text-primary gap-2">
                            <ChevronRight className="w-4 h-4 text-red-500" />
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
