// sanity/schemas/siteSettings.ts
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'logo',
      title: 'School Logo',
      type: 'image',
      description: 'The main logo for the website header.',
    },
    {
      name: 'headerBanner',
      title: 'Header Banner',
      type: 'image',
      description: 'The large banner image displayed below the navigation bar on desktop.',
    },
    {
      name: 'footerAddress',
      title: 'Footer Address',
      type: 'text',
      description: 'The address displayed in the footer.',
    },
    {
      name: 'footerPhone',
      title: 'Footer Phone',
      type: 'string',
    },
    {
      name: 'footerEmail',
      title: 'Footer Email',
      type: 'string',
    },
    {
      name: 'eiinNumber',
      title: 'EIIN Number',
      type: 'string',
    },
    {
      name: 'schoolCode',
      title: 'School Code',
      type: 'string',
    },
    {
      name: 'facebookPageUrl',
      title: 'Facebook Page URL',
      type: 'url',
      description: 'The URL for the school\'s Facebook page to be embedded in the footer.',
    },
     {
      name: 'googleMapsUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
      description: 'The embed URL for the school\'s location from Google Maps.',
    },
  ],
}
