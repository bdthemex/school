
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, BookOpen } from 'lucide-react'
import type { Metadata } from 'next';
import content from '@/data/about.json';

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে",
  description: 'আমাদের বিদ্যালয় সম্পর্কে জানুন।',
};

export default function AboutPage() {
  return (
    <main className="flex-1">
        <div>
            <div className="container mx-auto px-4 py-12">
            <Card className="shadow-lg">
                <CardHeader className="text-center bg-primary text-primary-foreground rounded-t-lg">
                <CardTitle className="text-3xl">আমাদের সম্পর্কে</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/3">
                    <Image
                        src={content.mainImage}
                        alt="School Building"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-md w-full"
                        data-ai-hint="school building"
                    />
                    </div>
                    <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold text-primary mb-4">{content.schoolName}</h2>
                    <p className="text-foreground leading-relaxed text-base">
                        {content.description}
                    </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                            <Target className="w-6 h-6 text-accent" />
                            {content.missionTitle}
                        </h3>
                        <ul className="list-disc list-inside text-foreground space-y-2 leading-relaxed text-base">
                           {content.missionPoints.map((point, index) => (
                             <li key={index}>{point}</li>
                           ))}
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-accent" />
                            {content.academicTitle}
                        </h3>
                        <p className="text-foreground leading-relaxed text-base">
                            {content.academicDescription}
                        </p>
                    </div>
                </div>
                </CardContent>
            </Card>
            </div>
        </div>
    </main>
  )
}
