// DMW License Info page (Figma EN 154:1054 / AR 161:2755)
import { LICENSE_NO } from './common.js'

export default {
  en: {
    docKey: 'license',
    pageTitle: 'DMW License Info — Gulf Horizon',
    breadcrumb: 'DMW License Info',
    title: 'Licensed by the Department of Migrant Workers',
    intro:
      'Gulf Horizon International Services, Inc. is a private recruitment agency licensed by the DMW (formerly POEA) to recruit and deploy land-based Filipino workers. Here is how to verify us and how we protect the workers we deploy.',
    updated: 'Last updated: October 2026',
    card: {
      eyebrow: 'LICENSE DETAILS',
      name: 'Gulf Horizon International Services, Inc.',
      status: 'Valid license',
      facts: [
        { label: 'LICENSE NUMBER', value: LICENSE_NO, ltr: true },
        { label: 'LICENSING AUTHORITY', value: 'Department of Migrant Workers (DMW)' },
        { label: 'LICENSE TYPE', value: 'Land-based private recruitment agency' },
        { label: 'VALID UNTIL', value: '3 September 2029' },
        { label: 'HEAD OFFICE', value: '509 Merchant Center Bldg., 3/F, Padre Faura St. cor. Mabini St., Ermita, Manila' },
        { label: 'REGIONAL BRANCHES', value: 'Davao · Iloilo · Pangasinan · Bacolod · Cagayan de Oro' },
      ],
    },
    sections: [
      {
        id: 'coverage',
        title: 'What our license covers',
        blocks: [
          {
            type: 'p',
            text: 'Our DMW license authorizes Gulf Horizon to recruit, hire and process land-based Filipino workers — across all skills and job categories — for foreign employers (principals) who have been accredited through the proper Philippine channels.',
          },
          {
            type: 'bullets',
            items: [
              { lead: 'Saudi Arabia', text: ' — our primary market, with principals in Riyadh, Jeddah, Dammam, Al Khobar, Tabuk, Makkah, Madinah and Yanbu' },
              { lead: 'Other Gulf countries', text: ' — including the UAE, Qatar, Kuwait and Bahrain' },
            ],
          },
        ],
      },
      {
        id: 'verify',
        title: 'Verify our license',
        blocks: [
          {
            type: 'p',
            text: 'Before dealing with any recruitment agency, check that it holds a valid license. You can verify Gulf Horizon in a few minutes:',
          },
          {
            type: 'steps',
            items: [
              'Visit the official DMW website at dmw.gov.ph.',
              'Open the list of licensed land-based recruitment agencies.',
              `Search for “Gulf Horizon International Services” and confirm that license number ${LICENSE_NO}, its status and our address match the details on this page.`,
            ],
          },
          {
            type: 'callout',
            tone: 'sky',
            icon: 'shield',
            title: 'Our only official channels',
            text: 'Only deal with us through our official office, phone lines, email and our official Facebook page (Gulf Horizon International Services). We do not recruit through personal social-media accounts or unofficial agents.',
          },
        ],
      },
      {
        id: 'fees',
        title: 'Fees and worker protection',
        blocks: [
          { type: 'p', text: 'We follow DMW rules on recruitment fees and worker welfare in full.' },
          {
            type: 'bullets',
            items: [
              { lead: 'No placement fees for household service workers', text: ' — as required by Philippine regulations' },
              { lead: 'Official receipts', text: ' — issued for every lawful payment — never pay cash without one' },
              { lead: 'No payments to personal accounts', text: ' — we never ask workers or employers to pay into an individual’s account' },
              { lead: 'Approved contracts only', text: ' — every worker signs a DMW-approved employment contract before deployment' },
              { lead: 'Pre-departure orientation', text: ' — every worker is briefed on the customs, culture and work practices of the host country' },
            ],
          },
        ],
      },
      {
        id: 'report',
        title: 'Report illegal recruitment',
        blocks: [
          {
            type: 'callout',
            tone: 'gold',
            icon: 'zap',
            title: 'Protect yourself from illegal recruiters',
            text: 'If anyone offers you a job abroad in Gulf Horizon’s name but asks for money outside our office, cannot show our license, or contacts you only through social media, do not pay. Report it to the DMW and contact us directly so we can verify.',
          },
          { type: 'p', text: 'Reports can be made through the DMW’s official website and hotline, or at any DMW regional office.' },
        ],
      },
      {
        id: 'employers',
        title: 'For foreign employers: accreditation requirements',
        blocks: [
          {
            type: 'p',
            text: 'To recruit Filipino workers through Gulf Horizon, employers are accredited through the Philippine Migrant Workers Office (MWO). Please prepare the following documents:',
          },
          {
            type: 'steps',
            items: [
              'Demand letter / job order / manpower request stating positions, number of workers and basic salaries.',
              'Special Power of Attorney issued by the employer to Gulf Horizon (or a recruitment / service agreement).',
              'Model or master employment contract for land-based workers (or your actual employment contract).',
              'Valid business license or commercial registration, with official English translation.',
              'Copy of the block visa showing the categories, with official English translation.',
              'For drivers: individual employment contracts and a comprehensive insurance policy (in English).',
              'Copy of the ID or passport of the employer or signatory.',
              'Location sketch of the company and the workers’ accommodation.',
              'Official letter stating the current number of Filipino workers in the company, if any.',
              'Two sets of duplicate copies of all the documents above.',
            ],
          },
        ],
      },
    ],
  },
  ar: {
    docKey: 'license',
    pageTitle: 'معلومات ترخيص DMW — أفق الخليج',
    breadcrumb: 'معلومات ترخيص DMW',
    title: 'مرخّصون من إدارة العمال المهاجرين',
    intro:
      'أفق الخليج للخدمات العالمية وكالة استقدام خاصة مرخّصة من إدارة العمال المهاجرين (POEA سابقًا) لاستقدام العمالة الفلبينية وتوظيفها في الخارج. إليك طريقة التحقق من ترخيصنا وكيف نحمي العمال الذين نستقدمهم.',
    updated: 'آخر تحديث: أكتوبر 2026',
    card: {
      eyebrow: 'بيانات الترخيص',
      name: 'أفق الخليج للخدمات العالمية',
      status: 'ترخيص ساري',
      facts: [
        { label: 'رقم الترخيص', value: LICENSE_NO, ltr: true },
        { label: 'جهة الترخيص', value: 'إدارة العمال المهاجرين (DMW)' },
        { label: 'نوع الترخيص', value: 'وكالة استقدام خاصة للعمالة البرية' },
        { label: 'ساري حتى', value: '3 سبتمبر 2029' },
        { label: 'المكتب الرئيسي', value: 'مبنى ميرشانت سنتر 509، الطابق 3، شارع بادري فاورا تقاطع شارع مابيني، إرميتا، مانيلا' },
        { label: 'الفروع الإقليمية', value: 'دافاو · إيلويلو · بانغاسينان · باكولود · كاغايان دي أورو' },
      ],
    },
    sections: [
      {
        id: 'coverage',
        title: 'نطاق ترخيصنا',
        blocks: [
          {
            type: 'p',
            text: 'يخوّل ترخيص DMW شركة أفق الخليج باستقطاب العمالة الفلبينية وتوظيفها وإنهاء إجراءاتها — في جميع المهارات والتخصصات — لأصحاب العمل الأجانب المعتمدين عبر الجهات الفلبينية الرسمية.',
          },
          {
            type: 'bullets',
            items: [
              { lead: 'المملكة العربية السعودية', text: ' — سوقنا الرئيسي، مع عملاء في الرياض وجدة والدمام والخبر وتبوك ومكة المكرمة والمدينة المنورة وينبع' },
              { lead: 'دول الخليج الأخرى', text: ' — بما فيها الإمارات وقطر والكويت والبحرين' },
            ],
          },
        ],
      },
      {
        id: 'verify',
        title: 'تحقق من ترخيصنا',
        blocks: [
          {
            type: 'p',
            text: 'قبل التعامل مع أي وكالة استقدام، تأكد من أنها تحمل ترخيصًا ساريًا. يمكنك التحقق من أفق الخليج خلال دقائق:',
          },
          {
            type: 'steps',
            items: [
              'زر الموقع الرسمي لإدارة العمال المهاجرين: dmw.gov.ph',
              'افتح قائمة وكالات الاستقدام المرخّصة للعمالة البرية.',
              `ابحث عن “Gulf Horizon International Services” وتأكد من مطابقة رقم الترخيص ${LICENSE_NO} وحالته وعنواننا للبيانات الواردة في هذه الصفحة.`,
            ],
          },
          {
            type: 'callout',
            tone: 'sky',
            icon: 'shield',
            title: 'قنواتنا الرسمية الوحيدة',
            text: 'تعامل معنا فقط عبر مكتبنا الرسمي وأرقام هواتفنا وبريدنا الإلكتروني وصفحتنا الرسمية على فيسبوك (Gulf Horizon International Services). لا نستقدم عبر حسابات شخصية على مواقع التواصل أو وسطاء غير رسميين.',
          },
        ],
      },
      {
        id: 'fees',
        title: 'الرسوم وحماية العمال',
        blocks: [
          { type: 'p', text: 'نلتزم التزامًا كاملًا بلوائح DMW الخاصة برسوم الاستقدام ورعاية العمال.' },
          {
            type: 'bullets',
            items: [
              { lead: 'لا رسوم توظيف على العمالة المنزلية', text: ' — وفقًا للأنظمة الفلبينية' },
              { lead: 'إيصالات رسمية', text: ' — تُصدر لكل دفعة نظامية، فلا تدفع نقدًا دون إيصال' },
              { lead: 'لا دفعات إلى حسابات شخصية', text: ' — لا نطلب أبدًا من العمال أو أصحاب العمل الدفع إلى حساب فرد' },
              { lead: 'عقود معتمدة فقط', text: ' — يوقّع كل عامل عقد عمل معتمدًا من DMW قبل السفر' },
              { lead: 'توجيه قبل السفر', text: ' — يتعرف كل عامل على عادات البلد المضيف وثقافته وبيئة العمل فيه' },
            ],
          },
        ],
      },
      {
        id: 'report',
        title: 'الإبلاغ عن الاستقدام غير النظامي',
        blocks: [
          {
            type: 'callout',
            tone: 'gold',
            icon: 'zap',
            title: 'احمِ نفسك من الوسطاء غير النظاميين',
            text: 'إذا عرض عليك أحد وظيفة في الخارج باسم أفق الخليج وطلب منك مالًا خارج مكتبنا، أو لم يستطع إبراز ترخيصنا، أو تواصل معك عبر مواقع التواصل فقط، فلا تدفع. أبلغ إدارة العمال المهاجرين وتواصل معنا مباشرة لنتحقق من الأمر.',
          },
          { type: 'p', text: 'يمكن تقديم البلاغات عبر الموقع الرسمي لإدارة العمال المهاجرين وخطها الساخن، أو في أي من مكاتبها الإقليمية.' },
        ],
      },
      {
        id: 'employers',
        title: 'لأصحاب العمل: متطلبات الاعتماد',
        blocks: [
          {
            type: 'p',
            text: 'لاستقدام العمالة الفلبينية عبر أفق الخليج، يُعتمد صاحب العمل لدى مكتب العمال المهاجرين الفلبيني (MWO). يرجى تجهيز المستندات التالية:',
          },
          {
            type: 'steps',
            items: [
              'خطاب طلب / طلب استقدام / طلب أيدٍ عاملة يحدد الوظائف وعدد العمال والرواتب الأساسية.',
              'وكالة خاصة صادرة من صاحب العمل لأفق الخليج (أو اتفاقية استقدام / خدمات).',
              'نموذج عقد العمل للعمالة البرية (أو عقد العمل الفعلي لدى منشأتك).',
              'رخصة تجارية أو سجل تجاري ساري، مع ترجمة رسمية إلى الإنجليزية.',
              'نسخة من التأشيرة الإجمالية توضح المهن، مع ترجمة رسمية إلى الإنجليزية.',
              'للسائقين: عقود عمل فردية ووثيقة تأمين شامل (باللغة الإنجليزية).',
              'نسخة من هوية أو جواز سفر صاحب العمل أو المفوّض بالتوقيع.',
              'مخطط لموقع الشركة وسكن العمال.',
              'خطاب رسمي بعدد العمال الفلبينيين الحاليين في الشركة، إن وجد.',
              'نسختان من جميع المستندات المذكورة أعلاه.',
            ],
          },
        ],
      },
    ],
  },
}
