
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { Camera } from 'lucide-react'

const galleryImages = [
  { src: 'https://placehold.co/600x400', alt: 'Annual Sports Day', dataAiHint: 'school sports students' },
  { src: 'https://placehold.co/600x400', alt: 'Science Fair', dataAiHint: 'science fair students' },
  { src: 'https://placehold.co/600x400', alt: 'Cultural Program', dataAiHint: 'cultural event stage' },
  { src: 'https://placehold.co/600x400', alt: 'Victory Day Celebration', dataAiHint: 'celebration event crowd' },
  { src: 'https://placehold.co/600x400', alt: 'Tree Plantation Program', dataAiHint: 'tree plantation students' },
  { src: 'https://placehold.co/600x400', alt: 'School Campus', dataAiHint: 'school campus' },
]

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-1">
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
                        {galleryImages.map((image, index) => (
                        <div key={index} className="overflow-hidden rounded-lg shadow-md group">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={600}
                                height={400}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                data-ai-hint={image.dataAiHint}
                            />
                        </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
