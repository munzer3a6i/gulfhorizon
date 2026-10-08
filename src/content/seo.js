// Search-engine metadata for every page, in English and Arabic.
// Used at runtime by <Seo> and at build time to write a static <head> for each URL (see vite.config.js),
// so crawlers and social previews get the right title/description without running JavaScript.
// Keep this file free of JSX/browser APIs — it is imported by Node during the build.

/** Public address of the live site (no trailing slash). Override with VITE_SITE_URL at build time. */
export const SITE_URL_DEFAULT = 'https://gulfhorizon.net'

export const BUSINESS = {
  legalName: 'Gulf Horizon International Services, Inc.',
  nameAr: 'أفق الخليج للخدمات العالمية',
  email: 'info@gulfhorizon.net',
  telephone: '+63-917-888-8970',
  license: 'DMW-217-LB-11282023-R',
  address: {
    streetAddress: '509 Merchant Center Bldg., 3rd Floor, Padre Faura St. cor. Mabini St., Ermita',
    addressLocality: 'Manila',
    addressRegion: 'Metro Manila',
    postalCode: '1000',
    addressCountry: 'PH',
  },
  geo: { latitude: 14.5776, longitude: 120.9829 },
  branches: ['Davao', 'Iloilo', 'Pangasinan', 'Bacolod', 'Cagayan de Oro'],
  areaServed: ['Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'],
  facebook: 'https://www.facebook.com/',
}

const KEYWORDS_EN = [
  'recruitment agency Philippines to Saudi Arabia',
  'Saudi recruitment agency',
  'Filipino manpower agency',
  'manpower supply Saudi Arabia',
  'overseas recruitment agency Manila',
  'DMW licensed recruitment agency',
  'POEA licensed agency',
  'hire Filipino workers',
  'Filipino workers for Saudi Arabia',
  'GCC recruitment agency',
  'Gulf manpower agency',
  'KSA recruitment',
  'manpower agency Riyadh Jeddah Dammam',
  'recruitment UAE Qatar Kuwait Bahrain Oman',
  'skilled workers recruitment',
  'construction manpower Saudi Arabia',
  'hospitality staffing Saudi Arabia',
  'nurses and caregivers recruitment',
  'engineering workers recruitment',
  'factory workers recruitment',
  'hospital staff recruitment',
  'hotel and restaurant staff recruitment',
  'manpower agency GCC and international',
]

const KEYWORDS_AR = [
  'مكتب استقدام من الفلبين',
  'استقدام عمالة فلبينية',
  'شركة استقدام في السعودية',
  'مكاتب الاستقدام',
  'استقدام عمالة ماهرة',
  'توريد العمالة',
  'توظيف الفلبينيين',
  'استقدام الخليج',
  'استقدام عمالة للمملكة العربية السعودية',
  'استقدام الرياض جدة الدمام',
  'استقدام الإمارات قطر الكويت البحرين عمان',
  'وكالة توظيف مرخصة DMW',
  'استقدام ممرضات',
  'استقدام عمالة هندسية',
  'استقدام عمال مصانع',
  'استقدام طواقم المستشفيات',
  'استقدام عمالة فنادق ومطاعم',
  'عمالة فنادق ومطاعم',
  'عمالة إنشاءات ومصانع',
]

const brandEn = 'Gulf Horizon International Services'
const brandAr = 'أفق الخليج للخدمات العالمية'

/** Route key → path (shared by both languages; Arabic is prefixed with /ar). */
export const SEO_ROUTES = {
  home: '/',
  deployments: '/deployments',
  about: '/about',
  contact: '/contact',
  license: '/dmw-license',
  privacy: '/privacy',
  terms: '/terms',
}

