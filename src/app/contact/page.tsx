import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone, Mail, MapPin } from 'lucide-react'
import type { Metadata } from 'next';
import { getSheetData, objectify } from '@/lib/data-loader';

export const metadata: Metadata = {
  title: 'যোগাযোগ',
  description: 'আমাদের সাথে যোগাযোগ করুন। ঠিকানা, ফোন নম্বর এবং ইমেইল।',
};

export default async function ContactPage() {
  const settingsData = await getSheetData('settings');
  const settings = objectify(settingsData);

  return (
    <main className="flex-1">
        <div>
            <div className="container mx-auto px-4 py-12">
                <Card className="shadow-lg">
                    <CardHeader className="text-center bg-primary text-primary-foreground">
                        <CardTitle className="text-3xl">যোগাযোগ করুন</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="grid md:grid-cols-2">
                            <div className="p-8 space-y-6">
                                <h2 className="text-2xl font-bold text-primary">যোগাযোগের তথ্য</h2>
                                <address className="not-italic space-y-4 text-muted-foreground">
                                    <div className="flex items-start gap-4">
                                        <MapPin className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-foreground">ঠিকানা</h3>
                                            <p>{settings?.footerAddress || 'ঠিকানা পাওয়া যায়নি।'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Phone className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-foreground">ফোন</h3>
                                            <a href={`tel:${settings?.footerPhone}`} className="hover:text-primary transition-colors">{settings?.footerPhone || 'ফোন নম্বর পাওয়া যায়নি।'}</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Mail className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-foreground">ইমেইল</h3>
                                            <a href={`mailto:${settings?.footerEmail}`} className="hover:text-primary transition-colors break-all">{settings?.footerEmail || 'ইমেইল পাওয়া যায়নি।'}</a>
                                        </div>
                                    </div>
                                </address>
                            </div>
                            <div className="md:col-span-1 h-80 md:h-full">
                                {settings?.googleMapsUrl && (
                                    <iframe 
                                        src={settings.googleMapsUrl} 
                                        width="100%" 
                                        height="100%" 
                                        style={{ border: 0 }} 
                                        allowFullScreen={true} 
                                        loading="lazy" 
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="md:rounded-r-lg"
                                    ></iframe>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </main>
  )
}
