'use client'

import React, { useRef, Suspense } from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"

interface Slide {
    _key: string;
    image: string;
    caption: string;
    alt: string;
}

interface HeroCarouselProps {
    slides: Slide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
    const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }));

    return (
        <Suspense fallback={<div className="w-full h-[400px] bg-muted animate-pulse" />}>
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                >
                <CarouselContent>
                    {slides && slides.length > 0 ? slides.map(slide => (
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
    )
}
