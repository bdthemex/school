
'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Download, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

interface Result {
  id: string;
  title: string;
  resultUrl: string;
  createdAt: Timestamp;
}

export default function ResultsPage() {
    const [results, setResults] = useState<Result[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getResults = async () => {
            setIsLoading(true);
            try {
                const resultsCollectionRef = collection(db, 'results')
                const q = query(resultsCollectionRef, orderBy('createdAt', 'desc'))
                const data = await getDocs(q)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                } as Result))
                setResults(filteredData)
            } catch (error) {
                console.error("Error fetching results:", error)
            } finally {
                setIsLoading(false);
            }
        }
        getResults()
    }, [])

  return (
    <main className="flex-1">
        <div className="max-w-7xl mx-auto shadow-lg bg-background p-4">
            <div className="container mx-auto px-4 py-12">
                <Card className="shadow-lg">
                    <CardHeader className="text-center bg-primary text-primary-foreground">
                        <CardTitle className="text-3xl flex items-center justify-center gap-3">
                            <Trophy className="w-8 h-8" />
                            পরীক্ষার ফলাফল
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="space-y-4">
                            {isLoading ? (
                                Array.from({ length: 4 }).map((_, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-[300px]" />
                                            <Skeleton className="h-4 w-[150px]" />
                                        </div>
                                        <Skeleton className="h-10 w-[120px]" />
                                    </div>
                                ))
                            ) : results.map((result) => (
                                <div key={result.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className='flex items-center gap-3'>
                                        <FileText className='w-6 h-6 text-accent' />
                                        <p className="font-semibold text-primary">{result.title}</p>
                                    </div>
                                    <Button asChild>
                                        <a href={result.resultUrl} target="_blank" rel="noopener noreferrer">
                                            <Download className="mr-2 h-4 w-4" />
                                            ফলাফল ডাউনলোড
                                        </a>
                                    </Button>
                                </div>
                            ))}
                            { !isLoading && results.length === 0 && (
                                <p className="text-center text-muted-foreground py-8">এখনো কোনো ফলাফল প্রকাশ করা হয়নি।</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </main>
  )
}
