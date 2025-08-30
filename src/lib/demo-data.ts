
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
    heroSlider: [
      { 
        _key: 'slide1', 
        caption: 'প্রতিষ্ঠানের দৃষ্টিনন্দন প্রধান ফটক', 
        alt: 'School main gate',
      },
      { 
        _key: 'slide2', 
        caption: 'বার্ষিক ক্রীড়া প্রতিযোগিতা', 
        alt: 'Annual sports day',
      },
      { 
        _key: 'slide3', 
        caption: 'সাংস্কৃতিক অনুষ্ঠানে শিক্ষার্থীদের অংশগ্রহণ', 
        alt: 'Students in a cultural event',
      },
    ],
    historySection: {
      summary: "কেন্দুয়া জয়হরি স্প্রাই সরকারি উচ্চ বিদ্যালয়টি ১৮৩২ সালে প্রতিষ্ঠিত হয়। এটি এই অঞ্চলের অন্যতম প্রাচীন এবং স্বনামধন্য একটি শিক্ষা প্রতিষ্ঠান। ১৯ মার্চ, ১৯৯১ সালে প্রতিষ্ঠানটি জাতীয়করণ করা হয়। বর্তমানে বিদ্যালয়ে ৬ষ্ঠ থেকে ১০ম শ্রেণি পর্যন্ত পাঠদান করা হয় এবং প্রায় ৭১৭ জন শিক্ষার্থী অধ্যয়নরত আছে। অভিজ্ঞ শিক্ষকমণ্ডলীর মাধ্যমে পরিচালিত এই বিদ্যালয়ে বর্তমানে ১২ জন শিক্ষক কর্মরত রয়েছেন। বিদ্যালয়টিতে একটি তিন তলা ভবন, একটি দোতলা ভবন, তিনটি হাফ বিল্ডিং, একটি খেলার মাঠ এবং দুইটি শহীদ মিনার রয়েছে।",
      linkText: "বিস্তারিত পড়ুন",
      linkHref: "/history",
    },
    importantLinks: [
        { _key: 'il1', title: 'নোটিশ', href: '/notices', icon: 'Megaphone' },
        { _key: 'il2', title: 'পরীক্ষার ফলাফল', href: '/results', icon: 'Trophy' },
        { _key: 'il3', title: 'কৃতি শিক্ষার্থী', href: '/successful-students', icon: 'Award' },
        { _key: 'il4', title: 'ছুটির দিন', href: '/holiday-list', icon: 'Plane' },
        { _key: 'il5', title: 'যোগাযোগ', href: '/contact', icon: 'Phone' },
    ],
    resourceLinks: [
        { _key: 'rl1', title: 'প্রধানমন্ত্রীর শিক্ষা সহায়তা ট্রাস্ট', href: '#' },
        { _key: 'rl2', title: 'উপবৃত্তি তথ্য', href: '#' },
        { _key: 'rl3', title: 'বৃত্তি তথ্য', href: '#' },
    ],
    officialLinks: [
        { _key: 'ol1', title: 'ভর্তির আবেদন', href: '#' },
        { _key: 'ol2', title: 'পরীক্ষার ফলাফল', href: '#' },
        { _key: 'ol3', title: 'ময়মনসিংহ বোর্ড', href: '#' },
        { _key: 'ol4', title: 'মাধ্যমিক ও উচ্চ শিক্ষা অধিদপ্তর', href: '#' },
        { _key: 'ol5', title: 'ব্যানবেইস', href: '#' },
    ],
    infoBoxes: [
        { 
            _key: 'ib1', 
            title: 'শিক্ষার্থীদের কর্নার',
            icon: 'GraduationCap',
            links: [
              {_key: 'ibl1', label: 'শ্রেণিভিত্তিক শিক্ষার্থী', href: '#'}, 
              {_key: 'ibl2', label: 'ক্লাস রুটিন', href: '/class-routine'}, 
              {_key: 'ibl3', label: 'ছুটির তালিকা', href: '/holiday-list'}, 
              {_key: 'ibl4', label: 'নোটিশ', href: '/notices'}
            ]
        },
        { 
            _key: 'ib2', 
            title: 'শিক্ষকমন্ডলীদের কর্ণার',
            icon: 'Users',
            links: [
              {_key: 'ibl5', label: 'শিক্ষকমন্ডলী', href: '/teachers'}, 
              {_key: 'ibl6', label: 'স্টাফ', href: '/staff'}, 
              {_key: 'ibl7', label: 'শিক্ষক/কর্মচারী সংখ্যা', href: '#'}, 
              {_key: 'ibl8', label: 'SMS ALERT', href: '#'}
            ]
        },
        { 
            _key: 'ib3', 
            title: 'সকল ডাউনলোড',
            icon: 'Download',
            links: [
                {_key: 'ibl9', label: 'ডাউনলোড', href: '#'},
                {_key: 'ibl10', label: 'পরীক্ষার রুটিন', href: '#'},
                {_key: 'ibl11', label: 'ভর্তি', href: '#'},
            ]
        },
        { 
            _key: 'ib4', 
            title: 'একাডেমিক তথ্য',
            icon: 'BookMarked',
            links: [
              {_key: 'ibl12', label: 'প্রতিষ্ঠানের ইতিহাস', href: '/history'}, 
              {_key: 'ibl13', label: 'পরীক্ষার ফলাফল', href: '/results'}, 
              {_key: 'ibl14', label: 'নোটিশ', href: '/notices'}, 
              {_key: 'ibl15', label: 'একাডেমিক ক্যালেন্ডার', href: '/academic-calendar'}, 
            ]
        }
    ]
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
    _type: "teacher",
    name: "মোঃ আব্দুল বাতেন",
    designation: "প্রধান শিক্ষক",
    subject: "গণিত",
    phone: "01712345678",
    email: "principal@example.com",
  },
   {
    _type: "teacher",
    name: "মোঃ আব্দুল হামিদ",
    designation: "সহকারী প্রধান শিক্ষক",
    subject: "ইংরেজি",
    phone: "01712345679",
    email: "viceprincipal@example.com",
  },
  // Staff
  {
    _type: "staff",
    name: "মোঃ রহিম উদ্দিন",
    designation: "অফিস সহকারী",
  },
  {
    _type: "staff",
    name: "মোঃ করিম শেখ",
    designation: "হিসাবরক্ষক",
  },
  // Successful Student
  {
    _type: "successfulStudent",
    name: "আব্দুল্লাহ আল মামুন",
    achievement: "ঢাকা বিশ্ববিদ্যালয়ে ভর্তি (২০২৩)",
  },
   {
    _type: "successfulStudent",
    name: "ফাতেমা আক্তার",
    achievement: "বুয়েটে ভর্তি (২০২৩)",
  },
  // Video Item
  {
    _type: "videoItem",
    title: "বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৩",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  // Class Routine
  {
    _type: "classRoutine",
    className: "১০ম শ্রেণী",
    order: 1,
    schedule: [
      { _key: "d1", day: "রবিবার", p1: "বাংলা", p2: "ইংরেজি", p3: "গণিত", p4: "বিজ্ঞান" },
      { _key: "d2", day: "সোমবার", p1: "বিজ্ঞান", p2: "গণিত", p3: "ইংরেজি", p4: "বাংলা" },
    ],
  },
    {
    _type: "classRoutine",
    className: "৯ম শ্রেণী",
    order: 2,
    schedule: [
      { _key: "d1", day: "রবিবার", p1: "ইংরেজি", p2: "বাংলা", p3: "বিজ্ঞান", p4: "গণিত" },
      { _key: "d2", day: "সোমবার", p1: "গণিত", p2: "বিজ্ঞান", p3: "বাংলা", p4: "ইংরেজি" },
    ],
  },
  // Academic Calendar Event
  {
    _type: "academicCalendarEvent",
    date: "০১ জানুয়ারি, ২০২৫",
    event: "নতুন বছরের ক্লাস শুরু",
  },
  {
    _type: "academicCalendarEvent",
    date: "২১ ফেব্রুয়ারি, ২০২৫",
    event: "শহীদ দিবস ও আন্তর্জাতিক মাতৃভাষা দিবস",
  },
  // Holiday
  {
    _type: "holiday",
    occasion: "ঈদুল ফিতর",
    from: "১০ এপ্রিল, ২০২৫",
    to: "১৫ এপ্রিল, ২০২৫",
  },
  {
    _type: "holiday",
    occasion: "ঈদুল আযহা",
    from: "১৭ জুন, ২০২৫",
    to: "২০ জুন, ২০২৫",
  },
  // Notice
  {
    _type: "notice",
    title: "২০২৫ শিক্ষাবর্ষে ভর্তি বিজ্ঞপ্তি",
    date: "2024-11-01T10:00:00Z",
    details: "২০২৫ শিক্ষাবর্ষে ৬ষ্ঠ থেকে ৯ম শ্রেণিতে ভর্তির জন্য আবেদন গ্রহণ শুরু হয়েছে। বিস্তারিত জানতে বিদ্যালয়ের অফিসে যোগাযোগ করুন।",
  },
   {
    _type: "notice",
    title: "বার্ষিক পরীক্ষার রুটিন",
    date: "2024-11-15T10:00:00Z",
    details: "বার্ষিক পরীক্ষার রুটিন প্রকাশ করা হয়েছে। সকল শিক্ষার্থীকে নোটিশ বোর্ড থেকে রুটিন সংগ্রহ করার জন্য অনুরোধ করা হলো।",
  },
  // Gallery Image
  {
    _type: "galleryImage",
    alt: "বার্ষিক ক্রীড়া প্রতিযোগিতা",
  },
   {
    _type: "galleryImage",
    alt: "বিজ্ঞান মেলা",
  },
];
