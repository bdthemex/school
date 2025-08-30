// sanity/schemas/navigation.ts

export default {
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'navItems',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
            },
            {
              name: 'href',
              title: 'Link (optional)',
              type: 'string',
              description: 'Leave empty if this is a dropdown menu.',
            },
            {
              name: 'children',
              title: 'Sub-menu Items (optional)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', title: 'Label', type: 'string' },
                    { name: 'href', title: 'Link', type: 'string' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
