const config = {
  school: {
    name: "Almaaly International School",
    shortName: "Almaaly",
    metaDescription:
      "Almaaly International School offers comprehensive educational programs for students aged 5 to 18, fostering excellence and global citizenship.",
    meta_og_Description:
      "Offering quality education, comprehensive educational programs and fostering global citizens.",
    welcomeMessage:
      "Embark on a journey of educational excellence with Almaaly. Discover our rich history and commitment to nurturing future leaders.",
    url: `${process.env.PUBLIC_URL}`,
    logoPath: `${process.env.PUBLIC_URL}/en/images/logo.png`,
    ogImagePath: `${process.env.PUBLIC_URL}/en/images/og-image.jpg`,
    address: {
      streetAddress: "123 Education Street",
      addressLocality: "Cairo",
      addressRegion: "Mokkatam Province",
      postalCode: "12345",
      addressCountry: "Egypt",
    },
    telephone: "+966-123-456789",
    email: "info@company.co",
    foundingDate: "2005",
    socialLinks: {
      facebook: "https://www.facebook.com/AlmaalySchool",
      twitter: "https://www.twitter.com/AlmaalySchool",
      linkedin: "https://www.linkedin.com/company/almaaly-international-school",
    },
    quotesMetaDescription:"Read what industry leaders say about Tedy and its impact on wellness and productivity.",
    quotes: [
      {
        text: "Tedy has enabled us to move from employee benefits to a personalized wellness experience.",
        author: "Andrew Lockhead",
        title: "President and Co-founder",
        img: `${process.env.PUBLIC_URL}/en/images/quote-1.jpeg`,
      },
      {
        text: "This solution has transformed our approach to employee wellness and productivity.",
        author: "Samantha Carter",
        title: "Chief HR Officer",
        img: `${process.env.PUBLIC_URL}/en/images/quote-2.jpg`,
      },
      {
        text: "Our team's satisfaction and performance have never been better, thanks to Tedy.",
        author: "Michael Evans",
        title: "CEO",
        img: `${process.env.PUBLIC_URL}/en/images/quote-3.jpg`,
      },
      {
        text: "A revolutionary tool that has reshaped our corporate culture and morale.",
        author: "Sarah Robinson",
        title: "Operations Manager",
        img: `${process.env.PUBLIC_URL}/en/images/quote-4.jpg`,
      },
    ],
    facts: [
      { icon: "fa-trophy mb-3", title: "Awards Won", count: 32 },
      { icon: "fa-graduation-cap mb-3", title: "Degrees", count: 4 },
      { icon: "fa-desktop mb-3", title: "Working Years", count: 12 },
      { icon: "fa-solid fa-life-ring mb-3", title: "Team Members", count: 6 },
      { icon: "fa-certificate mb-3", title: "Certificates", count: 10 },
    ],
    aboutUs: {
      sections: [
        { title: "HOLISTIC EDUCATION", icon: "fa-graduation-cap fa-2x mb-4" },
        { title: "CARING ENVIRONMENT", icon: "fa-heart fa-2x mb-4" },
        { title: "GLOBAL PERSPECTIVE", icon: "fa-globe fa-2x mb-4" },
      ],
      description:
        "Credits go to Unsplash and Pexels for photos and video used in this template. Vivamus tincidunt, augue rutrum convallis volutpat, massa lacus tempus leo.",
    },
    galleryImages: [
      `${process.env.PUBLIC_URL}/en/images/galary-1.jpeg`,
      `${process.env.PUBLIC_URL}/en/images/galary-2.jpeg`,
      `${process.env.PUBLIC_URL}/en/images/galary-3.jpeg`,
      `${process.env.PUBLIC_URL}/en/images/galary-4.jpeg`,
    ],
    studentsGalleryImages: [
      `${process.env.PUBLIC_URL}/en/images/student-1.png`,
      `${process.env.PUBLIC_URL}/en/images/student-2.jpg`,
      `${process.env.PUBLIC_URL}/en/images/student-3.jpg`,
      `${process.env.PUBLIC_URL}/en/images/student-4.jpg`,
      `${process.env.PUBLIC_URL}/en/images/student-5.jpg`,
      `${process.env.PUBLIC_URL}/en/images/student-6.jpg`,
      `${process.env.PUBLIC_URL}/en/images/student-7.jpg`,
      `${process.env.PUBLIC_URL}/en/images/student-8.jpg`,
    ],
    thirdSection: {
      title: "Join the Almaaly Community",
      description:
        "Become a part of our vibrant school community and explore the endless opportunities we offer. Enroll today to start your journey.",
      buttonText: "Get Started",
      quote: {
        text: "Being part of Almaaly has been a transformative journey. The school's commitment to fostering a supportive and dynamic learning environment is unparalleled. The diverse programs and passionate educators have truly enriched my educational experience.",
        authorName: "Emily Carter",
        authorTitle: "Almaaly Alumnus",
        image: `${process.env.PUBLIC_URL}/en/images/so-far.jpeg`,
      },
    },
    fourthSection: {
      title: "Diverse and Comprehensive",
      subtitle: "Explore Our Programs",
      description:
        "Almaaly offers a wide range of programs designed to cater to the unique interests and strengths of each student.",
      programs1: [
        {
          name: "STEM Education",
          description:
            "Innovative curriculum fostering critical thinking and problem-solving skills.",
          icon: "fa-school",
        },
        {
          name: "Arts & Humanities",
          description: "Encouraging creative expression and cultural awareness.",
          icon: "fa-theater-masks",
        },
      ],
      programs2: [
        {
          name: "Sports & Wellness",
          description: "Promoting physical health and teamwork.",
          icon: "fa-dumbbell",
        },
        {
          name: "Languages & Literature",
          description:
            "Building communication skills and literary appreciation.",
          icon: "fa-book",
        },
      ],
    },
    bottomPage: {
      mainTitle: "Our Events",
      mainText: [
        "An AI web designer & developer by your side.",
        "With support from three amazing assistants, I can bring your ideal website to life.",
        "Let's start chatting!",
      ],
      subtitle: {
        video1: "SCARLETT'S PHOTO GALLERY",
        video2: "Bird Conversation Initiative",
        video3: "FUTURE CARTOON MARKETPLACE",
      },
      videos: [
        { id: "M5QjjUgkC48", title: "Main Video" },
        { id: "x_3zGg9658c", title: "SCARLETT'S PHOTO GALLERY" },
        { id: "CXy_r4U9oTQ", title: "Bird Conversation Initiative" },
        { id: "HiwnB2aV7P0", title: "FUTURE CARTOON MARKETPLACE" },
      ],
      metaDescription: "Discover our highlighted events and projects.",
    },
    footerMetaDescription:
      "Explore Almaaly's offerings, contact details, and support information.",
    copyright: `Copyright © Almaaly ${new Date().getFullYear()}`,
  },
};

module.exports = config;
