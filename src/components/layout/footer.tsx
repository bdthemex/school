
import Link from 'next/link';
import { Mail, MapPin, Phone, Facebook, Youtube, Twitter, Plus } from 'lucide-react';
import Logo from '../icons/logo';

const footerLinksCol1 = [
    { href: "/about", label: "প্রতিষ্ঠানের ইতিহাস" },
    { href: "/#", label: "একাডেমিক ক্যালেন্ডার" },
    { href: "/contact", label: "যোগাযোগ" },
    { href: "/#", label: "ছুটির দিন" },
    { href: "/#", label: "কৃতি শিক্ষার্থী" },
    { href: "/notices", label: "নোটিশ" },
]
const footerLinksCol2 = [
    { href: "/results", label: "পরীক্ষার ফলাফল" },
    { href: "/#", label: "ব্লগ" },
    { href: "/#", label: "ডাউনলোড" },
    { href: "/#", label: "পরীক্ষার রুটিন" },
    { href: "/#", label: "ভর্তি" },
    { href: "/#", label: "বাংলা টিউটোরিয়াল" },
]


export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="text-lg font-bold text-gray-300 mb-4 border-b border-gray-700 pb-2">অন্যান্য লিংক</h3>
            <ul className="space-y-2">
                {footerLinksCol1.map(link => (
                    <li key={link.label}>
                        <Link href={link.href} className="hover:text-green-400 transition-colors flex items-center gap-2">
                            <Plus className='w-4 h-4' /> {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
          </div>
          
          <div className='md:mt-11'>
            <ul className="space-y-2">
                {footerLinksCol2.map(link => (
                    <li key={link.label}>
                        <Link href={link.href} className="hover:text-green-400 transition-colors flex items-center gap-2">
                             <Plus className='w-4 h-4' /> {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
          </div>

          <div>
             <h3 className="text-lg font-bold text-gray-300 mb-4 border-b border-gray-700 pb-2">যোগাযোগের ঠিকানা</h3>
            <address className="not-italic space-y-3 text-gray-300">
              <p className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-green-400 flex-shrink-0" />
                <span>কেন্দুয়া বাজার, কেন্দুয়া, নেত্রকোণা, বাংলাদেশ।</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-400" />
                <a href="tel:01717407585" className="hover:text-green-400 transition-colors">০১৭১৭-৪০৭৫৮৫</a>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-400" />
                <a href="mailto:joyharisprygovtschool@gmail.com" className="hover:text-green-400 transition-colors break-all">joyharisprygovtschool@gmail.com</a>
              </p>
               <p className="flex items-center gap-3">
                <Star className="w-5 h-5 text-green-400" />
                <span>EIIN NO: 113026</span>
              </p>
               <p className="flex items-center gap-3">
                <Code className="w-5 h-5 text-green-400" />
                <span>স্কুল কোড: 8300</span>
              </p>
            </address>
          </div>
           <div>
             <h3 className="text-lg font-bold text-gray-300 mb-4 border-b border-gray-700 pb-2">ফেসবুক পেজ</h3>
             <div className="bg-white rounded-lg overflow-hidden">
                <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fkjhsgovt.school&tabs=timeline&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="100%" height="130" style={{border:'none', overflow:'hidden'}} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
             </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900">
        <div className="container mx-auto px-4 py-3 text-center text-xs text-gray-400 md:flex justify-between items-center">
          <p>All rights reserved</p>
          <p>Developed by <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">Mahmudul Hasan Arman</a></p>
        </div>
      </div>
    </footer>
  );
}

// Add imports for Star and Code icons
import { Star, Code } from 'lucide-react';

    