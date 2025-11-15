import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Award } from 'lucide-react'
import type { Metadata } from 'next';
import { getSheetData } from '@/lib/data-loader';

export const metadata: Metadata = {
  title: 'কৃতি শিক্ষার্থীবৃন্দ',
  description: 'আমাদের বিদ্যালয়ের কৃতি শিক্ষার্থীদের দেখুন যারা তাদের মেধা দিয়ে বিদ্যালয়ের মুখ উজ্জ্বল করেছে।',
};

export default async function SuccessfulStudentsPage() {
  const successfulStudents = await getSheetData('successful_students');

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
              {successfulStudents.length > 0 ? (
                <>
                  <p className="text-center text-muted-foreground mb-8">
                    যারা তাদের মেধা ও শ্রম দিয়ে বিদ্যালয়ের মুখ উজ্জ্বল করেছে।
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {successfulStudents.map((student: any) => (
                      <Card key={student.id} className="text-center shadow-md hover:shadow-xl transition-shadow">
                        <CardContent className="p-6">
                          <Image
                            src={student.image}
                            alt={student.name}
                            width={120}
                            height={120}
                            className="rounded-full mx-auto mb-4 border-4 border-accent"
                          />
                          <h3 className="text-lg font-bold text-primary">{student.name}</h3>
                          <p className="text-sm text-muted-foreground">{student.achievement}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-center text-muted-foreground">কোনো কৃতি শিক্ষার্থীর তথ্য পাওয়া যায়নি।</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
