import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next';
import { getSheetData } from '@/lib/data-loader';

interface Notice {
  id: string;
  date: string;
  title: string;
  details?: string;
}

// This function tells Next.js which dynamic pages to build at build time.
export async function generateStaticParams() {
  const notices = await getSheetData('notices');
  
  if (!Array.isArray(notices)) {
    return [];
  }

  return notices.map((notice) => ({
    id: String(notice.id),
  }));
}

async function getNotice(id: string): Promise<Notice | null> {
  const notices = await getSheetData('notices');
  // Ensure we are comparing strings to strings to avoid type issues.
  const notice = notices.find(n => String(n.id) === String(id));
  if (!notice) return null;
  return notice as Notice;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const notice = await getNotice(params.id);
  
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

export default async function NoticeDetailsPage({ params }: { params: { id: string } }) {
  const notice = await getNotice(params.id);

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
