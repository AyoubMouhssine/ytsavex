import { SupportedLang } from "./dictionary";

export const staticTranslations: Record<
  SupportedLang,
  {
    about: {
      metaTitle: string;
      metaDescription: string;
      title: string;
      p1: string;
      philosophyTitle: string;
      p2: string;
    };
    contact: {
      metaTitle: string;
      metaDescription: string;
      title: string;
      intro: string;
      supportLabel: string;
      dmcaLabel: string;
    };
    dmca: {
      metaTitle: string;
      metaDescription: string;
      title: string;
      intro: string;
      sec1Title: string;
      sec1Text: string;
      sec2Title: string;
      sec2Text: string;
      noticeText: string;
    };
    terms: {
      metaTitle: string;
      metaDescription: string;
      title: string;
      intro: string;
      sec1Title: string;
      sec1Text: string;
      sec2Title: string;
      sec2Text: string;
    };
    privacy: {
      metaTitle: string;
      metaDescription: string;
      title: string;
      intro: string;
      sec1Title: string;
      sec1Text: string;
      sec2Title: string;
      sec2Text: string;
    };
  }
> = {
  en: {
    about: {
      metaTitle: "About Us | YTSaveX",
      metaDescription:
        "Learn more about YTSaveX, our high-speed media conversion engine and mission.",
      title: "About YTSaveX",
      p1: "YTSaveX was developed to provide an effortless, high-speed, and secure platform for personal offline media archiving. Our mission is to make audio and video conversion intuitive without burdening users with invasive ads.",
      philosophyTitle: "Our Engineering Standards",
      p2: "Unlike legacy download sites congested with fake buttons, malware redirects, and slow queues, YTSaveX relies on modern asynchronous cloud processing to deliver true 1080p video remuxing and clean 320kbps audio files.",
    },
    contact: {
      metaTitle: "Contact & Support | YTSaveX",
      metaDescription:
        "Get in touch with the YTSaveX team for technical support or partnerships.",
      title: "Contact & Support",
      intro:
        "Have questions, technical feedback, or partnership opportunities? Reach out to our team below:",
      supportLabel: "General Technical Support:",
      dmcaLabel: "Copyright & Legal Inquiries:",
    },
    dmca: {
      metaTitle: "DMCA Copyright Policy | YTSaveX",
      metaDescription:
        "Digital Millennium Copyright Act compliance and takedown notice procedure.",
      title: "DMCA Copyright Compliance",
      intro:
        "YTSaveX fully respects intellectual property rights and complies with the Digital Millennium Copyright Act (DMCA).",
      sec1Title: "1. Service Architecture",
      sec1Text:
        "YTSaveX functions strictly as a client-side transcoding and proxy utility. We do not maintain, store, host, or index any copyrighted audio or video streams on permanent storage.",
      sec2Title: "2. Filing a Takedown Notice",
      sec2Text:
        "If you represent a copyright holder and wish to block access to specific URLs via our tool, please email our designated compliance agent:",
      noticeText:
        "Please include the full YouTube URL(s) and proof of copyright authorization so we can immediately blacklist the requested video IDs.",
    },
    terms: {
      metaTitle: "Terms of Service | YTSaveX",
      metaDescription:
        "Read the terms and conditions for using the YTSaveX platform.",
      title: "Terms of Service",
      intro:
        "By accessing and using YTSaveX, you agree to adhere to the following conditions:",
      sec1Title: "1. Personal Fair-Use Only",
      sec1Text:
        "Our conversion service is strictly designed for personal, educational, and offline fair-use. You must possess the legal authorization or right to convert any target media.",
      sec2Title: "2. Limitation of Liability",
      sec2Text:
        "YTSaveX is not liable for unauthorized distribution, copyright infringement, or misuse committed by third-party users.",
    },
    privacy: {
      metaTitle: "Privacy Policy | YTSaveX",
      metaDescription:
        "How YTSaveX respects user privacy with zero data tracking.",
      title: "Privacy Policy",
      intro:
        "We believe in uncompromising privacy. YTSaveX does not require user accounts, emails, or personal identifications.",
      sec1Title: "1. No Logging Policy",
      sec1Text:
        "We do not keep permanent records of user IP addresses, converted video links, or file contents. All processing occurs in volatile temporary memory and is purged immediately.",
      sec2Title: "2. Browser Storage",
      sec2Text:
        "Local browser storage is used exclusively to remember your preferred visual theme (Light/Dark mode).",
    },
  },
  fr: {
    about: {
      metaTitle: "À Propos de Nous | YTSaveX",
      metaDescription:
        "Découvrez YTSaveX, notre moteur de conversion multimédia haute performance.",
      title: "À Propos de YTSaveX",
      p1: "YTSaveX a été conçu pour offrir une plateforme rapide, intuitive et sécurisée de sauvegarde multimédia hors-ligne pour un usage personnel. Notre objectif est de simplifier l'extraction audio et vidéo sans imposer de publicités invasives.",
      philosophyTitle: "Nos Standards Techniques",
      p2: "Contrairement aux anciens convertisseurs surchargés de redirections trompeuses et de délais artificiels, YTSaveX utilise une architecture asynchrone moderne garantissant des fichiers vidéo 1080p réels et des flux audio 320 kbps purs.",
    },
    contact: {
      metaTitle: "Contact & Assistance | YTSaveX",
      metaDescription:
        "Contactez l'équipe YTSaveX pour vos questions techniques ou partenariats.",
      title: "Contact & Assistance",
      intro:
        "Une question, une suggestion technique ou une demande de partenariat ? Écrivez-nous :",
      supportLabel: "Support Technique Général :",
      dmcaLabel: "Signalements Juridiques & DMCA :",
    },
    dmca: {
      metaTitle: "Politique DMCA & Droits d'Auteur | YTSaveX",
      metaDescription:
        "Procédure de conformité aux droits d'auteur et notification de retrait.",
      title: "Politique de Droits d'Auteur (DMCA)",
      intro:
        "YTSaveX respecte scrupuleusement la propriété intellectuelle et répond promptement aux notifications DMCA valides.",
      sec1Title: "1. Nature du Service",
      sec1Text:
        "YTSaveX opère uniquement comme un outil de conversion à la volée. Nous n'hébergeons, ne stockons ni n'archivons aucun fichier audio ou vidéo protégé sur nos serveurs.",
      sec2Title: "2. Soumettre une demande de retrait",
      sec2Text:
        "Si vous êtes titulaire de droits d'auteur et souhaitez bloquer la conversion d'une vidéo spécifique, contactez notre agent désigné :",
      noticeText:
        "Veuillez fournir les URLs exactes et une preuve de détention des droits pour une inscription immédiate en liste noire.",
    },
    terms: {
      metaTitle: "Conditions d'Utilisation | YTSaveX",
      metaDescription:
        "Consultez les conditions d'utilisation de la plateforme YTSaveX.",
      title: "Conditions Générales d'Utilisation",
      intro:
        "En utilisant YTSaveX, vous acceptez l'ensemble des conditions suivantes :",
      sec1Title: "1. Usage Personnel et Copie Privée",
      sec1Text:
        "Le service est exclusivement destiné à un usage personnel, éducatif ou dans le cadre de la copie privée. L'utilisateur est seul responsable de la légitimité des contenus qu'il convertit.",
      sec2Title: "2. Limitation de Responsabilité",
      sec2Text:
        "YTSaveX ne peut être tenu responsable d'un usage illicite ou de la redistribution commerciale de contenus tiers.",
    },
    privacy: {
      metaTitle: "Politique de Confidentialité | YTSaveX",
      metaDescription:
        "Découvrez notre engagement pour la confidentialité et le respect de la vie privée.",
      title: "Politique de Confidentialité",
      intro:
        "Le respect de votre vie privée est une priorité absolue. Aucun compte ni mot de passe n'est requis.",
      sec1Title: "1. Absence Totale d'Historique",
      sec1Text:
        "Nous ne conservons aucun historique des liens soumis ni des fichiers traités. Tout est purgé de la mémoire dès l'envoi du fichier.",
      sec2Title: "2. Stockage Local",
      sec2Text:
        "Le stockage de votre navigateur (localStorage) est uniquement utilisé pour mémoriser votre préférence d'affichage (mode clair ou sombre).",
    },
  },
  es: {
    about: {
      metaTitle: "Sobre Nosotros | YTSaveX",
      metaDescription:
        "Conoce más sobre YTSaveX y nuestra plataforma de conversión rápida.",
      title: "Sobre YTSaveX",
      p1: "YTSaveX fue creado para proporcionar una experiencia de conversión de medios rápida, segura y limpia para uso personal.",
      philosophyTitle: "Nuestra Filosofía",
      p2: "Sin publicidad intrusiva, procesamos descargas en 1080p real y audio MP3 en 320kbps.",
    },
    contact: {
      metaTitle: "Contacto y Soporte | YTSaveX",
      metaDescription: "Ponte en contacto con el equipo de soporte de YTSaveX.",
      title: "Contacto y Soporte",
      intro: "¿Tienes preguntas o sugerencias? Contáctanos a continuación:",
      supportLabel: "Soporte Técnico:",
      dmcaLabel: "Avisos de Derechos de Autor (DMCA):",
    },
    dmca: {
      metaTitle: "Política DMCA | YTSaveX",
      metaDescription:
        "Procedimiento de derechos de autor y avisos de retirada.",
      title: "Política de Derechos de Autor (DMCA)",
      intro: "YTSaveX respeta los derechos de propiedad intelectual.",
      sec1Title: "1. Naturaleza del Servicio",
      sec1Text:
        "No alojamos ningún archivo en nuestros servidores. Todo el procesamiento se realiza en tiempo real.",
      sec2Title: "2. Notificaciones de Retirada",
      sec2Text:
        "Para solicitar el bloqueo de una URL, envíe un correo electrónico a:",
      noticeText:
        "Indique la URL de YouTube para añadirla a nuestra lista de bloqueo.",
    },
    terms: {
      metaTitle: "Términos de Servicio | YTSaveX",
      metaDescription: "Términos y condiciones de uso de YTSaveX.",
      title: "Términos de Servicio",
      intro:
        "El uso de este servicio implica la aceptación de los siguientes términos:",
      sec1Title: "1. Uso Personal Legítimo",
      sec1Text:
        "El servicio está reservado exclusivamente para uso personal y legítimo.",
      sec2Title: "2. Responsabilidad",
      sec2Text:
        "YTSaveX no asume responsabilidad por el uso indebido de la plataforma.",
    },
    privacy: {
      metaTitle: "Política de Privacidad | YTSaveX",
      metaDescription: "Conoce cómo protegemos tu privacidad.",
      title: "Política de Privacidad",
      intro: "No recopilamos datos personales ni historiales de descarga.",
      sec1Title: "1. Cero Registros",
      sec1Text:
        "Los enlaces y archivos procesados se eliminan inmediatamente de la memoria.",
      sec2Title: "2. Almacenamiento Local",
      sec2Text:
        "Utilizado únicamente para recordar su preferencia de tema visual.",
    },
  },
  ar: {
    about: {
      metaTitle: "من نحن | YTSaveX",
      metaDescription:
        "تعرف على منصة YTSaveX لتحويل وتنزيل مقاطع الفيديو والصوت.",
      title: "عن YTSaveX",
      p1: "تم تطوير YTSaveX لتوفير وسيلة سريعة وآمنة ومجانية لتنزيل الوسائط التعليمية والترفيهية للاستخدام الشخصي بدون إعلانات مزعجة.",
      philosophyTitle: "معايير الجودة والأداء",
      p2: "نعتمد على خوادم حديثة تضمن دمج الفيديو بدقة 1080p الحقيقية واستخراج ملفات MP3 بنقاء 320kbps.",
    },
    contact: {
      metaTitle: "الاتصال والدعم | YTSaveX",
      metaDescription: "تواصل مع فريق الدعم الفني لمنصة YTSaveX.",
      title: "الاتصال والدعم الفني",
      intro:
        "هل لديك أي استفسارات أو ملاحظات تقنية؟ تواصل معنا عبر البريد التالي:",
      supportLabel: "الدعم الفني العام:",
      dmcaLabel: "حقوق الطبع والنشر (DMCA):",
    },
    dmca: {
      metaTitle: "سياسة حقوق النشر (DMCA) | YTSaveX",
      metaDescription: "إجراءات التوافق مع قانون حقوق النشر الرقمية.",
      title: "سياسة حقوق الطبع والنشر (DMCA)",
      intro:
        "يحترم موقع YTSaveX حقوق الملكية الفكرية بالكامل ويلتزم بقوانين حماية حقوق النشر.",
      sec1Title: "1. طبيعة الخدمة",
      sec1Text:
        "يعمل الموقع كأداة تحويل مؤقتة فقط، ولا نقوم بتخزين أو استضافة أي ملفات صوتية أو مرئية على خوادمنا بشكل دائم.",
      sec2Title: "2. تقديم طلب إزالة",
      sec2Text:
        "إذا كنت مالكاً للحقوق وترغب في حظر تحويل رابط معين، يرجى مراسلتنا على:",
      noticeText:
        "يرجى تضمين رابط يوتيوب المحدد وإثبات الملكية ليتم حظر الرابط فوراً.",
    },
    terms: {
      metaTitle: "شروط الاستخدام | YTSaveX",
      metaDescription: "شروط وقواعد استخدام منصة YTSaveX.",
      title: "شروط الاستخدام",
      intro:
        "باستخدامك لموقع YTSaveX، فإنك توافق على الالتزام بالشروط التالية:",
      sec1Title: "1. الاستخدام الشخصي العادل",
      sec1Text:
        "الخدمة مخصصة للاستخدام الشخصي وغير التجاري فقط، وتقع مسؤولية مشروعية المحتوى على المستخدم.",
      sec2Title: "2. إخلاء المسؤولية",
      sec2Text:
        "الموقع غير مسؤول عن أي إعادة توزيع غير مصرح بها للمحتويات المحمية.",
    },
    privacy: {
      metaTitle: "سياسة الخصوصية | YTSaveX",
      metaDescription: "التزامنا التام بحماية خصوصية بيانات المستخدمين.",
      title: "سياسة الخصوصية",
      intro:
        "نحن نقدر خصوصيتك تماماً؛ لا يتطلب استخدام YTSaveX أي حسابات أو تسجيل.",
      sec1Title: "1. سياسة عدم الاحتفاظ بالسجلات",
      sec1Text:
        "لا نقوم بتسجيل عناوين IP أو الروابط المدخلة، ويتم حذف الملفات المعالجة فور انتهاء التنزيل.",
      sec2Title: "2. التخزين المحلي",
      sec2Text:
        "يستخدم التخزين المحلي للمتصفح فقط لحفظ اختيارك للوضع الداكن أو الفاتح.",
    },
  },
};
