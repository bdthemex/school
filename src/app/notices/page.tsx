
'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { Megaphone, Calendar, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

interface Notice {
  id: string;
  date: string;
  title: string;
  createdAt: Timestamp;
}

export default function NoticesPage() {
    const [notices, setNotices] = useState<Notice[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getNotices = async () => {
            setIsLoading(true);
            try {
                const noticesCollectionRef = collection(db, 'notices')
                const q = query(noticesCollectionRef, orderBy('createdAt', 'desc'))
                const data = await getDocs(q)
                const filteredData = data.docs.map((doc) => {
                    const docData = doc.data();
                    return {
                      id: doc.id,
                      date: docData.date,
                      title: docData.title,
                      createdAt: docData.createdAt,
                    } as Notice
                  })
                setNotices(filteredData)
            } catch (error) {
                console.error("Error fetching notices:", error)
            } finally {
                setIsLoading(false);
            }
        }
        getNotices()
    }, [])

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-1">
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
                            <Link href="#" key={notice.id}>
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
      </main>
      <Footer />
    </div>
  )
}