const SEO = {
  en: {
    siteName: brandEn,
    locale: 'en_US',
    keywords: KEYWORDS_EN,
    pages: {
      home: {
        title: 'Recruitment Agency Philippines to Saudi Arabia & GCC | Gulf Horizon',
        description:
          'DMW-licensed Filipino recruitment agency in Manila supplying skilled, engineering and factory workers, hospital staff, and hospitality, hotel and restaurant workers to employers in the GCC countries and worldwide — deployment in 45–60 days.',
        keywords: ['Filipino manpower for Saudi Arabia', 'manpower agency Philippines', 'Saudi Arabia jobs recruitment'],
      },
      deployments: {
        title: 'Previous Deployments to Saudi Arabia & the Gulf | Gulf Horizon Recruitment',
        description:
          'See the Saudi and GCC employers we have recruited Filipino workers for — hotels, hospitals, factories, construction and facilities companies in Riyadh, Jeddah, Dammam and across the Gulf.',
        keywords: ['Saudi employers Filipino workers', 'recruitment track record Saudi Arabia', 'job orders Saudi Arabia'],
      },
      about: {
        title: 'About Gulf Horizon — DMW-Licensed Filipino Recruitment Agency in Manila',
        description:
          'Gulf Horizon International Services is a DMW (formerly POEA) licensed manpower agency with a Manila head office and five regional branches, recruiting Filipino talent for Saudi Arabia, UAE, Qatar, Kuwait, Bahrain and Oman.',
        keywords: ['licensed manpower agency Manila', 'POEA accredited agency Saudi Arabia', 'Filipino recruitment company'],
      },
      contact: {
        title: 'Send a Job Order — Hire Filipino Workers for Saudi Arabia | Gulf Horizon',
        description:
          'Request Filipino candidates for your company in Saudi Arabia or the Gulf. Send a job order to our Manila recruitment team and receive a qualified shortlist — call or WhatsApp +63 917 888 8970 or email info@gulfhorizon.net.',
        keywords: ['send job order', 'hire Filipino workers Saudi Arabia', 'recruitment agency contact Manila'],
      },
      license: {
        title: 'DMW License DMW-217-LB-11282023-R | Gulf Horizon Recruitment Agency',
        description:
          'Verify Gulf Horizon International Services’ license with the Department of Migrant Workers (DMW, formerly POEA). Licensed to recruit Filipino land-based workers for Saudi Arabia and the GCC.',
        keywords: ['DMW license verification', 'POEA license check', 'licensed recruitment agency Philippines'],
      },
      privacy: {
        title: 'Privacy Policy | Gulf Horizon International Services',
        description:
          'How Gulf Horizon International Services collects, uses and protects the personal data of employers and Filipino job applicants, in line with the Philippine Data Privacy Act.',
        keywords: ['privacy policy recruitment agency'],
      },
      terms: {
        title: 'Terms of Use | Gulf Horizon International Services',
        description: 'Terms of use for the Gulf Horizon International Services website — a DMW-licensed recruitment agency for Saudi Arabia and the Gulf.',
        keywords: ['terms of use recruitment agency'],
      },
    },
  },
  ar: {
    siteName: brandAr,
    locale: 'ar_SA',
    keywords: KEYWORDS_AR,
    pages: {
      home: {
        title: 'مكتب استقدام عمالة فلبينية للسعودية والخليج | أفق الخليج',
        description:
          'وكالة استقدام فلبينية مرخّصة من إدارة العمال المهاجرين (DMW) في مانيلا، نوفّر العمالة الماهرة والهندسية وعمال المصانع وطواقم المستشفيات وعمالة الضيافة والفنادق والمطاعم لأصحاب العمل في دول الخليج العربي ودول أخرى حول العالم خلال 45–60 يومًا.',
        keywords: ['استقدام عمالة من الفلبين للسعودية', 'مكتب استقدام فلبيني', 'توظيف عمالة فلبينية'],
      },
      deployments: {
        title: 'مشاريع الاستقدام السابقة في السعودية والخليج | أفق الخليج',
        description:
          'تعرّف على أصحاب العمل في السعودية ودول الخليج الذين استقدمنا لهم عمالة فلبينية — فنادق ومستشفيات ومصانع وشركات إنشاءات ومرافق في الرياض وجدة والدمام.',
        keywords: ['عملاء الاستقدام في السعودية', 'طلبات استقدام', 'سجل الاستقدام'],
      },
      about: {
        title: 'من نحن — وكالة استقدام فلبينية مرخّصة في مانيلا | أفق الخليج',
        description:
          'أفق الخليج للخدمات العالمية وكالة توظيف مرخّصة من DMW (هيئة POEA سابقًا) بمكتب رئيسي في مانيلا وخمسة فروع إقليمية، تستقدم الكفاءات الفلبينية للسعودية والإمارات وقطر والكويت والبحرين وعُمان.',
        keywords: ['وكالة توظيف مرخصة', 'شركة استقدام فلبينية'],
      },
      contact: {
        title: 'أرسل طلب استقدام — استقدم عمالة فلبينية للسعودية | أفق الخليج',
        description:
          'اطلب مرشحين فلبينيين لشركتك في السعودية أو الخليج. أرسل طلب الاستقدام إلى فريقنا في مانيلا واحصل على قائمة مختصرة بمرشحين مؤهلين — واتساب ‎+63 917 888 8970 أو info@gulfhorizon.net.',
        keywords: ['طلب استقدام', 'التواصل مع مكتب الاستقدام'],
      },
      license: {
        title: 'ترخيص DMW رقم DMW-217-LB-11282023-R | أفق الخليج',
        description:
          'تحقّق من ترخيص أفق الخليج للخدمات العالمية لدى إدارة العمال المهاجرين (DMW، هيئة POEA سابقًا) لاستقدام العمالة الفلبينية للسعودية ودول الخليج.',
        keywords: ['التحقق من ترخيص مكتب الاستقدام', 'ترخيص DMW'],
      },
      privacy: {
        title: 'سياسة الخصوصية | أفق الخليج للخدمات العالمية',
        description: 'كيف تجمع أفق الخليج للخدمات العالمية البيانات الشخصية لأصحاب العمل والمتقدمين الفلبينيين وتستخدمها وتحميها.',
        keywords: ['سياسة الخصوصية'],
      },
      terms: {
        title: 'شروط الاستخدام | أفق الخليج للخدمات العالمية',
        description: 'شروط استخدام موقع أفق الخليج للخدمات العالمية — وكالة استقدام مرخّصة للسعودية والخليج.',
        keywords: ['شروط الاستخدام'],
      },
    },
  },
}

