// schemas/aboutPage.ts
export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'schoolName',
      title: 'School Name',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
    },
    {
      name: 'missionTitle',
      title: 'Mission Title',
      type: 'string',
    },
    {
      name: 'missionPoints',
      title: 'Mission Points',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'academicTitle',
      title: 'Academic Title',
      type: 'string',
    },
    {
      name: 'academicDescription',
      title: 'Academic Description',
      type: 'text',
    },
  ],
}
