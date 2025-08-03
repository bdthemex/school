
import Link from 'next/link';
import { Mail, MapPin, Phone, Facebook, Youtube, Twitter } from 'lucide-react';
import Logo from '../icons/logo';

const footerLinks = [
    { href: "/about", label: "আমাদের সম্পর্কে" },
    { href: "/notices", label: "নোটিশ" },
    { href: "/results", label: "ফলাফল" },
    { href: "/gallery", label: "গ্যালারি" },
    { href: "/contact", label: "যোগাযোগ" },
    { href: "/admin", label: "এডমিন লগইন" },
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground border-t-4 border-accent">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Logo className="h-12 w-auto" />
              <div>
                <h2 className="text-lg font-bold text-white">কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়</h2>
              </div>
            </Link>
            <p className="text-primary-foreground/80">
              শিক্ষা, শৃঙ্খলা, ও নৈতিকতার সমন্বয়ে একটি আদর্শ শিক্ষা প্রতিষ্ঠান।
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-accent mb-4">গুরুত্বপূর্ণ লিংক</h3>
            <ul className="space-y-2">
                {footerLinks.map(link => (
                    <li key={link.label}>
                        <Link href={link.href} className="hover:text-accent transition-colors">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
          </div>

          <div>
             <h3 className="text-lg font-bold text-accent mb-4">যোগাযোগ</h3>
            <address className="not-italic space-y-3 text-primary-foreground/80">
              <p className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-accent flex-shrink-0" />
                <span>কেন্দুয়া বাজার, কেন্দুয়া, নেত্রকোণা, বাংলাদেশ।</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent" />
                <a href="tel:01717407585" className="hover:text-accent transition-colors">০১৭১৭-৪০৭৫৮৫</a>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent" />
                <a href="mailto:joyharisprygovtschool@gmail.com" className="hover:text-accent transition-colors break-all">joyharispry@gmail.com</a>
              </p>
            </address>
          </div>

          <div>
             <h3 className="text-lg font-bold text-accent mb-4">সামাজিক যোগাযোগ</h3>
             <div className="flex space-x-4">
               <Link href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent transition-colors"><Facebook className="w-5 h-5" /></Link>
               <Link href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent transition-colors"><Youtube className="w-5 h-5" /></Link>
               <Link href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent transition-colors"><Twitter className="w-5 h-5" /></Link>
             </div>
             <div className="mt-4">
                <h3 className="text-lg font-bold text-accent mb-4">ফেসবুক পেজ</h3>
                 <div className="bg-white rounded-lg overflow-hidden">
                    <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fkjhsgovt.school&tabs=timeline&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="100%" height="130" style={{border:'none', overflow:'hidden'}} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                 </div>
             </div>
          </div>
        </div>

      </div>
      <div className="bg-black/20">
        <div className="container mx-auto px-4 py-3 text-center text-xs text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} সর্বস্বত্ব সংরক্ষিত | কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়</p>
          <p className="mt-1">ডিজাইন ও ডেভেলপমেন্ট: <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent">মাহমুদুল হাসান আরমান</a></p>
        </div>
      </div>
    </footer>
  );
}

    