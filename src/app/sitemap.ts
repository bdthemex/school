import { MetadataRoute } from 'next'
import { getSheetData } from '@/lib/data-loader';

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notices = await getSheetData('notices');

  const noticeUrls = notices.map(notice => ({
    url: `${BASE_URL}/notices/${notice.id}`,
    lastModified: new Date(notice.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  
  const staticRoutes = [
    '', 
    '/about', 
    '/history', 
    '/principals-message', 
    '/vice-principals-message', 
    '/class-routine',
    '/successful-students',
    '/teachers',
    '/staff',
    '/notices',
    '/results',
    '/gallery',
    '/video-gallery',
    '/academic-calendar',
    '/holiday-list',
    '/contact',
  ];

  const staticUrls = staticRoutes.map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [
    ...staticUrls,
    ...noticeUrls,
  ];
}
