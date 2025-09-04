
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
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ক্লাস রুটিন',
  description: 'সকল শ্রেণীর ক্লাস রুটিন দেখুন।',
};

interface DaySchedule {
  _key: string;
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
}

function getClassRoutines(): ClassRoutine[] {
  return [
    {
      _id: "cr1",
      className: "১০ম শ্রেণী",
      schedule: [
        { _key: "d1", day: "রবিবার", p1: "বাংলা", p2: "ইংরেজি", p3: "গণিত", p4: "বিজ্ঞান" },
        { _key: "d2", day: "সোমবার", p1: "বিজ্ঞান", p2: "গণিত", p3: "ইংরেজি", p4: "বাংলা" },
        { _key: "d3", day: "মঙ্গলবার", p1: "বাংলা", p2: "ইংরেজি", p3: "গণিত", p4: "বিজ্ঞান" },
        { _key: "d4", day: "বুধবার", p1: "বিজ্ঞান", p2: "গণিত", p3: "ইংরেজি", p4: "বাংলা" },
        { _key: "d5", day: "বৃহস্পতিবার", p1: "বাংলা", p2: "ইংরেজি", p3: "গণিত", p4: "বিজ্ঞান" },
      ],
    },
    {
      _id: "cr2",
      className: "৯ম শ্রেণী",
      schedule: [
        { _key: "d1", day: "রবিবার", p1: "ইংরেজি", p2: "বাংলা", p3: "বিজ্ঞান", p4: "গণিত" },
        { _key: "d2", day: "সোমবার", p1: "গণিত", p2: "বিজ্ঞান", p3: "বাংলা", p4: "ইংরেজি" },
        { _key: "d3", day: "মঙ্গলবার", p1: "ইংরেজি", p2: "বাংলা", p3: "বিজ্ঞান", p4: "গণিত" },
        { _key: "d4", day: "বুধবার", p1: "গণিত", p2: "বিজ্ঞান", p3: "বাংলা", p4: "ইংরেজি" },
        { _key: "d5", day: "বৃহস্পতিবার", p1: "ইংরেজি", p2: "বাংলা", p3: "বিজ্ঞান", p4: "গণিত" },
      ],
    },
  ];
}


export default function ClassRoutinePage() {
    const routines = getClassRoutines();

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
                                            <TableRow key={dayInfo._key}>
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
                         <p className="text-center text-muted-foreground">কোনো ক্লাস রুটিন পাওয়া যায়নি।</p>
                    )}
                    </CardContent>
                </Card>
            </div>
        </div>
    </main>
  )
}
