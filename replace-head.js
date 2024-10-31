require('dotenv').config();
const fs = require('fs');
const metagen = require('meta-generator');
const config = require('./src/config');


const {
    name,
    shortName,
    description,
    descriptionContent,
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
    facts,
    aboutUs,
    thirdSection,
    fourthSection,
    bottomPage,
    footerMetaDescription,
    copyright,
  } = config.school;

const boilerplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
  <meta charset="utf-8" />
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <meta name="theme-color" content="#000000" />
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!-- {% metagen %} -->
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`;

const metaHTML = `
  <title>${name}</title>
  <meta name="description" content="${description}" />
  <meta property="og:title" content="${name}" />
  <meta property="og:description" content="${descriptionContent}" />
  <meta property="og:image" content="${ogImagePath}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@AlmaalySchool" />
  <meta name="twitter:title" content="${name}" />
  <meta name="twitter:description" content="${descriptionContent}" />
  <meta name="twitter:image" content="${ogImagePath}" />
  <meta name="description" content="${footerMetaDescription}" />
`;

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

const jsonLdScripts = jsonLdData
  .map(
    (jsonLd) =>
      `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
  )
  .join('\n');

const headContent = metaHTML + jsonLdScripts;

const content = boilerplate.replace('<!-- {% metagen %} -->', headContent);

fs.writeFile('./public/index.html', content.trim(), (err) => {
  if (err) throw err;
  console.log('Meta tags and JSON-LD data successfully injected!');
});