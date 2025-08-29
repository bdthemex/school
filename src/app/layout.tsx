import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { Hind_Siliguri } from 'next/font/google'
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['400', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়',
  description: 'ওয়েবসাইটটি কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়-এর তথ্য কেন্দ্র হিসাবে কাজ করে।',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable}`}>
      <body className="font-body antialiased bg-muted/40">
        <Header />
        <div className="max-w-7xl mx-auto shadow-lg bg-background p-4">
          {children}
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
