
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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

const routine = {
    '৬ষ্ঠ শ্রেণি': [
        { day: 'রবিবার', p1: 'বাংলা', p2: 'ইংরেজি', p3: 'গণিত', p4: 'বিজ্ঞান' },
        { day: 'সোমবার', p1: 'বিজ্ঞান', p2: 'গণিত', p3: 'ইংরেজি', p4: 'বাংলা' },
    ],
    '৭ম শ্রেণি': [
        { day: 'রবিবার', p1: 'গণিত', p2: 'বাংলা', p3: 'বিজ্ঞান', p4: 'ইংরেজি' },
        { day: 'সোমবার', p1: 'ইংরেজি', p2: 'বিজ্ঞান', p3: 'বাংলা', p4: 'গণিত' },
    ]
}

export default function ClassRoutinePage() {
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
                    <div className="text-center">
                        <p className="text-muted-foreground mb-4">
                            এখানে বিভিন্ন শ্রেণীর ক্লাস রুটিন দেওয়া হলো। প্রয়োজনে সম্পূর্ণ রুটিনটি ডাউনলোড করতে পারেন।
                        </p>
                        <Button>
                            <Download className="mr-2 h-4 w-4" />
                            সম্পূর্ণ রুটিন ডাউনলোড করুন
                        </Button>
                    </div>

                    {Object.entries(routine).map(([className, schedule]) => (
                        <div key={className}>
                            <h2 className="text-2xl font-bold text-primary mb-4">{className}</h2>
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
                                    {schedule.map(dayInfo => (
                                        <TableRow key={dayInfo.day}>
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
                    </CardContent>
                </Card>
            </div>
        </div>
    </main>
  )
}
