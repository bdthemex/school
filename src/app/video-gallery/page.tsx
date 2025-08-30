
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Video } from 'lucide-react'
import { sanityClient } from '@/lib/sanity'

interface VideoItem {
  _id: string;
  title: string;
  youtubeUrl: string;
}

const fallbackVideos: Omit<VideoItem, '_id'>[] = [
  { title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৩', youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { title: 'সাংস্কৃতিক অনুষ্ঠান', youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { title: 'বিজ্ঞান মেলা', youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { title: 'বিজয় দিবস উদযাপন', youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
]

async function getVideos(): Promise<VideoItem[]> {
  const query = `*[_type == "videoItem" && !(_id in path("drafts.**"))] | order(_createdAt desc)`;
  try {
    const videos = await sanityClient.fetch(query);
    return videos.length > 0 ? videos : fallbackVideos;
  } catch (error) {
    console.error("Error fetching videos from Sanity:", error);
    return fallbackVideos;
  }
}

// Function to convert regular YouTube URL to embed URL
const getEmbedUrl = (url: string) => {
  if (!url) return '';
  if (url.includes('/embed/')) {
    return url;
  }
  const videoId = url.split('v=')[1] || url.split('/').pop();
  const ampersandPosition = videoId?.indexOf('&');
  if (ampersandPosition !== -1) {
    return `https://www.youtube.com/embed/${videoId?.substring(0, ampersandPosition)}`;
  }
  return `https://www.youtube.com/embed/${videoId}`;
}


export default async function VideoGalleryPage() {
  const videos = await getVideos();

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
                  <div key={video._id || index}>
                    <div className="aspect-video overflow-hidden rounded-lg shadow-md">
                      <iframe
                        src={getEmbedUrl(video.youtubeUrl)}
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
