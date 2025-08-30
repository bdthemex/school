
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ClipboardList, Images, FileText, Link as LinkIcon, Edit } from 'lucide-react'
import Link from 'next/link'

const managementItems = [
  {
    title: 'নোটিশ ম্যানেজ করুন',
    description: 'নতুন নোটিশ যোগ, সম্পাদনা বা মুছে ফেলুন।',
    icon: ClipboardList,
    href: '/admin/notices',
  },
  {
    title: 'ফলাফল ম্যানেজ করুন',
    description: 'শিক্ষার্থীদের পরীক্ষার ফলাফল আপলোড ও সম্পাদনা করুন।',
    icon: FileText,
    href: '/admin/results',
  },
  {
    title: 'গ্যালারি ম্যানেজ করুন',
    description: 'স্কুলের ছবি ও গ্রাফিক্স যোগ বা মুছে ফেলুন।',
    icon: Images,
    href: '/admin/gallery',
  },
  {
    title: 'অন্যান্য কনটেন্ট',
    description: 'Sanity Studio-তে অন্যান্য তথ্য (শিক্ষক, কর্মচারী ইত্যাদি) ম্যানেজ করুন।',
    icon: LinkIcon,
    href: 'https://kjsghs-info-hub.sanity.studio', // Placeholder, user will replace with actual studio URL
    isExternal: true,
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
              <Button asChild className="mt-4" variant="outline">
                <Link href={item.href} target={item.isExternal ? '_blank' : '_self'}>
                  <Edit className="mr-2 h-4 w-4" />
                  ম্যানেজ করুন
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
