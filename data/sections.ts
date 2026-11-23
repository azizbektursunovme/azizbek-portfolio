import type { Discipline, Localized } from "./types";

/** UI strings for the Selected work bento. */
export const workCopy = {
  eyebrow: { en: "Selected work", ru: "Избранные работы", uz: "Tanlangan ishlar" } as Localized,
  title: {
    en: "Six projects across websites, brands and ads.",
    ru: "Шесть проектов: сайты, бренды и реклама.",
    uz: "Olti loyiha: saytlar, brendlar va reklama.",
  } as Localized,
  intro: {
    en: "Open any project for the brief, what I did and the result.",
    ru: "Откройте любой проект, чтобы увидеть задачу, мою работу и результат.",
    uz: "Vazifa, qilgan ishim va natijani koʻrish uchun istalgan loyihani oching.",
  } as Localized,
};

/** Discipline tags on bento tiles and case pages. */
export const disciplineLabel: Record<Discipline, Localized> = {
  web: { en: "Websites", ru: "Сайты", uz: "Saytlar" },
  brand: { en: "Branding", ru: "Брендинг", uz: "Brending" },
  ads: { en: "Ads", ru: "Реклама", uz: "Reklama" },
};

/** UI strings for the Websites and Branding sections. */
export const websitesCopy = {
  eyebrow: { en: "Websites", ru: "Сайты", uz: "Saytlar" } as Localized,
  title: {
    en: "Every website I have built or designed.",
    ru: "Все сайты, которые я сделал или спроектировал.",
    uz: "Men yaratgan yoki dizaynini ishlab chiqqan barcha saytlar.",
  } as Localized,
  intro: {
    en: "Client sites, a startup product and my own projects. Each card says what my part was.",
    ru: "Клиентские сайты, стартап-продукт и мои собственные проекты. На каждой карточке указано, что именно делал я.",
    uz: "Mijozlar saytlari, startap mahsuloti va shaxsiy loyihalarim. Har bir kartada aynan nima qilganim yozilgan.",
  } as Localized,
  visitSite: { en: "Visit site", ru: "Открыть сайт", uz: "Saytga oʻtish" } as Localized,
  launchingSoon: { en: "Launching soon", ru: "Скоро запуск", uz: "Tez orada ishga tushadi" } as Localized,
  caseStudy: { en: "Case study", ru: "Кейс", uz: "Keys" } as Localized,
  github: { en: "GitHub", ru: "GitHub", uz: "GitHub" } as Localized,
  stackLabel: { en: "Stack", ru: "Стек", uz: "Stek" } as Localized,
  redesignTitle: {
    en: "Redesign concepts for GFS Group companies",
    ru: "Концепции редизайна для компаний GFS Group",
    uz: "GFS Group kompaniyalari uchun redizayn konsepsiyalari",
  } as Localized,
  redesignNote: {
    en: "Concept pages, not live sites.",
    ru: "Это концепты, а не действующие сайты.",
    uz: "Bular konsept sahifalar, ishlayotgan saytlar emas.",
  } as Localized,
};

export const brandingCopy = {
  eyebrow: { en: "Branding", ru: "Брендинг", uz: "Brending" } as Localized,
  title: {
    en: "Brand identities, from logo to livery.",
    ru: "Фирменный стиль: от логотипа до брендирования фур.",
    uz: "Brend uslubi: logotipdan tirkamalarni brendlashgacha.",
  } as Localized,
  intro: {
    en: "Logos, colour, type and the places they live. Open a brand for the full kit.",
    ru: "Логотипы, цвета, шрифты и их применение. Откройте бренд, чтобы увидеть весь фирменный стиль.",
    uz: "Logotiplar, ranglar, shriftlar va ularning qoʻllanilishi. Toʻliq toʻplamni koʻrish uchun brendni oching.",
  } as Localized,
};

