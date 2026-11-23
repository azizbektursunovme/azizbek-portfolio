import type { ArchiveItem, Discipline, Localized, Media, Project } from "./types";

/** A string in all three locales: EN, RU, UZ (Uzbek in Latin script). */
const L = (en: string, ru: string, uz: string): Localized => ({ en, ru, uz });

const img = (src: string, width: number, height: number, alt: Localized): Media => ({
  src,
  width,
  height,
  alt,
  kind: "image",
});

const video = (src: string, poster: string, width: number, height: number, alt: Localized): Media => ({
  src,
  poster,
  width,
  height,
  alt,
  kind: "video",
});

/* Alt text patterns that repeat across projects. */
const siteDesktop = (name: string) =>
  L(`${name} website, desktop`, `Сайт ${name}, десктоп`, `${name} sayti, kompyuter versiyasi`);
const siteMobile = (name: string) =>
  L(`${name} website, mobile`, `Сайт ${name}, мобильная версия`, `${name} sayti, mobil versiya`);
const kitPreview = (name: string) =>
  L(`${name} brand kit preview`, `Обзор фирменного стиля ${name}`, `${name} brend uslubining umumiy koʻrinishi`);
const primaryLogo = (name: string) =>
  L(`${name} primary logo`, `Основной логотип ${name}`, `${name} asosiy logotipi`);
const symbol = (name: string) => L(`${name} symbol`, `Знак ${name}`, `${name} belgisi`);
const trailerMockup = (name: string) =>
  L(`${name} trailer livery mockup`, `Мокап брендирования прицепа ${name}`, `${name} tirkamasini brendlash maketi`);

/* Type roles in brand kits. */
const DISPLAY = L("Display", "Заголовки", "Sarlavhalar");
const BODY = L("Body", "Основной текст", "Asosiy matn");
const LABELS = L("Labels", "Подписи", "Yorliqlar");

const GFS_CONTEXT = L("Delivered at GFS Group", "Выполнено в GFS Group", "GFS Group’da bajarilgan");
const STARTUP_CONTEXT = L(
  "Two-person startup, built in collaboration",
  "Стартап из двух человек, создан в коллаборации",
  "Ikki kishilik startap, hamkorlikda yaratilgan",
);
const MADE_AT_GFS = L("Made at GFS Group", "Сделано в GFS Group", "GFS Group’da tayyorlangan");

const GIC_A1_9x16 = L("Good Idea Cargo ad A1, 9:16", "Реклама Good Idea Cargo, A1, 9:16", "Good Idea Cargo reklamasi, A1, 9:16");

