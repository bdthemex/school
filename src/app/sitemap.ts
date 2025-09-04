import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  // Hardcoded list of notices for the sitemap
  const notices = [
    { _id: 'n1', _updatedAt: new Date().toISOString() },
    { _id: 'n2', _updatedAt: new Date().toISOString() },
    { _id: 'n3', _updatedAt: new Date().toISOString() },
  ];

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
