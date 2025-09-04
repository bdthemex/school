
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Camera } from 'lucide-react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ফটো গ্যালারি',
  description: 'আমাদের বিদ্যালয়ের বিভিন্ন অনুষ্ঠানের ছবির সংগ্রহ।',
};

interface GalleryImage {
  _id: string;
  alt: string;
  image: string;
}

function getGalleryImages(): GalleryImage[] {
  return [
    { _id: "g1", alt: "বার্ষিক ক্রীড়া প্রতিযোগিতা", image: "https://picsum.photos/600/400?random=1" },
    { _id: "g2", alt: "বিজ্ঞান মেলা", image: "https://picsum.photos/600/400?random=2" },
    { _id: "g3", alt: "সাংস্কৃতিক অনুষ্ঠান", image: "https://picsum.photos/600/400?random=3" },
    { _id: "g4", alt: "পুরস্কার বিতরণী", image: "https://picsum.photos/600/400?random=4" },
    { _id: "g5", alt: "শ্রেণিকক্ষের পাঠদান", image: "https://picsum.photos/600/400?random=5" },
    { _id: "g6", alt: "школьный двор", image: "https://picsum.photos/600/400?random=6" },
  ];
}

export default function GalleryPage() {
    const galleryImages = getGalleryImages();

  return (
    <main className="flex-1">
        <div>
            <div className="container mx-auto px-4 py-12">
                <Card className="shadow-lg">
                    <CardHeader className="text-center bg-primary text-primary-foreground">
                        <CardTitle className="text-3xl flex items-center justify-center gap-3">
                            <Camera className="w-8 h-8" />
                            ফটো গ্যালারি
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                       {galleryImages.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {galleryImages.map((image) => (
                                <div key={image._id} className="overflow-hidden rounded-lg shadow-md group">
                                    <Image
                                        src={image.image}
                                        alt={image.alt}
                                        width={600}
                                        height={400}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                        ) : (
                             <p className="text-center text-muted-foreground">কোনো ছবি পাওয়া যায়নি।</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    </main>
  )
}
