
import Link from 'next/link';
import { Mail, MapPin, Phone, Star, Code, Plus } from 'lucide-react';
import { sanityClient, urlFor } from '@/lib/sanity';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface NavItem {
  _key: string;
  label: string;
  href?: string;
}

interface Navigation {
  navItems: NavItem[];
}

interface SiteSettings {
  footerAddress: string;
  footerPhone: string;
  footerEmail: string;
  eiinNumber: string;
  schoolCode: string;
  facebookPageUrl: string;
}

async function getFooterData() {
  const query = `{
    "footerLinksCol1": *[_type == "navigation" && _id == "footerLinksCol1"][0],
    "footerLinksCol2": *[_type == "navigation" && _id == "footerLinksCol2"][0],
    "siteSettings": *[_type == "siteSettings" && _id == "siteSettings"][0]
  }`;
  try {
    const data = await sanityClient.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching footer data from Sanity:", error);
    return {
      footerLinksCol1: null,
      footerLinksCol2: null,
      siteSettings: null,
    };
  }
}

export default async function Footer() {
  const { footerLinksCol1, footerLinksCol2, siteSettings } = await getFooterData();

  return (
    <footer id="contact" className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="text-lg font-bold text-gray-300 mb-4 border-b border-green-700 pb-2">অন্যান্য লিংক</h3>
            <ul className="space-y-2">
                {footerLinksCol1?.navItems?.map((link: NavItem) => (
                    <li key={link._key}>
                        <Link href={link.href || '#'} className="hover:text-green-400 transition-colors flex items-center gap-2">
                            <Plus className='w-4 h-4' /> {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
          </div>
          
          <div className='md:mt-11'>
            <ul className="space-y-2">
                {footerLinksCol2?.navItems?.map((link: NavItem) => (
                    <li key={link._key}>
                        <Link href={link.href || '#'} className="hover:text-green-400 transition-colors flex items-center gap-2">
                             <Plus className='w-4 h-4' /> {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
          </div>

          <div>
             <h3 className="text-lg font-bold text-gray-300 mb-4 border-b border-green-700 pb-2">যোগাযোগের ঠিকানা</h3>
            <address className="not-italic space-y-3 text-gray-300">
              <p className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-green-400 flex-shrink-0" />
                <span>{siteSettings?.footerAddress || 'Address not available'}</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-400" />
                <a href={`tel:${siteSettings?.footerPhone}`} className="hover:text-green-400 transition-colors">{siteSettings?.footerPhone || 'Phone not available'}</a>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-400" />
                <a href={`mailto:${siteSettings?.footerEmail}`} className="hover:text-green-400 transition-colors break-all">{siteSettings?.footerEmail || 'Email not available'}</a>
              </p>
               <p className="flex items-center gap-3">
                <Star className="w-5 h-5 text-green-400" />
                <span>EIIN NO: {siteSettings?.eiinNumber || 'N/A'}</span>
              </p>
               <p className="flex items-center gap-3">
                <Code className="w-5 h-5 text-green-400" />
                <span>স্কুল কোড: {siteSettings?.schoolCode || 'N/A'}</span>
              </p>
            </address>
          </div>
           <div>
             <h3 className="text-lg font-bold text-gray-300 mb-4 border-b border-green-700 pb-2">ফেসবুক পেজ</h3>
             <div className="bg-white rounded-lg overflow-hidden">
                {siteSettings?.facebookPageUrl && (
                  <iframe src={siteSettings.facebookPageUrl} width="100%" height="130" style={{border:'none', overflow:'hidden'}} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                )}
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
