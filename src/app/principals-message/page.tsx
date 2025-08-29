
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'

export default function PrincipalsMessagePage() {
  return (
    <main className="flex-1">
        <div className="max-w-7xl mx-auto shadow-lg bg-background p-4">
            <div className="container mx-auto px-4 py-12">
            <Card className="shadow-lg">
                <CardHeader className="text-center bg-primary text-primary-foreground">
                <CardTitle className="text-3xl">প্রধান শিক্ষকের বাণী</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/4 text-center">
                    <Image
                        src="https://placehold.co/300x300"
                        alt="Principal's Photo"
                        width={300}
                        height={300}
                        className="rounded-full border-4 border-accent shadow-lg mx-auto"
                        data-ai-hint="teacher portrait"
                    />
                    <h3 className="mt-4 text-xl font-bold text-primary">মোঃ আব্দুল বাতেন</h3>
                    <p className="text-muted-foreground">প্রধান শিক্ষক</p>
                    </div>
                    <div className="md:w-3/4 space-y-4">
                    <MessageSquare className="w-12 h-12 text-accent" />
                    <p className="text-muted-foreground leading-relaxed italic text-lg">
                        "দীর্ঘদিন পরে কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়ের ওয়েব সাইট সম্প্রতি খোলা হয়েছে। এটা বিদ্যালয়ের জন্য উজ্জ্বল মাইল ফলক। আমি অত্যন্ত আনন্দিত যে, আমরা তথ্য প্রযুক্তির যুগে প্রবেশ করতে পেরেছি। এই ওয়েব সাইটের মাধ্যমে আমাদের ছাত্র, শিক্ষক, এবং অভিভাবকগণ বিদ্যালয়ের সকল কার্যক্রম সম্পর্কে অবগত থাকতে পারবেন।"
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                    আমরা বিশ্বাস করি, এই ডিজিটাল প্ল্যাটফর্ম আমাদের মধ্যে যোগাযোগ এবং স্বচ্ছতা বাড়াতে সাহায্য করবে। আমাদের লক্ষ্য হলো শিক্ষার্থীদের শুধুমাত্র পুঁথিগত বিদ্যায় সীমাবদ্ধ না রেখে, তাদেরকে নৈতিক ও মানবিক গুণাবলী সম্পন্ন আদর্শ নাগরিক হিসেবে গড়ে তোলা। আমরা চাই, আমাদের শিক্ষার্থীরা জ্ঞান-বিজ্ঞানে சிறந்து হয়ে দেশ ও জাতির কল্যাণে কাজ করবে।
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                    সকলের সম্মিলিত প্রচেষ্টায় আমরা আমাদের বিদ্যালয়কে একটি শ্রেষ্ঠ বিদ্যাপীঠে পরিণত করতে পারব বলে আমি আশাবাদী।
                    </p>
                    <div className="text-right mt-6">
                        <p className="font-bold text-primary">মোঃ আব্দুল বাতেন</p>
                        <p className="text-sm text-muted-foreground">প্রধান শিক্ষক</p>
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
