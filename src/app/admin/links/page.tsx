
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LinkManagementPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">লিঙ্ক ম্যানেজমেন্ট</CardTitle>
          <CardDescription>এখান থেকে ওয়েবসাইটের গুরুত্বপূর্ণ ও অফিসিয়াল লিঙ্ক পরিচালনা করুন।</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">এই ফিচারটি শীঘ্রই আসছে...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
