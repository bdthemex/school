
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Camera } from 'lucide-react'
import { sanityClient, urlFor } from '@/lib/sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface GalleryImage {
  _id: string;
  alt: string;
  image: SanityImageSource;
}

const fallbackImages: Omit<GalleryImage, '_id' | 'image'>[] = [
  { alt: 'Annual Sports Day' },
  { alt: 'Science Fair' },
  { alt: 'Cultural Program' },
  { alt: 'Victory Day Celebration' },
  { alt: 'Tree Plantation Program' },
  { alt: 'School Campus' },
]

async function getGalleryImages(): Promise<GalleryImage[]> {
  const query = `*[_type == "galleryImage" && !(_id in path("drafts.**"))] | order(_createdAt desc)`;
  try {
    const images = await sanityClient.fetch(query);
    if (images && images.length > 0) {
      return images;
    }
    // Create fallback with placeholder URLs if Sanity is empty
    return fallbackImages.map((img, index) => ({
      ...img,
      _id: `fallback-${index}`,
      image: `https://picsum.photos/600/400?random=${index + 1}`
    }));
  } catch (error) {
    console.error("Error fetching gallery images from Sanity:", error);
    return fallbackImages.map((img, index) => ({
      ...img,
      _id: `fallback-${index}`,
      image: `https://picsum.photos/600/400?random=${index + 1}`
    }));
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {galleryImages.map((image, index) => {
                                const imageUrl = image.image 
                                  ? typeof image.image === 'string' 
                                    ? image.image 
                                    : urlFor(image.image).width(600).height(400).url()
                                  : `https://picsum.photos/600/400?random=${index + 1}`;

                                return (
                                <div key={image._id || index} className="overflow-hidden rounded-lg shadow-md group">
                                    <Image
                                        src={imageUrl}
                                        alt={image.alt}
                                        width={600}
                                        height={400}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </main>
  )
}
