
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'
import { sanityClient, urlFor } from '@/lib/sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { Metadata } from 'next';

interface VicePrincipalMessage {
  _id: string;
  name: string;
  designation: string;
  image: SanityImageSource;
  quote: string;
  message1: string;
  message2: string;
}

async function getVicePrincipalMessage(): Promise<VicePrincipalMessage | null> {
  const query = `*[_type == "vicePrincipalMessage" && !(_id in path("drafts.**"))][0]`;
  try {
    const message = await sanityClient.fetch(query);
    return message;
  } catch (error) {
    console.error("Error fetching vice principal's message from Sanity:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
    const message = await getVicePrincipalMessage();
    const title = "সহকারী প্রধান শিক্ষকের বাণী";
    const description = message?.quote || 'সহকারী প্রধান শিক্ষকের বাণী পড়ুন।';
    
    return {
      title,
      description,
    };
  }

export default async function VicePrincipalsMessagePage() {
    const message = await getVicePrincipalMessage();

    if (!message) {
      return (
        <main className="flex-1">
            <div className="container mx-auto px-4 py-12">
                <Card className="shadow-lg">
                    <CardHeader className="text-center bg-primary text-primary-foreground">
                        <CardTitle className="text-3xl">সহকারী প্রধান শিক্ষকের বাণী</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <p className="text-center text-muted-foreground">সহকারী প্রধান শিক্ষকের বাণী পাওয়া যায়নি। অনুগ্রহ করে Sanity Studio-তে তথ্য যোগ করুন।</p>
                    </CardContent>
                </Card>
            </div>
        </main>
      )
  }

    const imageUrl = message.image
      ? urlFor(message.image).width(300).height(300).url()
      : "https://picsum.photos/300/300";

  return (
    <main className="flex-1">
        <div>
            <div className="container mx-auto px-4 py-12">
            <Card className="shadow-lg">
                <CardHeader className="text-center bg-primary text-primary-foreground">
                <CardTitle className="text-3xl">সহকারী প্রধান শিক্ষকের বাণী</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/4 text-center">
                    <Image
                        src={imageUrl}
                        alt="Vice Principal's Photo"
                        width={300}
                        height={300}
                        className="rounded-full border-4 border-accent shadow-lg mx-auto"
                        data-ai-hint="teacher portrait"
                    />
                    <h3 className="mt-4 text-xl font-bold text-primary">{message.name}</h3>
                    <p className="text-foreground">{message.designation}</p>
                    </div>
                    <div className="md:w-3/4 space-y-4">
                    <MessageSquare className="w-12 h-12 text-accent" />
                    <p className="text-foreground leading-relaxed italic text-lg">
                        "{message.quote}"
                    </p>
                    <p className="text-foreground leading-relaxed text-base">
                        {message.message1}
                    </p>
                    <p className="text-foreground leading-relaxed text-base">
                        {message.message2}
                    </p>
                    <div className="text-right mt-6">
                        <p className="font-bold text-primary">{message.designation}</p>
                        <p className="text-sm text-foreground">কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়</p>
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
