
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function ContactPage() {
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
                                            <p>কেন্দুয়া বাজার, কেন্দুয়া, নেত্রকোণা, বাংলাদেশ।</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Phone className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-foreground">ফোন</h3>
                                            <a href="tel:01717407585" className="hover:text-primary transition-colors">০১৭১৭-৪০৭৫৮৫</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Mail className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-foreground">ইমেইল</h3>
                                            <a href="mailto:joyharisprygovtschool@gmail.com" className="hover:text-primary transition-colors break-all">joyharisprygovtschool@gmail.com</a>
                                        </div>
                                    </div>
                                </address>
                            </div>
                            <div className="md:col-span-1 h-80 md:h-full">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3625.617985440232!2d90.84252431500001!3d24.671089284143213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3756c368e82a9391%3A0x678c1561f743c72!2sKendua%20Joyhari%20Spry%20Govt.%20High%20School!5e0!3m2!1sen!2sbd!4v1678886543210!5m2!1sen!2sbd" 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen={true} 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="md:rounded-r-lg"
                                ></iframe>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </main>
  )
}
