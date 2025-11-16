'use client'

import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Trophy, Search, FileText, User, ChevronsRight, Printer, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton'
import { getSheetData } from '@/lib/data-loader'

const searchSchema = z.object({
  examType: z.string().min(1, 'পরীক্ষার নাম নির্বাচন করুন'),
  class: z.string().min(1, 'শ্রেণী নির্বাচন করুন'),
  roll: z.string().min(1, 'রোল নম্বর দিন'),
})

type SearchFormValues = z.infer<typeof searchSchema>

interface SubjectResult {
  subject: string;
  marks: string;
}

interface StudentResult {
  studentName: string;
  examType: string;
  className: string;
  roll: string;
  totalMarks: number;
  grade: string;
  results: SubjectResult[];
  [key: string]: any;
}

function extractSubjects(resultData: { [key: string]: any }): SubjectResult[] {
    const predefinedColumns = ['studentName', 'examType', 'className', 'roll', 'totalMarks', 'grade', 'year'];
    const subjects: SubjectResult[] = [];
    
    for (const key in resultData) {
        if (!predefinedColumns.includes(key) && resultData[key]) {
            const marks = parseInt(resultData[key], 10);
            if (!isNaN(marks)) {
                subjects.push({ subject: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '), marks: resultData[key] });
            }
        }
    }
    return subjects;
}


async function searchResult(params: SearchFormValues, allResults: any[]): Promise<{ success: boolean, data: StudentResult | null, message?: string }> {
    try {
        const resultData = allResults.find(r => 
            r.examType === params.examType &&
            r.className === params.class &&
            r.roll === params.roll
        );

        if (resultData) {
            const subjects = extractSubjects(resultData);
            const finalResult: StudentResult = {
                studentName: resultData.studentName || '',
                examType: resultData.examType || '',
                className: resultData.className || '',
                roll: resultData.roll || '',
                totalMarks: parseInt(resultData.totalMarks, 10) || 0,
                grade: resultData.grade || 'N/A',
                results: subjects,
            };
            return { success: true, data: finalResult };
        }

        return { success: true, data: null };
    } catch(error) {
        console.error("Error searching result:", error);
        return { success: false, data: null, message: "ফলাফল খুঁজতে গিয়ে একটি সমস্যা হয়েছে।" };
    }
}

const SearchFormSkeleton = () => (
    <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
            <div>
                <Label htmlFor="examType">পরীক্ষার নাম</Label>
                <Skeleton className="h-10 w-full" />
            </div>
            <div>
                <Label htmlFor="class">শ্রেণী</Label>
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="sm:col-span-2">
                <Label htmlFor="roll">রোল নম্বর</Label>
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
        <Skeleton className="h-10 w-full" />
    </div>
);


export default function ResultsPage() {
    const [allResults, setAllResults] = useState<any[]>([]);
    const [result, setResult] = useState<StudentResult | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [searched, setSearched] = useState(false)
    const [isFetchingSheet, setIsFetchingSheet] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await getSheetData('results_sheet');
                if (!data) {
                    throw new Error("ফলাফলের ডেটা আনা সম্ভব হয়নি।");
                }
                setAllResults(data);
            } catch (e) {
                console.error("Error fetching results sheet:", e);
                setError("ফলাফল লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
            } finally {
                setIsFetchingSheet(false);
            }
        };

        fetchResults();
    }, []);

    const { control, handleSubmit, formState: { errors } } = useForm<SearchFormValues>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            examType: '',
            class: '',
            roll: ''
        }
    });

    const onSubmit = async (data: SearchFormValues) => {
        setIsLoading(true);
        setSearched(false);
        setResult(null);
        setError(null);
        
        const response = await searchResult(data, allResults);

        if (response.success) {
            setResult(response.data);
        } else {
            setError(response.message || 'An unknown error occurred.');
        }

        setIsLoading(false);
        setSearched(true);
    }

    const handlePrint = () => {
        window.print();
    }

    const handleShare = async () => {
        if (result && navigator.share) {
            try {
                await navigator.share({
                    title: `Result for ${result.studentName}`,
                    text: `Exam: ${result.examType}\nName: ${result.studentName}\nRoll: ${result.roll}\nGrade: ${result.grade}`,
                    url: window.location.href,
                });
            } catch (error) {
                toast({
                    title: "শেয়ার করা সম্ভব হয়নি",
                    description: "আপনার ব্রাউজারটি এই ফিচারটি সমর্থন নাও করতে পারে।",
                    variant: "destructive",
                });
            }
        } else {
             toast({
                title: "শেয়ার ফিচারটি উপলভ্য নয়",
                description: "আপনার ব্রাউজারটি এই ফিচারটি সমর্থন করে না।",
                variant: "destructive",
            });
        }
    }

  return (
    <main className="flex-1" id="results-page">
        <div className="container mx-auto px-4 py-12">
            <Card className="shadow-lg print-card">
                <CardHeader className="text-center bg-primary text-primary-foreground no-print">
                    <CardTitle className="text-3xl flex items-center justify-center gap-3">
                        <Trophy className="w-8 h-8" />
                        পরীক্ষার ফলাফল
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                    <Card className="max-w-2xl mx-auto shadow-md no-print">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-primary">
                                <Search className='w-6 h-6'/>
                                ফলাফল অনুসন্ধান করুন
                            </CardTitle>
                            <CardDescription>অনুগ্রহ করে নিচের তথ্যগুলো পূরণ করে ফলাফল দেখুন।</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isFetchingSheet ? (
                                 <SearchFormSkeleton />
                            ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="examType">পরীক্ষার নাম</Label>
                                         <Controller
                                            name="examType"
                                            control={control}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger id="examType">
                                                        <SelectValue placeholder="পরীক্ষার নাম নির্বাচন করুন" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="বার্ষিক পরীক্ষা">বার্ষিক পরীক্ষা</SelectItem>
                                                        <SelectItem value="অর্ধ-বার্ষিক পরীক্ষা">অর্ধ-বার্ষিক পরীক্ষা</SelectItem>
                                                        <SelectItem value="প্রাক-নির্বাচনী">প্রাক-নির্বাচনী</SelectItem>
                                                        <SelectItem value="নির্বাচনী">নির্বাচনী</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        {errors.examType && <p className="text-red-500 text-xs mt-1">{errors.examType.message}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="class">শ্রেণী</Label>
                                        <Controller
                                            name="class"
                                            control={control}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger id="class">
                                                        <SelectValue placeholder="শ্রেণী নির্বাচন করুন" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="৬ষ্ঠ">৬ষ্ঠ</SelectItem>
                                                        <SelectItem value="৭ম">৭ম</SelectItem>
                                                        <SelectItem value="৮ম">৮ম</SelectItem>
                                                        <SelectItem value="৯ম">৯ম</SelectItem>
                                                        <SelectItem value="১০ম">১০ম</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        {errors.class && <p className="text-red-500 text-xs mt-1">{errors.class.message}</p>}
                                    </div>
                                    <div className="sm:col-span-2">
                                        <Label htmlFor="roll">রোল নম্বর</Label>
                                        <Controller
                                            name="roll"
                                            control={control}
                                            render={({ field }) => <Input id="roll" placeholder="রোল নম্বর লিখুন" {...field} />}
                                        />
                                        {errors.roll && <p className="text-red-500 text-xs mt-1">{errors.roll.message}</p>}
                                    </div>
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading || isFetchingSheet}>
                                    {isLoading ? 'অনুসন্ধান করা হচ্ছে...' : 'ফলাফল দেখুন'}
                                </Button>
                            </form>
                            )}
                        </CardContent>
                    </Card>
                    
                    {isLoading && <p className="text-center mt-8">লোড হচ্ছে...</p>}

                    {searched && !isLoading && result && (
                        <Card className="mt-8 shadow-lg" id="marksheet">
                            <CardHeader className="bg-muted/50">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-primary flex items-center gap-2">
                                        <FileText className="w-6 h-6"/>
                                        মার্কশিট
                                    </CardTitle>
                                    <div className="flex gap-2 no-print">
                                        <Button variant="outline" size="sm" onClick={handlePrint}>
                                            <Printer className="mr-2 h-4 w-4" />
                                            প্রিন্ট করুন
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={handleShare}>
                                            <Share2 className="mr-2 h-4 w-4" />
                                            শেয়ার করুন
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm">
                                    <div className="space-y-2">
                                        <p className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-muted-foreground"/>
                                            <strong>শিক্ষার্থীর নাম:</strong> {result.studentName}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <ChevronsRight className="w-4 h-4 text-muted-foreground"/>
                                            <strong>পরীক্ষার নাম:</strong> {result.examType}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="flex items-center gap-2">
                                            <ChevronsRight className="w-4 h-4 text-muted-foreground"/>
                                            <strong>শ্রেণী:</strong> {result.className}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <ChevronsRight className="w-4 h-4 text-muted-foreground"/>
                                            <strong>রোল:</strong> {result.roll}
                                        </p>
                                    </div>
                                </div>
                                <div className="border rounded-lg overflow-hidden">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>বিষয়</TableHead>
                                                <TableHead className="text-right">প্রাপ্ত নম্বর</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {result.results.map((res, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{res.subject}</TableCell>
                                                    <TableCell className="text-right font-mono">{res.marks}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                 <div className="mt-6 flex justify-between items-center text-sm font-bold bg-accent text-accent-foreground p-3 rounded-md">
                                    <span>মোট নম্বর: {result.totalMarks}</span>
                                    <span>গ্রেড: {result.grade}</span>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                    
                    {searched && !isLoading && !result && (
                         <p className="text-center text-destructive mt-8">দুঃখিত, আপনার দেওয়া তথ্যের সাথে মিলে এমন কোনো ফলাফল পাওয়া যায়নি।</p>
                    )}
                    
                    {error && (
                        <p className="text-center text-destructive mt-8">{error}</p>
                    )}

                </CardContent>
            </Card>
        </div>
    </main>
  );
}
