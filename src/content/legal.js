// Copy shared by the three legal pages (DMW License Info, Privacy Policy, Terms of Use):
// breadcrumb, sidebar navigation and the "Questions?" help card.
import { PHONE } from './common.js'

export const EMAIL = 'contact@gulfhorizon.net'

export default {
  en: {
    home: 'Home',
    legal: 'Legal',
    legalLabel: 'LEGAL',
    docsNavLabel: 'Legal pages',
    docs: [
      { key: 'license', label: 'DMW License Info', to: '/dmw-license' },
      { key: 'privacy', label: 'Privacy Policy', to: '/privacy' },
      { key: 'terms', label: 'Terms of Use', to: '/terms' },
    ],
    toc: 'ON THIS PAGE',
    help: {
      title: 'Questions?',
      text: 'Contact our Manila head office about anything on this page.',
      email: EMAIL,
      phone: PHONE,
    },
  },
  ar: {
    home: 'الرئيسية',
    legal: 'الشؤون القانونية',
    legalLabel: 'الشؤون القانونية',
    docsNavLabel: 'الصفحات القانونية',
    docs: [
      { key: 'license', label: 'معلومات ترخيص DMW', to: '/dmw-license' },
      { key: 'privacy', label: 'سياسة الخصوصية', to: '/privacy' },
      { key: 'terms', label: 'شروط الاستخدام', to: '/terms' },
    ],
    toc: 'في هذه الصفحة',
    help: {
      title: 'لديك استفسار؟',
      text: 'تواصل مع مكتبنا الرئيسي في مانيلا بخصوص أي شيء في هذه الصفحة.',
      email: EMAIL,
      phone: PHONE,
    },
  },
}
