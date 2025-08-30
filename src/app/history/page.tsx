
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollText } from 'lucide-react'
import { sanityClient, urlFor } from '@/lib/sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface Milestone {
    _key: string;
    year: number;
    event: string;
}

interface HistoryContent {
  _id: string;
  title: string;
  historicalImage: SanityImageSource;
  journeyTitle: string;
  description1: string;
  description2: string;
  milestonesTitle: string;
  milestones: Milestone[];
}

async function getHistoryContent(): Promise<HistoryContent | null> {
  const query = `*[_type == "historyPage" && !(_id in path("drafts.**"))][0]`;
  try {
    const content = await sanityClient.fetch(query);
    return content;
  } catch (error) {
    console.error("Error fetching history page content from Sanity:", error);
    return null;
  }
}


export default async function HistoryPage() {
  const content = await getHistoryContent();

  if (!content) {
    return (
       <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
            <Card className="shadow-lg">
                <CardHeader className="text-center bg-primary text-primary-foreground">
                    <CardTitle className="text-3xl">প্রতিষ্ঠানের গৌরবময় ইতিহাস</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                    <p className="text-center text-muted-foreground">এই পেইজের জন্য কোনো তথ্য পাওয়া যায়নি। অনুগ্রহ করে Sanity Studio-তে তথ্য যোগ করুন।</p>
                </CardContent>
            </Card>
        </div>
      </main>
    )
  }

  const imageUrl = content.historicalImage
    ? urlFor(content.historicalImage).width(600).height(800).url()
    : "https://picsum.photos/600/800";

  return (
    <main className="flex-1">
        <div>
            <div className="container mx-auto px-4 py-12">
            <Card className="shadow-lg overflow-hidden">
                <CardHeader className="text-center bg-primary text-primary-foreground">
                <CardTitle className="text-3xl">{content.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    <div className="lg:w-2/5">
                        <Image
                            src={imageUrl}
                            alt="Historic photo of the school"
                            width={600}
                            height={800}
                            className="rounded-lg shadow-md object-cover w-full h-full"
                            data-ai-hint="historic building black and white"
                        />
                    </div>
                    <div className="lg:w-3/5">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                            <ScrollText className="w-6 h-6 text-accent" />
                            {content.journeyTitle}
                            </h2>
                            <p className="text-foreground leading-relaxed text-base">
                                {content.description1}
                            </p>
                            <p className="text-foreground leading-relaxed text-base">
                                {content.description2}
                            </p>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-primary mb-4">{content.milestonesTitle}</h3>
                            <div className="relative border-l-2 border-accent space-y-8 pl-6">
                                {content.milestones.map((item) => (
                                    <div key={item._key} className="relative">
                                        <div className="absolute -left-[35px] top-1.5 w-4 h-4 bg-accent rounded-full border-4 border-muted/40"></div>
                                        <p className="font-bold text-primary">{item.year}</p>
                                        <p className="text-foreground leading-relaxed text-base">{item.event}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                </CardContent>
            </Card>
            </div>
        </div>
    </main>
  )
}
