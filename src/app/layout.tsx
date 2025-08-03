import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { Noto_Sans_Bengali } from 'next/font/google'

const notoSansBengali = Noto_Sans_Bengali({
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
    <html lang="bn" className={`${notoSansBengali.variable}`}>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
