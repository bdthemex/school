
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, GraduationCap, Phone, Mail } from 'lucide-react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'শিক্ষক পরিচিতি',
  description: 'আমাদের বিদ্যালয়ের অভিজ্ঞ শিক্ষকমণ্ডলীর তালিকা।',
};

interface Teacher {
  _id: string;
  name: string;
  designation: string;
  subject: string;
  phone?: string;
  email?: string;
  image: string;
}

function getTeachers(): Teacher[] {
  return [
    {
      _id: "t1",
      name: "মোঃ আব্দুল বাতেন",
      designation: "প্রধান শিক্ষক",
      subject: "গণিত",
      phone: "01712345678",
      email: "principal@example.com",
      image: "https://picsum.photos/200/200?random=teacher1",
    },
    {
      _id: "t2",
      name: "মোঃ আব্দুল হামিদ",
      designation: "সহকারী প্রধান শিক্ষক",
      subject: "ইংরেজি",
      phone: "01712345679",
      email: "viceprincipal@example.com",
      image: "https://picsum.photos/200/200?random=teacher2",
    },
    {
      _id: "t3",
      name: "জনাব রফিকুল ইসলাম",
      designation: "সহকারী শিক্ষক",
      subject: "বাংলা",
      phone: "01712345680",
      email: "rafiq@example.com",
      image: "https://picsum.photos/200/200?random=teacher3",
    },
    {
      _id: "t4",
      name: "মিসেস আমেনা বেগম",
      designation: "সহকারী শিক্ষক",
      subject: "বিজ্ঞান",
      phone: "01712345681",
      email: "amena@example.com",
      image: "https://picsum.photos/200/200?random=teacher4",
    },
  ];
}

export default function TeachersPage() {
  const teachers = getTeachers();

  return (
    <main className="flex-1">
        <div>
            <div className="container mx-auto px-4 py-12">
                <Card className="shadow-lg">
                    <CardHeader className="text-center bg-primary text-primary-foreground">
                        <CardTitle className="text-3xl flex items-center justify-center gap-3">
                            <Users className="w-8 h-8" />
                            আমাদের অভিজ্ঞ শিক্ষকমণ্ডলী
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        {teachers.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                {teachers.map((teacher) => (
                                    <Card key={teacher._id} className="text-center shadow-md hover:shadow-xl transition-shadow">
                                        <CardContent className="p-6">
                                        <Image
                                            src={teacher.image}
                                            alt={teacher.name}
                                            width={120}
                                            height={120}
                                            className="rounded-full mx-auto mb-4 border-4 border-accent"
                                        />
                                        <h3 className="text-lg font-bold text-primary">{teacher.name}</h3>
                                        <p className="text-sm text-muted-foreground">{teacher.designation}</p>
                                        <p className="text-sm font-medium text-accent mt-2 flex items-center justify-center gap-2">
                                            <GraduationCap className="w-4 h-4" />
                                            {teacher.subject}
                                        </p>
                                        <div className="mt-4 text-xs text-muted-foreground space-y-1">
                                            {teacher.phone && (
                                                <p className="flex items-center justify-center gap-2">
                                                    <Phone className="w-3 h-3" /> {teacher.phone}
                                                </p>
                                            )}
                                            {teacher.email && (
                                                <p className="flex items-center justify-center gap-2">
                                                    <Mail className="w-3 h-3" /> {teacher.email}
                                                </p>
                                            )}
                                        </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-muted-foreground">কোনো শিক্ষকের তথ্য পাওয়া যায়নি।</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    </main>
  )
}
