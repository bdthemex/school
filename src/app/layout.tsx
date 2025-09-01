import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { Hind_Siliguri } from 'next/font/google'
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { sanityClient } from '@/lib/sanity';

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['400', '700'],
  variable: '--font-body',
  display: 'swap',
})

interface SiteSettings {
  title: string;
  description: string;
}

async function getSiteMetadata(): Promise<SiteSettings> {
  const query = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
    "title": "siteName", 
    "description": "siteDescription"
  }`;
  // For the purpose of this example, we'll mock the data.
  // In a real app, you'd fetch this from your CMS.
  return {
    title: 'কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়',
    description: 'ওয়েবসাইটটি কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়-এর তথ্য কেন্দ্র হিসাবে কাজ করে।'
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getSiteMetadata();
  return {
    title: {
      default: metadata.title,
      template: `%s | ${metadata.title}`,
    },
    description: metadata.description,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable}`}>
      <body className="font-body antialiased bg-muted/40">
        <Toaster />
        <main className="max-w-7xl mx-auto bg-background shadow-lg">
          <Header />
          <div>
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
