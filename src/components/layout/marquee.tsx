'use client'

import { useState } from 'react';
import { X } from 'lucide-react';

interface MarqueeProps {
    text: string;
}

export default function Marquee({ text }: MarqueeProps) {
    const [showMarquee, setShowMarquee] = useState(true);

    if (!showMarquee || !text) {
        return null;
    }

    return (
        <div className="my-4">
            <div className="bg-muted flex h-12 items-center overflow-hidden shadow-sm">
                <div className="relative bg-primary text-primary-foreground px-4 py-3 flex items-center">
                    <span className="text-base font-bold whitespace-nowrap">জরুরী ঘোষণা</span>
                    <div className="absolute right-[-24px] top-0 h-full w-6 bg-primary" style={{ clipPath: 'polygon(100% 50%, 0 0, 0 100%)' }}></div>
                </div>
                <div className="ml-4 relative flex-grow h-full flex items-center overflow-hidden">
                    <div className="w-full flex items-center">
                    <div className="animate-marquee whitespace-nowrap flex text-foreground text-base">
                        <span className="mx-4">{text}</span>
                        <span className="mx-4">{text}</span>
                    </div>
                    </div>
                </div>
                <button onClick={() => setShowMarquee(false)} className='bg-primary text-primary-foreground hover:bg-primary/90 p-3 h-full flex items-center'>
                    <X className='w-4 h-4' />
                </button>
            </div>
        </div>
    );
}
