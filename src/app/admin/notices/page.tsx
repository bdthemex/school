
'use client'

import { useState, useEffect } from 'react'
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Notice {
  id: number;
  date: string;
  title: string;
}

const initialNotices: Notice[] = [
  { id: 1, date: '2024-07-22', title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা' },
  { id: 2, date: '2024-07-20', title: 'ছুটির নোটিশ' },
  { id: 3, date: '2024-07-18', title: 'ফলাফল প্রকাশ' },
  { id: 4, date: '2024-07-15', title: 'নতুন ভর্তি সংক্রান্ত বিজ্ঞপ্তি' },
]

export default function NoticeManagementPage() {
  const [notices, setNotices] = useState<Notice[]>(initialNotices)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentNotice, setCurrentNotice] = useState<Partial<Notice>>({})
  const [isEditing, setIsEditing] = useState(false)
  const [noticeToDelete, setNoticeToDelete] = useState<Notice | null>(null);

  const handleOpenDialog = (notice?: Notice) => {
    if (notice) {
      setCurrentNotice(notice)
      setIsEditing(true)
    } else {
      setCurrentNotice({ date: new Date().toISOString().split('T')[0], title: '' })
      setIsEditing(false)
    }
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (isEditing) {
      setNotices(notices.map(n => n.id === currentNotice.id ? (currentNotice as Notice) : n))
    } else {
      setNotices([...notices, { ...currentNotice, id: Date.now() } as Notice])
    }
    setIsDialogOpen(false)
    setCurrentNotice({})
  }

  const handleDelete = (id: number) => {
    setNotices(notices.filter(notice => notice.id !== id));
    setNoticeToDelete(null);
  };


  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-primary">নোটিশ ম্যানেজমেন্ট</CardTitle>
              <CardDescription>এখান থেকে ওয়েবসাইটের সকল নোটিশ পরিচালনা করুন।</CardDescription>
            </div>
            <Button onClick={() => handleOpenDialog()}>
              <PlusCircle className="mr-2 h-4 w-4" />
              নতুন নোটিশ যোগ করুন
            </Button>
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
                      <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800" onClick={() => handleOpenDialog(notice)}>
                        <Edit className="h-4 w-4" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-800" onClick={() => setNoticeToDelete(notice)}>
                             <Trash2 className="h-4 w-4" />
                           </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>আপনি কি নিশ্চিত?</AlertDialogTitle>
                            <AlertDialogDescription>
                              এই নোটিশটি মুছে ফেলা হবে। এই কাজটি আর ফেরানো যাবে না।
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setNoticeToDelete(null)}>বাতিল</AlertDialogCancel>
                            <AlertDialogAction onClick={() => noticeToDelete && handleDelete(noticeToDelete.id)}>
                              মুছে ফেলুন
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'নোটিশ সম্পাদনা করুন' : 'নতুন নোটিশ'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                শিরোনাম
              </Label>
              <Input 
                id="title" 
                value={currentNotice.title || ''}
                onChange={(e) => setCurrentNotice({...currentNotice, title: e.target.value})}
                placeholder="নোটিশের শিরোনাম লিখুন" 
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                তারিখ
              </Label>
              <Input 
                id="date" 
                type="date" 
                value={currentNotice.date || ''}
                onChange={(e) => setCurrentNotice({...currentNotice, date: e.target.value})}
                className="col-span-3" 
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={() => setIsDialogOpen(false)}>
                বাতিল
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleSave}>সংরক্ষণ করুন</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
