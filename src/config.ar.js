const config = {
  school: {
    name: "مدرسة المعالي الدولية",
    shortName: "المعالي",
    metaDescription:
      "تقدم مدرسة المعالي الدولية برامج تعليمية شاملة للطلاب الذين تتراوح أعمارهم بين 5 و18 عامًا، لتعزيز التميز والمواطنة العالمية.",
    meta_og_Description:
      "تقديم تعليم عالي الجودة، برامج تعليمية شاملة وتعزيز المواطنين العالميين.",
    welcomeMessage:
      "انطلق في رحلة التميز التعليمي مع المعالي. اكتشف تاريخنا الغني والتزامنا برعاية قادة المستقبل.",
    baseUrl:`${process.env.BASE_URL}`,
    url: `${process.env.PUBLIC_URL}`,
    logoPath: `${process.env.PUBLIC_URL}/images/logo.png`,
    ogImagePath: `${process.env.PUBLIC_URL}/images/og-image.jpg`,
    address: {
      streetAddress: "123 شارع التعليم",
      addressLocality: "القاهرة",
      addressRegion: "محافظة المقطم",
      postalCode: "12345",
      addressCountry: "مصر",
    },
    telephone: "+966-123-456789",
    email: "info@company.co",
    foundingDate: "2005",
    socialLinks: {
      facebook: "https://www.facebook.com/AlmaalySchool",
      twitter: "https://www.twitter.com/AlmaalySchool",
      linkedin: "https://www.linkedin.com/company/almaaly-international-school",
    },
    quotesMetaDescription:
      "اقرأ ما يقوله قادة الصناعة عن تيدي وتأثيره على الرفاهية والإنتاجية.",
    quotes: [
      {
        text: "مكننا تيدي من الانتقال من مزايا الموظفين إلى تجربة رفاهية شخصية.",
        author: "أندرو لوكهيد",
        title: "الرئيس والمؤسس المشارك",
        img: `${process.env.PUBLIC_URL}/images/quote-1.jpeg`,
      },
      {
        text: "حول هذا الحل نهجنا تجاه رفاهية الموظفين والإنتاجية.",
        author: "سامانثا كارتر",
        title: "رئيس الموارد البشرية",
        img: `${process.env.PUBLIC_URL}/images/quote-2.jpg`,
      },
      {
        text: "لم يكن رضا وأداء فريقنا أفضل من ذلك بفضل تيدي.",
        author: "مايكل إيفانز",
        title: "الرئيس التنفيذي",
        img: `${process.env.PUBLIC_URL}/images/quote-3.jpg`,
      },
      {
        text: "أداة ثورية أعادت تشكيل ثقافتنا المؤسسية والمعنويات.",
        author: "سارة روبنسون",
        title: "مدير العمليات",
        img: `${process.env.PUBLIC_URL}/images/quote-4.jpg`,
      },
    ],
    facts: [
      { icon: "fa-trophy mb-3", title: "الجوائز التي فزنا بها", count: 32 },
      { icon: "fa-graduation-cap mb-3", title: "الدرجات العلمية", count: 4 },
      { icon: "fa-desktop mb-3", title: "سنوات العمل", count: 12 },
      { icon: "fa-solid fa-life-ring mb-3", title: "أعضاء الفريق", count: 6 },
      { icon: "fa-certificate mb-3", title: "الشهادات", count: 10 },
    ],
    aboutUs: {
      sections: [
        { title: "التعليم الشامل", icon: "fa-graduation-cap fa-2x mb-4" },
        { title: "بيئة رعاية", icon: "fa-heart fa-2x mb-4" },
        { title: "منظور عالمي", icon: "fa-globe fa-2x mb-4" },
      ],
      description:
        "يعود الفضل إلى Unsplash وPexels في الصور والفيديو المستخدمين في هذا القالب. فيفاموس تينسيدنت، أوجو روتوم كونفاليس فولبوتات، ماسا لاكوس تيمبوس ليو.",
    },
    galleryImages: [
      `${process.env.PUBLIC_URL}/images/galary-1.jpeg`,
      `${process.env.PUBLIC_URL}/images/galary-2.jpeg`,
      `${process.env.PUBLIC_URL}/images/galary-3.jpeg`,
      `${process.env.PUBLIC_URL}/images/galary-4.jpeg`,
    ],
    studentsGalleryImages: [
      `${process.env.PUBLIC_URL}/images/student-1.png`,
      `${process.env.PUBLIC_URL}/images/student-2.jpg`,
      `${process.env.PUBLIC_URL}/images/student-3.jpg`,
      `${process.env.PUBLIC_URL}/images/student-4.jpg`,
      `${process.env.PUBLIC_URL}/images/student-5.jpg`,
      `${process.env.PUBLIC_URL}/images/student-6.jpg`,
      `${process.env.PUBLIC_URL}/images/student-7.jpg`,
      `${process.env.PUBLIC_URL}/images/student-8.jpg`,
    ],
    thirdSection: {
      title: "انضم إلى مجتمع المعالي",
      description:
        "كن جزءًا من مجتمع مدرستنا النابض بالحياة واستكشف الفرص اللامحدودة التي نقدمها. سجل اليوم لبدء رحلتك.",
      buttonText: "ابدأ الآن",
      quote: {
        text: "كان كوني جزءًا من المعالي تجربة تحويلية. التزام المدرسة برعاية بيئة تعلم داعمة وديناميكية لا مثيل له. لقد أثرت البرامج المتنوعة والمعلمين الشغوفين تجربتي التعليمية حقًا.",
        authorName: "إميلي كارتر",
        authorTitle: "خريجة المعالي",
        image: `${process.env.PUBLIC_URL}/images/so-far.jpeg`,
      },
    },
    fourthSection: {
      title: "متنوعة وشاملة",
      subtitle: "استكشف برامجنا",
      description:
        "تقدم المعالي مجموعة واسعة من البرامج المصممة لتلبية الاهتمامات والقوى الفريدة لكل طالب.",
      programs1: [
        {
          name: "تعليم STEM",
          description:
            "منهج مبتكر يعزز التفكير النقدي ومهارات حل المشكلات.",
          icon: "fa-school",
        },
        {
          name: "الفنون والعلوم الإنسانية",
          description: "تشجيع التعبير الإبداعي والوعي الثقافي.",
          icon: "fa-theater-masks",
        },
      ],
      programs2: [
        {
          name: "الرياضة والرفاهية",
          description: "تعزيز الصحة البدنية والعمل الجماعي.",
          icon: "fa-dumbbell",
        },
        {
          name: "اللغات والأدب",
          description:
            "بناء مهارات التواصل والتقدير الأدبي.",
          icon: "fa-book",
        },
      ],
    },
    bottomPage: {
      mainTitle: "فعالياتنا",
      mainText: [
        "مصمم ومطور ويب بالذكاء الاصطناعي بجانبك.",
        "بدعم من ثلاثة مساعدين مذهلين، يمكنني تحقيق موقعك المثالي.",
        "لنبدأ المحادثة!",
      ],
      subtitle: {
        video1: "معرض صور سكارليت",
        video2: "مبادرة محادثة الطيور",
        video3: "سوق الرسوم المتحركة المستقبلية",
      },
      videos: [
        { id: "M5QjjUgkC48", title: "الفيديو الرئيسي" },
        { id: "x_3zGg9658c", title: "معرض صور سكارليت" },
        { id: "CXy_r4U9oTQ", title: "مبادرة محادثة الطيور" },
        { id: "HiwnB2aV7P0", title: "سوق الرسوم المتحركة المستقبلية" },
      ],
      metaDescription: "اكتشف فعالياتنا ومشاريعنا المميزة.",
    },
    contactUs:{
      title: 'خلينا علي اتصال',
      name:'الاسم',
      email:'الايميل',
      message:'الرساله',
      submitLabel: 'ارسال',
      submittingLabel: '... يتم الارسال',
      successMessage: 'تم ارسال الرساله بنجاح',

    },
    footerMetaDescription:
      "استكشف عروض المعالي وتفاصيل الاتصال ومعلومات الدعم.",
    copyright: `حقوق النشر © المعالي ${new Date().getFullYear()}`,
  },
};

module.exports = config;
