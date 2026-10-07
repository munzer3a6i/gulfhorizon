// About Us page copy (Figma frames 133:720 EN / 161:1551 AR).
// Client logos are keyed by `logo` (first 10 chars of the Figma image hash) and resolved in the page.

import { LICENSE_NO } from './common.js'

export default {
  en: {
    hero: {
      eyebrow: 'Your link to the Philippine labor market',
      titleLines: ['Wider reach.', 'Closer care.'],
      alt: 'أفق الخليج للخدمات العالمية',
      altLang: 'ar',
      lead: 'Gulf Horizon International Services, Inc. is an accredited private placement agency licensed by the DMW (formerly POEA), giving employers access to the best the Philippine labor market can offer — across all skills and job categories.',
      body: 'We have deployed doctors, nurses and physical therapists to hospitals and clinics across the Middle East, along with engineers, architects and skilled, semi-skilled, maintenance and construction workers for principals throughout Saudi Arabia and the Gulf.',
      badges: ['DMW licensed agency', 'Head office in Manila'],
      imageAlt: 'Riyadh skyline at dusk with the Kingdom Centre tower',
      glass: { title: 'Deploying across the Gulf', detail: 'Saudi Arabia · UAE · Qatar · Kuwait · Bahrain' },
    },
    missionVision: [
      {
        eyebrow: 'OUR MISSION',
        title: 'Integrity and reliability, always.',
        body: 'To establish a categorical reputation for integrity and reliability in recruitment, and to set high standards in deploying Filipino professionals and workers — meeting even the most demanding manpower requests of our foreign principals.',
      },
      {
        eyebrow: 'OUR VISION',
        title: "Among the Philippines' leading recruitment firms.",
        body: 'To contribute to the nation’s economic growth while upholding excellence, leadership and integrity — with services that meet employers’ expectations in quality, quantity, timeliness and cost.',
      },
    ],
    team: {
      eyebrow: 'OUR PEOPLE',
      title: 'The team behind every placement',
      description: 'A tested, proficient team with years of recruitment experience — delivering the labor our employers need in almost every category, from unskilled to professional.',
      photoAlt: 'The Gulf Horizon team gathered at the Manila head office',
      caption: { title: 'The Gulf Horizon team', detail: 'Manila head office, Ermita' },
      leader: {
        eyebrow: 'LEADERSHIP',
        name: 'Hashim K. Hamid',
        role: 'Partner & Member of the Board',
        alt: 'هاشم حامد · شريك وعضو مجلس الإدارة',
        altLang: 'ar',
        bio: 'Gulf Horizon is owned and managed by executives with long-established reputations for integrity and reliability in the recruitment business.',
        photoAlt: 'Hashim K. Hamid at his desk',
      },
      stats: [
        { value: '300+', label: 'Filipino workers placed every month' },
        { value: '77+', label: 'Foreign clients across the Gulf' },
        { value: '6', label: 'Countries served, led by Saudi Arabia' },
      ],
    },
    principles: {
      eyebrow: 'WHAT GUIDES US',
      title: 'Our principles',
      items: [
        { title: 'Compliance', body: 'Fully licensed by the DMW and aligned with Saudi labour requirements at every stage.' },
        { title: 'Integrity', body: 'Transparent fees, honest timelines and ethical practices at the heart of every partnership.' },
        { title: 'Efficiency', body: 'Computerised operations and complete documentation — workers processed in 45 to 60 days.' },
        { title: 'Care', body: 'Accredited skills testing, pre-departure orientation and support for every worker we deploy.' },
      ],
    },
    process: {
      eyebrow: 'OUR PROCESS',
      title: 'How we work',
      steps: [
        { title: 'Job order', body: 'You send a demand letter or job order listing positions, headcount and salaries.' },
        { title: 'Sourcing & screening', body: 'Applicants sourced through advertising and our branches, then preliminary interviews.' },
        { title: 'Testing & interviews', body: 'Trade tests confirm skills, then final interviews with you in our Manila interview space.' },
        { title: 'Medicals & documents', body: 'Medical, physical and dental exams, recruitment agreement and DMW contract processing.' },
        { title: 'Deployment', body: 'Pre-departure orientation on local customs, airline coordination and deployment.' },
      ],
    },
    footprint: {
      title: 'Global footprint',
      saudi: {
        name: 'Saudi Arabia',
        detail: 'Riyadh · Jeddah · Dammam · Al Khobar · Tabuk · Makkah · Madinah',
        imageAlt: 'Riyadh towers lit at dusk',
      },
      philippines: {
        name: 'The Philippines',
        detail: 'Manila head office · 4 regional branches',
        imageAlt: 'Manila skyline at sunset',
      },
      routeLabel: 'Deployment route from the Philippines to Saudi Arabia',
      foundation: {
        title: 'Our foundation',
        body: 'Owned and managed by executives with long-established reputations for integrity and reliability. We deploy to Saudi Arabia and across the Gulf — including the UAE, Qatar, Kuwait and Bahrain.',
        items: [
          { title: 'DMW licensed', detail: `License No. ${LICENSE_NO}` },
          { title: 'Nationwide reach', detail: 'Manila, Davao, Iloilo, Pangasinan & Bacolod' },
        ],
      },
    },
    clients: {
      eyebrow: 'PARTIAL LIST OF FOREIGN CLIENTS',
      title: 'Trusted by employers across the Gulf',
      description: 'From government hospitals to national manufacturers and household names in food and retail — a selection of the 77+ principals we have recruited for.',
      sectors: [
        {
          title: 'Healthcare',
          clients: [
            { name: 'King Khaled Eye Specialist Hospital', city: 'Riyadh, KSA', logo: '9edb130f70' },
            { name: 'Prince Sultan bin Abdulaziz Humanitarian City', city: 'Riyadh, KSA', logo: 'cb35568e39' },
            { name: 'Dr. Abanamy Hospital', city: 'Riyadh, KSA', logo: '4a1ce67824', tint: true },
            { name: 'Al-Mutabagani Health Services', city: 'Riyadh, KSA', logo: '5c9ee2e064', tint: true },
            { name: 'University Hospital of Sharjah', city: 'Sharjah, UAE', logo: '2b4f79cb88', tint: true },
          ],
        },
        {
          title: 'Hospitality & Food',
          clients: [
            { name: 'Radisson SAS Hotel', city: 'Jeddah, KSA', logo: '118521a2ca', fit: true, bg: 'white' },
            { name: 'Al-Khozama Hotel', city: 'Riyadh, KSA', logo: '6bfd377792', bg: 'black', inset: true },
            { name: 'Herfy Food Services', city: 'Riyadh, KSA', logo: '5b03b81863', fit: true },
            { name: 'Al-Faisaliah Group', city: 'Riyadh, KSA', logo: 'e4424934c5', fit: true },
            { name: 'Kingdom Factory (Sweets & Chocolates)', city: 'Riyadh, KSA', mono: 'KF', tint: true },
          ],
        },
        {
          title: 'Industry & Construction',
          clients: [
            { name: 'Al-Mojil Co.', city: 'Dammam, KSA', logo: 'c0f6bb1446', fit: true },
            { name: 'Tabuk Cement', city: 'Tabuk, KSA', logo: 'b8136ca481' },
            { name: 'National Aluminum Factory', city: 'Riyadh & Jeddah, KSA', logo: '61af2e4447', tint: true },
            { name: 'Gas Arabian Company', city: 'Dammam, KSA', logo: 'cada871505', tint: true },
            { name: 'Middle East Paint Factory', city: 'Jeddah, KSA', logo: 'd60f1298f1', fit: true, tint: true },
          ],
        },
        {
          title: 'Retail & Business Groups',
          clients: [
            { name: 'Al Othaim Commercial Co.', city: 'Riyadh, KSA', logo: '3d3cffd7c1', fit: true },
            { name: 'Al Ghurair Group', city: 'Dubai, UAE', logo: 'f7342abac1', fit: true },
            { name: 'Lazorde Group of Companies', city: 'Riyadh, KSA', logo: 'c0fbd294f5', fit: true },
            { name: 'Khusheim Co.', city: 'Dammam, KSA', logo: 'd80081069d', tint: true },
            { name: 'Al-Zeyab Group', city: 'Riyadh, KSA', logo: '33e5647602', tint: true },
          ],
        },
      ],
      note: {
        count: '+ 57 more principals',
        detail: 'in Riyadh, Jeddah, Dammam, Jubail, Tabuk, Khamis Mushayt and Madinah — plus clients in the UAE, Bahrain and Sudan.',
      },
    },
    cta: {
      heading: "Let's build your team together",
      subtext: 'Share your hiring plans and our Manila team will prepare a recruitment plan around them.',
      primary: 'Request a shortlist',
      secondary: 'Talk to our team',
    },
  },

  ar: {
    hero: {
      eyebrow: 'بوابتك إلى سوق العمالة الفلبينية',
      titleLines: ['وصولٌ أوسع.', 'عنايةٌ أقرب.'],
      alt: 'Gulf Horizon International Services',
      altLang: 'en',
      lead: 'أفق الخليج للخدمات العالمية وكالة توظيف خاصة معتمدة ومرخّصة من إدارة العمال المهاجرين (POEA سابقًا)، تتيح لأصحاب العمل الوصول إلى أفضل ما يقدمه سوق العمالة الفلبينية — في جميع المهارات والتخصصات.',
      body: 'استقدمنا أطباء وممرضين وأخصائيي علاج طبيعي لمستشفيات وعيادات في أنحاء الشرق الأوسط، إلى جانب مهندسين ومعماريين وعمال مهرة وشبه مهرة وعمال صيانة وإنشاءات لعملائنا في المملكة العربية السعودية ودول الخليج.',
      badges: ['وكالة مرخّصة من DMW', 'المكتب الرئيسي في مانيلا'],
      imageAlt: 'أفق مدينة الرياض عند الغروب مع برج المملكة',
      glass: { title: 'نستقدم لدول الخليج', detail: 'السعودية · الإمارات · قطر · الكويت · البحرين' },
    },
    missionVision: [
      {
        eyebrow: 'رسالتنا',
        title: 'النزاهة والموثوقية، دائمًا.',
        body: 'ترسيخ سمعة راسخة في النزاهة والموثوقية في مجال الاستقدام، ووضع معايير عالية في استقدام المهنيين والعمال الفلبينيين — لتلبية أكثر طلبات العمالة تطلبًا لعملائنا في الخارج.',
      },
      {
        eyebrow: 'رؤيتنا',
        title: 'أن نكون من أبرز شركات الاستقدام في الفلبين.',
        body: 'المساهمة في نمو الاقتصاد الوطني مع الالتزام بالتميز والريادة والنزاهة — بخدمات تلبي توقعات أصحاب العمل من حيث الجودة والكمية والالتزام بالمواعيد والتكلفة.',
      },
    ],
    team: {
      eyebrow: 'فريقنا',
      title: 'الفريق وراء كل عملية استقدام',
      description: 'فريق متمرس وكفء يتمتع بسنوات من الخبرة في الاستقدام — يوفر العمالة التي يحتاجها عملاؤنا في جميع الفئات تقريبًا، من العمالة العادية إلى المهنيين.',
      photoAlt: 'فريق أفق الخليج في المكتب الرئيسي بمانيلا',
      caption: { title: 'فريق أفق الخليج', detail: 'المكتب الرئيسي، إرميتا، مانيلا' },
      leader: {
        eyebrow: 'القيادة',
        name: 'هاشم حامد',
        role: 'شريك وعضو مجلس الإدارة',
        alt: 'Hashim K. Hamid · Partner & Member of the Board',
        altLang: 'en',
        bio: 'تملك أفق الخليج وتديرها قيادات تتمتع بسمعة راسخة في النزاهة والموثوقية في مجال الاستقدام.',
        photoAlt: 'هاشم حامد في مكتبه',
      },
      stats: [
        { value: '300+', label: 'عامل فلبيني يتم توظيفهم شهريًا' },
        { value: '77+', label: 'عميلًا في دول الخليج' },
        { value: '6', label: 'دول نخدمها، في مقدمتها السعودية' },
      ],
    },
    principles: {
      eyebrow: 'ما يوجّهنا',
      title: 'مبادئنا',
      items: [
        { title: 'الالتزام', body: 'مرخّصون بالكامل من DMW وملتزمون بمتطلبات العمل السعودية في كل مرحلة.' },
        { title: 'النزاهة', body: 'رسوم شفافة وجداول زمنية صادقة وممارسات أخلاقية في صميم كل شراكة.' },
        { title: 'الكفاءة', body: 'عمليات مؤتمتة ومستندات مكتملة — إنهاء إجراءات العمال خلال 45 إلى 60 يومًا.' },
        { title: 'الرعاية', body: 'اختبارات مهارات معتمدة وتوجيه قبل السفر ودعم لكل عامل نستقدمه.' },
      ],
    },
    process: {
      eyebrow: 'آلية عملنا',
      title: 'كيف نعمل',
      steps: [
        { title: 'طلب الاستقدام', body: 'ترسل خطاب طلب أو طلب استقدام يحدد الوظائف والأعداد والرواتب.' },
        { title: 'الاستقطاب والفرز', body: 'نستقطب المتقدمين عبر الإعلانات وفروعنا، ثم نجري المقابلات الأولية.' },
        { title: 'الاختبارات والمقابلات', body: 'اختبارات مهنية للتحقق من المهارات، ثم مقابلات نهائية معك في قاعة المقابلات بمكتبنا في مانيلا.' },
        { title: 'الفحوصات والمستندات', body: 'فحوصات طبية وبدنية وفحص أسنان، واتفاقية الاستقدام، وتوثيق العقود لدى DMW.' },
        { title: 'السفر والمباشرة', body: 'توجيه قبل السفر حول العادات المحلية، والتنسيق مع شركات الطيران، ثم السفر.' },
      ],
    },
    footprint: {
      title: 'حضورنا الدولي',
      saudi: {
        name: 'المملكة العربية السعودية',
        detail: 'الرياض · جدة · الدمام · الخبر · تبوك · مكة المكرمة · المدينة المنورة',
        imageAlt: 'أبراج الرياض مضاءة عند الغسق',
      },
      philippines: {
        name: 'الفلبين',
        detail: 'المكتب الرئيسي في مانيلا · 4 فروع إقليمية',
        imageAlt: 'أفق مانيلا عند الغروب',
      },
      routeLabel: 'مسار الاستقدام من الفلبين إلى السعودية',
      foundation: {
        title: 'أساسنا',
        body: 'تملكها وتديرها قيادات ذات سمعة راسخة في النزاهة والموثوقية. نستقدم للمملكة العربية السعودية ولدول الخليج — بما فيها الإمارات وقطر والكويت والبحرين.',
        items: [
          { title: 'مرخّصون من DMW', detail: `رقم الترخيص: ${LICENSE_NO}` },
          { title: 'انتشار في أنحاء الفلبين', detail: 'مانيلا ودافاو وإيلويلو وبانغاسينان وباكولود' },
        ],
      },
    },
    clients: {
      eyebrow: 'قائمة جزئية بعملائنا',
      title: 'موضع ثقة أصحاب العمل في الخليج',
      description: 'من المستشفيات الحكومية إلى كبرى المصانع الوطنية والعلامات المعروفة في الأغذية والتجزئة — نخبة من أكثر من 77 عميلًا استقدمنا لهم العمالة.',
      sectors: [
        {
          title: 'الرعاية الصحية',
          clients: [
            { name: 'مستشفى الملك خالد التخصصي للعيون', city: 'الرياض، السعودية', logo: '9edb130f70' },
            { name: 'مدينة سلطان بن عبدالعزيز للخدمات الإنسانية', city: 'الرياض، السعودية', logo: 'cb35568e39' },
            { name: 'مستشفى د. أبانمي', city: 'الرياض، السعودية', logo: '4a1ce67824', tint: true },
            { name: 'المتبقاني للخدمات الصحية', city: 'الرياض، السعودية', logo: '5c9ee2e064', tint: true },
            { name: 'مستشفى الجامعة بالشارقة', city: 'الشارقة، الإمارات', logo: '2b4f79cb88', tint: true },
          ],
        },
        {
          title: 'الضيافة والأغذية',
          clients: [
            { name: 'فندق راديسون ساس', city: 'جدة، السعودية', logo: '118521a2ca', fit: true, bg: 'white' },
            { name: 'فندق الخزامى', city: 'الرياض، السعودية', logo: '6bfd377792', bg: 'black', inset: true },
            { name: 'هرفي للخدمات الغذائية', city: 'الرياض، السعودية', logo: '5b03b81863', fit: true },
            { name: 'مجموعة الفيصلية', city: 'الرياض، السعودية', logo: 'e4424934c5', fit: true },
            { name: 'مصنع المملكة للحلويات والشوكولاتة', city: 'الرياض، السعودية', mono: 'م', tint: true },
          ],
        },
        {
          title: 'الصناعة والإنشاءات',
          clients: [
            { name: 'شركة المعجل', city: 'الدمام، السعودية', logo: 'c0f6bb1446', fit: true },
            { name: 'أسمنت تبوك', city: 'تبوك، السعودية', logo: 'b8136ca481' },
            { name: 'مصنع الألمنيوم الوطني', city: 'الرياض وجدة، السعودية', logo: '61af2e4447', tint: true },
            { name: 'شركة غاز العربية للخدمات', city: 'الدمام، السعودية', logo: 'cada871505', tint: true },
            { name: 'مصنع دهانات الشرق الأوسط', city: 'جدة، السعودية', logo: 'd60f1298f1', fit: true, tint: true },
          ],
        },
        {
          title: 'التجزئة ومجموعات الأعمال',
          clients: [
            { name: 'شركة العثيم التجارية', city: 'الرياض، السعودية', logo: '3d3cffd7c1', fit: true },
            { name: 'مجموعة الغرير', city: 'دبي، الإمارات', logo: 'f7342abac1', fit: true },
            { name: 'مجموعة شركات لازوردي', city: 'الرياض، السعودية', logo: 'c0fbd294f5', fit: true },
            { name: 'شركة الخشيم', city: 'الدمام، السعودية', logo: 'd80081069d', tint: true },
            { name: 'مجموعة الذياب', city: 'الرياض، السعودية', logo: '33e5647602', tint: true },
          ],
        },
      ],
      note: {
        count: '+ 57 عميلًا آخر',
        detail: 'في الرياض وجدة والدمام والجبيل وتبوك وخميس مشيط والمدينة المنورة — إضافة إلى عملاء في الإمارات والبحرين والسودان.',
      },
    },
    cta: {
      heading: 'لنبنِ فريقك معًا',
      subtext: 'شاركنا خطط التوظيف لديك، وسيُعد فريقنا في مانيلا خطة استقدام تناسبها.',
      primary: 'اطلب قائمة مرشحين',
      secondary: 'تحدث إلى فريقنا',
    },
  },
}
