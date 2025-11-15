import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserSquare } from 'lucide-react'
import type { Metadata } from 'next';
import { getSheetData } from '@/lib/data-loader';

export const metadata: Metadata = {
  title: 'কর্মচারী পরিচিতি',
  description: 'আমাদের বিদ্যালয়ের নিবেদিতপ্রাণ কর্মচারীদের তালিকা।',
};

export default async function StaffPage() {
  const staffMembers = await getSheetData('staff');

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
                        {staffMembers.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {staffMembers.map((staff: any) => (
                                    <Card key={staff.id} className="text-center shadow-md hover:shadow-xl transition-shadow">
                                        <CardContent className="p-6">
                                        <Image
                                            src={staff.image}
                                            alt={staff.name}
                                            width={120}
                                            height={120}
                                            className="rounded-full mx-auto mb-4 border-4 border-accent"
                                        />
                                        <h3 className="text-lg font-bold text-primary">{staff.name}</h3>
                                        <p className="text-sm text-muted-foreground">{staff.designation}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-muted-foreground">কোনো কর্মচারীর তথ্য পাওয়া যায়নি।</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    </main>
  )
}
