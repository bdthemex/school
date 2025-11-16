'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { Users } from 'lucide-react';

interface FacultyMessage {
    _id: string;
    name: string;
    quote: string;
    image: string;
    link: string;
    title: string;
}

interface FacultyCarouselProps {
    faculty: FacultyMessage[];
}

export default function FacultyCarousel({ faculty }: FacultyCarouselProps) {
    const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true }));

    if (!faculty || faculty.length === 0) {
        return null;
    }

    return (
        <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[plugin.current]}
            className="w-full"
        >
            <CarouselContent className="-ml-2 md:-ml-4">
                 {faculty.map((item, index) => (
                    <CarouselItem key={item._id || index} className="pl-2 md:pl-4 md:basis-1/2">
                        <Card className="shadow-lg h-full">
                            <CardHeader className='bg-primary text-primary-foreground rounded-t-lg p-4'>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Users className="w-5 h-5" />
                                    {item.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                               <Image 
                                src={item.image} 
                                alt={item.name} 
                                width={80} 
                                height={80} 
                                className="rounded-md border-2 border-accent"
                                data-ai-hint="teacher portrait"
                               />
                               <div className='space-y-2 text-center sm:text-left'>
                                   <p className='text-base text-foreground italic text-justify leading-relaxed'>"{item.quote}"</p>
                                   <Button asChild variant="link" className="p-0 h-auto text-primary hover:underline">
                                     <Link href={item.link}>বিস্তারিত</Link>
                                   </Button>
                               </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                 ))}
            </CarouselContent>
        </Carousel>
    );
}
