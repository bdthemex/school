import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  School,
  BookOpen,
  Users,
  Megaphone,
  FileText,
  Link as LinkIcon,
  Image as ImageIcon,
  GraduationCap,
  Briefcase,
  Award,
  Calendar,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const noticeData = [
  {
    date: '২০২৪-০৭-২২',
    title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা',
    description: 'আগামী সপ্তাহে স্কুলের বার্ষিক ক্রীড়া প্রতিযোগিতা অনুষ্ঠিত হবে। সকল ছাত্রীকে অংশগ্রহণের জন্য আহ্বান করা হচ্ছে।',
  },
  {
    date: '২০২৪-০৭-২০',
    title: 'ছুটির নোটিশ',
    description: 'গ্রীষ্মকালীন অবকাশ উপলক্ষে স্কুল আগামী ১ আগস্ট থেকে ১৫ আগস্ট পর্যন্ত বন্ধ থাকবে।',
  },
  {
    date: '২০২৪-০৭-১৮',
    title: 'ফলাফল প্রকাশ',
    description: 'অর্ধ-বার্ষিক পরীক্ষার ফলাফল আগামী ২৫ জুলাই প্রকাশ করা হবে।',
  },
  {
    date: '২০২৪-০৭-১৫',
    title: 'নতুন ভর্তি সংক্রান্ত বিজ্ঞপ্তি',
    description: 'নতুন শিক্ষাবর্ষের জন্য ভর্তি প্রক্রিয়া শুরু হয়েছে। বিস্তারিত জানতে স্কুল অফিসে যোগাযোগ করুন।',
  },
];

const facultyData = [
  { name: 'প্রধান শিক্ষক', subject: 'ব্যবস্থাপনা', image: 'https://placehold.co/100x100', dataAiHint: 'teacher portrait' },
  { name: 'সহকারী প্রধান শিক্ষক', subject: 'ইংরেজি', image: 'https://placehold.co/100x100', dataAiHint: 'teacher portrait' },
  { name: ' সিনিয়র শিক্ষক', subject: 'গণিত', image: 'https://placehold.co/100x100', dataAiHint: 'teacher portrait' },
  { name: 'সিনিয়র শিক্ষিকা', subject: 'বিজ্ঞান', image: 'https://placehold.co/100x100', dataAiHint: 'teacher portrait' },
];

