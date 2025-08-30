
import { doc, getDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'
import { notFound } from 'next/navigation'

interface Notice {
  id: string
  date: string
  title: string
  details?: string
  createdAt: Timestamp
}

async function getNotice(id: string): Promise<Notice | null> {
  try {
    const noticeDocRef = doc(db, 'notices', id);
    const noticeSnap = await getDoc(noticeDocRef);

    if (!noticeSnap.exists()) {
      return null
    }
    
    const data = noticeSnap.data() as Omit<Notice, 'id'>

    // This is a placeholder for details, as it's not in the DB
    const detailsPlaceholder = `বিস্তারিত তথ্য শীঘ্রই যোগ করা হবে। ${data.title} সংক্রান্ত সকল তথ্য এখানে পাওয়া যাবে।`;


    return {
      id: noticeSnap.id,
      ...data,
      details: data.details || detailsPlaceholder,
    }
  } catch (error) {
    console.error("Error fetching notice:", error)
    return null
  }
}

export default async function NoticeDetailsPage({ params }: { params: { id: string } }) {
  const notice = await getNotice(params.id)

  if (!notice) {
    notFound();
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
