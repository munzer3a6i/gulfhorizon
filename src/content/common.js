// Copy shared by every page: navigation, footer and the closing CTA banner.

export const LICENSE_NO = 'DMW-217-LB-11282023-R'
export const PHONE = '(02) 5302-1952 to 54'
export const WEBSITE = 'gulfhorizonservices.com'
export const FACEBOOK_URL = 'https://www.facebook.com/'

export default {
  en: {
    brand: { name: 'Gulf Horizon', tagline: 'International Services', arabic: 'أفق الخليج للخدمات العالمية' },
    nav: {
      home: 'Home',
      deployments: 'Deployments',
      about: 'About us',
      contact: 'Contact us',
      cta: 'Send a job order',
      menu: 'Menu',
      close: 'Close',
    },
    footer: {
      blurb: 'A DMW-licensed private placement agency deploying skilled Filipino professionals and workers to employers in Saudi Arabia and across the GCC — UAE, Qatar, Kuwait, Bahrain and Oman.',
      facebook: 'Follow us on Facebook',
      officesTitle: 'OFFICES',
      offices: [
        { name: 'Manila Head Office', detail: '509 Merchant Center Bldg., Padre Faura St. cor. Mabini St., Ermita, Manila' },
        { name: 'Regional Branches', detail: 'Davao · Iloilo · Pangasinan · Bacolod · Cagayan de Oro' },
      ],
      quickTitle: 'QUICK LINKS',
      quick: [
        { label: 'Previous Deployments', to: '/deployments' },
        { label: 'Manpower Categories', to: '/#categories' },
        { label: 'Recruitment Process', to: '/#process' },
        { label: 'Worker Welfare', to: '/about' },
      ],
      legalTitle: 'LEGAL',
      legal: [
        { label: 'DMW License Info', to: '/dmw-license' },
        { label: 'Privacy Policy', to: '/privacy' },
        { label: 'Terms of Use', to: '/terms' },
      ],
      copyright: `© 2026 Gulf Horizon International Services, Inc. · DMW License No. ${LICENSE_NO}`,
    },
    cta: {
      heading: 'Ready to see what’s on your horizon?',
      subtext: 'Send us your job order and our Manila team will prepare a shortlist of qualified Filipino candidates.',
      primary: 'Request a shortlist',
      secondary: 'Talk to our team',
    },
  },
  ar: {
    brand: { name: 'أفق الخليج', tagline: 'للخدمات العالمية', latin: 'Gulf Horizon International Services' },
    nav: {
      home: 'الرئيسية',
      deployments: 'مشاريع الاستقدام',
      about: 'من نحن',
      contact: 'تواصل معنا',
      cta: 'أرسل طلب استقدام',
      menu: 'القائمة',
      close: 'إغلاق',
    },
    footer: {
      blurb: 'وكالة توظيف خاصة مرخّصة من إدارة العمال المهاجرين (DMW) تستقدم المهنيين والعمال الفلبينيين المهرة لأصحاب العمل في المملكة العربية السعودية ودول الخليج — الإمارات وقطر والكويت والبحرين وعُمان.',
      facebook: 'تابعنا على فيسبوك',
      officesTitle: 'مكاتبنا',
      offices: [
        { name: 'المكتب الرئيسي في مانيلا', detail: 'مبنى ميرشانت سنتر 509، شارع بادري فاورا تقاطع شارع مابيني، إرميتا، مانيلا' },
        { name: 'الفروع الإقليمية', detail: 'دافاو · إيلويلو · بانغاسينان · باكولود · كاغايان دي أورو' },
      ],
      quickTitle: 'روابط سريعة',
      quick: [
        { label: 'مشاريع الاستقدام السابقة', to: '/deployments' },
        { label: 'فئات العمالة', to: '/#categories' },
        { label: 'آلية الاستقدام', to: '/#process' },
        { label: 'رعاية العمال', to: '/about' },
      ],
      legalTitle: 'الشؤون القانونية',
      legal: [
        { label: 'معلومات ترخيص DMW', to: '/dmw-license' },
        { label: 'سياسة الخصوصية', to: '/privacy' },
        { label: 'شروط الاستخدام', to: '/terms' },
      ],
      copyright: `© 2026 أفق الخليج للخدمات العالمية · رقم ترخيص DMW: ${LICENSE_NO}`,
    },
    cta: {
      heading: 'هل أنت مستعد لاكتشاف ما ينتظرك في الأفق؟',
      subtext: 'أرسل لنا طلب الاستقدام، وسيُعد فريقنا في مانيلا قائمة مختصرة بمرشحين فلبينيين مؤهلين.',
      primary: 'اطلب قائمة مرشحين',
      secondary: 'تحدث إلى فريقنا',
    },
  },
}
