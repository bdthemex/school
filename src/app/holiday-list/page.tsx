
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

const holidays = [
  { occasion: 'শীতকালীন অবকাশ', from: 'ডিসেম্বর ২২, ২০২৪', to: 'জানুয়ারি ০২, ২০২৫' },
  { occasion: 'ঈদুল ফিতর', from: 'এপ্রিল ১০, ২০২৫', to: 'এপ্রিল ১৪, ২০২৫' },
  { occasion: 'গ্রীষ্মকালীন অবকাশ ও ঈদুল আযহা', from: 'জুন ১৫, ২০২৫', to: 'জুন ৩০, ২০২৫' },
  { occasion: 'শারদীয় দুর্গা পূজা', from: 'অক্টোবর ০১, ২০২৫', to: 'অক্টোবর ০৫, ২০২৫' },
]

export default function HolidayListPage() {
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
                      <TableRow key={index}>
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
