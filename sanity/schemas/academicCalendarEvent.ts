// schemas/academicCalendarEvent.ts
export default {
  name: 'academicCalendarEvent',
  title: 'Academic Calendar Event',
  type: 'document',
  fields: [
    {
      name: 'date',
      title: 'Date',
      type: 'string',
    },
    {
      name: 'event',
      title: 'Event',
      type: 'string',
    },
  ],
}
