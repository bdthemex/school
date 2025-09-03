// sanity/schemas/homepage.ts
export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'heroSlider',
      title: 'Hero Slider',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', title: 'Image', type: 'image' },
            { name: 'caption', title: 'Caption', type: 'string' },
            { name: 'alt', title: 'Alternative Text', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'historySection',
      title: 'History Section',
      type: 'object',
      fields: [
        { name: 'image', title: 'Image', type: 'image' },
        { name: 'summary', title: 'Summary Text', type: 'text' },
        { name: 'linkText', title: 'Link Text', type: 'string', description: 'e.g., "বিস্তারিত পড়ুন"' },
        { name: 'linkHref', title: 'Link Href', type: 'string', description: 'e.g., "/about"' },
      ],
    },
    {
        name: 'importantLinks',
        title: 'Important Site Links Sidebar',
        type: 'array',
        of: [{
            type: 'object',
            fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'href', title: 'Link', type: 'string' },
                { name: 'icon', title: 'Icon Name', type: 'string', description: 'e.g., "Megaphone", "Trophy" from lucide-react' },
            ]
        }]
    },
    {
        name: 'resourceLinks',
        title: 'Resource Links Sidebar',
        type: 'array',
        of: [{
            type: 'object',
            fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'href', title: 'Link', type: 'string' },
            ]
        }]
    },
    {
        name: 'officialLinks',
        title: 'Official Links Sidebar',
        type: 'array',
        of: [{
            type: 'object',
            fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'href', title: 'Link', type: 'string' },
            ]
        }]
    }
  ],
}
