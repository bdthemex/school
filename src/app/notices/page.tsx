
import { sanityClient } from '@/lib/sanity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Megaphone, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Notice {
  _id: string;
  date: string;
  title: string;
}

async function getNotices(): Promise<Notice[]> {
  try {
    const query = `*[_type == "notice" && !(_id in path("drafts.**"))] | order(date desc)`;
    const notices = await sanityClient.fetch(query);
    return notices || [];
  } catch (error) {
    console.error("Error fetching notices:", error);
    return [];
  }
}

export default async function NoticesPage() {
    const notices = await getNotices();

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
                        {notices.length > 0 ? (
                           notices.map((notice) => (
                            <Link href={`/notices/${notice._id}`} key={notice._id}>
                                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-primary">{notice.title}</p>
                                        <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                            <Calendar className="w-4 h-4" />
                                            প্রকাশিত: {new Date(notice.date).toLocaleDateString('bn-BD')}
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
