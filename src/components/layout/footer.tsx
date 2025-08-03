import Link from 'next/link';
import { Mail, MapPin, Phone, ChevronRight } from 'lucide-react';

const footerLinks1 = [
    { href: "#", label: "প্রতিষ্ঠানের ইতিহাস" },
    { href: "#", label: "একাডেমিক ক্যালেন্ডার" },
    { href: "#", label: "যোগাযোগ" },
    { href: "#", label: "ছুটির দিন" },
    { href: "#", label: "কৃতি শিক্ষার্থী" },
    { href: "#", label: "নোটিশ" },
]

const footerLinks2 = [
    { href: "#", label: "পরীক্ষার ফলাফল" },
    { href: "#", label: "ব্লগ" },
    { href: "#", label: "ডাউনলোড" },
    { href: "#", label: "পরীক্ষার রুটিন" },
    { href: "#", label: "ভর্তি" },
    { href: "#", label: "বাংলা টিউটোরিয়াল" },
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="text-lg font-bold text-accent mb-4">অন্যান্য লিংক</h3>
            <ul className="space-y-2">
                {footerLinks1.map(link => (
                    <li key={link.label}>
                        <Link href={link.href} className="flex items-center gap-2 hover:text-accent transition-colors">
                            <ChevronRight className="w-4 h-4" />
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
          </div>
           <div>
            <h3 className="text-lg font-bold text-accent mb-4 opacity-0">অন্যান্য লিংক</h3>
            <ul className="space-y-2">
                {footerLinks2.map(link => (
                    <li key={link.label}>
                        <Link href={link.href} className="flex items-center gap-2 hover:text-accent transition-colors">
                            <ChevronRight className="w-4 h-4" />
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
          </div>

          <div>
             <h3 className="text-lg font-bold text-accent mb-4">যোগাযোগের ঠিকানা</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                <span>কেন্দুয়া বাজার, কেন্দুয়া, নেত্রকোণা।</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <a href="tel:01717407585" className="hover:text-accent transition-colors">মোবাইলঃ ০১৭১৭৪০৭৫৮৫</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:joyharisprygovtschool@gmail.com" className="hover:text-accent transition-colors">joyharisprygovtschool@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                 <span className="font-bold text-accent">★</span>
                <span>EIIN NO: 113026</span>
              </li>
               <li className="flex items-center gap-3">
                 <span className="font-bold text-accent">#</span>
                <span>স্কুল কোড: ৪৩০০</span>
              </li>
            </ul>
          </div>
            <div>
                 <h3 className="text-lg font-bold text-accent mb-4">ফেসবুক পেজ</h3>
                 <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FFacebookforDevelopers&tabs=timeline&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="100%" height="130" style={{border:'none', overflow:'hidden'}} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
            </div>
        </div>

        <div className="mt-8 pt-4 border-t border-primary-foreground/20 text-center text-xs text-primary-foreground/60">
          <p>All rights reserved &copy; {new Date().getFullYear()} | Developed by Mahmudul Hasan Arman</p>
        </div>
      </div>
    </footer>
  );
}
