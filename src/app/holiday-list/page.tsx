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
import { getSheetData } from '@/lib/data-loader';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'ছুটির তালিকা',
  description: 'বিদ্যালয়ের বাৎসরিক ছুটির তালিকা দেখুন।',
};

export default async function HolidayListPage() {
  const holidays = await getSheetData('holidays');

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
                        {holidays.map((holiday: any) => (
                        <TableRow key={holiday.id}>
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
