
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building, Target, BookOpen } from 'lucide-react'
import type { Metadata } from 'next';

interface AboutContent {
  _id: string;
  schoolName: string;
  description: string;
  mainImage: string;
  missionTitle: string;
  missionPoints: string[];
  academicTitle: string;
  academicDescription: string;
}

function getAboutContent(): AboutContent {
  return {
    _id: "aboutPage",
    schoolName: "কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়",
    description: "কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়টি ১৮৩২ সালে প্রতিষ্ঠিত হয়। এটি এই অঞ্চলের অন্যতম প্রাচীন এবং স্বনামধন্য একটি শিক্ষা প্রতিষ্ঠান। ১৯ মার্চ, ১৯৯১ সালে প্রতিষ্ঠানটি জাতীয়করণ করা হয়।",
    mainImage: "https://picsum.photos/600/400",
    missionTitle: "আমাদের লক্ষ্য",
    missionPoints: [
      "মানসম্মত শিক্ষা প্রদান।",
      "শিক্ষার্থীদের নৈতিক বিকাশ।",
      "আধুনিক প্রযুক্তির ব্যবহার।",
      "শিক্ষার্থীদের সৃজনশীলতার বিকাশ ঘটানো।",
    ],
    academicTitle: "একাডেমিক কার্যক্রম",
    academicDescription: "আমরা শিক্ষার্থীদের জন্য বিভিন্ন সহ-শিক্ষা কার্যক্রমের আয়োজন করি, যা তাদের শারীরিক ও মানসিক বিকাশে সহায়তা করে। খেলাধুলা, সাংস্কৃতিক অনুষ্ঠান এবং বিভিন্ন প্রতিযোগিতার মাধ্যমে তাদের প্রতিভা বিকাশের সুযোগ করে দেওয়া হয়।",
  };
}

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে",
  description: 'আমাদের বিদ্যালয় সম্পর্কে জানুন।',
};

export default function AboutPage() {
  const content = getAboutContent();

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
