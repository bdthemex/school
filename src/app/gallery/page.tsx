
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Camera } from 'lucide-react'
import { sanityClient, urlFor } from '@/lib/sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ফটো গ্যালারি',
  description: 'আমাদের বিদ্যালয়ের বিভিন্ন অনুষ্ঠানের ছবির সংগ্রহ।',
};

interface GalleryImage {
  _id: string;
  alt: string;
  image: SanityImageSource;
}

async function getGalleryImages(): Promise<GalleryImage[]> {
  const query = `*[_type == "galleryImage" && !(_id in path("drafts.**"))] | order(_createdAt desc)`;
  try {
    const images = await sanityClient.fetch(query);
    return images || [];
  } catch (error) {
    console.error("Error fetching gallery images from Sanity:", error);
    return [];
  }
}

export default async function GalleryPage() {
    const galleryImages = await getGalleryImages();

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
                                        src={urlFor(image.image).width(600).height(400).url()}
                                        alt={image.alt}
                                        width={600}
                                        height={400}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                        ) : (
                             <p className="text-center text-muted-foreground">কোনো ছবি পাওয়া যায়নি। অনুগ্রহ করে Sanity Studio-তে ছবি যোগ করুন।</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    </main>
  )
}
