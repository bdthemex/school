
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

async function getTeachers(): Promise<Teacher[]> {
  const query = `*[_type == "teacher"]{
    _id,
    name,
    designation,
    subject,
    phone,
    email,
    image
  }`;
  const teachers = await sanityClient.fetch(query);
  return teachers;
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
                                {teachers.map((teacher) => (
                                <Card key={teacher._id} className="text-center shadow-md hover:shadow-xl transition-shadow">
                                    <CardContent className="p-6">
                                    <Image
                                        src={urlFor(teacher.image).width(200).height(200).fit('crop').url()}
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
