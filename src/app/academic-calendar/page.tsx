
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarCheck } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'একাডেমিক ক্যালেন্ডার',
  description: 'আমাদের বিদ্যালয়ের একাডেমিক ক্যালেন্ডার ও কার্যক্রমের তালিকা।',
};

interface CalendarEvent {
  _id: string;
  date: string;
  event: string;
}

function getCalendarEvents(): CalendarEvent[] {
  return [
    {
      _id: "event1",
      date: "০১ জানুয়ারি, ২০২৫",
      event: "নতুন বছরের ক্লাস শুরু",
    },
    {
      _id: "event2",
      date: "২১ ফেব্রুয়ারি, ২০২৫",
      event: "শহীদ দিবস ও আন্তর্জাতিক মাতৃভাষা দিবস",
    },
    {
      _id: "event3",
      date: "২৬ মার্চ, ২০২৫",
      event: "স্বাধীনতা দিবস",
    },
    {
      _id: "event4",
      date: "১৪ এপ্রিল, ২০২৫",
      event: "পহেলা বৈশাখ",
    }
  ];
}

export default function AcademicCalendarPage() {
  const calendarEvents = getCalendarEvents();

  return (
    <main className="flex-1">
      <div>
        <div className="container mx-auto px-4 py-12">
          <Card className="shadow-lg">
            <CardHeader className="text-center bg-primary text-primary-foreground">
              <CardTitle className="text-3xl flex items-center justify-center gap-3">
                <CalendarCheck className="w-8 h-8" />
                একাডেমিক ক্যালেন্ডার
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
                {calendarEvents.length > 0 ? (
                    <>
                    <p className="text-center text-muted-foreground mb-8">
                        এখানে বিদ্যালয়ের একাডেমিক কার্যক্রম ও ছুটির একটি তালিকা দেওয়া হলো।
                    </p>
                    <div className="border rounded-lg overflow-hidden">
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-1/3">তারিখ</TableHead>
                            <TableHead>কার্যক্রম / দিবস</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {calendarEvents.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell className="font-medium">{item.date}</TableCell>
                                <TableCell>{item.event}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </div>
                    </>
                ) : (
                    <p className="text-center text-muted-foreground">কোনো একাডেমিক ক্যালেন্ডার পাওয়া যায়নি।</p>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
