
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Award } from 'lucide-react'
import { sanityClient, urlFor } from '@/lib/sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface SuccessfulStudent {
  _id: string;
  name: string;
  achievement: string;
  image: SanityImageSource;
}

const fallbackStudents: Omit<SuccessfulStudent, '_id' | 'image'>[] = [
  { name: 'আবির আহমেদ', achievement: 'এসএসসি পরীক্ষায় জিপিএ-৫ (২০২৩)' },
  { name: 'সুমাইয়া ইসলাম', achievement: 'বিভাগীয় রচনা প্রতিযোগিতায় প্রথম স্থান' },
  { name: 'রাকিব হাসান', achievement: 'জাতীয় বিজ্ঞান অলিম্পিয়াডে বিশেষ পুরস্কার' },
  { name: 'ফারিয়া আক্তার', achievement: 'এসএসসি পরীক্ষায় জিপিএ-৫ (২০২৩)' },
  { name: 'ইমরান হোসেন', achievement: 'জাতীয় বিতর্ক প্রতিযোগিতায় অংশগ্রহণ' },
  { name: 'জান্নাতুল ফেরদৌস', achievement: 'এসএসসি পরীক্ষায় জিপিএ-৫ (২০২২)' },
]

async function getSuccessfulStudents(): Promise<SuccessfulStudent[]> {
  const query = `*[_type == "successfulStudent" && !(_id in path("drafts.**"))] | order(name asc)`;
  try {
    const students = await sanityClient.fetch(query);
     if (students && students.length > 0) {
        return students;
    }
    return fallbackStudents.map((s, i) => ({ ...s, _id: `fallback-${i}`, image: `https://picsum.photos/200/200?random=${i+11}` }));
  } catch (error) {
    console.error("Error fetching successful students from Sanity:", error);
    return fallbackStudents.map((s, i) => ({ ...s, _id: `fallback-${i}`, image: `https://picsum.photos/200/200?random=${i+11}` }));
  }
}


export default async function SuccessfulStudentsPage() {
  const successfulStudents = await getSuccessfulStudents();
  return (
    <main className="flex-1">
      <div>
        <div className="container mx-auto px-4 py-12">
          <Card className="shadow-lg">
            <CardHeader className="text-center bg-primary text-primary-foreground">
              <CardTitle className="text-3xl flex items-center justify-center gap-3">
                <Award className="w-8 h-8" />
                আমাদের কৃতি শিক্ষার্থীবৃন্দ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-center text-muted-foreground mb-8">
                যারা তাদের মেধা ও শ্রম দিয়ে বিদ্যালয়ের মুখ উজ্জ্বল করেছে।
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {successfulStudents.map((student, index) => {
                    const imageUrl = student.image 
                      ? typeof student.image === 'string'
                        ? student.image
                        : urlFor(student.image).width(200).height(200).url()
                      : `https://picsum.photos/200/200?random=${index + 11}`;
                  return (
                  <Card key={student._id || index} className="text-center shadow-md hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <Image
                        src={imageUrl}
                        alt={student.name}
                        width={120}
                        height={120}
                        className="rounded-full mx-auto mb-4 border-4 border-accent"
                      />
                      <h3 className="text-lg font-bold text-primary">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.achievement}</p>
                    </CardContent>
                  </Card>
                )})}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
