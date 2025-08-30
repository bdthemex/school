// schemas/vicePrincipalMessage.ts
export default {
  name: 'vicePrincipalMessage',
  title: 'Vice Principal\'s Message',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'designation', title: 'Designation', type: 'string' },
    { name: 'image', title: 'Image', type: 'image' },
    { name: 'quote', title: 'Quote', type: 'text' },
    { name: 'message1', title: 'Message Part 1', type: 'text' },
    { name: 'message2', title: 'Message Part 2', type: 'text' },
  ],
}
