import { MetadataRoute } from 'next'
import { sanityClient } from '@/lib/sanity';

type Notice = {
  _id: string;
  _updatedAt: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic routes
  const noticesQuery = `*[_type == "notice" && !(_id in path("drafts.**"))]{_id, _updatedAt}`;
  const notices: Notice[] = await sanityClient.fetch(noticesQuery);

  const noticeUrls = notices.map(notice => ({
    url: `${BASE_URL}/notices/${notice._id}`,
    lastModified: new Date(notice._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  
  // Define static routes
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
