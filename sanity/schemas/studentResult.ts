// schemas/studentResult.ts
export default {
  name: 'studentResult',
  title: 'Student Result',
  type: 'document',
  fields: [
    { name: 'studentName', title: 'Student Name', type: 'string' },
    { name: 'fatherName', title: 'Father\'s Name', type: 'string' },
    { name: 'year', title: 'Year', type: 'string' }, // e.g., "2024"
    { name: 'examType', title: 'Exam Type', type: 'string' }, // e.g., "বার্ষিক পরীক্ষা"
    { name: 'className', title: 'Class', type: 'string' }, // e.g., "১০ম"
    { name: 'roll', title: 'Roll Number', type: 'string' },
    { name: 'totalMarks', title: 'Total Marks', type: 'number' },
    { name: 'grade', title: 'Grade', type: 'string' },
    {
      name: 'results',
      title: 'Subject-wise Results',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'subject', title: 'Subject', type: 'string' },
            { name: 'marks', title: 'Marks', type: 'number' },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'studentName',
      subtitle: 'roll',
      className: 'className',
      year: 'year',
      examType: 'examType',
    },
    prepare(selection: { title: any; subtitle: any; className: any; year: any, examType: any }) {
      const { title, subtitle, className, year, examType } = selection
      return {
        title: `${title} (Roll: ${subtitle})`,
        subtitle: `${className}, ${examType} ${year}`,
      }
    },
  },
}
