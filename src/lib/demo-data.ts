// src/lib/demo-data.ts

export const demoData = [
  // Site Settings
  {
    _id: "siteSettings",
    _type: "siteSettings",
    footerAddress: "কেন্দুয়া বাজার, কেন্দুয়া, নেত্রকোণা, বাংলাদেশ।",
    footerPhone: "০১৭১৭-৪০৭৫৮৫",
    footerEmail: "joyharisprygovtschool@gmail.com",
    eiinNumber: "113026",
    schoolCode: "8300",
    facebookPageUrl: "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fkjhsgovt.school&tabs=timeline&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId",
  },
  // Homepage
  {
    _id: "homepage",
    _type: "homepage",
    historySection: {
      summary: "কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়টি ১৮৩২ সালে প্রতিষ্ঠিত হয়। এটি এই অঞ্চলের অন্যতম প্রাচীন এবং স্বনামধন্য একটি শিক্ষা প্রতিষ্ঠান। ১৯ মার্চ, ১৯৯১ সালে প্রতিষ্ঠানটি জাতীয়করণ করা হয়। বর্তমানে বিদ্যালয়ে ৬ষ্ঠ থেকে ১০ম শ্রেণি পর্যন্ত পাঠদান করা হয় এবং প্রায় ৭১৭ জন শিক্ষার্থী অধ্যয়নরত আছে। অভিজ্ঞ শিক্ষকমণ্ডলীর মাধ্যমে পরিচালিত এই বিদ্যালয়ে বর্তমানে ১২ জন শিক্ষক কর্মরত রয়েছেন। বিদ্যালয়টিতে একটি তিন তলা ভবন, একটি দোতলা ভবন, তিনটি হাফ বিল্ডিং, একটি খেলার মাঠ এবং দুইটি শহীদ মিনার রয়েছে।",
      linkText: "বিস্তারিত পড়ুন",
      linkHref: "/about",
    },
  },
  // Header Navigation
  {
    _id: "headerNavigation",
    _type: "navigation",
    title: "Header Navigation",
    navItems: [
      { _key: "n1", label: "প্রচ্ছদ", href: "/" },
      { 
        _key: "n2", 
        label: "আমাদের সম্পর্কে",
        children: [
          { _key: "s1", label: "আমাদের সম্পর্কে", href: "/about" },
          { _key: "s2", label: "প্রতিষ্ঠানের ইতিহাস", href: "/history" },
          { _key: "s3", label: "প্রধান শিক্ষকের বাণী", href: "/principals-message" },
          { _key: "s4", label: "সহকারী প্রধান শিক্ষকের বাণী", href: "/vice-principals-message" },
        ]
      },
      { 
        _key: "n3", 
        label: "শিক্ষার্থী",
        children: [
            { _key: "s5", label: 'ক্লাস রুটিন', href: '/class-routine' },
            { _key: "s6", label: 'কৃতি শিক্ষার্থী', href: '/successful-students' },
        ]
      },
      { 
        _key: "n4", 
        label: "শিক্ষকমন্ডলী",
        children: [
          { _key: "s7", label: "শিক্ষক পরিচিতি", href: "/teachers" },
          { _key: "s8", label: "কর্মচারী পরিচিতি", href: "/staff" },
        ]
      },
      { _key: "n5", label: "নোটিশ", href: "/notices" },
      { _key: "n6", label: "পরীক্ষার ফলাফল", href: "/results" },
      { 
        _key: "n7", 
        label: "গ্যালারি",
        children: [
          { _key: "s9", label: "ফটো গ্যালারি", href: "/gallery" },
          { _key: "s10", label: "ভিডিও গ্যালারি", href: "/video-gallery" },
        ]
      },
      { 
        _key: "n8", 
        label: "অন্যান্য",
        children: [
            { _key: "s11", label: "একাডেমিক ক্যালেন্ডার", href: "/academic-calendar" },
            { _key: "s12", label: "ছুটির তালিকা", href: "/holiday-list" },
        ]
      },
      { _key: "n9", label: "যোগাযোগ", href: "/contact" },
    ]
  },
  // Footer Links
  {
    _id: "footerLinksCol1",
    _type: "navigation",
    title: "Footer Links Column 1",
    navItems: [
      { _key: "f1", label: "প্রতিষ্ঠানের ইতিহাস", href: "/history" },
      { _key: "f2", label: "একাডেমিক ক্যালেন্ডার", href: "/academic-calendar" },
      { _key: "f3", label: "যোগাযোগ", href: "/contact" },
      { _key: "f4", label: "ছুটির দিন", href: "/holiday-list" },
      { _key: "f5", label: "কৃতি শিক্ষার্থী", href: "/successful-students" },
      { _key: "f6", label: "নোটিশ", href: "/notices" },
    ]
  },
  {
    _id: "footerLinksCol2",
    _type: "navigation",
    title: "Footer Links Column 2",
    navItems: [
      { _key: "f7", label: "পরীক্ষার ফলাফল", href: "/results" },
      { _key: "f8", label: "ফটো গ্যালারি", href: "/gallery" },
      { _key: "f9", label: "ভিডিও গ্যালারি", href: "/video-gallery" },
      { _key: "f10", label: "ক্লাস রুটিন", href: "/class-routine" },
      { _key: "f11", label: "শিক্ষক পরিচিতি", href: "/teachers" },
      { _key: "f12", label: "কর্মচারী পরিচিতি", href: "/staff" },
    ]
  },
  // About Page
  {
    _id: "aboutPage",
    _type: "aboutPage",
    schoolName: "কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়",
    description: "কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়টি ১৮৩২ সালে প্রতিষ্ঠিত হয়। এটি এই অঞ্চলের অন্যতম প্রাচীন এবং স্বনামধন্য একটি শিক্ষা প্রতিষ্ঠান। ১৯ মার্চ, ১৯৯১ সালে প্রতিষ্ঠানটি জাতীয়করণ করা হয়।",
    missionTitle: "আমাদের লক্ষ্য",
    missionPoints: [
      "মানসম্মত শিক্ষা প্রদান।",
      "শিক্ষার্থীদের নৈতিক বিকাশ।",
      "আধুনিক প্রযুক্তির ব্যবহার।",
      "শিক্ষার্থীদের সৃজনশীলতার বিকাশ ঘটানো।",
    ],
    academicTitle: "একাডেমিক কার্যক্রম",
    academicDescription: "আমরা শিক্ষার্থীদের জন্য বিভিন্ন সহ-শিক্ষা কার্যক্রমের আয়োজন করি, যা তাদের শারীরিক ও মানসিক বিকাশে সহায়তা করে। খেলাধুলা, সাংস্কৃতিক অনুষ্ঠান এবং বিভিন্ন প্রতিযোগিতার মাধ্যমে তাদের প্রতিভা বিকাশের সুযোগ করে দেওয়া হয়।",
  },
  // History Page
  {
    _id: "historyPage",
    _type: "historyPage",
    title: "প্রতিষ্ঠানের গৌরবময় ইতিহাস",
    journeyTitle: "আমাদের পথচলা",
    description1: "কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়টি ১৮৩২ সালে প্রতিষ্ঠিত হয়। এটি এই অঞ্চলের অন্যতম প্রাচীন এবং স্বনামধন্য একটি শিক্ষা প্রতিষ্ঠান। শিক্ষার আলো ছড়িয়ে দেওয়ার লক্ষ্যে এর যাত্রা শুরু হয়েছিল।",
    description2: "১৯ মার্চ, ১৯৯১ সালে প্রতিষ্ঠানটি জাতীয়করণ করা হয়। বর্তমানে বিদ্যালয়ে ৬ষ্ঠ থেকে ১০ম শ্রেণি পর্যন্ত পাঠদান করা হয় এবং প্রায় ৭১৭ জন শিক্ষার্থী অধ্যয়নরত আছে। অভিজ্ঞ শিক্ষকমণ্ডলীর মাধ্যমে পরিচালিত এই বিদ্যালয়ে বর্তমানে ১২ জন শিক্ষক কর্মরত রয়েছেন।",
    milestonesTitle: "ঐতিহাসিক মাইলফলক",
    milestones: [
      { _key: "m1", year: 1832, event: "বিদ্যালয় প্রতিষ্ঠিত হয়।" },
      { _key: "m2", year: 1991, event: "প্রতিষ্ঠানটি জাতীয়করণ করা হয়।" },
      { _key: "m3", year: 2020, event: "অনলাইন ক্লাস কার্যক্রম শুরু হয়।" },
    ],
  },
  // Principal's Message
  {
    _id: "principalMessage",
    _type: "principalMessage",
    name: "মোঃ আব্দুল বাতেন",
    designation: "প্রধান শিক্ষক",
    quote: "শিক্ষা জাতির মেরুদণ্ড। মানসম্মত শিক্ষাই একটি দেশের সার্বিক উন্নয়নের চাবিকাঠি।",
    message1: "দীর্ঘদিন পরে কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়ের ওয়েব সাইট সম্প্রতি খোলা হয়েছে। এটা বিদ্যালয়ের জন্য উজ্জ্বল মাইল ফলক। এর মাধ্যমে বিদ্যালয়ের সকল তথ্য সকলের কাছে দ্রুত পৌঁছে দেওয়া সম্ভব হবে।",
    message2: "আমরা শিক্ষার্থীদের যুগোপযোগী শিক্ষায় শিক্ষিত করে তুলতে প্রতিশ্রুতিবদ্ধ। আমি সকল শিক্ষক, শিক্ষার্থী ও অভিভাবকদের সহযোগিতা কামনা করছি।",
  },
  // Vice Principal's Message
  {
    _id: "vicePrincipalMessage",
    _type: "vicePrincipalMessage",
    name: "মোঃ আব্দুল হামিদ",
    designation: "সহকারী প্রধান শিক্ষক",
    quote: "প্রযুক্তি ও শিক্ষার সমন্বয়ে আমরা এগিয়ে যাব।",
    message1: "তথ্য প্রযুক্তির যুগে প্রবেশ করতে পেরে আমরা আনন্দিত। এর মাধ্যমে স্কুলের কার্যক্রম আরও গতিশীল হবে এবং স্বচ্ছতা নিশ্চিত হবে।",
    message2: "আমাদের লক্ষ্য শিক্ষার্থীদের শুধু প্রাতিষ্ঠানিক শিক্ষায় নয়, বরং নৈতিক ও মানবিক মূল্যবোধেও শিক্ষিত করে তোলা।",
  },
  // Teacher
  {
    _id: "teacher_1",
    _type: "teacher",
    name: "মোঃ আব্দুল বাতেন",
    designation: "প্রধান শিক্ষক",
    subject: "গণিত",
    phone: "01712345678",
    email: "principal@example.com",
  },
  // Staff
  {
    _id: "staff_1",
    _type: "staff",
    name: "মোঃ রহিম উদ্দিন",
    designation: "অফিস সহকারী",
  },
  // Successful Student
  {
    _id: "student_1",
    _type: "successfulStudent",
    name: "আব্দুল্লাহ আল মামুন",
    achievement: "ঢাকা বিশ্ববিদ্যালয়ে ভর্তি (২০২৩)",
  },
  // Video Item
  {
    _id: "video_1",
    _type: "videoItem",
    title: "বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৩",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  // Class Routine
  {
    _id: "routine_class_10",
    _type: "classRoutine",
    className: "১০ম শ্রেণী",
    order: 1,
    schedule: [
      { _key: "d1", day: "রবিবার", p1: "বাংলা", p2: "ইংরেজি", p3: "গণিত", p4: "বিজ্ঞান" },
      { _key: "d2", day: "সোমবার", p1: "বিজ্ঞান", p2: "গণিত", p3: "ইংরেজি", p4: "বাংলা" },
    ],
  },
  // Academic Calendar Event
  {
    _id: "event_1",
    _type: "academicCalendarEvent",
    date: "০১ জানুয়ারি, ২০২৫",
    event: "নতুন বছরের ক্লাস শুরু",
  },
  // Holiday
  {
    _id: "holiday_1",
    _type: "holiday",
    occasion: "ঈদুল ফিতর",
    from: "১০ এপ্রিল, ২০২৫",
    to: "১৫ এপ্রিল, ২০২৫",
  },
  // Notice
  {
    _id: "notice_1",
    _type: "notice",
    title: "২০২৫ শিক্ষাবর্ষে ভর্তি বিজ্ঞপ্তি",
    date: "2024-11-01T10:00:00Z",
    details: "২০২৫ শিক্ষাবর্ষে ৬ষ্ঠ থেকে ৯ম শ্রেণিতে ভর্তির জন্য আবেদন গ্রহণ শুরু হয়েছে। বিস্তারিত জানতে বিদ্যালয়ের অফিসে যোগাযোগ করুন।",
  },
  // Gallery Image
  {
    _id: "gallery_1",
    _type: "galleryImage",
    alt: "বার্ষিক ক্রীড়া প্রতিযোগিতা",
  },
];
