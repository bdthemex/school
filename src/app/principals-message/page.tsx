
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'
import { sanityClient, urlFor } from '@/lib/sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface PrincipalMessage {
  _id: string;
  name: string;
  designation: string;
  image: SanityImageSource;
  quote: string;
  message1: string;
  message2: string;
}

const fallbackMessage: Omit<PrincipalMessage, '_id'> = {
    name: 'মোঃ আব্দুল বাতেন',
    designation: 'প্রধান শিক্ষক',
    image: 'https://kjsghs.edu.bd/wp-content/uploads/2022/10/Mr.-Baten-Sir-3-1.jpg',
    quote: 'দীর্ঘদিন পরে কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়ের ওয়েব সাইট সম্প্রতি খোলা হয়েছে। এটা বিদ্যালয়ের জন্য উজ্জ্বল মাইল ফলক। আমি অত্যন্ত আনন্দিত যে, আমরা তথ্য প্রযুক্তির যুগে প্রবেশ করতে পেরেছি। এই ওয়েব সাইটের মাধ্যমে আমাদের ছাত্র, শিক্ষক, এবং অভিভাবকগণ বিদ্যালয়ের সকল কার্যক্রম সম্পর্কে অবগত থাকতে পারবেন।',
    message1: 'আমরা বিশ্বাস করি, এই ডিজিটাল প্ল্যাটফর্ম আমাদের মধ্যে যোগাযোগ এবং স্বচ্ছতা বাড়াতে সাহায্য করবে। আমাদের লক্ষ্য হলো শিক্ষার্থীদের শুধুমাত্র পুঁথিগত বিদ্যায় সীমাবদ্ধ না রেখে, তাদেরকে নৈতিক ও মানবিক গুণাবলী সম্পন্ন আদর্শ নাগরিক হিসেবে গড়ে তোলা। আমরা চাই, আমাদের শিক্ষার্থীরা জ্ঞান-বিজ্ঞানে சிறந்து হয়ে দেশ ও জাতির কল্যাণে কাজ করবে।',
    message2: 'সকলের সম্মিলিত প্রচেষ্টায় আমরা আমাদের বিদ্যালয়কে একটি শ্রেষ্ঠ বিদ্যাপীঠে পরিণত করতে পারব বলে আমি আশাবাদী।'
};

async function getPrincipalMessage(): Promise<PrincipalMessage> {
  const query = `*[_type == "principalMessage" && !(_id in path("drafts.**"))][0]`;
  try {
    const message = await sanityClient.fetch(query);
    return message || fallbackMessage;
  } catch (error) {
    console.error("Error fetching principal's message from Sanity:", error);
    return fallbackMessage;
  }
}

export default async function PrincipalsMessagePage() {
  const message = await getPrincipalMessage();
  const imageUrl = message.image
    ? typeof message.image === 'string'
      ? message.image
      : urlFor(message.image).width(300).height(300).url()
    : "https://kjsghs.edu.bd/wp-content/uploads/2022/10/Mr.-Baten-Sir-3-1.jpg";

  return (
    <main className="flex-1">
        <div>
            <div className="container mx-auto px-4 py-12">
            <Card className="shadow-lg">
                <CardHeader className="text-center bg-primary text-primary-foreground">
                <CardTitle className="text-3xl">প্রধান শিক্ষকের বাণী</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/4 text-center">
                    <Image
                        src={imageUrl}
                        alt="Principal's Photo"
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
                        <p className="font-bold text-primary">{message.name}</p>
                        <p className="text-sm text-foreground">{message.designation}</p>
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
