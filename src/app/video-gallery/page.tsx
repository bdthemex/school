
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Video } from 'lucide-react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ভিডিও গ্যালারি',
  description: 'আমাদের বিদ্যালয়ের বিভিন্ন অনুষ্ঠানের ভিডিও সংগ্রহ।',
};

interface VideoItem {
  _id: string;
  title: string;
  youtubeUrl: string;
}

function getVideos(): VideoItem[] {
  return [
    {
      _id: "v1",
      title: "বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৩",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      _id: "v2",
      title: "সাংস্কৃতিক অনুষ্ঠান ২০২২",
      youtubeUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
    },
  ];
}

// Function to convert regular YouTube URL to embed URL
const getEmbedUrl = (url: string) => {
  if (!url) return '';
  if (url.includes('/embed/')) {
    return url;
  }
  const videoIdMatch = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})(?:\?|&|#|$)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : url.split('/').pop();
  
  if (videoId) {
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
    }
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return '';
}


export default function VideoGalleryPage() {
  const videos = getVideos();

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
              {videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {videos.map((video) => (
                    <div key={video._id}>
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
              ) : (
                <p className="text-center text-muted-foreground">কোনো ভিডিও পাওয়া যায়নি।</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
