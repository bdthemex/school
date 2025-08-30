
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserSquare } from 'lucide-react'
import { sanityClient, urlFor } from '@/lib/sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface StaffMember {
  _id: string;
  name: string;
  designation: string;
  image: SanityImageSource;
}

const fallbackStaff: Omit<StaffMember, '_id' | 'image'>[] = [
  { name: 'কর্মচারী ক', designation: 'অফিস সহকারী' },
  { name: 'কর্মচারী খ', designation: 'হিসাবরক্ষক' },
  { name: 'কর্মচারী গ', designation: 'গ্রন্থাগারিক' },
  { name: 'কর্মচারী ঘ', designation: 'অফিস সহায়ক' },
  { name: 'কর্মচারী ঙ', designation: 'নিরাপত্তা প্রহরী' },
]

async function getStaffMembers(): Promise<StaffMember[]> {
  const query = `*[_type == "staff" && !(_id in path("drafts.**"))] | order(name asc)`;
  try {
    const staff = await sanityClient.fetch(query);
    if (staff && staff.length > 0) {
        return staff;
    }
    return fallbackStaff.map((s, i) => ({ ...s, _id: `fallback-${i}`, image: `https://picsum.photos/200/200?random=${i+1}` }));
  } catch (error) {
    console.error("Error fetching staff members from Sanity:", error);
    return fallbackStaff.map((s, i) => ({ ...s, _id: `fallback-${i}`, image: `https://picsum.photos/200/200?random=${i+1}` }));
  }
}

export default async function StaffPage() {
  const staffMembers = await getStaffMembers();
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
                            {staffMembers.map((staff, index) => {
                                const imageUrl = staff.image 
                                  ? typeof staff.image === 'string'
                                    ? staff.image
                                    : urlFor(staff.image).width(200).height(200).url()
                                  : `https://picsum.photos/200/200?random=${index + 1}`;
                                return (
                                <Card key={staff._id || index} className="text-center shadow-md hover:shadow-xl transition-shadow">
                                    <CardContent className="p-6">
                                    <Image
                                        src={imageUrl}
                                        alt={staff.name}
                                        width={120}
                                        height={120}
                                        className="rounded-full mx-auto mb-4 border-4 border-accent"
                                    />
                                    <h3 className="text-lg font-bold text-primary">{staff.name}</h3>
                                    <p className="text-sm text-muted-foreground">{staff.designation}</p>
                                    </CardContent>
                                </Card>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </main>
  )
}
