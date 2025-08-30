
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

async function getHolidays(): Promise<Holiday[]> {
  const query = `*[_type == "holiday" && !(_id in path("drafts.**"))] | order(from asc)`;
  try {
    const holidays = await sanityClient.fetch(query);
    return holidays || [];
  } catch (error) {
    console.error("Error fetching holidays from Sanity:", error);
    return [];
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
                <p className="text-center text-muted-foreground">কোনো ছুটির তালিকা পাওয়া যায়নি। অনুগ্রহ করে Sanity Studio-তে তথ্য যোগ করুন।</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
