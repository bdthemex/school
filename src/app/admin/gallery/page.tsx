
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore'
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { db, storage } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { PlusCircle, Trash2, Upload, Loader2, XCircle } from 'lucide-react'
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
import { Progress } from '@/components/ui/progress'


interface GalleryImage {
  id: string;
  alt: string;
  imageUrl: string;
  imagePath: string; 
  createdAt?: Timestamp;
}

export default function GalleryManagementPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [newImage, setNewImage] = useState<File | null>(null)
  const [altText, setAltText] = useState('')
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const imagesCollectionRef = collection(db, 'gallery')

  const getImages = async () => {
    setIsLoading(true)
    try {
      const q = query(imagesCollectionRef, orderBy('createdAt', 'desc'))
      const data = await getDocs(q)
      const filteredData = data.docs.map((doc) => ({
        ...(doc.data() as Omit<GalleryImage, 'id'>),
        id: doc.id,
      }))
      setImages(filteredData)
    } catch (error) {
      console.error("Error fetching images:", error)
      toast({
        title: "ত্রুটি",
        description: "ছবি আনতে সমস্যা হয়েছে।",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getImages()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!newImage || !altText) {
      toast({
        title: "ত্রুটি",
        description: "অনুগ্রহ করে একটি ছবি নির্বাচন করুন এবং শিরোনাম লিখুন।",
        variant: "destructive",
      })
      return
    }

    const imagePath = `gallery/${newImage.name}_${Date.now()}`
    const storageRef = ref(storage, imagePath)
    const uploadTask = uploadBytesResumable(storageRef, newImage)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setUploadProgress(progress)
      },
      (error) => {
        console.error("Upload failed:", error)
        toast({
          title: "আপলোড ব্যর্থ হয়েছে",
          description: "ছবিটি আপলোড করা যায়নি। আবার চেষ্টা করুন।",
          variant: "destructive",
        })
        setUploadProgress(null)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await addDoc(imagesCollectionRef, {
            alt: altText,
            imageUrl: downloadURL,
            imagePath: imagePath,
            createdAt: serverTimestamp(),
          })

          toast({
            title: "সফল",
            description: "ছবি সফলভাবে আপলোড করা হয়েছে।",
          })
          setNewImage(null)
          setAltText('')
          setUploadProgress(null)
          document.getElementById('image-upload-input')?.setAttribute('value', '');
          getImages()
        })
      }
    )
  }

  const handleDelete = async (image: GalleryImage) => {
    try {
      // Delete from storage
      const imageRef = ref(storage, image.imagePath)
      await deleteObject(imageRef)

      // Delete from firestore
      const imageDoc = doc(db, 'gallery', image.id)
      await deleteDoc(imageDoc)
      
      toast({
        title: "সফল",
        description: "ছবিটি সফলভাবে মুছে ফেলা হয়েছে।",
      })
      getImages()
    } catch (error) {
      console.error("Error deleting image:", error)
      toast({
        title: "ত্রুটি",
        description: "ছবিটি মুছতে সমস্যা হয়েছে।",
        variant: "destructive",
      })
    }
  }


  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">গ্যালারি ম্যানেজমেন্ট</CardTitle>
          <CardDescription>এখান থেকে ওয়েবসাইটের গ্যালারির ছবি পরিচালনা করুন।</CardDescription>
        </CardHeader>
        <CardContent>
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <PlusCircle className="w-5 h-5" />
                        নতুন ছবি যোগ করুন
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div>
                        <Label htmlFor="alt-text">ছবির শিরোনাম</Label>
                        <Input 
                            id="alt-text"
                            value={altText}
                            onChange={(e) => setAltText(e.target.value)}
                            placeholder="যেমন: বার্ষিক ক্রীড়া প্রতিযোগিতা"
                            disabled={uploadProgress !== null}
                        />
                     </div>
                     <div>
                        <Label htmlFor="image-upload-input">ছবি ফাইল</Label>
                        <Input 
                           id="image-upload-input"
                           type="file"
                           onChange={handleFileChange}
                           accept="image/*"
                           className="file:text-primary file:font-medium"
                           disabled={uploadProgress !== null}
                        />
                     </div>
                     {uploadProgress !== null && (
                        <div className="space-y-2">
                           <Progress value={uploadProgress} />
                           <p className="text-sm text-center text-muted-foreground">আপলোড হচ্ছে... {Math.round(uploadProgress)}%</p>
                        </div>
                     )}
                     <Button onClick={handleUpload} disabled={uploadProgress !== null}>
                        {uploadProgress !== null ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Upload className="mr-2 h-4 w-4"/>}
                        আপলোড করুন
                     </Button>
                </CardContent>
            </Card>
            
            <div>
                 <h3 className="text-xl font-bold text-primary mb-4">সকল ছবি</h3>
                 {isLoading ? (
                    <p>লোড হচ্ছে...</p>
                 ) : images.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">গ্যালারিতে কোনো ছবি নেই।</p>
                 ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {images.map((image) => (
                            <Card key={image.id} className="group relative overflow-hidden">
                                <Image 
                                    src={image.imageUrl}
                                    alt={image.alt}
                                    width={200}
                                    height={200}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-2">
                                    <p className="text-xs truncate" title={image.alt}>{image.alt}</p>
                                </div>
                                <div className="absolute top-2 right-2">
                                     <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                           <Button variant="destructive" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                             <Trash2 className="h-4 w-4" />
                                           </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>আপনি কি নিশ্চিত?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              এই ছবিটি মুছে ফেলা হবে। এই কাজটি আর ফেরানো যাবে না।
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>বাতিল</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(image)}>
                                              মুছে ফেলুন
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                </div>
                            </Card>
                        ))}
                    </div>
                 )}
            </div>

        </CardContent>
      </Card>
    </div>
  )
}
