import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ClipboardList, Images, FileText, Link as LinkIcon, Edit } from 'lucide-react'

const managementItems = [
  {
    title: 'নোটিশ ম্যানেজ করুন',
    description: 'নতুন নোটিশ যোগ, সম্পাদনা বা মুছে ফেলুন।',
    icon: ClipboardList,
  },
  {
    title: 'ফলাফল ম্যানেজ করুন',
    description: 'ছাত্রীদের পরীক্ষার ফলাফল আপলোড ও সম্পাদনা করুন।',
    icon: FileText,
  },
  {
    title: 'গ্যালারি ম্যানেজ করুন',
    description: 'স্কুলের ছবি ও গ্রাফিক্স যোগ বা মুছে ফেলুন।',
    icon: Images,
  },
  {
    title: 'লিঙ্ক ম্যানেজ করুন',
    description: 'গুরুত্বপূর্ণ লিঙ্ক এবং রিসোর্স সম্পাদনা করুন।',
    icon: LinkIcon,
  },
]

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary">ড্যাশবোর্ড</h1>
        <p className="text-muted-foreground">ওয়েবসাইটের বিভিন্ন অংশ এখান থেকে পরিচালনা করুন।</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {managementItems.map((item, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">{item.title}</CardTitle>
              <item.icon className="h-6 w-6 text-accent" />
            </CardHeader>
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
              <Button className="mt-4" variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                ম্যানেজ করুন
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
