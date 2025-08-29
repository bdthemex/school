
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building, Target, BookOpen, Clock } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="flex-1">
        <div className="max-w-7xl mx-auto shadow-lg bg-background p-4">
            <div className="container mx-auto px-4 py-12">
            <Card className="shadow-lg">
                <CardHeader className="text-center bg-primary text-primary-foreground rounded-t-lg">
                <CardTitle className="text-3xl">আমাদের সম্পর্কে</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/3">
                    <Image
                        src="https://placehold.co/600x400"
                        alt="School Building"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-md w-full"
                        data-ai-hint="school building"
                    />
                    </div>
                    <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold text-primary mb-4">কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        ১৮৩২ সালে প্রতিষ্ঠিত, কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয় একটি ঐতিহাসিক এবং স্বনামধন্য শিক্ষা প্রতিষ্ঠান। নেত্রকোণা জেলার কেন্দুয়া উপজেলায় অবস্থিত এই বিদ্যালয়টি দীর্ঘদিন ধরে এই অঞ্চলে শিক্ষার আলো ছড়িয়ে আসছে। ১৯৯১ সালে এটি জাতীয়করণ করা হয়, যা এর মান এবং গুরুত্বকে আরও বাড়িয়ে তোলে।
                    </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                            <Target className="w-6 h-6 text-accent" />
                            আমাদের লক্ষ্য ও উদ্দেশ্য
                        </h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                            <li>শিক্ষার্থীদের মধ্যে জ্ঞান, শৃঙ্খলা এবং নৈতিকতার বিকাশ ঘটানো।</li>
                            <li>আধুনিক ও যুগোপযোগী শিক্ষা প্রদান করে ডিজিটাল বাংলাদেশ গঠনে ভূমিকা রাখা।</li>
                            <li>শিক্ষার্থীদের সুপ্ত প্রতিভা বিকাশে সহশিক্ষা কার্যক্রম পরিচালনা করা।</li>
                            <li>একটি নিরাপদ ও শিক্ষাবান্ধব পরিবেশ নিশ্চিত করা।</li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-accent" />
                            একাডেমিক কার্যক্রম
                        </h3>
                        <p className="text-muted-foreground">
                        বর্তমানে বিদ্যালয়ে ৬ষ্ঠ থেকে ১০ম শ্রেণি পর্যন্ত পাঠদান করা হয়। অভিজ্ঞ শিক্ষকমণ্ডলী দ্বারা পরিচালিত এই প্রতিষ্ঠানে জাতীয় শিক্ষাক্রম অনুসরণ করে পাঠদান করা হয়। নিয়মিত পরীক্ষা, ক্লাসের মূল্যায়ন এবং অভিভাবকদের সাথে মতবিনিময়ের মাধ্যমে শিক্ষার্থীদের সার্বিক মানোন্নয়নে আমরা সর্বদা সচেষ্ট।
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
