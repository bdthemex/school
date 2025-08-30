import aboutPage from './schemas/aboutPage'
import academicCalendarEvent from './schemas/academicCalendarEvent'
import classRoutine from './schemas/classRoutine'
import galleryImage from './schemas/galleryImage'
import historyPage from './schemas/historyPage'
import holiday from './schemas/holiday'
import notice from './schemas/notice'
import principalMessage from './schemas/principalMessage'
import staff from './schemas/staff'
import successfulStudent from './schemas/successfulStudent'
import teacher from './schemas/teacher'
import vicePrincipalMessage from './schemas/vicePrincipalMessage'
import videoItem from './schemas/videoItem'
import siteSettings from './schemas/siteSettings'
import homepage from './schemas/homepage'
import navigation from './schemas/navigation'
import studentResult from './schemas/studentResult'

export const schemaTypes = [
  // Site-wide settings
  siteSettings,
  homepage,
  navigation,

  // Page-specific content
  teacher,
  staff,
  successfulStudent,
  aboutPage,
  historyPage,
  principalMessage,
  vicePrincipalMessage,
  videoItem,
  classRoutine,
  academicCalendarEvent,
  holiday,
  notice,
  galleryImage,
  studentResult,
]
