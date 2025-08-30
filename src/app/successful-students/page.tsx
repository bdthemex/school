
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Award } from 'lucide-react'

const successfulStudents = [
  { name: 'আবির আহমেদ', achievement: 'এসএসসি পরীক্ষায় জিপিএ-৫ (২০২৩)', image: 'https://picsum.photos/200/200?random=11', dataAiHint: 'student portrait' },
  { name: 'সুমাইয়া ইসলাম', achievement: 'বিভাগীয় রচনা প্রতিযোগিতায় প্রথম স্থান', image: 'https://picsum.photos/200/200?random=12', dataAiHint: 'student portrait' },
  { name: 'রাকিব হাসান', achievement: 'জাতীয় বিজ্ঞান অলিম্পিয়াডে বিশেষ পুরস্কার', image: 'https://picsum.photos/200/200?random=13', dataAiHint: 'student portrait' },
  { name: 'ফারিয়া আক্তার', achievement: 'এসএসসি পরীক্ষায় জিপিএ-৫ (২০২৩)', image: 'https://picsum.photos/200/200?random=14', dataAiHint: 'student portrait' },
  { name: 'ইমরান হোসেন', achievement: 'জাতীয় বিতর্ক প্রতিযোগিতায় অংশগ্রহণ', image: 'https://picsum.photos/200/200?random=15', dataAiHint: 'student portrait' },
  { name: 'জান্নাতুল ফেরদৌস', achievement: 'এসএসসি পরীক্ষায় জিপিএ-৫ (২০২২)', image: 'https://picsum.photos/200/200?random=16', dataAiHint: 'student portrait' },
]

export default function SuccessfulStudentsPage() {
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
                {successfulStudents.map((student, index) => (
                  <Card key={index} className="text-center shadow-md hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <Image
                        src={student.image}
                        alt={student.name}
                        width={120}
                        height={120}
                        className="rounded-full mx-auto mb-4 border-4 border-accent"
                        data-ai-hint={student.dataAiHint}
                      />
                      <h3 className="text-lg font-bold text-primary">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.achievement}</p>
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