export const projects: Project[] = [
  {
    slug: "jjr-transportation",
    title: "JJR Transportation",
    client: "JJR Transportation",
    context: GFS_CONTEXT,
    year: "2026",
    disciplines: ["web", "brand"],
    summary: L(
      "Website and brand kit for a US dry-van carrier, built from zero.",
      "Сайт и фирменный стиль с нуля для американского грузоперевозчика (dry van).",
      "AQShdagi dry van yuk tashuvchi kompaniya uchun noldan yaratilgan sayt va brend uslubi.",
    ),
    role: L("Website + brand identity", "Сайт + фирменный стиль", "Sayt + brend uslubi"),
    stack: ["Next.js 16", "Tailwind CSS 4", "Web3Forms"],
    links: { live: "https://jjr-transportation-website.vercel.app", liveStatus: "live" },
    cover: img("/work/jjr-transportation/brand-preview.png", 1375, 943, kitPreview("JJR Transportation")),
    featured: 1,
    caseStudy: {
      brief: L(
        "JJR Transportation is a US dry-van carrier. The work was done through GFS Group and started from nothing: no site and no brand kit.",
        "JJR Transportation — американский грузоперевозчик (dry van). Работа шла через GFS Group и началась с нуля: не было ни сайта, ни фирменного стиля.",
        "JJR Transportation — AQShdagi dry van yuk tashuvchi kompaniya. Ish GFS Group orqali bajarildi va noldan boshlandi: na sayt, na brend uslubi bor edi.",
      ),
      whatIDid: {
        en: [
          "Designed and built the website in Next.js 16 with Tailwind CSS 4.",
          "Built three forms, sent through Web3Forms.",
          "Created the brand kit: logo variants, palette, typography, brand guide and fleet mockups.",
        ],
        ru: [
          "Спроектировал и разработал сайт на Next.js 16 и Tailwind CSS 4.",
          "Сделал три формы с отправкой через Web3Forms.",
          "Создал фирменный стиль: варианты логотипа, палитру, типографику, брендбук и мокапы автопарка.",
        ],
        uz: [
          "Saytni Next.js 16 va Tailwind CSS 4 asosida loyihalab, ishlab chiqdim.",
          "Web3Forms orqali yuboriladigan uchta forma yaratdim.",
          "Brend uslubini yaratdim: logotip variantlari, palitra, tipografika, brendbuk va avtopark maketlari.",
        ],
      },
      result: L(
        "A live website and a complete brand kit delivered to the company.",
        "Компания получила работающий сайт и полный фирменный стиль.",
        "Kompaniyaga ishlayotgan sayt va toʻliq brend uslubi topshirildi.",
      ),
      web: {
        desktop: [img("/work/jjr-transportation/desktop-1.webp", 1440, 900, siteDesktop("JJR Transportation"))],
        mobile: [img("/work/jjr-transportation/mobile-1.webp", 390, 844, siteMobile("JJR Transportation"))],
      },
      brand: {
        logos: [
          img("/work/jjr-transportation/logo-primary.svg", 1382, 110, primaryLogo("JJR Transportation")),
          img("/work/jjr-transportation/logo-symbol.svg", 1590, 536, symbol("JJR Transportation")),
        ],
        palette: [
          { name: "Graphite", hex: "#25282c" },
          { name: "Orange", hex: "#f46328" },
          { name: "Warm white", hex: "#faf9f5" },
          { name: "Steel", hex: "#a7aaad" },
          { name: "Muted", hex: "#5e636a" },
        ],
        type: [
          { name: "Barlow Condensed", role: DISPLAY },
          { name: "Barlow", role: BODY },
        ],
        applications: [
          img("/work/jjr-transportation/trailer-mockup.png", 1520, 395, trailerMockup("JJR Transportation")),
          img("/work/jjr-transportation/brand-preview.png", 1375, 943, kitPreview("JJR Transportation")),
        ],
        guidePdf: "/work/jjr-transportation/guide.pdf",
        monoSrc: "/work/jjr-transportation/mark-mono.svg",
      },
    },
  },
  {
    slug: "davr-group",
    title: "DAVR GROUP",
    client: "DAVR GROUP LLC",
    context: GFS_CONTEXT,
    year: "2026",
    disciplines: ["web", "brand"],
    summary: L(
      "Website and brand kit for a US trucking company, built from zero.",
      "Сайт и фирменный стиль с нуля для американской транспортной компании.",
      "AQShdagi yuk tashish kompaniyasi uchun noldan yaratilgan sayt va brend uslubi.",
    ),
    role: L("Website + brand identity", "Сайт + фирменный стиль", "Sayt + brend uslubi"),
    stack: ["Next.js", "three.js"],
    links: { live: "https://web-mu-nine-85.vercel.app", liveStatus: "live" },
    cover: img("/work/davr-group/brand-preview.png", 1375, 970, kitPreview("DAVR GROUP")),
    featured: 2,
    caseStudy: {
      brief: L(
        "DAVR GROUP LLC is a US trucking company. The work was done through GFS Group: a website and a brand kit, both from zero.",
        "DAVR GROUP LLC — американская транспортная компания. Работа шла через GFS Group: сайт и фирменный стиль, оба с нуля.",
        "DAVR GROUP LLC — AQShdagi yuk tashish kompaniyasi. Ish GFS Group orqali bajarildi: sayt va brend uslubi, ikkalasi ham noldan.",
      ),
      whatIDid: {
        en: [
          "Built the website as a static Next.js site with a three.js scene and tests.",
          "Created the brand kit: logo variants, palette, typography, brand guide PDF and a trailer mockup.",
        ],
        ru: [
          "Разработал статический сайт на Next.js со сценой на three.js и тестами.",
          "Создал фирменный стиль: варианты логотипа, палитру, типографику, брендбук в PDF и мокап прицепа.",
        ],
        uz: [
          "Saytni three.js sahnasi va testlari bilan statik Next.js sayti sifatida ishlab chiqdim.",
          "Brend uslubini yaratdim: logotip variantlari, palitra, tipografika, PDF brendbuk va tirkama maketi.",
        ],
      },
      result: L(
        "A website and a complete brand kit delivered to the company.",
        "Компания получила сайт и полный фирменный стиль.",
        "Kompaniyaga sayt va toʻliq brend uslubi topshirildi.",
      ),
      web: {
        desktop: [img("/work/davr-group/desktop-1.webp", 1440, 900, siteDesktop("DAVR GROUP"))],
        mobile: [img("/work/davr-group/mobile-1.webp", 390, 844, siteMobile("DAVR GROUP"))],
      },
      brand: {
        logos: [
          img("/work/davr-group/logo-primary.svg", 555, 192, primaryLogo("DAVR GROUP")),
          img("/work/davr-group/logo-symbol.svg", 249, 192, symbol("DAVR GROUP")),
        ],
        palette: [
          { name: "Plum", hex: "#54287c" },
          { name: "Deep plum", hex: "#2f1548" },
          { name: "Coral", hex: "#f36b46" },
          { name: "Ink", hex: "#20192d" },
          { name: "Lavender", hex: "#f4eff9" },
        ],
        type: [
          { name: "Red Hat Display", role: DISPLAY },
          { name: "Red Hat Text", role: BODY },
          { name: "Red Hat Mono", role: LABELS },
        ],
        applications: [
          img("/work/davr-group/trailer-mockup.png", 2172, 588, trailerMockup("DAVR GROUP")),
          img("/work/davr-group/brand-preview.png", 1375, 970, kitPreview("DAVR GROUP")),
        ],
        guidePdf: "/work/davr-group/guide.pdf",
        monoSrc: "/work/davr-group/mark-mono.svg",
      },
    },
  },
  {
    slug: "hirara",
    title: "Hirara",
    client: "Hirara",
    context: STARTUP_CONTEXT,
    year: "2026",
    disciplines: ["web"],
    summary: L(
      "Uzbek SaaS for Telegram shops, bio pages and landing pages.",
      "Узбекский SaaS для Telegram-магазинов, bio-страниц и лендингов.",
      "Telegram doʻkonlar, bio sahifalar va lendinglar uchun oʻzbek SaaS xizmati.",
    ),
    role: L("Co-developer", "Соразработчик", "Hammuallif dasturchi"),
    stack: [],
    links: { live: "https://hirara.uz", liveStatus: "live" },
    cover: img("/work/hirara/desktop-1.webp", 1440, 900, L("Hirara, desktop", "Hirara, десктоп", "Hirara, kompyuter versiyasi")),
    featured: 3,
    caseStudy: {
      brief: L(
        "Hirara is an Uzbek SaaS for building a Telegram shop, a bio page and landing pages. It is a two-person startup, built in collaboration.",
        "Hirara — узбекский SaaS для создания Telegram-магазина, bio-страницы и лендингов. Это стартап из двух человек, созданный в коллаборации.",
        "Hirara — Telegram doʻkon, bio sahifa va lendinglar yaratish uchun oʻzbek SaaS xizmati. Bu hamkorlikda yaratilgan ikki kishilik startap.",
      ),
      whatIDid: {
        en: [
          "Built the Ilgich store template.",
          "Added order notifications and limits.",
          "Bug fixes.",
        ],
        ru: [
          "Сделал шаблон магазина Ilgich.",
          "Добавил уведомления о заказах и лимиты.",
          "Исправлял баги.",
        ],
        uz: [
          "Ilgich doʻkon shablonini yaratdim.",
          "Buyurtma bildirishnomalari va limitlarni qoʻshdim.",
          "Xatolarni tuzatdim.",
        ],
      },
      result: L(
        "In progress. The product is being connected to hirara.uz.",
        "В работе: продукт подключается к домену hirara.uz.",
        "Jarayonda: mahsulot hirara.uz domeniga ulanmoqda.",
      ),
      web: {
        desktop: [1, 2, 3, 4, 5].map((n) =>
          img(
            `/work/hirara/desktop-${n}.webp`,
            1440,
            900,
            L(`Hirara, desktop view ${n}`, `Hirara, десктоп, экран ${n}`, `Hirara, kompyuter versiyasi, ${n}-ekran`),
          ),
        ),
        mobile: [1, 2, 3].map((n) =>
          img(
            `/work/hirara/mobile-${n}.webp`,
            390,
            844,
            L(`Hirara, mobile view ${n}`, `Hirara, мобильная версия, экран ${n}`, `Hirara, mobil versiya, ${n}-ekran`),
          ),
        ),
      },
    },
  },
  {
    slug: "fragrise",
    title: "FRAGRISE",
    client: "Fragrise",
    year: "2026",
    disciplines: ["web", "brand"],
    summary: L(
      "Brand identity and website design for a CS2 tournament platform in Uzbekistan.",
      "Фирменный стиль и дизайн сайта для платформы турниров по CS2 в Узбекистане.",
      "Oʻzbekistondagi CS2 turnirlari platformasi uchun brend uslubi va sayt dizayni.",
    ),
    role: L("Brand identity + website design", "Фирменный стиль + дизайн сайта", "Brend uslubi + sayt dizayni"),
    stack: [],
    links: { live: "https://fragrise.uz", liveStatus: "live" },
    cover: img("/work/fragrise/desktop-1.webp", 1440, 900, siteDesktop("FRAGRISE")),
    featured: 4,
    caseStudy: {
      brief: L(
        "FRAGRISE is a CS2 tournament platform in Uzbekistan. My part was the brand identity and the website design, not the development.",
        "FRAGRISE — платформа турниров по CS2 в Узбекистане. Моя часть — фирменный стиль и дизайн сайта, разработкой я не занимался.",
        "FRAGRISE — Oʻzbekistondagi CS2 turnirlari platformasi. Mening vazifam brend uslubi va sayt dizayni edi, dasturlash emas.",
      ),
      whatIDid: {
        en: [
          "Designed the brand identity: mark, wordmark lockup, palette and type pairing.",
          "Designed the website.",
          "Mocked up the brand on social, share-image and stream overlay formats.",
        ],
        ru: [
          "Разработал фирменный стиль: знак, комбинированный логотип со шрифтовой частью, палитру и шрифтовую пару.",
          "Сделал дизайн сайта.",
          "Показал бренд на мокапах: посты для соцсетей, изображения для репостов и оверлеи для стримов.",
        ],
        uz: [
          "Brend uslubini ishlab chiqdim: belgi, yozuvli kombinatsiyalangan logotip, palitra va shriftlar juftligi.",
          "Sayt dizaynini yaratdim.",
          "Brendni maketlarda koʻrsatdim: ijtimoiy tarmoq postlari, ulashish rasmlari va strim overleylari.",
        ],
      },
      result: L(
        "A complete brand kit and a live website at fragrise.uz.",
        "Полный фирменный стиль и работающий сайт fragrise.uz.",
        "Toʻliq brend uslubi va ishlayotgan fragrise.uz sayti.",
      ),
      web: {
        desktop: [img("/work/fragrise/desktop-1.webp", 1440, 900, siteDesktop("FRAGRISE"))],
        mobile: [img("/work/fragrise/mobile-1.webp", 390, 844, siteMobile("FRAGRISE"))],
      },
      brand: {
        logos: [
          img(
            "/work/fragrise/lockup-light.svg",
            1906,
            727,
            L("FRAGRISE lockup, light version", "Комбинированный логотип FRAGRISE, светлая версия", "FRAGRISE kombinatsiyalangan logotipi, och versiya"),
          ),
          img(
            "/work/fragrise/lockup-dark.svg",
            1906,
            727,
            L("FRAGRISE lockup, dark version", "Комбинированный логотип FRAGRISE, тёмная версия", "FRAGRISE kombinatsiyalangan logotipi, toʻq versiya"),
          ),
          img("/work/fragrise/mark.svg", 442, 474, L("FRAGRISE mark, cream", "Знак FRAGRISE, кремовый", "FRAGRISE belgisi, krem rang")),
          img("/work/fragrise/mark-black.svg", 442, 474, L("FRAGRISE mark, black", "Знак FRAGRISE, чёрный", "FRAGRISE belgisi, qora")),
        ],
        palette: [
          { name: "Black", hex: "#080808" },
          { name: "Cream", hex: "#F5F4F0" },
          { name: "Signal Red", hex: "#EE343E" },
          { name: "Surface", hex: "#151517" },
          { name: "Muted", hex: "#A4A4AB" },
        ],
        type: [
          {
            name: "Arial Bold",
            role: L(
              "Wordmark / display (as on the live site)",
              "Логотип / заголовки (как на сайте)",
              "Yozuvli logotip / sarlavhalar (saytdagidek)",
            ),
          },
          { name: "Barlow", role: BODY },
          { name: "Chakra Petch", role: L("Numerals / scores", "Цифры / счёт", "Raqamlar / hisob") },
        ],
        applications: [
          img("/work/fragrise/app-social.webp", 1080, 1350, L("FRAGRISE social post mockup", "Мокап поста FRAGRISE для соцсетей", "FRAGRISE ijtimoiy tarmoq posti maketi")),
          img("/work/fragrise/app-og.webp", 1200, 630, L("FRAGRISE share image", "Изображение FRAGRISE для репостов", "FRAGRISE ulashish rasmi")),
          img("/work/fragrise/app-stream.webp", 1920, 1080, L("FRAGRISE stream overlay mockup", "Мокап оверлея FRAGRISE для стримов", "FRAGRISE strim overleyi maketi")),
        ],
        monoSrc: "/work/fragrise/mark-mono.svg",
      },
    },
  },
  {
    slug: "8iz",
    title: "8iz",
    client: "8iz",
    context: STARTUP_CONTEXT,
    year: "2026",
    disciplines: ["web"],
    summary: L(
      "Redesign of an Uzbek apparel brand's store.",
      "Редизайн магазина узбекского бренда одежды.",
      "Oʻzbek kiyim brendi doʻkonining redizayni.",
    ),
    role: L("Co-founder · design and front-end", "Сооснователь · дизайн и фронтенд", "Hammuassis · dizayn va frontend"),
    stack: [],
    // No link to 8iz.uz until the redesign is confirmed as deployed.
    links: { liveStatus: "soon" },
    cover: img("/work/8iz/desktop-1.webp", 1440, 900, L("8iz redesign, desktop", "Редизайн 8iz, десктоп", "8iz redizayni, kompyuter versiyasi")),
    featured: 5,
    caseStudy: {
      brief: L(
        "8iz is an Uzbek apparel brand and store. The redesign is a two-person startup effort, built in collaboration.",
        "8iz — узбекский бренд одежды и магазин. Редизайн — работа стартапа из двух человек, созданная в коллаборации.",
        "8iz — oʻzbek kiyim brendi va doʻkoni. Redizayn ikki kishilik startap tomonidan hamkorlikda yaratilgan.",
      ),
      whatIDid: {
        en: [
          "Designed the new 8iz.uz look (steel gear-unit style).",
          "Built the redesign together with my co-founder.",
          "Features: outfit builder, print studio, 15-model catalog.",
        ],
        ru: [
          "Разработал новый облик 8iz.uz (в стилистике стального редуктора).",
          "Сделал редизайн вместе с сооснователем.",
          "Функции: конструктор образов, студия принтов, каталог из 15 моделей.",
        ],
        uz: [
          "8iz.uz uchun yangi koʻrinishni ishlab chiqdim (poʻlat reduktor uslubida).",
          "Redizaynni hammuassisim bilan birga yaratdim.",
          "Imkoniyatlar: obraz konstruktori, print studiyasi, 15 ta modeldan iborat katalog.",
        ],
      },
      result: L("Launching soon.", "Скоро запуск.", "Tez orada ishga tushadi."),
      web: {
        desktop: [
          img("/work/8iz/desktop-1.webp", 1440, 900, L("8iz redesign, home", "Редизайн 8iz, главная страница", "8iz redizayni, bosh sahifa")),
          img("/work/8iz/desktop-2.webp", 1440, 900, L("8iz redesign, desktop view 2", "Редизайн 8iz, десктоп, экран 2", "8iz redizayni, kompyuter versiyasi, 2-ekran")),
          img("/work/8iz/desktop-3.webp", 1440, 900, L("8iz redesign, desktop view 3", "Редизайн 8iz, десктоп, экран 3", "8iz redizayni, kompyuter versiyasi, 3-ekran")),
        ],
        mobile: [
          img("/work/8iz/mobile-1.webp", 390, 844, L("8iz redesign, mobile", "Редизайн 8iz, мобильная версия", "8iz redizayni, mobil versiya")),
          img("/work/8iz/mobile-2.webp", 390, 844, L("8iz redesign, mobile view 2", "Редизайн 8iz, мобильная версия, экран 2", "8iz redizayni, mobil versiya, 2-ekran")),
        ],
      },
    },
  },
  {
    slug: "good-idea-cargo-ads",
    title: "Good Idea Cargo: Owner-Operator Recruiting",
    localTitle: L(
      "Good Idea Cargo: Owner-Operator Recruiting",
      "Good Idea Cargo: найм водителей со своим тягачом",
      "Good Idea Cargo: oʻz yuk mashinasiga ega haydovchilarni yollash",
    ),
    client: "Good Idea Cargo",
    context: MADE_AT_GFS,
    year: "2026",
    disciplines: ["ads", "brand"],
    summary: L(
      "Facebook and Instagram lead-form campaign recruiting owner-operators in the US.",
      "Кампания с лид-формами в Facebook и Instagram по найму водителей со своим тягачом в США.",
      "AQShda oʻz yuk mashinasiga ega haydovchilarni yollash uchun Facebook va Instagram lid-forma kampaniyasi.",
    ),
    role: L("Ad creatives + campaign setup", "Рекламные креативы + настройка кампании", "Reklama kreativlari + kampaniyani sozlash"),
    stack: ["Meta Ads Manager", "Higgsfield", "Seedance"],
    links: { liveStatus: "none" },
    cover: img("/work/good-idea-cargo-ads/ad-a1-9x16.jpg", 720, 1280, GIC_A1_9x16),
    featured: 6,
    caseStudy: {
      brief: L(
        "Recruit owner-operator drivers for Good Idea Cargo with a Facebook and Instagram lead-form campaign in the US, run in the Employment ad category (November 2026).",
        "Найти для Good Idea Cargo водителей со своим тягачом через кампанию с лид-формами в Facebook и Instagram в США, в рекламной категории «Трудоустройство» (ноябрь 2026).",
        "Good Idea Cargo uchun AQShda Facebook va Instagram lid-forma kampaniyasi orqali oʻz yuk mashinasiga ega haydovchilarni yollash. Kampaniya «Employment» (ishga yollash) reklama toifasida yuritildi (2026-yil, noyabr).",
      ),
      whatIDid: {
        en: [
          "Set up the lead-form campaign in Meta Ads Manager.",
          "Designed creative A1, \"Keep up to 88% of your gross\", in 9:16 and 4:5.",
          "Made creative A2: a Seedance clip with an end card.",
          "Made creative O1: a carousel.",
          "Set up a call-log pipeline for the leads.",
        ],
        ru: [
          "Настроил кампанию с лид-формами в Meta Ads Manager.",
          "Разработал креатив A1 «Keep up to 88% of your gross» в форматах 9:16 и 4:5.",
          "Сделал креатив A2: ролик Seedance с финальной заставкой.",
          "Сделал креатив O1: карусель.",
          "Настроил журнал звонков для обработки лидов.",
        ],
        uz: [
          "Meta Ads Manager’da lid-forma kampaniyasini sozladim.",
          "«Keep up to 88% of your gross» A1 kreativini 9:16 va 4:5 formatlarida ishlab chiqdim.",
          "A2 kreativini tayyorladim: yakuniy kadrli Seedance klipi.",
          "O1 kreativini tayyorladim: karusel.",
          "Lidlar uchun qoʻngʻiroqlar jurnalini yuritish tizimini sozladim.",
        ],
      },
      result: L(
        "Campaign launched with three video creatives; the opening hook held 39.9% of viewers.",
        "Кампания запущена с тремя видеокреативами; первые секунды удержали 39,9% зрителей.",
        "Kampaniya uchta video kreativ bilan ishga tushirildi; videoning ilk soniyalari tomoshabinlarning 39,9 foizini ushlab qoldi.",
      ),
      brand: {
        logos: [
          img("/work/good-idea-cargo-ads/logo.svg", 800, 800, L("Good Idea Cargo logo", "Логотип Good Idea Cargo", "Good Idea Cargo logotipi")),
          img(
            "/work/good-idea-cargo-ads/logo-square.png",
            1080,
            1080,
            L("Good Idea Cargo logo, square", "Логотип Good Idea Cargo, квадратный", "Good Idea Cargo logotipi, kvadrat"),
          ),
        ],
        palette: [
          { name: "Navy", hex: "#032553" },
          { name: "Gold", hex: "#CC8E02" },
          { name: "White", hex: "#FFFFFF" },
        ],
        type: [],
        applications: [
          img("/work/good-idea-cargo-ads/ad-a1-9x16.jpg", 720, 1280, GIC_A1_9x16),
          img(
            "/work/good-idea-cargo-ads/ad-a2-9x16.jpg",
            720,
            1280,
            L("Good Idea Cargo ad A2, 9:16", "Реклама Good Idea Cargo, A2, 9:16", "Good Idea Cargo reklamasi, A2, 9:16"),
          ),
          img(
            "/work/good-idea-cargo-ads/o1-slide1.webp",
            1080,
            1350,
            L("Good Idea Cargo carousel, slide 1", "Карусель Good Idea Cargo, слайд 1", "Good Idea Cargo karuseli, 1-slayd"),
          ),
        ],
        monoSrc: "/work/good-idea-cargo-ads/mark-mono.svg",
      },
      ads: {
        objective: L(
          "Owner-operator recruiting through Facebook and Instagram lead forms, US.",
          "Найм водителей со своим тягачом через лид-формы Facebook и Instagram, США.",
          "Facebook va Instagram lid-formalari orqali oʻz yuk mashinasiga ega haydovchilarni yollash, AQSh.",
        ),
        creatives: [
          video(
            "/work/good-idea-cargo-ads/ad-a1-9x16.mp4",
            "/work/good-idea-cargo-ads/ad-a1-9x16.jpg",
            720,
            1280,
            L(
              "Creative A1, 9:16: Keep up to 88% of your gross",
              "Креатив A1, 9:16: «Keep up to 88% of your gross»",
              "A1 kreativi, 9:16: «Keep up to 88% of your gross»",
            ),
          ),
          video(
            "/work/good-idea-cargo-ads/ad-a1-4x5.mp4",
            "/work/good-idea-cargo-ads/ad-a1-4x5.jpg",
            720,
            900,
            L(
              "Creative A1, 4:5: Keep up to 88% of your gross",
              "Креатив A1, 4:5: «Keep up to 88% of your gross»",
              "A1 kreativi, 4:5: «Keep up to 88% of your gross»",
            ),
          ),
          video(
            "/work/good-idea-cargo-ads/ad-a2-9x16.mp4",
            "/work/good-idea-cargo-ads/ad-a2-9x16.jpg",
            720,
            1280,
            L(
              "Creative A2, 9:16: Seedance clip with end card",
              "Креатив A2, 9:16: ролик Seedance с финальной заставкой",
              "A2 kreativi, 9:16: yakuniy kadrli Seedance klipi",
            ),
          ),
          ...[1, 4, 5].map((n) =>
            img(
              `/work/good-idea-cargo-ads/o1-slide${n}.webp`,
              1080,
              1350,
              L(`Creative O1, carousel slide ${n}`, `Креатив O1, слайд карусели ${n}`, `O1 kreativi, karusel, ${n}-slayd`),
            ),
          ),
        ],
        tools: ["Meta Ads Manager", "Higgsfield", "Seedance"],
        facts: {
          en: [
            "Facebook and Instagram lead-form campaign",
            "Audience: US, Employment ad category",
            "Hook rate: 39.9%",
          ],
          ru: [
            "Кампания с лид-формами в Facebook и Instagram",
            "Аудитория: США, категория «Трудоустройство»",
            "Удержание на старте (hook rate): 39,9%",
          ],
          uz: [
            "Facebook va Instagram lid-forma kampaniyasi",
            "Auditoriya: AQSh, «Employment» reklama toifasi",
            "Hook rate: 39,9%",
          ],
        },
      },
    },
  },
  {
    slug: "convertboost-ai",
    title: "ConvertBoost AI",
    client: "Own product",
    year: "2026",
    disciplines: ["web"],
    summary: L("AI landing-page audit SaaS.", "SaaS для ИИ-аудита лендингов.", "Lendinglarni AI yordamida audit qiluvchi SaaS."),
    role: L("Own product: design and development", "Собственный продукт: дизайн и разработка", "Shaxsiy mahsulot: dizayn va dasturlash"),
    stack: [],
    links: { live: "https://convertboost-ai.vercel.app", liveStatus: "live" },
    cover: img("/work/convertboost-ai/desktop-1.webp", 1440, 900, siteDesktop("ConvertBoost AI")),
  },
  {
    slug: "workers",
    title: "Workers",
    client: "Workers",
    year: "2026",
    disciplines: ["web"],
    summary: L(
      "Website for wrkrs.uz, a rap collective from Tashkent.",
      "Сайт wrkrs.uz для рэп-объединения из Ташкента.",
      "Toshkentlik rep jamoasi uchun wrkrs.uz sayti.",
    ),
    role: L("Website", "Сайт", "Sayt"),
    stack: ["Next.js"],
    links: { live: "https://wrkrs.uz", liveStatus: "live" },
    cover: img("/work/workers/desktop-1.webp", 1440, 900, siteDesktop("Workers")),
  },
  {
    slug: "motionforge",
    title: "MotionForge",
    client: "Own experiment",
    year: "2026",
    disciplines: ["web"],
    summary: L("Studio website concept.", "Концепт сайта студии.", "Studiya sayti konsepti."),
    role: L(
      "Own experiment: design and development",
      "Собственный эксперимент: дизайн и разработка",
      "Shaxsiy tajriba: dizayn va dasturlash",
    ),
    stack: ["React", "TypeScript", "Vite"],
    links: {
      live: "https://motionforge-dun.vercel.app",
      liveStatus: "live",
      github: "https://github.com/azizbektursunovme/MotionForge",
    },
    cover: img("/work/motionforge/desktop-1.webp", 1440, 900, siteDesktop("MotionForge")),
  },
  {
    slug: "silk-road",
    title: "Silk Road Uzbekistan",
    client: "Own project",
    year: "2026",
    disciplines: ["web"],
    summary: L(
      "Travel guide to Uzbekistan's Silk Road cities, in English, Russian and Uzbek.",
      "Путеводитель по городам Шёлкового пути в Узбекистане на английском, русском и узбекском.",
      "Oʻzbekistondagi Buyuk Ipak yoʻli shaharlari boʻyicha sayohat qoʻllanmasi: ingliz, rus va oʻzbek tillarida.",
    ),
    role: L("Own project: design and development", "Собственный проект: дизайн и разработка", "Shaxsiy loyiha: dizayn va dasturlash"),
    stack: ["React 18", "Vite", "Tailwind CSS", "Framer Motion", "React Router"],
    // Not deployed (scope decision); the user can deploy it later.
    links: { liveStatus: "none", github: "https://github.com/azizbektursunovme/silk-road-uzbekistan" },
    cover: img("/work/silk-road/desktop-1.webp", 1440, 900, siteDesktop("Silk Road Uzbekistan")),
  },
  {
    slug: "cleanpro",
    title: "CleanPro",
    client: "CleanPro",
    year: "2026",
    disciplines: ["brand"],
    summary: L(
      "Logo, color system and business cards for a cleaning service.",
      "Логотип, цветовая система и визитки для клининговой компании.",
      "Tozalash xizmati uchun logotip, ranglar tizimi va vizitkalar.",
    ),
    role: L("Brand identity", "Фирменный стиль", "Brend uslubi"),
    stack: [],
    links: { liveStatus: "none" },
    cover: img(
      "/work/cleanpro/business-card/front.png",
      480,
      280,
      L("CleanPro business card, front", "Визитка CleanPro, лицевая сторона", "CleanPro vizitkasi, old tomoni"),
    ),
    caseStudy: {
      brief: L(
        "Logo, colour system and business cards.",
        "Логотип, цветовая система и визитки.",
        "Logotip, ranglar tizimi va vizitkalar.",
      ),
      whatIDid: {
        en: [
          "Logo, colour system and business cards.",
        ],
        ru: ["Логотип, цветовая система и визитки."],
        uz: ["Logotip, ranglar tizimi va vizitkalar."],
      },
      result: L(
        "A concise identity package: logo, colors and business cards.",
        "Компактный пакет фирменного стиля: логотип, цвета и визитки.",
        "Ixcham brend paketi: logotip, ranglar va vizitkalar.",
      ),
      brand: {
        logos: [
          img("/work/cleanpro/CleanPro-logo.svg", 1000, 1000, L("CleanPro logo", "Логотип CleanPro", "CleanPro logotipi")),
          img("/work/cleanpro/logo-colors.svg", 400, 200, L("CleanPro logo colors", "Цвета логотипа CleanPro", "CleanPro logotipi ranglari")),
        ],
        palette: [
          { name: "Teal", hex: "#1DC9A5" },
          { name: "Graphite", hex: "#313131" },
          { name: "Grey", hex: "#828282" },
          { name: "White", hex: "#FFFFFF" },
        ],
        type: [],
        applications: [
          img(
            "/work/cleanpro/business-card/front.png",
            480,
            280,
            L("CleanPro business card, front", "Визитка CleanPro, лицевая сторона", "CleanPro vizitkasi, old tomoni"),
          ),
          img(
            "/work/cleanpro/business-card/back.png",
            480,
            280,
            L("CleanPro business card, back", "Визитка CleanPro, оборотная сторона", "CleanPro vizitkasi, orqa tomoni"),
          ),
        ],
      },
    },
  },
  {
    slug: "gfs-ads",
    title: "GFS Group: ad video and motion",
    localTitle: L(
      "GFS Group: ad video and motion",
      "GFS Group: рекламное видео и моушн",
      "GFS Group: reklama videosi va motion dizayn",
    ),
    client: "GFS Group LLC",
    context: MADE_AT_GFS,
    year: "2026",
    disciplines: ["ads"],
    summary: L(
      "Owner-operator recruiting ad (9:16).",
      "Реклама для найма водителей со своим тягачом (9:16).",
      "Oʻz yuk mashinasiga ega haydovchilarni yollash reklamasi (9:16).",
    ),
    role: L("Ad video", "Рекламное видео", "Reklama videosi"),
    stack: [],
    links: { liveStatus: "none" },
    cover: img(
      "/work/gfs-ads/ad-gfs-9x16.jpg",
      720,
      1280,
      L(
        "GFS owner-operator ad video, poster frame",
        "Рекламное видео GFS для водителей со своим тягачом, кадр-обложка",
        "GFS reklama videosi (oʻz yuk mashinasiga ega haydovchilar uchun), muqova kadri",
      ),
    ),
  },
];