/** Build the absolute URL of a page in a language. */
export function pageUrl(siteUrl, lang, key) {
  const path = SEO_ROUTES[key]
  if (lang === 'ar') return `${siteUrl}${path === '/' ? '/ar' : `/ar${path}`}`
  return `${siteUrl}${path === '/' ? '/' : path}`
}

/** schema.org structured data describing the agency (EmploymentAgency + WebSite). */
export function structuredData(siteUrl, lang) {
  const isAr = lang === 'ar'
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'EmploymentAgency',
      '@id': `${siteUrl}/#agency`,
      name: BUSINESS.legalName,
      alternateName: [brandEn, 'Gulf Horizon', BUSINESS.nameAr],
      description: isAr
        ? 'وكالة استقدام فلبينية مرخّصة من DMW تستقدم العمالة الماهرة والمهنيين لأصحاب العمل في السعودية ودول الخليج.'
        : 'DMW-licensed Philippine recruitment agency deploying skilled Filipino professionals and workers to employers in Saudi Arabia and the GCC.',
      url: siteUrl,
      logo: `${siteUrl}/favicon.svg`,
      image: `${siteUrl}/og-image.jpg`,
      email: BUSINESS.email,
      telephone: BUSINESS.telephone,
      contactPoint: [
        { '@type': 'ContactPoint', telephone: BUSINESS.telephone, contactType: 'sales', areaServed: ['SA', 'AE', 'QA', 'KW', 'BH', 'OM'], availableLanguage: ['English', 'Arabic', 'Filipino'], description: 'Main number and WhatsApp' },
      ],
      address: { '@type': 'PostalAddress', ...BUSINESS.address },
      geo: { '@type': 'GeoCoordinates', ...BUSINESS.geo },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
      areaServed: BUSINESS.areaServed.map((name) => ({ '@type': 'Country', name })),
      knowsLanguage: ['en', 'ar', 'fil'],
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'license',
        name: `DMW License No. ${BUSINESS.license}`,
        recognizedBy: { '@type': 'GovernmentOrganization', name: 'Department of Migrant Workers (DMW), Philippines', url: 'https://dmw.gov.ph' },
      },
      department: BUSINESS.branches.map((city) => ({
        '@type': 'EmploymentAgency',
        name: `${brandEn} — ${city} Branch`,
        address: { '@type': 'PostalAddress', addressLocality: city, addressCountry: 'PH' },
      })),
      makesOffer: [
        'Skilled workers',
        'Engineering workers',
        'Factory workers',
        'Hospital staff',
        'Hospitality workers',
        'Hotel & restaurant workers',
      ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: `Recruitment of ${name}`, areaServed: 'GCC countries & international' } })),
      sameAs: [BUSINESS.facebook],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: isAr ? brandAr : brandEn,
      inLanguage: isAr ? 'ar' : 'en',
      publisher: { '@id': `${siteUrl}/#agency` },
    },
  ]
}

/** Everything that goes in <head> for one page, as plain data. */
export function headFor(siteUrl, lang, key) {
  const L = SEO[lang]
  const page = L.pages[key]
  const url = pageUrl(siteUrl, lang, key)
  return {
    lang,
    dir: lang === 'ar' ? 'rtl' : 'ltr',
    title: page.title,
    description: page.description,
    keywords: [...page.keywords, ...L.keywords].join(', '),
    canonical: url,
    alternates: { en: pageUrl(siteUrl, 'en', key), ar: pageUrl(siteUrl, 'ar', key), 'x-default': pageUrl(siteUrl, 'en', key) },
    og: {
      'og:type': 'website',
      'og:site_name': L.siteName,
      'og:title': page.title,
      'og:description': page.description,
      'og:url': url,
      'og:image': `${siteUrl}/og-image.jpg`,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:locale': L.locale,
      'og:locale:alternate': lang === 'ar' ? 'en_US' : 'ar_SA',
    },
    twitter: {
      'twitter:card': 'summary_large_image',
      'twitter:title': page.title,
      'twitter:description': page.description,
      'twitter:image': `${siteUrl}/og-image.jpg`,
    },
    jsonLd: structuredData(siteUrl, lang),
  }
}

export default SEO

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Serialise a page's head data to HTML tags (used by the build to pre-render each URL's <head>). */
export function renderHead(h) {
  const tags = [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" />`,
    `<meta name="keywords" content="${esc(h.keywords)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta name="geo.region" content="PH-00" />`,
    `<meta name="geo.placename" content="Manila" />`,
    `<link rel="canonical" href="${esc(h.canonical)}" />`,
    ...Object.entries(h.alternates).map(([l, href]) => `<link rel="alternate" hreflang="${l}" href="${esc(href)}" />`),
    ...Object.entries(h.og).map(([k, v]) => `<meta property="${k}" content="${esc(v)}" />`),
    ...Object.entries(h.twitter).map(([k, v]) => `<meta name="${k}" content="${esc(v)}" />`),
    `<script type="application/ld+json">${JSON.stringify(h.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ]
  return tags.map((t) => `    ${t}`).join('\n')
}
