// Contact Us page copy (Figma: EN 133:1015, AR 161:2315).
// Form option values stay in English in both languages so the FormSubmit inbox reads consistently.

import { LICENSE_NO, PHONE, PHONE_TEL, whatsappLink } from './common.js'

export const CONTACT_EMAIL = 'contact@gulfhorizon.net'
export const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=509+Merchant+Center+Bldg+Padre+Faura+St+cor+Mabini+St+Ermita+Manila'


const CATEGORY_VALUES = [
  'Skilled workers',
  'Engineering workers',
  'Factory workers',
  'Hospital staff',
  'Hospitality workers',
  'Hotel & restaurant workers',
  'Other',
]

const WORKER_VALUES = ['1–5', '6–20', '21–50', '51–100', '100+']

export default {
  en: {
    header: {
      eyebrow: 'Get in touch',
      title: 'Let’s talk about your hiring needs',
      highlight: ['hiring', 'needs'],
      description: 'Whether you need one specialist or a full team, contact our Manila head office or send us your job order below.',
    },
    office: {
      title: 'Manila Head Office',
      address: ['509 Merchant Center Bldg., 3rd Floor', 'Padre Faura St. cor. Mabini St.', 'Ermita, Manila 1000'],
      mapLabel: 'View on map',
    },
    channels: [
      { key: 'mobile', icon: 'phone', label: 'CALL US', value: PHONE, href: PHONE_TEL, ltr: true },
      { key: 'whatsapp', icon: 'whatsapp', label: 'WHATSAPP', value: PHONE, note: 'Message us any time', href: whatsappLink('Hello Gulf Horizon, I’d like to hire Filipino workers. Can you help?'), external: true, ltr: true },
      { key: 'email', icon: 'mail', label: 'EMAIL', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, ltr: true },
      { key: 'facebook', icon: 'facebook', label: 'FACEBOOK', value: 'Gulf Horizon International Services', note: 'Our only official social-media page', facebook: true },
    ],
    branches: {
      title: 'Regional branches',
      list: 'Davao · Iloilo · Pangasinan · Bacolod · Cagayan de Oro',
    },
    form: {
      title: 'Send a job order',
      description: 'Tell us about the roles you need and our recruitment team will prepare a shortlist of qualified Filipino candidates.',
      fields: {
        company: { label: 'COMPANY NAME', placeholder: 'Your company name', required: 'Please enter your company name.' },
        contact: { label: 'CONTACT PERSON', placeholder: 'Full name & title', required: 'Please tell us who we should contact.' },
        email: { label: 'EMAIL ADDRESS', placeholder: 'name@company.sa', required: 'Please enter your email address.', invalid: 'That email address doesn’t look right — e.g. name@company.sa' },
        phone: { label: 'PHONE NUMBER', placeholder: '+966', required: 'Please enter a phone number.', invalid: 'Use digits only, with an optional + country code (7–20 characters).' },
        category: { label: 'JOB CATEGORY', placeholder: 'Select a job category', required: 'Please choose a job category.' },
        workers: { label: 'NUMBER OF WORKERS', placeholder: 'Select a range', required: 'Please choose how many workers you need.' },
        details: { label: 'PROJECT DETAILS', placeholder: 'Tell us about the roles, timeline and any specific requirements…' },
      },
      categories: CATEGORY_VALUES.map((value) => ({ value, label: value })),
      workers: WORKER_VALUES.map((value) => ({ value, label: value === '100+' ? '100+ workers' : `${value} workers` })),
      consent: 'By submitting, you agree to our privacy policy. We never share your details with third parties.',
      submit: 'Send job order',
      sending: 'Sending…',
      fixErrors: 'Please check the highlighted fields.',
      success: {
        title: 'Job order received',
        body: 'Thank you — our Manila recruitment team will review your request and get back to you within one business day.',
        again: 'Send another job order',
      },
      error: {
        title: 'We couldn’t send your job order',
        body: `Please check your connection and try again, or email us directly at ${CONTACT_EMAIL}.`,
        retry: 'Try again',
      },
      honeypot: 'Leave this field empty',
    },
    assurances: [
      { icon: 'badge', title: 'DMW licensed', text: `License No. ${LICENSE_NO}` },
      { icon: 'zap', title: '45–60 day processing', text: 'With complete documentation.' },
      { icon: 'award', title: 'Skills-tested workers', text: 'Through accredited testing centres.' },
    ],
  },
  ar: {
    header: {
      eyebrow: 'تواصل معنا',
      title: 'لنتحدث عن احتياجاتك من العمالة',
      highlight: ['احتياجاتك', 'من', 'العمالة'],
      description: 'سواء احتجت إلى متخصص واحد أو فريق كامل، تواصل مع مكتبنا الرئيسي في مانيلا أو أرسل طلب الاستقدام أدناه.',
    },
    office: {
      title: 'المكتب الرئيسي في مانيلا',
      address: ['مبنى ميرشانت سنتر 509، الطابق الثالث', 'شارع بادري فاورا تقاطع شارع مابيني', 'إرميتا، مانيلا 1000'],
      mapLabel: 'عرض على الخريطة',
    },
    channels: [
      { key: 'mobile', icon: 'phone', label: 'اتصل بنا', value: PHONE, href: PHONE_TEL, ltr: true },
      { key: 'whatsapp', icon: 'whatsapp', label: 'واتساب', value: PHONE, note: 'راسلنا في أي وقت', href: whatsappLink('مرحبًا أفق الخليج، أرغب في استقدام عمالة فلبينية. هل يمكنكم المساعدة؟'), external: true, ltr: true },
      { key: 'email', icon: 'mail', label: 'البريد الإلكتروني', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, ltr: true },
      { key: 'facebook', icon: 'facebook', label: 'فيسبوك', value: 'أفق الخليج للخدمات العالمية', note: 'صفحتنا الرسمية الوحيدة على مواقع التواصل', facebook: true },
    ],
    branches: {
      title: 'الفروع الإقليمية',
      list: 'دافاو · إيلويلو · بانغاسينان · باكولود · كاغايان دي أورو',
    },
    form: {
      title: 'أرسل طلب استقدام',
      description: 'أخبرنا بالوظائف التي تحتاجها، وسيُعد فريق الاستقدام لدينا قائمة مختصرة بمرشحين فلبينيين مؤهلين.',
      fields: {
        company: { label: 'اسم الشركة', placeholder: 'اسم شركتك', required: 'يرجى إدخال اسم الشركة.' },
        contact: { label: 'الشخص المسؤول', placeholder: 'الاسم الكامل والمسمى الوظيفي', required: 'يرجى إدخال اسم الشخص المسؤول.' },
        email: { label: 'البريد الإلكتروني', placeholder: 'name@company.sa', required: 'يرجى إدخال البريد الإلكتروني.', invalid: 'صيغة البريد الإلكتروني غير صحيحة — مثال: name@company.sa' },
        phone: { label: 'رقم الجوال', placeholder: '+966', required: 'يرجى إدخال رقم الجوال.', invalid: 'استخدم الأرقام فقط مع رمز الدولة (+) اختياريًا (من 7 إلى 20 خانة).' },
        category: { label: 'فئة الوظيفة', placeholder: 'اختر فئة الوظيفة', required: 'يرجى اختيار فئة الوظيفة.' },
        workers: { label: 'عدد العمال', placeholder: 'اختر النطاق', required: 'يرجى اختيار عدد العمال المطلوب.' },
        details: { label: 'تفاصيل الطلب', placeholder: 'أخبرنا عن الوظائف والجدول الزمني وأي متطلبات خاصة…' },
      },
      categories: [
        'العمالة الماهرة',
        'العمالة الهندسية',
        'عمال المصانع',
        'طواقم المستشفيات',
        'عمالة الضيافة',
        'عمالة الفنادق والمطاعم',
        'أخرى',
      ].map((label, i) => ({ value: CATEGORY_VALUES[i], label })),
      workers: [
        { value: '1–5', label: '1–5 عمال' },
        { value: '6–20', label: '6–20 عاملًا' },
        { value: '21–50', label: '21–50 عاملًا' },
        { value: '51–100', label: '51–100 عامل' },
        { value: '100+', label: 'أكثر من 100 عامل' },
      ],
      consent: 'بإرسال الطلب، فإنك توافق على سياسة الخصوصية. لا نشارك بياناتك مع أي طرف ثالث.',
      submit: 'أرسل طلب الاستقدام',
      sending: 'جارٍ الإرسال…',
      fixErrors: 'يرجى مراجعة الحقول المحددة.',
      success: {
        title: 'تم استلام طلب الاستقدام',
        body: 'شكرًا لك — سيراجع فريق الاستقدام في مانيلا طلبك ويتواصل معك خلال يوم عمل واحد.',
        again: 'أرسل طلبًا آخر',
      },
      error: {
        title: 'تعذّر إرسال طلبك',
        body: `يرجى التحقق من اتصالك والمحاولة مرة أخرى، أو راسلنا مباشرة على ${CONTACT_EMAIL}.`,
        retry: 'حاول مرة أخرى',
      },
      honeypot: 'اترك هذا الحقل فارغًا',
    },
    assurances: [
      { icon: 'badge', title: 'مرخّصون من DMW', text: `رقم الترخيص: ${LICENSE_NO}` },
      { icon: 'zap', title: 'إنجاز خلال 45–60 يومًا', text: 'مع مستندات مكتملة.' },
      { icon: 'award', title: 'عمالة مختبرة المهارات', text: 'عبر مراكز اختبار معتمدة.' },
    ],
  },
}
