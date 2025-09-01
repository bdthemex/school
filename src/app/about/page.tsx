
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building, Target, BookOpen } from 'lucide-react'
import { sanityClient, urlFor } from '@/lib/sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { Metadata } from 'next';

interface AboutContent {
  _id: string;
  schoolName: string;
  description: string;
  mainImage: SanityImageSource;
  missionTitle: string;
  missionPoints: string[];
  academicTitle: string;
  academicDescription: string;
}

async function getAboutContent(): Promise<AboutContent | null> {
  const query = `*[_type == "aboutPage" && !(_id in path("drafts.**"))][0]`;
  try {
    const content = await sanityClient.fetch(query);
    return content;
  } catch (error) {
    console.error("Error fetching about page content from Sanity:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAboutContent();
  const title = "আমাদের সম্পর্কে";
  const description = content?.description ? content.description.substring(0, 150) : 'আমাদের বিদ্যালয় সম্পর্কে জানুন।';
  
  return {
    title,
    description,
  };
}

export default async function AboutPage() {
  const content = await getAboutContent();

  if (!content) {
    return (
       <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
            <Card className="shadow-lg">
                <CardHeader className="text-center bg-primary text-primary-foreground rounded-t-lg">
                    <CardTitle className="text-3xl">আমাদের সম্পর্কে</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                    <p className="text-center text-muted-foreground">এই পেইজের জন্য কোনো তথ্য পাওয়া যায়নি। অনুগ্রহ করে Sanity Studio-তে তথ্য যোগ করুন।</p>
                </CardContent>
            </Card>
        </div>
      </main>
    )
  }

  const imageUrl = content.mainImage
    ? urlFor(content.mainImage).width(600).height(400).url()
    : "https://picsum.photos/600/400";


  return (
    <main className="flex-1">
        <div>
            <div className="container mx-auto px-4 py-12">
            <Card className="shadow-lg">
                <CardHeader className="text-center bg-primary text-primary-foreground rounded-t-lg">
                <CardTitle className="text-3xl">আমাদের সম্পর্কে</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/3">
                    <Image
                        src={imageUrl}
                        alt="School Building"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-md w-full"
                        data-ai-hint="school building"
                    />
                    </div>
                    <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold text-primary mb-4">{content.schoolName}</h2>
                    <p className="text-foreground leading-relaxed text-base">
                        {content.description}
                    </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                            <Target className="w-6 h-6 text-accent" />
                            {content.missionTitle}
                        </h3>
                        <ul className="list-disc list-inside text-foreground space-y-2 leading-relaxed text-base">
                           {content.missionPoints.map((point, index) => (
                             <li key={index}>{point}</li>
                           ))}
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-accent" />
                            {content.academicTitle}
                        </h3>
                        <p className="text-foreground leading-relaxed text-base">
                            {content.academicDescription}
                        </p>
                    </div>
                </div>
                </CardContent>
            </Card>
            </div>
        </div>
    </main>
  )
}
