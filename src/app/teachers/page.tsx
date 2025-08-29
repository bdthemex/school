
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, GraduationCap, Phone, Mail } from 'lucide-react'

const teachers = [
  { name: 'মোঃ আব্দুল বাতেন', designation: 'প্রধান শিক্ষক', subject: 'গণিত', phone: '01712-345678', email: 'principal@example.com', image: 'https://picsum.photos/200/200?random=1', dataAiHint: 'teacher portrait' },
  { name: 'শিক্ষক খ', designation: 'সহকারী প্রধান শিক্ষক', subject: 'ইংরেজি', phone: '01712-345678', email: 'teacher2@example.com', image: 'https://picsum.photos/200/200?random=2', dataAiHint: 'teacher portrait' },
  { name: 'শিক্ষক গ', designation: 'সিনিয়র শিক্ষক', subject: 'বাংলা', phone: '01712-345678', email: 'teacher3@example.com', image: 'https://picsum.photos/200/200?random=3', dataAiHint: 'teacher portrait' },
  { name: 'শিক্ষক ঘ', designation: 'সহকারী শিক্ষক', subject: 'বিজ্ঞান', phone: '01712-345678', email: 'teacher4@example.com', image: 'https://picsum.photos/200/200?random=4', dataAiHint: 'teacher portrait' },
  { name: 'শিক্ষক ঙ', designation: 'সহকারী শিক্ষক', subject: 'সমাজ বিজ্ঞান', phone: '01712-345678', email: 'teacher5@example.com', image: 'https://picsum.photos/200/200?random=5', dataAiHint: 'teacher portrait' },
  { name: 'শিক্ষক চ', designation: 'সহকারী শিক্ষক', subject: 'ধর্ম', phone: '01712-345678', email: 'teacher6@example.com', image: 'https://picsum.photos/200/200?random=6', dataAiHint: 'teacher portrait' },
]

export default function TeachersPage() {
  return (
    <main className="flex-1">
        <div className="p-4">
            <div className="container mx-auto px-4 py-12">
                <Card className="shadow-lg">
                    <CardHeader className="text-center bg-primary text-primary-foreground">
                        <CardTitle className="text-3xl flex items-center justify-center gap-3">
                            <Users className="w-8 h-8" />
                            আমাদের অভিজ্ঞ শিক্ষকমণ্ডলী
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {teachers.map((teacher, index) => (
                            <Card key={index} className="text-center shadow-md hover:shadow-xl transition-shadow">
                                <CardContent className="p-6">
                                <Image
                                    src={teacher.image}
                                    alt={teacher.name}
                                    width={120}
                                    height={120}
                                    className="rounded-full mx-auto mb-4 border-4 border-accent"
                                    data-ai-hint={teacher.dataAiHint}
                                />
                                <h3 className="text-lg font-bold text-primary">{teacher.name}</h3>
                                <p className="text-sm text-muted-foreground">{teacher.designation}</p>
                                <p className="text-sm font-medium text-accent mt-2 flex items-center justify-center gap-2">
                                    <GraduationCap className="w-4 h-4" />
                                    {teacher.subject}
                                </p>
                                <div className="mt-4 text-xs text-muted-foreground space-y-1">
                                    <p className="flex items-center justify-center gap-2">
                                        <Phone className="w-3 h-3" /> {teacher.phone}
                                    </p>
                                    <p className="flex items-center justify-center gap-2">
                                        <Mail className="w-3 h-3" /> {teacher.email}
                                    </p>
                                </div>
                                </CardContent>
                            </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </main>
  )
}
