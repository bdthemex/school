
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FilePlus2 } from 'lucide-react'
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'নমুনা পৃষ্ঠা',
  description: 'এটি একটি নমুনা পৃষ্ঠা।',
};

export default function SamplePage() {
  return (
    <main className="flex-1">
      <div>
        <div className="container mx-auto px-4 py-12">
          <Card className="shadow-lg">
            <CardHeader className="text-center bg-primary text-primary-foreground">
              <CardTitle className="text-3xl flex items-center justify-center gap-3">
                <FilePlus2 className="w-8 h-8" />
                নমুনা পৃষ্ঠা
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="prose max-w-none text-center">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  এই পৃষ্ঠাটি কিভাবে এডিট করবেন?
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base">
                  এই লেখাটি পরিবর্তন করতে, অনুগ্রহ করে <code>/src/app/sample-page/page.tsx</code> ফাইলটি খুলুন এবং আপনার নিজের কনটেন্ট যোগ করুন।
                </p>
                <p className="text-muted-foreground leading-relaxed text-base mt-4">
                  আপনি এই ফাইলটিকে একটি টেমপ্লেট হিসেবে ব্যবহার করে যত খুশি নতুন পৃষ্ঠা তৈরি করতে পারেন। শুধু এই ফোল্ডারটি কপি করুন, নতুন নাম দিন এবং নেভিগেশনে লিঙ্ক যোগ করুন।
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
