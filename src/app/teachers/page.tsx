
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, GraduationCap, Phone, Mail } from 'lucide-react'
import { sanityClient, urlFor } from '@/lib/sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface Teacher {
  _id: string;
  name: string;
  designation: string;
  subject: string;
  phone?: string;
  email?: string;
  image: SanityImageSource;
}

const fallbackTeachers: Omit<Teacher, '_id' | 'image'>[] = [
    { name: 'মোঃ আব্দুল বাতেন', designation: 'প্রধান শিক্ষক', subject: 'গণিত', phone: '01712345678', email: 'headmaster@example.com'},
    { name: 'সহকারী শিক্ষক (নাম)', designation: 'সহকারী প্রধান শিক্ষক', subject: 'ইংরেজি', phone: '01712345679', email: 'asst.head@example.com'},
    { name: 'শিক্ষক ক', designation: 'সহকারী শিক্ষক', subject: 'বাংলা', phone: '01712345680', email: 'teacher.a@example.com'},
    { name: 'শিক্ষক খ', designation: 'সহকারী শিক্ষক', subject: 'বিজ্ঞান', phone: '01712345681', email: 'teacher.b@example.com'},
];

async function getTeachers(): Promise<Teacher[]> {
  const query = `*[_type == "teacher" && !(_id in path("drafts.**"))] | order(name asc)`;
  try {
    const teachers = await sanityClient.fetch(query);
    if (teachers && teachers.length > 0) {
        return teachers;
    }
    return fallbackTeachers.map((t, i) => ({ ...t, _id: `fallback-${i}`, image: `https://picsum.photos/200/200?random=${i+21}` }));
  } catch (error) {
    console.error("Error fetching teachers from Sanity:", error);
    return fallbackTeachers.map((t, i) => ({ ...t, _id: `fallback-${i}`, image: `https://picsum.photos/200/200?random=${i+21}` }));
  }
}

export default async function TeachersPage() {
  const teachers = await getTeachers();

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
                                {teachers.map((teacher, index) => {
                                     const imageUrl = teacher.image 
                                      ? typeof teacher.image === 'string'
                                        ? teacher.image
                                        : urlFor(teacher.image).width(200).height(200).fit('crop').url()
                                      : `https://picsum.photos/200/200?random=${index + 21}`;
                                    return (
                                        <Card key={teacher._id} className="text-center shadow-md hover:shadow-xl transition-shadow">
                                            <CardContent className="p-6">
                                            <Image
                                                src={imageUrl}
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
                                    )
                                })}
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
