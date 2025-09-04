
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
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ছুটির তালিকা',
  description: 'বিদ্যালয়ের বাৎসরিক ছুটির তালিকা দেখুন।',
};


interface Holiday {
  _id: string;
  occasion: string;
  from: string;
  to: string;
}

function getHolidays(): Holiday[] {
  return [
    {
      _id: "h1",
      occasion: "ঈদুল ফিতর",
      from: "১০ এপ্রিল, ২০২৫",
      to: "১৫ এপ্রিল, ২০২৫",
    },
    {
      _id: "h2",
      occasion: "ঈদুল আযহা",
      from: "১৭ জুন, ২০২৫",
      to: "২০ জুন, ২০২৫",
    },
    {
      _id: "h3",
      occasion: "গ্রীষ্মকালীন অবকাশ",
      from: "০১ জুলাই, ২০২৫",
      to: "১০ জুলাই, ২০২৫",
    },
    {
      _id: "h4",
      occasion: "শীতকালীন অবকাশ",
      from: "২২ ডিসেম্বর, ২০২৫",
      to: "৩১ ডিসেম্বর, ২০২৫",
    },
  ];
}

export default function HolidayListPage() {
  const holidays = getHolidays();
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
                {holidays.length > 0 ? (
                <>
                <p className="text-center text-muted-foreground mb-8">
                    বিদ্যালয়ের বাৎসরিক ছুটির তালিকা।
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
                        {holidays.map((holiday) => (
                        <TableRow key={holiday._id}>
                            <TableCell className="font-medium">{holiday.occasion}</TableCell>
                            <TableCell>{holiday.from}</TableCell>
                            <TableCell>{holiday.to}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </div>
                </>
              ) : (
                <p className="text-center text-muted-foreground">কোনো ছুটির তালিকা পাওয়া যায়নি।</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
