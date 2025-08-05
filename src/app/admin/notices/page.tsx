
'use client'

import { useState, useEffect } from 'react'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
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
import { useToast } from "@/hooks/use-toast"

interface Notice {
  id: string;
  date: string;
  title: string;
  createdAt?: Timestamp; 
}

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function NoticeManagementPage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentNotice, setCurrentNotice] = useState<Partial<Notice>>({})
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast()

  const noticesCollectionRef = collection(db, 'notices')

  const getNotices = async () => {
    setIsLoading(true);
    try {
      const q = query(noticesCollectionRef, orderBy('createdAt', 'desc'))
      const data = await getDocs(q)
      const filteredData = data.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          date: docData.date, 
          title: docData.title,
        } as Notice
      })
      setNotices(filteredData)
    } catch (error) {
      console.error("Error fetching notices:", error)
      toast({
        title: "ত্রুটি",
        description: "নোটিশ আনতে সমস্যা হয়েছে।",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getNotices()
  }, [])

  const handleOpenDialog = (notice?: Notice) => {
    if (notice) {
      setCurrentNotice({ ...notice })
      setIsEditing(true)
    } else {
      setCurrentNotice({ date: formatDate(new Date()), title: '' })
      setIsEditing(false)
    }
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    if (!currentNotice.title || !currentNotice.date) {
        toast({ title: "ত্রুটি", description: "শিরোনাম এবং তারিখ পূরণ করুন।", variant: "destructive" })
        return;
    }

    try {
        if (isEditing && currentNotice.id) {
            const noticeDoc = doc(db, "notices", currentNotice.id)
            await updateDoc(noticeDoc, {
              title: currentNotice.title,
              date: currentNotice.date,
            })
            toast({ title: "সফল", description: "নোটিশটি সফলভাবে আপডেট করা হয়েছে।" })
        } else {
            await addDoc(noticesCollectionRef, { 
              title: currentNotice.title, 
              date: currentNotice.date, 
              createdAt: serverTimestamp() 
            })
            toast({ title: "সফল", description: "নতুন নোটিশ যোগ করা হয়েছে।" })
        }
        await getNotices() 
        setIsDialogOpen(false)
        setCurrentNotice({})
    } catch (error) {
        console.error("Error saving notice:", error)
        toast({ title: "ত্রুটি", description: "নোটিশ সংরক্ষণ করতে সমস্যা হয়েছে।", variant: "destructive" })
    }
  }

  const handleDelete = async (id: string) => {
    try {
        const noticeDoc = doc(db, "notices", id)
        await deleteDoc(noticeDoc)
        toast({ title: "সফল", description: "নোটিশটি মুছে ফেলা হয়েছে।" })
        await getNotices() 
    } catch (error) {
        console.error("Error deleting notice:", error)
        toast({ title: "ত্রুটি", description: "নোটিশটি মুছতে সমস্যা হয়েছে।", variant: "destructive" })
    }
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
                {isLoading ? (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center py-8">লোড হচ্ছে...</TableCell>
                    </TableRow>
                ) : notices.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center py-8">কোনো নোটিশ পাওয়া যায়নি। নতুন নোটিশ যোগ করুন।</TableCell>
                    </TableRow>
                ) : notices.map((notice) => (
                  <TableRow key={notice.id}>
                    <TableCell className="font-medium">{notice.date}</TableCell>
                    <TableCell>{notice.title}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800" onClick={() => handleOpenDialog(notice)}>
                        <Edit className="h-4 w-4" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-800">
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
                            <AlertDialogCancel>বাতিল</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(notice.id)}>
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
              <Button type="button" variant="secondary" onClick={() => { setIsDialogOpen(false); setCurrentNotice({}); }}>
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
