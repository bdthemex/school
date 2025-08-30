// schemas/galleryImage.ts
export default {
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    {
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'A short description of the image for accessibility.',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}