export const adsCopy = {
  eyebrow: { en: "Ads & Content", ru: "Реклама и контент", uz: "Reklama va kontent" } as Localized,
  title: {
    en: "Ads that recruit, and the tools behind them.",
    ru: "Реклама, которая нанимает, — и инструменты, которыми я её делаю.",
    uz: "Ishga yollash reklamalari va ularni yaratish vositalari.",
  } as Localized,
  intro: {
    en: "Meta ads, Instagram creatives and AI video, made for GFS Group. Videos play while they are on screen.",
    ru: "Реклама в Meta, креативы для Instagram и ИИ-видео, сделанные для GFS Group. Видео воспроизводится, пока оно на экране.",
    uz: "GFS Group uchun tayyorlangan Meta reklamalari, Instagram kreativlari va AI videolar. Videolar ekranda koʻrinib turganda ijro etiladi.",
  } as Localized,
  madeAt: { en: "Made at GFS Group", ru: "Сделано в GFS Group", uz: "GFS Group’da tayyorlangan" } as Localized,
  creatives: { en: "Creatives", ru: "Креативы", uz: "Kreativlar" } as Localized,
  carousel: { en: "Carousel O1", ru: "Карусель O1", uz: "Karusel O1" } as Localized,
  /** `{n}` is the slide count. RU uses the "noun: n" form so it reads right for any n. */
  slides: { en: "{n} slides", ru: "слайдов: {n}", uz: "{n} ta slayd" } as Localized,
  gfsTitle: {
    en: "GFS Group: owner-operator recruiting ad",
    ru: "GFS Group: реклама для найма водителей со своим тягачом",
    uz: "GFS Group: oʻz yuk mashinasiga ega haydovchilarni yollash reklamasi",
  } as Localized,
  gfsNote: {
    en: "A 9:16 ad video for the GFS Group owner-operator recruiting push.",
    ru: "Рекламное видео 9:16 для кампании GFS Group по найму водителей со своим тягачом.",
    uz: "GFS Group’ning oʻz yuk mashinasiga ega haydovchilarni yollash kampaniyasi uchun 9:16 formatdagi reklama videosi.",
  } as Localized,
  workflowTitle: { en: "AI workflow", ru: "Работа с ИИ", uz: "AI bilan ish jarayoni" } as Localized,
  workflowNote: {
    en: "The tools I use to go from a brief to a finished ad.",
    ru: "Инструменты, с которыми я прохожу путь от брифа до готовой рекламы.",
    uz: "Brifdan tayyor reklamagacha boʻlgan jarayonda foydalanadigan vositalarim.",
  } as Localized,
  archiveTitle: { en: "Earlier work", ru: "Ранние работы", uz: "Avvalgi ishlar" } as Localized,
  archiveNote: {
    en: "Graphic design from before the ads: social posts, banners and flyers.",
    ru: "Графический дизайн до рекламных проектов: посты для соцсетей, баннеры и флаеры.",
    uz: "Reklamadan oldingi grafik dizayn ishlari: ijtimoiy tarmoq postlari, bannerlar va flayerlar.",
  } as Localized,
  play: { en: "Play video", ru: "Воспроизвести видео", uz: "Videoni ijro etish" } as Localized,
  pause: { en: "Pause video", ru: "Пауза", uz: "Pauza" } as Localized,
  close: { en: "Close", ru: "Закрыть", uz: "Yopish" } as Localized,
  openImage: { en: "View larger", ru: "Увеличить", uz: "Kattalashtirish" } as Localized,
};

