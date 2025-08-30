// schemas/classRoutine.ts
export default {
  name: 'classRoutine',
  title: 'Class Routine',
  type: 'document',
  fields: [
    {
      name: 'className',
      title: 'Class Name',
      type: 'string',
    },
    {
        name: 'order',
        title: 'Order',
        type: 'number'
    },
    {
      name: 'schedule',
      title: 'Schedule',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'day', title: 'Day', type: 'string' },
            { name: 'p1', title: 'Period 1', type: 'string' },
            { name: 'p2', title: 'Period 2', type: 'string' },
            { name: 'p3', title: 'Period 3', type: 'string' },
            { name: 'p4', title: 'Period 4', type: 'string' },
          ],
        },
      ],
    },
  ],
}
