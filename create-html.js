// create-html.js
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;
const metagen = require('meta-generator');
const lang = process.env.LANG || 'en';
const config = require(`./src/config.${lang}.js`);


const {
    name,
    shortName,
    metaDescription,
    meta_og_Description,
    welcomeMessage,
    url,
    logoPath,
    ogImagePath,
    address,
    telephone,
    email,
    foundingDate,
    socialLinks,
    quotes,
    quotesMetaDescription,
    facts,
    aboutUs,
    thirdSection,
    fourthSection,
    bottomPage,
    footerMetaDescription,
    copyright,
  } = config.school;


  const htmlAttributes = lang === 'ar' ? 'lang="ar" dir="rtl"' : 'lang="en"';
  const noscriptMessage = lang === 'ar'
  ? 'يجب تمكين JavaScript لتشغيل هذا التطبيق.'
  : 'You need to enable JavaScript to run this app.';

  const pageTitle = lang === 'ar' ? `مرحبًا بكم في ${shortName}` : `Welcome to ${shortName}`;


const boilerplate = `
<!DOCTYPE html>
<html ${htmlAttributes}>
  <head>
  <meta charset="utf-8" />
  <link rel="icon" href="${process.env.PUBLIC_URL || './'}favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <meta name="theme-color" content="#000000" />
  <link rel="manifest" href="${process.env.PUBLIC_URL || './'}manifest.json" />
    <!-- {% metagen %} -->
  </head>
  <body>
    <noscript>${noscriptMessage}</noscript>
    <div id="root"></div>
  </body>
</html>`;

const generateMetaDescription = ()=>{
  return `${metaDescription} | ${welcomeMessage} | ${aboutUs.description} | ${quotesMetaDescription} | ${footerMetaDescription}`
}

const metaHTML = `
  <title>${pageTitle}</title>
  <meta name="description" content="${generateMetaDescription()}" />
  <meta property="og:title" content="${name}" />
  <meta property="og:description" content="${meta_og_Description}" />
  <meta property="og:image" content="${ogImagePath}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@AlmaalySchool" />
  <meta name="twitter:title" content="${name}" />
  <meta name="twitter:description" content="${meta_og_Description}" />
  <meta name="twitter:image" content="${ogImagePath}" />

  <link rel="alternate" href="${url}en/" hreflang="en" />
  <link rel="alternate" href="${url}ar/" hreflang="ar" />
  <link rel="alternate" href="${url}" hreflang="x-default" />
`;


const addDataNonce = (html) => {
  // Add data-nonce to all script tags that don't already have it
  html = html.replace(/<script(?!(?:[^>]*\sdata-nonce=))/g, '<script data-nonce="REPLACE_WITH_NONCE"');

  // Add data-nonce to all stylesheet link tags that don't already have it
  html = html.replace(/<link rel="stylesheet"(?!(?:[^>]*\sdata-nonce=))/g, '<link rel="stylesheet" data-nonce="REPLACE_WITH_NONCE"');

  // Make asset paths relative by removing leading slash
  html = html.replace(/href="\/static\//g, 'href="static/');
  html = html.replace(/src="\/static\//g, 'src="static/');

  return html;
};


const jsonLdData = [
  // JSON-LD for general school information
  {
    "@context": "https://schema.org",
    "@type": "School",
    "name": name,
    "url": url,
    "logo": logoPath,
    "description": welcomeMessage,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "addressRegion": address.addressRegion,
      "postalCode": address.postalCode,
      "addressCountry": address.addressCountry,
    },
    "telephone": telephone,
    "foundingDate": foundingDate,
    "sameAs": [socialLinks.facebook, socialLinks.twitter, socialLinks.linkedin],
  },
  // JSON-LD for social profiles
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    "url": url,
    "logo": logoPath,
    "sameAs": [socialLinks.facebook, socialLinks.twitter, socialLinks.linkedin],
  },
  // JSON-LD for about us and facts
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": name,
    "description": aboutUs.description,
    "department": aboutUs.sections.map((section) => ({
      "@type": "EducationalOccupationalProgram",
      "name": section.title,
    })),
    "hasPart": facts.map((fact) => ({
      "@type": "Achievement",
      "name": fact.title,
      "numberOfItems": fact.count,
    })),
  },
  // JSON-LD for third section (alumni)
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": name,
    "department": {
      "@type": "EducationalOccupationalProgram",
      "name": "Student Community Program",
      "description": thirdSection.description,
    },
    "alumni": {
      "@type": "Person",
      "name": thirdSection.quote.authorName,
      "jobTitle": thirdSection.quote.authorTitle,
      "description": thirdSection.quote.text,
      "image": thirdSection.quote.image,
    },
  },
  // JSON-LD for fourth section programs
  {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "name": fourthSection.title,
    "educationalCredentialAwarded": fourthSection.subtitle,
    "hasPart": [...fourthSection.programs1, ...fourthSection.programs2].map((program) => ({
      "@type": "Course",
      "name": program.name,
      "description": program.description,
    })),
  },
  // JSON-LD for quotes/testimonials
  {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    "name": "Testimonials",
    "about": name,
    "mainEntity": quotes.map((quote) => ({
      "@type": "Review",
      "reviewBody": quote.text,
      "author": {
        "@type": "Person",
        "name": quote.author,
        "jobTitle": quote.title,
      },
      "associatedMedia": {
        "@type": "ImageObject",
        "contentUrl": quote.img,
        "description": `${quote.author} - ${quote.title}`,
      },
    })),
  },
  // JSON-LD for bottom page events
  {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "name": bottomPage.mainTitle,
    "hasCourse": bottomPage.videos.map((video) => ({
      "@type": "Course",
      "name": video.title,
      "video": {
        "@type": "VideoObject",
        "name": video.title,
        "embedUrl": `https://www.youtube.com/embed/${video.id}`,
      },
    })),
  },
  // JSON-LD for contact information in footer
  {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "telephone": telephone,
    "email": email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "postalCode": address.postalCode,
      "addressCountry": address.addressCountry,
    },
  },
];

// Generate JSON-LD script tags with data-nonce placeholders
const jsonLdScripts = jsonLdData
  .map(
    (jsonLd) =>
      `<script type="application/ld+json" data-nonce="REPLACE_WITH_NONCE">${JSON.stringify(jsonLd)}</script>`
  )
  .join('\n');

const headContent = metaHTML + '\n' + jsonLdScripts;

// Replace the boilerplate's metagen placeholder with actual meta tags and JSON-LD
let content = boilerplate.replace('<!-- {% metagen %} -->', headContent);

// Inject data-nonce placeholders and make asset paths relative
content = addDataNonce(content);


// Define the output path for the language-specific index.html
const outputPath = path.join(__dirname, `public_langs/${lang}/index.html`);

// Write the final HTML to the specified path
const createHtml = async () => {
  try {
    await fsPromises.mkdir(path.dirname(outputPath), { recursive: true });
    await fsPromises.writeFile(outputPath, content.trim());
    console.log(`Meta tags and JSON-LD data successfully generated for ${lang}!`);
  } catch (error) {
    console.error(`Error generating HTML for ${lang}:`, error);
  }
};

createHtml();