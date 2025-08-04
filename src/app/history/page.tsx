
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { ScrollText } from 'lucide-react'

const historyMilestones = [
  { year: 1832, event: 'বিদ্যালয় প্রতিষ্ঠা করেন শ্রী জয়হরি স্প্রাই।' },
  { year: 1947, event: 'দেশভাগের পর শিক্ষার প্রসারে নতুন ভূমিকা পালন।' },
  { year: 1971, event: 'মুক্তিযুদ্ধে বিদ্যালয়ের গৌরবময় ভূমিকা।' },
  { year: 1991, event: 'বিদ্যালয়টি জাতীয়করণ করা হয়।' },
  { year: 2020, event: 'ডিজিটাল শিক্ষা কার্যক্রমের সূচনা।' },
]

export default function HistoryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <Card className="shadow-lg overflow-hidden">
            <CardHeader className="text-center bg-primary text-primary-foreground">
              <CardTitle className="text-3xl">প্রতিষ্ঠানের গৌরবময় ইতিহাস</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                 <div className="lg:w-2/5">
                    <Image
                        src="https://placehold.co/600x800"
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
                           সময়ের পথ ধরে আমাদের যাত্রা
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                        কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয় প্রায় দুই শতাব্দীর এক গৌরবময় ইতিহাসের সাক্ষী। ১৮৩২ সালে শিক্ষানুরাগী শ্রী জয়হরি স্প্রাই কর্তৃক প্রতিষ্ঠিত এই বিদ্যালয়টি এই অঞ্চলের অন্যতম প্রাচীন শিক্ষা প্রতিষ্ঠান। প্রতিষ্ঠার পর থেকে এটি বহু জ্ঞানী, গুণী এবং দেশবরেণ্য ব্যক্তিত্ব তৈরি করেছে।
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                        সময়ের সাথে সাথে বিদ্যালয়টি অনেক পরিবর্তনের মধ্য দিয়ে গিয়েছে। ব্রিটিশ আমল, পাকিস্তান আমল এবং স্বাধীন বাংলাদেশের অভ্যুদয়ের প্রতিটি পর্যায়ে এর ভূমিকা ছিল অত্যন্ত গুরুত্বপূর্ণ। ১৯৯۱ সালে জাতীয়করণ হওয়ার পর এর কার্যক্রম আরও বিস্তৃত হয় এবং শিক্ষার মানোন্নয়নে নতুন মাত্রা যোগ হয়।
                        </p>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-primary mb-4">ঐতিহাসিক মাইলফলক</h3>
                        <div className="relative border-l-2 border-accent space-y-8 pl-6">
                            {historyMilestones.map((item, index) => (
                                <div key={index} className="relative">
                                    <div className="absolute -left-[35px] top-1.5 w-4 h-4 bg-accent rounded-full border-4 border-muted/40"></div>
                                    <p className="font-bold text-primary">{item.year}</p>
                                    <p className="text-muted-foreground">{item.event}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
