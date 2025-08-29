
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Calendar, Tag } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface Notice {
  id: string
  date: string
  title: string
  details: string
}

const demoNotices: Notice[] = [
    { id: '1', date: '২০২৪-০৭-২৬', title: '২০২৫ শিক্ষাবর্ষে ৬ষ্ঠ থেকে ৯ম শ্রেণিতে ভর্তির বিজ্ঞপ্তি।', details: 'ভর্তি পরীক্ষার তারিখ, সময় এবং প্রয়োজনীয় কাগজপত্র সম্পর্কে বিস্তারিত তথ্য এখানে দেওয়া হবে। শিক্ষার্থীদের নির্দিষ্ট সময়ের মধ্যে আবেদন করার জন্য অনুরোধ করা হচ্ছে।' },
    { id: '2', date: '২০২৪-০৭-২৫', title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা-২০২৪ এর পুরস্কার বিতরণী অনুষ্ঠান।', details: 'বার্ষিক ক্রীড়া প্রতিযোগিতায় বিজয়ীদের জন্য পুরস্কার বিতরণী অনুষ্ঠানের আয়োজন করা হয়েছে। সকল শিক্ষার্থী, শিক্ষক এবং অভিভাবকদের অনুষ্ঠানে উপস্থিত থাকার জন্য আমন্ত্রণ জানানো হচ্ছে।' },
    { id: '3', date: '২০২৪-০৭-২৪', title: 'অভিভাবক সমাবেশ এবং ফলাফল প্রকাশ সংক্রান্ত নোটিশ।', details: 'শিক্ষার্থীদের অর্ধবার্ষিক পরীক্ষার ফলাফল প্রকাশ এবং তাদের সার্বিক অবস্থা নিয়ে আলোচনার জন্য একটি অভিভাবক সমাবেশের আয়োজন করা হয়েছে।' },
    { id: '4', date: '২০২৪-০৭-২৩', title: 'ডেঙ্গু প্রতিরোধে সচেতনতামূলক কার্যক্রম গ্রহণ প্রসঙ্গে।', details: 'ডেঙ্গু রোগের প্রকোপ থেকে রক্ষা পাওয়ার জন্য বিদ্যালয়ে একটি সচেতনতামূলক কার্যক্রম গ্রহণ করা হয়েছে। সবাইকে সতর্কতা অবলম্বনের জন্য অনুরোধ করা হচ্ছে।' },
    { id: '5', date: '২০২৪-০৭-২২', title: 'বর্ষাকালীন ছুটি ও গ্রীষ্মকালীন অবকাশের নোটিশ।', details: 'বিদ্যালয়ের গ্রীষ্মকালীন এবং বর্ষাকালীন ছুটির সময়সূচী এখানে উল্লেখ করা হলো। ছুটির পর পুনরায় ক্লাস শুরু হওয়ার তারিখ জানানো হবে।' },
];

export default function NoticeDetailsPage() {
  const params = useParams()
  const { id } = params
  const [notice, setNotice] = useState<Notice | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (id) {
      setIsLoading(true)
      // Simulate fetching data
      setTimeout(() => {
        const foundNotice = demoNotices.find((n) => n.id === id)
        setNotice(foundNotice || null)
        setIsLoading(false)
      }, 500)
    }
  }, [id])

  if (isLoading) {
    return (
      <div>
        <div className="container mx-auto px-4 py-12">
          <Card className="shadow-lg">
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                <Skeleton className="h-4 w-32" />
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-2 space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!notice) {
    return (
      <div>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-destructive">নোটিশ পাওয়া যায়নি</h1>
          <p className="text-muted-foreground">আপনি যে নোটিশটি খুঁজছেন তা এখানে নেই।</p>
        </div>
      </div>
    )
  }

  return (
    <main className="flex-1">
      <div>
        <div className="container mx-auto px-4 py-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl lg:text-3xl text-primary">{notice.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>প্রকাশিত: {notice.date}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-2">
              <div className="prose max-w-none text-muted-foreground leading-relaxed">
                <p>{notice.details}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