/** UI strings for the case study pages (/[lang]/work/[slug]) and the 404 page. */
export const caseCopy = {
  caseStudy: { en: "Case study", ru: "Кейс", uz: "Keys" } as Localized,
  allWork: { en: "All work", ru: "Все работы", uz: "Barcha ishlar" } as Localized,
  client: { en: "Client", ru: "Клиент", uz: "Mijoz" } as Localized,
  context: { en: "Context", ru: "Контекст", uz: "Kontekst" } as Localized,
  year: { en: "Year", ru: "Год", uz: "Yil" } as Localized,
  role: { en: "Role", ru: "Роль", uz: "Rol" } as Localized,
  stack: { en: "Stack", ru: "Стек", uz: "Stek" } as Localized,
  links: { en: "Links", ru: "Ссылки", uz: "Havolalar" } as Localized,
  visitSite: { en: "Visit site", ru: "Открыть сайт", uz: "Saytga oʻtish" } as Localized,
  launchingSoon: { en: "Launching soon", ru: "Скоро запуск", uz: "Tez orada ishga tushadi" } as Localized,
  github: { en: "GitHub", ru: "GitHub", uz: "GitHub" } as Localized,
  guide: { en: "Brand guide (PDF)", ru: "Брендбук (PDF)", uz: "Brendbuk (PDF)" } as Localized,
  downloadGuide: {
    en: "Download the brand guide (PDF)",
    ru: "Скачать брендбук (PDF)",
    uz: "Brendbukni yuklab olish (PDF)",
  } as Localized,
  guideNote: { en: "The full brand guide, as a PDF.", ru: "Полный брендбук в PDF.", uz: "Toʻliq brendbuk, PDF formatida." } as Localized,
  brief: { en: "Brief", ru: "Задача", uz: "Vazifa" } as Localized,
  whatIDid: { en: "What I did", ru: "Что я сделал", uz: "Nima qildim" } as Localized,
  decisions: { en: "Key decisions", ru: "Ключевые решения", uz: "Asosiy qarorlar" } as Localized,
  result: { en: "Result", ru: "Результат", uz: "Natija" } as Localized,
  webBlock: { en: "Website", ru: "Сайт", uz: "Sayt" } as Localized,
  webTitle: { en: "Desktop and mobile", ru: "Десктоп и мобильная версия", uz: "Kompyuter va mobil versiya" } as Localized,
  mobile: { en: "Mobile", ru: "Мобильная версия", uz: "Mobil versiya" } as Localized,
  brandBlock: { en: "Brand kit", ru: "Фирменный стиль", uz: "Brend uslubi" } as Localized,
  brandTitle: { en: "Logo, colour and type", ru: "Логотип, цвета и шрифты", uz: "Logotip, ranglar va shriftlar" } as Localized,
  brandTitleNoType: { en: "Logo and colour", ru: "Логотип и цвета", uz: "Logotip va ranglar" } as Localized,
  logos: { en: "Logos", ru: "Логотипы", uz: "Logotiplar" } as Localized,
  palette: { en: "Palette", ru: "Палитра", uz: "Palitra" } as Localized,
  type: { en: "Type", ru: "Шрифты", uz: "Shriftlar" } as Localized,
  applications: { en: "In use", ru: "Применение", uz: "Qoʻllanilishi" } as Localized,
  adsBlock: { en: "Ads", ru: "Реклама", uz: "Reklama" } as Localized,
  adsTitle: { en: "The campaign", ru: "Кампания", uz: "Kampaniya" } as Localized,
  objective: { en: "Objective", ru: "Цель", uz: "Maqsad" } as Localized,
  creatives: { en: "Creatives", ru: "Креативы", uz: "Kreativlar" } as Localized,
  tools: { en: "Tools", ru: "Инструменты", uz: "Vositalar" } as Localized,
  moreProjects: { en: "More projects", ru: "Другие проекты", uz: "Boshqa loyihalar" } as Localized,
  previous: { en: "Previous project", ru: "Предыдущий проект", uz: "Oldingi loyiha" } as Localized,
  next: { en: "Next project", ru: "Следующий проект", uz: "Keyingi loyiha" } as Localized,
  notFoundTitle: {
    en: "There is no page at this address.",
    ru: "По этому адресу страницы нет.",
    uz: "Bu manzilda sahifa yoʻq.",
  } as Localized,
  notFoundBody: {
    en: "The link may be from the old version of this site, or the address has a typo. All the work is on the home page.",
    ru: "Возможно, ссылка осталась от старой версии сайта или в адресе есть опечатка. Все работы — на главной странице.",
    uz: "Havola saytning eski versiyasidan qolgan yoki manzilda xato boʻlishi mumkin. Barcha ishlar bosh sahifada.",
  } as Localized,
  notFoundHome: { en: "Go to the home page", ru: "На главную", uz: "Bosh sahifaga" } as Localized,
  notFoundCases: { en: "Or open a case study", ru: "Или откройте кейс", uz: "Yoki keyslardan birini oching" } as Localized,
};
