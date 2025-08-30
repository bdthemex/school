// schemas/videoItem.ts
export default {
  name: 'videoItem',
  title: 'Video Item',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
    },
  ],
}
