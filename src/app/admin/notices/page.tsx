
'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { PlusCircle, Edit, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const initialNotices = [
  { id: 1, date: '২০২৪-০৭-২২', title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা' },
  { id: 2, date: '২০২৪-০৭-২০', title: 'ছুটির নোটিশ' },
  { id: 3, date: '২০২৪-০৭-১৮', title: 'ফলাফল প্রকাশ' },
  { id: 4, date: '২০২৪-০৭-১৫', title: 'নতুন ভর্তি সংক্রান্ত বিজ্ঞপ্তি' },
]

export default function NoticeManagementPage() {
  const [notices, setNotices] = useState(initialNotices)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-primary">নোটিশ ম্যানেজমেন্ট</CardTitle>
              <CardDescription>এখান থেকে ওয়েবসাইটের সকল নোটিশ পরিচালনা করুন।</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  নতুন নোটিশ যোগ করুন
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>নতুন নোটিশ</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      শিরোনাম
                    </Label>
                    <Input id="title" placeholder="নোটিশের শিরোনাম লিখুন" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      তারিখ
                    </Label>
                    <Input id="date" type="date" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      বাতিল
                    </Button>
                  </DialogClose>
                  <Button type="submit">সংরক্ষণ করুন</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">তারিখ</TableHead>
                  <TableHead>শিরোনাম</TableHead>
                  <TableHead className="text-right w-[150px]">কার্যক্রম</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notices.map((notice) => (
                  <TableRow key={notice.id}>
                    <TableCell className="font-medium">{notice.date}</TableCell>
                    <TableCell>{notice.title}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
