
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserSquare } from 'lucide-react'

const staffMembers = [
  { name: 'কর্মচারী ক', designation: 'অফিস সহকারী', image: 'https://picsum.photos/200/200?random=1', dataAiHint: 'person portrait' },
  { name: 'কর্মচারী খ', designation: 'হিসাবরক্ষক', image: 'https://picsum.photos/200/200?random=2', dataAiHint: 'person portrait' },
  { name: 'কর্মচারী গ', designation: 'গ্রন্থাগারিক', image: 'https://picsum.photos/200/200?random=3', dataAiHint: 'person portrait' },
  { name: 'কর্মচারী ঘ', designation: 'অফিস সহায়ক', image: 'https://picsum.photos/200/200?random=4', dataAiHint: 'person portrait' },
  { name: 'কর্মচারী ঙ', designation: 'নিরাপত্তা প্রহরী', image: 'https://picsum.photos/200/200?random=5', dataAiHint: 'person portrait' },
]

export default function StaffPage() {
  return (
    <main className="flex-1">
        <div>
            <div className="container mx-auto px-4 py-12">
                <Card className="shadow-lg">
                    <CardHeader className="text-center bg-primary text-primary-foreground">
                        <CardTitle className="text-3xl flex items-center justify-center gap-3">
                            <UserSquare className="w-8 h-8" />
                            আমাদের নিবেদিতপ্রাণ কর্মচারী
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {staffMembers.map((staff, index) => (
                            <Card key={index} className="text-center shadow-md hover:shadow-xl transition-shadow">
                                <CardContent className="p-6">
                                <Image
                                    src={staff.image}
                                    alt={staff.name}
                                    width={120}
                                    height={120}
                                    className="rounded-full mx-auto mb-4 border-4 border-accent"
                                    data-ai-hint={staff.dataAiHint}
                                />
                                <h3 className="text-lg font-bold text-primary">{staff.name}</h3>
                                <p className="text-sm text-muted-foreground">{staff.designation}</p>
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
