
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Megaphone, Calendar, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

interface Notice {
  id: string;
  date: string;
  title: string;
}

const demoNotices: Notice[] = [
    { id: '1', date: '২০২৪-০৭-২৬', title: '২০২৫ শিক্ষাবর্ষে ৬ষ্ঠ থেকে ৯ম শ্রেণিতে ভর্তির বিজ্ঞপ্তি।' },
    { id: '2', date: '২০২৪-০৭-২৫', title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা-২০২৪ এর পুরস্কার বিতরণী অনুষ্ঠান।' },
    { id: '3', date: '২০২৪-০৭-২৪', title: 'অভিভাবক সমাবেশ এবং ফলাফল প্রকাশ সংক্রান্ত নোটিশ।' },
    { id: '4', date: '২০২৪-০৭-২৩', title: 'ডেঙ্গু প্রতিরোধে সচেতনতামূলক কার্যক্রম গ্রহণ প্রসঙ্গে।' },
    { id: '5', date: '২০২৪-০৭-২২', title: 'বর্ষাকালীন ছুটি ও গ্রীষ্মকালীন অবকাশের নোটিশ।' },
];


export default function NoticesPage() {
    const [notices, setNotices] = useState<Notice[]>(demoNotices)
    const [isLoading, setIsLoading] = useState(false)

  return (
    <main className="flex-1">
      <div>
        <div className="container mx-auto px-4 py-12">
            <Card className="shadow-lg">
                <CardHeader className="text-center bg-primary text-primary-foreground">
                    <CardTitle className="text-3xl flex items-center justify-center gap-3">
                        <Megaphone className="w-8 h-8" />
                        নোটিশ বোর্ড
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="space-y-4">
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                                    <div className="space-y-2 w-full">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/4" />
                                    </div>
                                </div>
                            ))
                        ) : notices.length > 0 ? (
                           notices.map((notice) => (
                            <Link href={`/notices/${notice.id}`} key={notice.id}>
                                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-primary">{notice.title}</p>
                                        <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                            <Calendar className="w-4 h-4" />
                                            প্রকাশিত: {notice.date}
                                        </p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                </div>
                            </Link>
                           ))
                        ) : (
                            <p className="text-center text-muted-foreground py-8">কোনো নোটিশ প্রকাশ করা হয়নি।</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  )
}