/** GFS Group redesign concepts. Not deployed on real domains: links only, no case page, no tile. */
export const redesignLinks: { name: string; url: string }[] = [
  { name: "GFS Group v1", url: "https://azizbektursunovme.github.io/gfs-group-redesign/" },
  { name: "GFS Group v2", url: "https://azizbektursunovme.github.io/gfs-group-redesign-v2/" },
  { name: "GFS Express", url: "https://azizbektursunovme.github.io/gfs-xpress-redesign/" },
  { name: "Good Idea Cargo", url: "https://azizbektursunovme.github.io/goodideacargo-redesign/" },
  { name: "Lion King", url: "https://azizbektursunovme.github.io/lionking-redesign/" },
  { name: "T-Logistics", url: "https://azizbektursunovme.github.io/t-logistics-redesign/" },
];

const a = (
  name: string,
  thumb: [number, number],
  full: [number, number],
  alt: Localized,
  label: Localized,
  year: string,
): ArchiveItem => ({
  src: `/images-portfolio/${name}-thumb.webp`,
  width: thumb[0],
  height: thumb[1],
  full: { src: `/images-portfolio/${name}-full.webp`, width: full[0], height: full[1] },
  alt,
  label,
  year,
});

/* Archive labels: the old project titles. */
const IQTIDOR_ACADEMY = L("Iqtidor Academy", "Iqtidor Academy", "Iqtidor Academy");
const SCHOOL_BANNER = L("Iqtidor School Banner", "Баннер Iqtidor School", "Iqtidor School banneri");
const IJARACHI = L("Ijarachi Banners", "Баннеры Ijarachi", "Ijarachi bannerlari");
const SOCIAL = L("Social Media Design", "Дизайн для соцсетей", "Ijtimoiy tarmoqlar uchun dizayn");
const KOFEMATOR = L("Kofemator", "Kofemator", "Kofemator");
const FLYER = L("Organic Product Flyer", "Флаер органического продукта", "Organik mahsulot flayeri");
const PERSONAL = L("Personal Projects", "Личные проекты", "Shaxsiy loyihalar");

