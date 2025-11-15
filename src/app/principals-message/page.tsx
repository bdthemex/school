import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'
import type { Metadata } from 'next';
import { getSheetData } from '@/lib/data-loader';

export const metadata: Metadata = {
    title: "প্রধান শিক্ষকের বাণী",
    description: 'প্রধান শিক্ষকের বাণী পড়ুন।',
};

async function getMessage() {
    const data = await getSheetData('messages');
    return data.find(m => m.key === 'principal');
}

export default async function PrincipalsMessagePage() {
  const message = await getMessage();

  if (!message) {
      return <main className="flex-1 container mx-auto px-4 py-12">বাণী পাওয়া যায়নি।</main>;
  }

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
                        src={message.image}
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
