
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollText } from 'lucide-react'
import type { Metadata } from 'next';

interface Milestone {
    _key: string;
    year: number;
    event: string;
}

interface HistoryContent {
  _id: string;
  title: string;
  historicalImage: string;
  journeyTitle: string;
  description1: string;
  description2: string;
  milestonesTitle: string;
  milestones: Milestone[];
}

function getHistoryContent(): HistoryContent {
  return {
    _id: "historyPage",
    title: "প্রতিষ্ঠানের গৌরবময় ইতিহাস",
    historicalImage: "https://picsum.photos/600/800",
    journeyTitle: "আমাদের পথচলা",
    description1: "কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়টি ১৮৩২ সালে প্রতিষ্ঠিত হয়। এটি এই অঞ্চলের অন্যতম প্রাচীন এবং স্বনামধন্য একটি শিক্ষা প্রতিষ্ঠান। শিক্ষার আলো ছড়িয়ে দেওয়ার লক্ষ্যে এর যাত্রা শুরু হয়েছিল।",
    description2: "১৯ মার্চ, ১৯৯১ সালে প্রতিষ্ঠানটি জাতীয়করণ করা হয়। বর্তমানে বিদ্যালয়ে ৬ষ্ঠ থেকে ১০ম শ্রেণি পর্যন্ত পাঠদান করা হয় এবং প্রায় ৭১৭ জন শিক্ষার্থী অধ্যয়নরত আছে। অভিজ্ঞ শিক্ষকমণ্ডলীর মাধ্যমে পরিচালিত এই বিদ্যালয়ে বর্তমানে ১২ জন শিক্ষক কর্মরত রয়েছেন।",
    milestonesTitle: "ঐতিহাসিক মাইলফলক",
    milestones: [
      { _key: "m1", year: 1832, event: "বিদ্যালয় প্রতিষ্ঠিত হয়।" },
      { _key: "m2", year: 1991, event: "প্রতিষ্ঠানটি জাতীয়করণ করা হয়।" },
      { _key: "m3", year: 2020, event: "অনলাইন ক্লাস কার্যক্রম শুরু হয়।" },
    ],
  };
}

export const metadata: Metadata = {
    title: "প্রতিষ্ঠানের ইতিহাস",
    description: 'আমাদের বিদ্যালয়ের গৌরবময় ইতিহাস সম্পর্কে জানুন।',
};

export default function HistoryPage() {
  const content = getHistoryContent();

  return (
    <main className="flex-1">
        <div>
            <div className="container mx-auto px-4 py-12">
            <Card className="shadow-lg overflow-hidden">
                <CardHeader className="text-center bg-primary text-primary-foreground">
                <CardTitle className="text-3xl">{content.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    <div className="lg:w-2/5">
                        <Image
                            src={content.historicalImage}
                            alt="Historic photo of the school"
                            width={600}
                            height={800}
                            className="rounded-lg shadow-md object-cover w-full h-full"
                            data-ai-hint="historic building black and white"
                        />
                    </div>
                    <div className="lg:w-3/5">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                            <ScrollText className="w-6 h-6 text-accent" />
                            {content.journeyTitle}
                            </h2>
                            <p className="text-foreground leading-relaxed text-base">
                                {content.description1}
                            </p>
                            <p className="text-foreground leading-relaxed text-base">
                                {content.description2}
                            </p>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-primary mb-4">{content.milestonesTitle}</h3>
                            <div className="relative border-l-2 border-accent space-y-8 pl-6">
                                {content.milestones.map((item) => (
                                    <div key={item._key} className="relative">
                                        <div className="absolute -left-[35px] top-1.5 w-4 h-4 bg-accent rounded-full border-4 border-muted/40"></div>
                                        <p className="font-bold text-primary">{item.year}</p>
                                        <p className="text-foreground leading-relaxed text-base">{item.event}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                </CardContent>
            </Card>
            </div>
        </div>
    </main>
  )
}
