
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'
import type { Metadata } from 'next';

interface VicePrincipalMessage {
  _id: string;
  name: string;
  designation: string;
  image: string;
  quote: string;
  message1: string;
  message2: string;
}

function getVicePrincipalMessage(): VicePrincipalMessage {
  return {
    _id: "vicePrincipalMessage",
    name: "মোঃ আব্দুল হামিদ",
    designation: "সহকারী প্রধান শিক্ষক",
    image: "https://picsum.photos/300/300?random=viceprincipal",
    quote: "প্রযুক্তি ও শিক্ষার সমন্বয়ে আমরা এগিয়ে যাব।",
    message1: "তথ্য প্রযুক্তির যুগে প্রবেশ করতে পেরে আমরা আনন্দিত। এর মাধ্যমে স্কুলের কার্যক্রম আরও গতিশীল হবে এবং স্বচ্ছতা নিশ্চিত হবে।",
    message2: "আমাদের লক্ষ্য শিক্ষার্থীদের শুধু প্রাতিষ্ঠানিক শিক্ষায় নয়, বরং নৈতিক ও মানবিক মূল্যবোধেও শিক্ষিত করে তোলা।",
  };
}

export const metadata: Metadata = {
    title: "সহকারী প্রধান শিক্ষকের বাণী",
    description: 'সহকারী প্রধান শিক্ষকের বাণী পড়ুন।',
};

export default function VicePrincipalsMessagePage() {
    const message = getVicePrincipalMessage();

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
                        src={message.image}
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
