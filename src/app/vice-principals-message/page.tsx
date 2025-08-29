
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'

export default function VicePrincipalsMessagePage() {
  return (
    <main className="flex-1">
        <div className="max-w-7xl mx-auto shadow-lg bg-background p-4">
            <div className="container mx-auto px-4 py-12">
            <Card className="shadow-lg">
                <CardHeader className="text-center bg-primary text-primary-foreground">
                <CardTitle className="text-3xl">সহকারী প্রধান শিক্ষকের বাণী</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/4 text-center">
                    <Image
                        src="https://placehold.co/300x300"
                        alt="Vice Principal's Photo"
                        width={300}
                        height={300}
                        className="rounded-full border-4 border-accent shadow-lg mx-auto"
                        data-ai-hint="teacher portrait"
                    />
                    <h3 className="mt-4 text-xl font-bold text-primary">নাম (যদি থাকে)</h3>
                    <p className="text-muted-foreground">সহকারী প্রধান শিক্ষক</p>
                    </div>
                    <div className="md:w-3/4 space-y-4">
                    <MessageSquare className="w-12 h-12 text-accent" />
                    <p className="text-muted-foreground leading-relaxed italic text-lg">
                        "তথ্য প্রযুক্তির যুগে প্রবেশ করতে পেরে আমরা আনন্দিত। এর মাধ্যমে স্কুলের কার্যক্রম আরও গতিশীল হবে। আমাদের নতুন ওয়েবসাইটটি ছাত্র-ছাত্রী, শিক্ষক এবং অভিভাবকদের জন্য একটি গুরুত্বপূর্ণ সংযোগ স্থাপন করবে।"
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                    আমরা শিক্ষার্থীদের সার্বিক বিকাশে বিশ্বাসী। পড়াশোনার পাশাপাশি খেলাধুলা, সাংস্কৃতিক কার্যক্রম এবং অন্যান্য সহশিক্ষা কার্যক্রমে অংশগ্রহণের মাধ্যমে তারা নিজেদের প্রতিভা বিকাশের সুযোগ পাবে। আমাদের অভিজ্ঞ শিক্ষকমণ্ডলী সর্বদা ছাত্র-ছাত্রীদের পাশে থেকে তাদের সঠিক পথে পরিচালিত করতে সচেষ্ট।
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                    আমি আশা করি, আমাদের সকলের আন্তরিক প্রচেষ্টায় কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয় সাফল্যের শীর্ষে পৌঁছাবে।
                    </p>
                    <div className="text-right mt-6">
                        <p className="font-bold text-primary">সহকারী প্রধান শিক্ষক</p>
                        <p className="text-sm text-muted-foreground">কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়</p>
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
