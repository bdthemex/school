// schemas/holiday.ts
export default {
  name: 'holiday',
  title: 'Holiday',
  type: 'document',
  fields: [
    {
      name: 'occasion',
      title: 'Occasion',
      type: 'string',
    },
    {
      name: 'from',
      title: 'From',
      type: 'string',
    },
    {
      name: 'to',
      title: 'To',
      type: 'string',
    },
  ],
}
