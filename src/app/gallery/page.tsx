
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Camera } from 'lucide-react'
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface GalleryImage {
  id: string;
  alt: string;
  imageUrl: string;
  createdAt: Timestamp;
}

async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const imagesCollectionRef = collection(db, 'gallery');
    const q = query(imagesCollectionRef, orderBy('createdAt', 'desc'));
    const data = await getDocs(q);
    
    const firestoreImages = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as GalleryImage));

    if (firestoreImages.length > 0) {
        return firestoreImages;
    }
  } catch (error) {
    console.error("Error fetching gallery images from Firestore:", error);
  }
  
  // Fallback data if firestore fails or is empty
  return Array.from({ length: 6 }).map((_, i) => ({
      id: `fallback-${i}`,
      alt: `Fallback Image ${i + 1}`,
      imageUrl: `https://picsum.photos/600/400?random=${i + 1}`,
      createdAt: Timestamp.now()
  }));
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
                            {galleryImages.map((image) => (
                                <div key={image.id} className="overflow-hidden rounded-lg shadow-md group">
                                    <Image
                                        src={image.imageUrl}
                                        alt={image.alt}
                                        width={600}
                                        height={400}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </main>
  )
}
