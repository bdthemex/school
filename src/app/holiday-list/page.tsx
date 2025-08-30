
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plane } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { sanityClient } from '@/lib/sanity'

interface Holiday {
  _id: string;
  occasion: string;
  from: string;
  to: string;
}

const fallbackHolidays: Omit<Holiday, '_id'>[] = [
  { occasion: 'শীতকালীন অবকাশ', from: 'ডিসেম্বর ২২, ২০২৪', to: 'জানুয়ারি ০২, ২০২৫' },
  { occasion: 'ঈদুল ফিতর', from: 'এপ্রিল ১০, ২০২৫', to: 'এপ্রিল ১৪, ২০২৫' },
  { occasion: 'গ্রীষ্মকালীন অবকাশ ও ঈদুল আযহা', from: 'জুন ১৫, ২০২৫', to: 'জুন ৩০, ২০২৫' },
  { occasion: 'শারদীয় দুর্গা পূজা', from: 'অক্টোবর ০১, ২০২৫', to: 'অক্টোবর ০৫, ২০২৫' },
]

async function getHolidays(): Promise<Holiday[]> {
  const query = `*[_type == "holiday" && !(_id in path("drafts.**"))] | order(from asc)`;
  try {
    const holidays = await sanityClient.fetch(query);
    return holidays.length > 0 ? holidays : fallbackHolidays;
  } catch (error) {
    console.error("Error fetching holidays from Sanity:", error);
    return fallbackHolidays;
  }
}

export default async function HolidayListPage() {
  const holidays = await getHolidays();
  return (
    <main className="flex-1">
      <div>
        <div className="container mx-auto px-4 py-12">
          <Card className="shadow-lg">
            <CardHeader className="text-center bg-primary text-primary-foreground">
              <CardTitle className="text-3xl flex items-center justify-center gap-3">
                <Plane className="w-8 h-8" />
                ছুটির তালিকা
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-center text-muted-foreground mb-8">
                ২০২৫ সালের জন্য বিদ্যালয়ের বাৎসরিক ছুটির তালিকা।
              </p>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>উপলক্ষ</TableHead>
                      <TableHead>শুরু</TableHead>
                      <TableHead>শেষ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {holidays.map((holiday, index) => (
                      <TableRow key={holiday._id || index}>
                        <TableCell className="font-medium">{holiday.occasion}</TableCell>
                        <TableCell>{holiday.from}</TableCell>
                        <TableCell>{holiday.to}</TableCell>
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