const galleryImages = [
  { src: 'https://placehold.co/600x400', alt: 'স্কুলের ভবন', dataAiHint: 'school building' },
  { src: 'https://placehold.co/600x400', alt: 'লাইব্রেরি', dataAiHint: 'school library' },
  { src: 'https://placehold.co/600x400', alt: 'বিজ্ঞানাগার', dataAiHint: 'science lab' },
  { src: 'https://placehold.co/600x400', alt: 'শ্রেণীকক্ষ', dataAiHint: 'classroom students' },
  { src: 'https://placehold.co/600x400', alt: 'বার্ষিক অনুষ্ঠান', dataAiHint: 'school event' },
  { src: 'https://placehold.co/600x400', alt: 'খেলার মাঠ', dataAiHint: 'school playground' },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] text-white flex items-center justify-center text-center bg-primary/80">
          <Image
            src="https://placehold.co/1920x1080"
            alt="KJSGHS School"
            layout="fill"
            objectFit="cover"
            className="absolute -z-10 opacity-30"
            data-ai-hint="school building"
          />
          <div className="bg-primary/50 p-8 rounded-lg">
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-accent">কুমারী জোসেফিনা স্মৃতি গার্লস হাই স্কুল</h1>
            <p className="mt-4 text-xl md:text-2xl text-primary-foreground">জ্ঞান, শৃঙ্খলা, নৈতিকতা</p>
            <Button asChild className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="#about">আরও জানুন</Link>
            </Button>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 space-y-24">
          {/* About Section */}
          <section id="about" className="scroll-mt-20">
            <Card className="overflow-hidden shadow-lg">
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle className="font-headline text-4xl flex items-center gap-4">
                  <School className="w-10 h-10 text-accent" />
                  আমাদের কথা
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8 grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="font-headline text-2xl text-primary">আমাদের ইতিহাস ও লক্ষ্য</h3>
                  <p className="text-muted-foreground leading-relaxed">
                  কুমারী জোসেফিনা স্মৃতি গার্লস হাই স্কুল একটি ঐতিহ্যবাহী শিক্ষা প্রতিষ্ঠান যা নারী শিক্ষায় অগ্রণী ভূমিকা পালন করে আসছে। আমাদের লক্ষ্য হলো ছাত্রীদের আধুনিক ও নৈতিক শিক্ষায় শিক্ষিত করে দেশের সুনাগরিক হিসেবে গড়ে তোলা।
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                  আমরা বিশ্বাস করি, সঠিক শিক্ষা ও নির্দেশনার মাধ্যমে প্রতিটি ছাত্রী তার সুপ্ত প্রতিভার বিকাশ ঘটাতে সক্ষম।
                  </p>
                </div>
                 <div className="rounded-lg overflow-hidden">
                    <Image src="https://placehold.co/600x400" alt="স্কুলের ইতিহাস" width={600} height={400} className="w-full h-auto object-cover" data-ai-hint="historic building" />
                 </div>
              </CardContent>
            </Card>
          </section>

          {/* Notice Board Section */}
          <section id="notices" className="scroll-mt-20">
             <div className="text-center mb-12">
                <h2 className="text-4xl font-headline font-bold text-primary flex items-center justify-center gap-3">
                  <Megaphone className="w-10 h-10 text-accent" />
                  নোটিশ বোর্ড
                </h2>
                <p className="text-muted-foreground mt-2">সর্বশেষ খবর ও ঘোষণা</p>
              </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {noticeData.map((notice, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg font-headline text-primary">{notice.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 pt-1">
                      <Calendar className="w-4 h-4 text-accent" />
                      {notice.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{notice.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Academics and Faculty Section */}
          <section id="academics" className="scroll-mt-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-headline font-bold text-primary flex items-center justify-center gap-3">
                  <BookOpen className="w-10 h-10 text-accent" />
                  একাডেমিক এবং অনুষদ
                </h2>
                <p className="text-muted-foreground mt-2">আমাদের শিক্ষা কার্যক্রম ও শিক্ষকবৃন্দ</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <Card>
                      <CardHeader>
                         <CardTitle className="font-headline text-xl text-primary flex items-center gap-2"><GraduationCap className="text-accent" />একাডেমিক প্রোগ্রাম</CardTitle>
                      </CardHeader>
                      <CardContent>
                         <p className="text-muted-foreground">আমরা জাতীয় শিক্ষাক্রম অনুসরণ করে ষষ্ঠ থেকে দশম শ্রেণী পর্যন্ত পাঠদান করি।</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                         <CardTitle className="font-headline text-xl text-primary flex items-center gap-2"><Award className="text-accent" />সহপাঠ্যক্রম</CardTitle>
                      </CardHeader>
                      <CardContent>
                         <p className="text-muted-foreground">বিতর্ক, খেলাধুলা, সাংস্কৃতিক কার্যক্রম এবং বিজ্ঞান মেলা সহ বিভিন্ন সহপাঠ্যক্রমিক কার্যক্রম পরিচালিত হয়।</p>
                      </CardContent>
                    </Card>
                </div>
                <div>
                  <Card>
                     <CardHeader>
                        <CardTitle className="font-headline text-xl text-primary flex items-center gap-2"><Users className="text-accent" />আমাদের অভিজ্ঞ শিক্ষকবৃন্দ</CardTitle>
                     </CardHeader>
                     <CardContent>
                       <div className="grid grid-cols-2 gap-4">
                        {facultyData.map((faculty, index) => (
                           <div key={index} className="text-center">
                              <Image src={faculty.image} alt={faculty.name} width={100} height={100} className="rounded-full mx-auto mb-2 border-2 border-accent" data-ai-hint={faculty.dataAiHint} />
                              <h4 className="font-bold text-primary">{faculty.name}</h4>
                              <p className="text-sm text-muted-foreground">{faculty.subject}</p>
                           </div>
                        ))}
                       </div>
                     </CardContent>
                  </Card>
                </div>
              </div>
          </section>
          
          <Separator />

          {/* Resources and Links Section */}
          <section id="resources" className="scroll-mt-20">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-headline font-bold text-primary">রিসোর্স ও গুরুত্বপূর্ণ লিঙ্ক</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2">
                    <FileText className="text-accent" />
                    ছাত্র সম্পদ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="#" className="block text-muted-foreground hover:text-primary">সিলেবাস</Link>
                  <Link href="#" className="block text-muted-foreground hover:text-primary">রুটিন</Link>
                  <Link href="#" className="block text-muted-foreground hover:text-primary">লাইব্রেরি ক্যাটালগ</Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2">
                    <LinkIcon className="text-accent" />
                    গুরুত্বপূর্ণ লিঙ্ক
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="#" className="block text-muted-foreground hover:text-primary">শিক্ষা বোর্ড</Link>
                  <Link href="#" className="block text-muted-foreground hover:text-primary">শিক্ষক বাতায়ন</Link>
                  <Link href="#" className="block text-muted-foreground hover:text-primary">ই-বুক</Link>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <Separator />

          {/* Gallery Section */}
          <section id="gallery" className="scroll-mt-20">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-headline font-bold text-primary flex items-center justify-center gap-3">
                  <ImageIcon className="w-10 h-10 text-accent" />
                  ছবি প্রদর্শনী
                </h2>
                <p className="text-muted-foreground mt-2">আমাদের স্কুলের কিছু মুহূর্ত</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <Image src={image.src} alt={image.alt} width={600} height={400} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" data-ai-hint={image.dataAiHint} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
