
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarDays, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { sanityClient } from '@/lib/sanity'

interface DaySchedule {
  _id: string;
  day: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
}
interface ClassRoutine {
  _id: string;
  className: string;
  schedule: DaySchedule[];
  order: number;
}


async function getClassRoutines(): Promise<ClassRoutine[]> {
    const query = `*[_type == "classRoutine" && !(_id in path("drafts.**"))] | order(order asc)`;
    try {
        const routines = await sanityClient.fetch(query);
        return routines || [];
    } catch (error) {
        console.error("Error fetching class routines from Sanity:", error);
        return [];
    }
}


export default async function ClassRoutinePage() {
    const routines = await getClassRoutines();

  return (
    <main className="flex-1">
        <div>
            <div className="container mx-auto px-4 py-12">
                <Card className="shadow-lg">
                    <CardHeader className="text-center bg-primary text-primary-foreground">
                        <CardTitle className="text-3xl flex items-center justify-center gap-3">
                            <CalendarDays className="w-8 h-8" />
                            ক্লাস রুটিন
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                    {routines.length > 0 ? (
                    <>
                        <div className="text-center">
                            <p className="text-muted-foreground mb-4">
                                এখানে বিভিন্ন শ্রেণীর ক্লাস রুটিন দেওয়া হলো। প্রয়োজনে সম্পূর্ণ রুটিনটি ডাউনলোড করতে পারেন।
                            </p>
                            <Button>
                                <Download className="mr-2 h-4 w-4" />
                                সম্পূর্ণ রুটিন ডাউনলোড করুন
                            </Button>
                        </div>

                        {routines.map((routine) => (
                            <div key={routine._id}>
                                <h2 className="text-2xl font-bold text-primary mb-4">{routine.className}</h2>
                                <div className="border rounded-lg overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                        <TableHead className="w-[100px]">বার</TableHead>
                                        <TableHead>১ম পিরিয়ড</TableHead>
                                        <TableHead>২য় পিরিয়ড</TableHead>
                                        <TableHead>৩য় পিরিয়ড</TableHead>
                                        <TableHead>৪র্থ পিরিয়ড</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {routine.schedule.map(dayInfo => (
                                            <TableRow key={dayInfo._id}>
                                                <TableCell className="font-medium">{dayInfo.day}</TableCell>
                                                <TableCell>{dayInfo.p1}</TableCell>
                                                <TableCell>{dayInfo.p2}</TableCell>
                                                <TableCell>{dayInfo.p3}</TableCell>
                                                <TableCell>{dayInfo.p4}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                </div>
                            </div>
                        ))}
                    </>
                    ) : (
                         <p className="text-center text-muted-foreground">কোনো ক্লাস রুটিন পাওয়া যায়নি। অনুগ্রহ করে Sanity Studio-তে তথ্য যোগ করুন।</p>
                    )}
                    </CardContent>
                </Card>
            </div>
        </div>
    </main>
  )
}
