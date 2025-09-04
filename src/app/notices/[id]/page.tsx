
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next';

interface Notice {
  _id: string;
  date: string;
  title: string;
  details?: string;
}

const notices: Notice[] = [
   {
    _id: "n1",
    title: "২০২৫ শিক্ষাবর্ষে ভর্তি বিজ্ঞপ্তি",
    date: "2024-11-01T10:00:00Z",
    details: "২০২৫ শিক্ষাবর্ষে ৬ষ্ঠ থেকে ৯ম শ্রেণিতে ভর্তির জন্য আবেদন গ্রহণ শুরু হয়েছে। বিস্তারিত জানতে বিদ্যালয়ের অফিসে যোগাযোগ করুন।",
  },
   {
    _id: "n2",
    title: "বার্ষিক পরীক্ষার রুটিন",
    date: "2024-11-15T10:00:00Z",
    details: "বার্ষিক পরীক্ষার রুটিন প্রকাশ করা হয়েছে। সকল শিক্ষার্থীকে নোটিশ বোর্ড থেকে রুটিন সংগ্রহ করার জন্য অনুরোধ করা হলো।",
  },
  {
    _id: "n3",
    title: "অভিভাবক সমাবেশ",
    date: "2024-12-01T10:00:00Z",
    details: "আগামী ১০ই ডিসেম্বর, ২০২৪ তারিখে বিদ্যালয়ে একটি অভিভাবক সমাবেশ অনুষ্ঠিত হবে। সকল अभिभावকদের উপস্থিত থাকার জন্য অনুরোধ করা হলো।",
  }
];

function getNotice(id: string): Notice | null {
  return notices.find(n => n._id === id) || null;
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
    const notice = getNotice(params.id);
  
    if (!notice) {
      return {
        title: 'নোটিশ পাওয়া যায়নি',
      };
    }
  
    return {
      title: notice.title,
      description: notice.details ? notice.details.substring(0, 150) : 'বিস্তারিত জানতে পড়ুন।',
    };
  }

export default function NoticeDetailsPage({ params }: { params: { id: string } }) {
  const notice = getNotice(params.id)

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
                  <span>প্রকাশিত: {new Date(notice.date).toLocaleDateString('bn-BD')}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-2">
              <div className="prose max-w-none text-muted-foreground leading-relaxed">
                <p>{notice.details || 'বিস্তারিত তথ্য শীঘ্রই যোগ করা হবে।'}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