/** Earlier work: images only, labelled with the old project titles. */
export const archive: ArchiveItem[] = [
  a("academy", [640,640], [1080,1080], L("Iqtidor Academy grant announcement social post", "Пост Iqtidor Academy с объявлением о гранте", "Iqtidor Academy grant e’loni posti"), IQTIDOR_ACADEMY, "2025"),
  a("consulting-post", [640,798], [1083,1350], L("Education consulting social media post", "Пост для соцсетей об образовательном консалтинге", "Ta’lim konsaltingi haqida ijtimoiy tarmoq posti"), IQTIDOR_ACADEMY, "2025"),
  a("banner-school", [550,500], [550,500], L("Iqtidor School Russian course admission banner", "Баннер набора на курс русского языка Iqtidor School", "Iqtidor School rus tili kursiga qabul banneri"), SCHOOL_BANNER, "2025"),
  a("banner-school2", [600,300], [600,300], L("Iqtidor School green advertising banner variation", "Зелёный вариант рекламного баннера Iqtidor School", "Iqtidor School reklama bannerining yashil varianti"), SCHOOL_BANNER, "2025"),
  a("ijarachi-banner1", [640,213], [1600,533], L("Ijarachi real estate service horizontal banner", "Горизонтальный баннер сервиса недвижимости Ijarachi", "Ijarachi koʻchmas mulk xizmatining gorizontal banneri"), IJARACHI, "2025"),
  a("ijarachi-banner2", [640,213], [1600,533], L("Ijarachi horizontal advertising banner variation", "Вариант горизонтального рекламного баннера Ijarachi", "Ijarachi gorizontal reklama bannerining varianti"), IJARACHI, "2025"),
  a("creative-post", [640,800], [1080,1350], L("Creative design service social post", "Пост для соцсетей о сервисе креативного дизайна", "Kreativ dizayn xizmati haqida ijtimoiy tarmoq posti"), SOCIAL, "2025"),
  a("dr-azamat-post", [640,800], [1080,1350], L("Dr Azamat social media post", "Пост для соцсетей Dr Azamat", "Dr Azamat uchun ijtimoiy tarmoq posti"), SOCIAL, "2025"),
  a("insta-post", [640,904], [680,960], L("Vertical Instagram post design", "Дизайн вертикального поста для Instagram", "Vertikal Instagram posti dizayni"), SOCIAL, "2025"),
  a("masterclass-post", [640,800], [1080,1350], L("Masterclass announcement social media post", "Пост-анонс мастер-класса для соцсетей", "Master-klass e’loni uchun ijtimoiy tarmoq posti"), SOCIAL, "2025"),
  a("sushi-post", [640,800], [864,1080], L("Sushi social media post design", "Дизайн поста о суши для соцсетей", "Sushi haqida ijtimoiy tarmoq posti dizayni"), SOCIAL, "2025"),
  a("product-design", [600,780], [600,780], L("Kofemator Russell Hobbs coffee machine product ad", "Реклама кофемашины Russell Hobbs для Kofemator", "Kofemator uchun Russell Hobbs qahva mashinasi reklamasi"), KOFEMATOR, "2026"),
  a("flyer", [640,1415], [1573,3477], L("Organic product tall poster layout", "Вытянутый постер органического продукта", "Organik mahsulot uchun uzun poster maketi"), FLYER, "2025"),
  a("personal-blog", [640,1138], [1080,1920], L("Vertical personal blog creative post", "Вертикальный креативный пост для личного блога", "Shaxsiy blog uchun vertikal kreativ post"), PERSONAL, "2024"),
  a("flyer-front", [640,1415], [1573,3477], L("Organic product flyer front", "Флаер органического продукта, лицевая сторона", "Organik mahsulot flayeri, old tomoni"), PERSONAL, "2024"),
  a("flyer-back", [640,1415], [1573,3477], L("Organic product flyer back", "Флаер органического продукта, оборотная сторона", "Organik mahsulot flayeri, orqa tomoni"), PERSONAL, "2024"),
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function byDiscipline(d: Discipline): Project[] {
  return projects.filter((p) => p.disciplines.includes(d));
}

export function featuredProjects(): Project[] {
  return projects
    .filter((p) => p.featured !== undefined)
    .sort((x, y) => (x.featured as number) - (y.featured as number));
}
