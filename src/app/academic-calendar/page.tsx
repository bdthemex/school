
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
import { sanityClient } from '@/lib/sanity'

interface CalendarEvent {
  _id: string;
  date: string;
  event: string;
}

const fallbackEvents: Omit<CalendarEvent, '_id'>[] = [
  { date: '১ জানুয়ারি, ২০২৫', event: 'নববর্ষের ছুটি' },
  { date: '২১ ফেব্রুয়ারি, ২০২৫', event: 'শহীদ দিবস ও আন্তর্জাতিক মাতৃভাষা দিবস' },
  { date: '১৭ মার্চ, ২০২৫', event: 'জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমানের জন্মদিন' },
  { date: '২৬ মার্চ, ২০২৫', event: 'স্বাধীনতা ও জাতীয় দিবস' },
  { date: '১৪ এপ্রিল, ২০২৫', event: 'বাংলা নববর্ষ' },
  { date: '১ মে, ২০২৫', event: 'মে দিবস' },
  { date: '১৫ আগস্ট, ২০২৫', event: 'জাতীয় শোক দিবস' },
  { date: '১৬ ডিসেম্বর, ২০২৫', event: 'বিজয় দিবস' },
  { date: '২৫ ডিসেম্বর, ২০২৫', event: 'বড়দিন' },
]

async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const query = `*[_type == "academicCalendarEvent" && !(_id in path("drafts.**"))] | order(date asc)`;
  try {
    const events = await sanityClient.fetch(query);
    return events.length > 0 ? events : fallbackEvents;
  } catch (error) {
    console.error("Error fetching calendar events from Sanity:", error);
    return fallbackEvents;
  }
}

export default async function AcademicCalendarPage() {
  const calendarEvents = await getCalendarEvents();

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
              <p className="text-center text-muted-foreground mb-8">
                এখানে ২০২৫ সালের জন্য বিদ্যালয়ের একাডেমিক কার্যক্রম ও ছুটির একটি সম্ভাব্য তালিকা দেওয়া হলো।
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
                    {calendarEvents.map((item, index) => (
                      <TableRow key={item._id || index}>
                        <TableCell className="font-medium">{item.date}</TableCell>
                        <TableCell>{item.event}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
