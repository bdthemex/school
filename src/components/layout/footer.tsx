import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import Logo from '@/components/icons/logo';

export default function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-primary-foreground/80">
              কুমারী জোসেফিনা স্মৃতি গার্লস হাই স্কুল-এর অফিসিয়াল তথ্য কেন্দ্র।
            </p>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold text-accent mb-4">গুরুত্বপূর্ণ লিঙ্ক</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-accent transition-colors">ভর্তি তথ্য</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">ফলাফল</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">একাডেমিক ক্যালেন্ডার</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">আমাদের অর্জন</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold text-accent mb-4">সাইট ম্যাপ</h3>
            <ul className="space-y-2">
              <li><Link href="#about" className="hover:text-accent transition-colors">আমাদের কথা</Link></li>
              <li><Link href="#notices" className="hover:text-accent transition-colors">নোটিশ বোর্ড</Link></li>
              <li><Link href="#academics" className="hover:text-accent transition-colors">একাডেমিক</Link></li>
              <li><Link href="#gallery" className="hover:text-accent transition-colors">গ্যালারি</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold text-accent mb-4">যোগাযোগ</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-accent" />
                <span>স্কুলের ঠিকানা, শহর, দেশ</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent" />
                <a href="mailto:info@kjsghs.edu.bd" className="hover:text-accent transition-colors">info@kjsghs.edu.bd</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent" />
                <a href="tel:+880123456789" className="hover:text-accent transition-colors">+৮৮০ ১২৩ ৪৫৬ ৭৮৯</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} KJSGHS Info Hub. সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}
