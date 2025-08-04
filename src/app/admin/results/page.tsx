
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
import { PlusCircle, Edit, Trash2, FileText } from 'lucide-react'
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
import { useToast } from "@/hooks/use-toast"

interface Result {
  id: string;
  title: string;
  resultUrl: string;
  createdAt: Timestamp;
}

export default function ResultManagementPage() {
  const [results, setResults] = useState<Result[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentResult, setCurrentResult] = useState<Partial<Result>>({})
  const [isEditing, setIsEditing] = useState(false)
  const [resultToDelete, setResultToDelete] = useState<Result | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast()

  const resultsCollectionRef = collection(db, 'results')

  const getResults = async () => {
    setIsLoading(true);
    try {
      const q = query(resultsCollectionRef, orderBy('createdAt', 'desc'))
      const data = await getDocs(q)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      } as Result))
      setResults(filteredData)
    } catch (error) {
      console.error("Error fetching results:", error)
      toast({
        title: "ত্রুটি",
        description: "ফলাফল আনতে সমস্যা হয়েছে।",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getResults()
  }, [])

  const handleOpenDialog = (result?: Result) => {
    if (result) {
      setCurrentResult(result)
      setIsEditing(true)
    } else {
      setCurrentResult({ title: '', resultUrl: '' })
      setIsEditing(false)
    }
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    if (!currentResult.title || !currentResult.resultUrl) {
        toast({ title: "ত্রুটি", description: "শিরোনাম এবং ফলাফলের লিঙ্ক পূরণ করুন।", variant: "destructive" })
        return;
    }

    try {
        if (isEditing && currentResult.id) {
            const resultDoc = doc(db, "results", currentResult.id)
            await updateDoc(resultDoc, { 
              title: currentResult.title, 
              resultUrl: currentResult.resultUrl,
            })
            toast({ title: "সফল", description: "ফলাফলটি সফলভাবে আপডেট করা হয়েছে।" })
        } else {
            await addDoc(resultsCollectionRef, { 
              title: currentResult.title, 
              resultUrl: currentResult.resultUrl, 
              createdAt: serverTimestamp() 
            })
            toast({ title: "সফল", description: "নতুন ফলাফল যোগ করা হয়েছে।" })
        }
        getResults()
        setIsDialogOpen(false)
        setCurrentResult({})
    } catch (error) {
        console.error("Error saving result:", error)
        toast({ title: "ত্রুটি", description: "ফলাফল সংরক্ষণ করতে সমস্যা হয়েছে।", variant: "destructive" })
    }
  }

  const handleDelete = async (id: string) => {
    try {
        const resultDoc = doc(db, "results", id)
        await deleteDoc(resultDoc)
        toast({ title: "সফল", description: "ফলাফলটি মুছে ফেলা হয়েছে।" })
        getResults()
    } catch (error) {
        console.error("Error deleting result:", error)
        toast({ title: "ত্রুটি", description: "ফলাফলটি মুছতে সমস্যা হয়েছে।", variant: "destructive" })
    }
  };


  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-primary">ফলাফল ম্যানেজমেন্ট</CardTitle>
              <CardDescription>এখান থেকে ওয়েবসাইটের সকল পরীক্ষার ফলাফল পরিচালনা করুন।</CardDescription>
            </div>
            <Button onClick={() => handleOpenDialog()}>
              <PlusCircle className="mr-2 h-4 w-4" />
              নতুন ফলাফল যোগ করুন
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>শিরোনাম</TableHead>
                  <TableHead>ফলাফলের লিঙ্ক</TableHead>
                  <TableHead className="text-right w-[150px]">কার্যক্রম</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center">লোড হচ্ছে...</TableCell>
                    </TableRow>
                ) : results.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.title}</TableCell>
                    <TableCell>
                        <a href={result.resultUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            ফলাফল দেখুন
                        </a>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800" onClick={() => handleOpenDialog(result)}>
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
                              এই ফলাফলটি মুছে ফেলা হবে। এই কাজটি আর ফেরানো যাবে না।
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>বাতিল</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(result.id)}>
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
            <DialogTitle>{isEditing ? 'ফলাফল সম্পাদনা করুন' : 'নতুন ফলাফল'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                শিরোনাম
              </Label>
              <Input 
                id="title" 
                value={currentResult.title || ''}
                onChange={(e) => setCurrentResult({...currentResult, title: e.target.value})}
                placeholder="ফলাফলের শিরোনাম লিখুন" 
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resultUrl" className="text-right">
                ফলাফলের লিঙ্ক
              </Label>
              <Input 
                id="resultUrl" 
                value={currentResult.resultUrl || ''}
                onChange={(e) => setCurrentResult({...currentResult, resultUrl: e.target.value})}
                placeholder="ফলাফলের গুগল ড্রাইভ লিঙ্ক" 
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
