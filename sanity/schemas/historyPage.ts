// schemas/historyPage.ts
export default {
  name: 'historyPage',
  title: 'History Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'historicalImage',
      title: 'Historical Image',
      type: 'image',
    },
    {
      name: 'journeyTitle',
      title: 'Journey Title',
      type: 'string',
    },
    {
      name: 'description1',
      title: 'Description 1',
      type: 'text',
    },
    {
      name: 'description2',
      title: 'Description 2',
      type: 'text',
    },
    {
      name: 'milestonesTitle',
      title: 'Milestones Title',
      type: 'string',
    },
    {
      name: 'milestones',
      title: 'Milestones',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'year', title: 'Year', type: 'number' },
            { name: 'event', title: 'Event', type: 'string' },
          ],
        },
      ],
    },
  ],
}
