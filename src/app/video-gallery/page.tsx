
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Video } from 'lucide-react'

const videos = [
  { title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৩', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { title: 'সাংস্কৃতিক অনুষ্ঠান', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { title: 'বিজ্ঞান মেলা', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { title: 'বিজয় দিবস উদযাপন', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
]

export default function VideoGalleryPage() {
  return (
    <main className="flex-1">
      <div>
        <div className="container mx-auto px-4 py-12">
          <Card className="shadow-lg">
            <CardHeader className="text-center bg-primary text-primary-foreground">
              <CardTitle className="text-3xl flex items-center justify-center gap-3">
                <Video className="w-8 h-8" />
                ভিডিও গ্যালারি
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {videos.map((video, index) => (
                  <div key={index}>
                    <div className="aspect-video overflow-hidden rounded-lg shadow-md">
                      <iframe
                        src={video.src}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                    <h3 className="text-lg font-semibold text-primary mt-4 text-center">{video.title}</h3>
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
