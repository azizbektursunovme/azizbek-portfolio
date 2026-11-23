# RU / UZ translations — review

Every translated string on the site, generated from the data files (`data/*.ts`). Columns: EN | RU | UZ. Edit the `ru` / `uz` values in the file named under each heading; the `key` column is the path inside that file.

Conventions used:

- Uzbek in Latin script. `oʻ` / `gʻ` use ʻ (U+02BB); the tutuq belgisi and suffixes on foreign names use ’ (U+2019): `ta’lim`, `e’lon`, `GFS Group’da`. The test `tests/translations.test.ts` checks this.
- Kept in English: names of people, companies, brands and products (GFS Group LLC, JJR Transportation, DAVR GROUP, Hirara, 8iz, FRAGRISE, CleanPro, Good Idea Cargo, ConvertBoost AI…), tech and tool names, the ad copy itself («Keep up to 88% of your gross»), brand-kit colour names, the email and URLs.
- Russian: «» quotes, ё where it belongs, decimal comma (39,9%).
- Truth rules hold in every language: Hirara / 8iz are «в коллаборации / совместно» and «hamkorlikda»; JJR / DAVR are «Выполнено в GFS Group» / «GFS Group’da bajarilgan»; no lead counts or CPL.
- The CV (/cv) stays English.

## Terms to check first

These are the choices I was least sure of; everything else should read naturally, but these deserve a native eye:

| Term | RU | UZ | Note |
|---|---|---|---|
| owner-operator (driver who owns the truck) | водитель со своим тягачом | oʻz yuk mashinasiga ega haydovchi | Long in both. Alternatives: RU «овнер-оператор», UZ «oʻz tyagachi bilan ishlaydigan haydovchi» or keeping «owner-operator». |
| brand identity / brand kit | фирменный стиль | brend uslubi | UZ alternatives: «brend identifikatsiyasi», «korporativ uslub», «brendbuk». |
| hook rate | удержание на старте (hook rate) | Hook rate (ilk soniyalarda ushlab qolish) | UZ keeps the English term with a short gloss on first use. |
| Employment ad category (Meta) | категория «Трудоустройство» | «Employment» (ishga yollash) toifasi | RU matches Meta's Russian UI; Meta has no Uzbek UI. |
| steel gear-unit style (8iz) | в стилистике стального редуктора | poʻlat reduktor uslubida | Literal; rephrase if the real visual idea is different. |
| Growth & AI (tool group) | Реклама и ИИ | Reklama va AI | Not literal: the group holds ads and AI-video tools. |
| Co-developer (Hirara) | Соразработчик | Hammuallif dasturchi | |
| Download CV (header bar) | Резюме | Rezyume | Shortened to fit the bar; elsewhere «Скачать резюме» / «Rezyumeni yuklab olish». |
| Present (in year ranges) | наст. время | hozirgacha | |
| AI | ИИ | AI | UZ kept «AI»; «sunʼiy intellekt (SI)» is the formal option. |

## Navigation and site shell

File: `data/nav.ts`

| key | EN | RU | UZ |
|---|---|---|---|
| `navItems[0].websites` | Websites | Сайты | Saytlar |
| `navItems[1].branding` | Branding | Брендинг | Brending |
| `navItems[2].ads` | Ads & Content | Реклама и контент | Reklama va kontent |
| `navItems[3].about` | About | Обо мне | Men haqimda |
| `navItems[4].contact` | Contact | Контакты | Aloqa |
| `shellCopy.downloadCv` | Download CV | Скачать резюме | Rezyumeni yuklab olish |
| `shellCopy.downloadCvShort` | Download CV | Резюме | Rezyume |
| `shellCopy.openMenu` | Open menu | Открыть меню | Menyuni ochish |
| `shellCopy.closeMenu` | Close menu | Закрыть меню | Menyuni yopish |
| `shellCopy.menu` | Menu | Меню | Menyu |
| `shellCopy.close` | Close | Закрыть | Yopish |
| `shellCopy.skipToContent` | Skip to content | Перейти к содержанию | Asosiy qismga oʻtish |
| `shellCopy.backToTop` | Back to top | Наверх | Yuqoriga |
| `shellCopy.elsewhere` | Elsewhere | Соцсети | Ijtimoiy tarmoqlar |
| `shellCopy.sections` | On this page | На этой странице | Ushbu sahifada |
| `shellCopy.email` | Email | Эл. почта | Elektron pochta |
| `shellCopy.newTab` | (opens in a new tab) | (откроется в новой вкладке) | (yangi oynada ochiladi) |
| `shellCopy.mainNav` | Main | Основное меню | Asosiy menyu |
| `shellCopy.languageNav` | Language | Язык | Til |

## Hero

File: `data/hero.ts`

| key | EN | RU | UZ |
|---|---|---|---|
| `heroCopy.seeWork` | See work | Смотреть работы | Ishlarni koʻrish |
| `heroCopy.marksLabel` | Brands I've built for | Бренды, с которыми я работал | Men ishlagan brendlar |

## Profile (title, tagline, status, bio)

File: `data/profile.ts`

| key | EN | RU | UZ |
|---|---|---|---|
| `profile.jobTitle` | Frontend Developer & Brand Designer | Frontend-разработчик и бренд-дизайнер | Frontend dasturchi va brend dizayner |
| `profile.tagline` | Websites, brand identities, and the ads that sell them. | Сайты, фирменный стиль и реклама, которая их продаёт. | Saytlar, brend uslubi va ularni sotadigan reklama. |
| `profile.status` | IT department @ GFS Group LLC · Tashkent | IT-отдел @ GFS Group LLC · Ташкент | IT boʻlimi @ GFS Group LLC · Toshkent |
| `profile.openTo` | Open to freelance | Открыт для фриланса | Frilansga ochiqman |
| `profile.bio[0]` | I build client websites from zero and design the brand identities that go with them. At GFS Group LLC, a US logistics company, I work in the IT department: websites and brand kits for JJR Transportation and DAVR GROUP, redesign concepts for group companies, and ad creatives for Meta lead campaigns. | Я делаю сайты для клиентов с нуля и разрабатываю для них фирменный стиль. В GFS Group LLC, американской логистической компании, я работаю в IT-отделе: сайты и фирменный стиль для JJR Transportation и DAVR GROUP, концепции редизайна для компаний группы и рекламные креативы для лид-кампаний в Meta. | Mijozlar uchun saytlarni noldan yarataman va ularga mos brend uslubini ishlab chiqaman. AQShdagi GFS Group LLC logistika kompaniyasining IT boʻlimida ishlayman: JJR Transportation va DAVR GROUP uchun saytlar va brend uslubi, guruh kompaniyalari uchun redizayn konsepsiyalari hamda Meta lid kampaniyalari uchun reklama kreativlari. |
| `profile.bio[1]` | Outside GFS I take freelance and startup work: brand and site design for Fragrise, a brand for CleanPro, my own product ConvertBoost AI, and two startups, Hirara and 8iz, built in collaboration. | Помимо GFS, я беру фриланс-проекты и работаю со стартапами: бренд и дизайн сайта для Fragrise, бренд для CleanPro, мой собственный продукт ConvertBoost AI и два стартапа, созданные в коллаборации, — Hirara и 8iz. | Asosiy ishimdan tashqari frilans va startap loyihalari bilan shugʻullanaman: Fragrise uchun brend va sayt dizayni, CleanPro uchun brend, oʻzimning ConvertBoost AI mahsulotim hamda hamkorlikda yaratilgan ikki startap — Hirara va 8iz. |

## Selected work, Websites, Branding, Ads, case pages, 404

File: `data/sections.ts`

| key | EN | RU | UZ |
|---|---|---|---|
| `adsCopy.eyebrow` | Ads & Content | Реклама и контент | Reklama va kontent |
| `adsCopy.title` | Ads that recruit, and the tools behind them. | Реклама, которая нанимает, — и инструменты, которыми я её делаю. | Ishga yollash reklamalari va ularni yaratish vositalari. |
| `adsCopy.intro` | Meta ads, Instagram creatives and AI video, made for GFS Group. Videos play while they are on screen. | Реклама в Meta, креативы для Instagram и ИИ-видео, сделанные для GFS Group. Видео воспроизводится, пока оно на экране. | GFS Group uchun tayyorlangan Meta reklamalari, Instagram kreativlari va AI videolar. Videolar ekranda koʻrinib turganda ijro etiladi. |
| `adsCopy.madeAt` | Made at GFS Group | Сделано в GFS Group | GFS Group’da tayyorlangan |
| `adsCopy.creatives` | Creatives | Креативы | Kreativlar |
| `adsCopy.carousel` | Carousel O1 | Карусель O1 | Karusel O1 |
| `adsCopy.slides` | {n} slides | слайдов: {n} | {n} ta slayd |
| `adsCopy.gfsTitle` | GFS Group: owner-operator recruiting ad | GFS Group: реклама для найма водителей со своим тягачом | GFS Group: oʻz yuk mashinasiga ega haydovchilarni yollash reklamasi |
| `adsCopy.gfsNote` | A 9:16 ad video for the GFS Group owner-operator recruiting push. | Рекламное видео 9:16 для кампании GFS Group по найму водителей со своим тягачом. | GFS Group’ning oʻz yuk mashinasiga ega haydovchilarni yollash kampaniyasi uchun 9:16 formatdagi reklama videosi. |
| `adsCopy.workflowTitle` | AI workflow | Работа с ИИ | AI bilan ish jarayoni |
| `adsCopy.workflowNote` | The tools I use to go from a brief to a finished ad. | Инструменты, с которыми я прохожу путь от брифа до готовой рекламы. | Brifdan tayyor reklamagacha boʻlgan jarayonda foydalanadigan vositalarim. |
| `adsCopy.archiveTitle` | Earlier work | Ранние работы | Avvalgi ishlar |
| `adsCopy.archiveNote` | Graphic design from before the ads: social posts, banners and flyers. | Графический дизайн до рекламных проектов: посты для соцсетей, баннеры и флаеры. | Reklamadan oldingi grafik dizayn ishlari: ijtimoiy tarmoq postlari, bannerlar va flayerlar. |
| `adsCopy.play` | Play video | Воспроизвести видео | Videoni ijro etish |
| `adsCopy.pause` | Pause video | Пауза | Pauza |
| `adsCopy.close` | Close | Закрыть | Yopish |
| `adsCopy.openImage` | View larger | Увеличить | Kattalashtirish |
| `brandingCopy.eyebrow` | Branding | Брендинг | Brending |
| `brandingCopy.title` | Brand identities, from logo to livery. | Фирменный стиль: от логотипа до брендирования фур. | Brend uslubi: logotipdan tirkamalarni brendlashgacha. |
| `brandingCopy.intro` | Logos, colour, type and the places they live. Open a brand for the full kit. | Логотипы, цвета, шрифты и их применение. Откройте бренд, чтобы увидеть весь фирменный стиль. | Logotiplar, ranglar, shriftlar va ularning qoʻllanilishi. Toʻliq toʻplamni koʻrish uchun brendni oching. |
| `caseCopy.caseStudy` | Case study | Кейс | Keys |
| `caseCopy.allWork` | All work | Все работы | Barcha ishlar |
| `caseCopy.client` | Client | Клиент | Mijoz |
| `caseCopy.context` | Context | Контекст | Kontekst |
| `caseCopy.year` | Year | Год | Yil |
| `caseCopy.role` | Role | Роль | Rol |
| `caseCopy.stack` | Stack | Стек | Stek |
| `caseCopy.links` | Links | Ссылки | Havolalar |
| `caseCopy.visitSite` | Visit site | Открыть сайт | Saytga oʻtish |
| `caseCopy.launchingSoon` | Launching soon | Скоро запуск | Tez orada ishga tushadi |
| `caseCopy.github` | GitHub | GitHub | GitHub |
| `caseCopy.guide` | Brand guide (PDF) | Брендбук (PDF) | Brendbuk (PDF) |
| `caseCopy.downloadGuide` | Download the brand guide (PDF) | Скачать брендбук (PDF) | Brendbukni yuklab olish (PDF) |
| `caseCopy.guideNote` | The full brand guide, as a PDF. | Полный брендбук в PDF. | Toʻliq brendbuk, PDF formatida. |
| `caseCopy.brief` | Brief | Задача | Vazifa |
| `caseCopy.whatIDid` | What I did | Что я сделал | Nima qildim |
| `caseCopy.decisions` | Key decisions | Ключевые решения | Asosiy qarorlar |
| `caseCopy.result` | Result | Результат | Natija |
| `caseCopy.webBlock` | Website | Сайт | Sayt |
| `caseCopy.webTitle` | Desktop and mobile | Десктоп и мобильная версия | Kompyuter va mobil versiya |
| `caseCopy.mobile` | Mobile | Мобильная версия | Mobil versiya |
| `caseCopy.brandBlock` | Brand kit | Фирменный стиль | Brend uslubi |
| `caseCopy.brandTitle` | Logo, colour and type | Логотип, цвета и шрифты | Logotip, ranglar va shriftlar |
| `caseCopy.brandTitleNoType` | Logo and colour | Логотип и цвета | Logotip va ranglar |
| `caseCopy.logos` | Logos | Логотипы | Logotiplar |
| `caseCopy.palette` | Palette | Палитра | Palitra |
| `caseCopy.type` | Type | Шрифты | Shriftlar |
| `caseCopy.applications` | In use | Применение | Qoʻllanilishi |
| `caseCopy.adsBlock` | Ads | Реклама | Reklama |
| `caseCopy.adsTitle` | The campaign | Кампания | Kampaniya |
| `caseCopy.objective` | Objective | Цель | Maqsad |
| `caseCopy.tools` | Tools | Инструменты | Vositalar |
| `caseCopy.moreProjects` | More projects | Другие проекты | Boshqa loyihalar |
| `caseCopy.previous` | Previous project | Предыдущий проект | Oldingi loyiha |
| `caseCopy.next` | Next project | Следующий проект | Keyingi loyiha |
| `caseCopy.notFoundTitle` | There is no page at this address. | По этому адресу страницы нет. | Bu manzilda sahifa yoʻq. |
| `caseCopy.notFoundBody` | The link may be from the old version of this site, or the address has a typo. All the work is on the home page. | Возможно, ссылка осталась от старой версии сайта или в адресе есть опечатка. Все работы — на главной странице. | Havola saytning eski versiyasidan qolgan yoki manzilda xato boʻlishi mumkin. Barcha ishlar bosh sahifada. |
| `caseCopy.notFoundHome` | Go to the home page | На главную | Bosh sahifaga |
| `caseCopy.notFoundCases` | Or open a case study | Или откройте кейс | Yoki keyslardan birini oching |
| `disciplineLabel.web` | Websites | Сайты | Saytlar |
| `websitesCopy.title` | Every website I have built or designed. | Все сайты, которые я сделал или спроектировал. | Men yaratgan yoki dizaynini ishlab chiqqan barcha saytlar. |
| `websitesCopy.intro` | Client sites, a startup product and my own projects. Each card says what my part was. | Клиентские сайты, стартап-продукт и мои собственные проекты. На каждой карточке указано, что именно делал я. | Mijozlar saytlari, startap mahsuloti va shaxsiy loyihalarim. Har bir kartada aynan nima qilganim yozilgan. |
| `websitesCopy.redesignTitle` | Redesign concepts for GFS Group companies | Концепции редизайна для компаний GFS Group | GFS Group kompaniyalari uchun redizayn konsepsiyalari |
| `websitesCopy.redesignNote` | Concept pages, not live sites. | Это концепты, а не действующие сайты. | Bular konsept sahifalar, ishlayotgan saytlar emas. |
| `workCopy.eyebrow` | Selected work | Избранные работы | Tanlangan ishlar |
| `workCopy.title` | Six projects across websites, brands and ads. | Шесть проектов: сайты, бренды и реклама. | Olti loyiha: saytlar, brendlar va reklama. |
| `workCopy.intro` | Open any project for the brief, what I did and the result. | Откройте любой проект, чтобы увидеть задачу, мою работу и результат. | Vazifa, qilgan ishim va natijani koʻrish uchun istalgan loyihani oching. |

## About and Contact

File: `data/about.ts`

| key | EN | RU | UZ |
|---|---|---|---|
| `aboutCopy.eyebrow` | About | Обо мне | Men haqimda |
| `aboutCopy.title` | Frontend developer and brand designer, based in Tashkent. | Frontend-разработчик и бренд-дизайнер из Ташкента. | Toshkentlik frontend dasturchi va brend dizayner. |
| `aboutCopy.experience` | Experience | Опыт | Tajriba |
| `aboutCopy.tools` | Tools | Инструменты | Vositalar |
| `aboutCopy.education` | Education | Образование | Ta’lim |
| `aboutCopy.languages` | Languages | Языки | Tillar |
| `aboutCopy.toolGroups.Dev` | Dev | Разработка | Dasturlash |
| `aboutCopy.toolGroups.Design` | Design | Дизайн | Dizayn |
| `aboutCopy.toolGroups.Growth & AI` | Growth & AI | Реклама и ИИ | Reklama va AI |
| `aboutCopy.present` | Present | наст. время | hozirgacha |
| `aboutCopy.terms.Freelance & startups` | Freelance & startups | Фриланс и стартапы | Frilans va startaplar |
| `aboutCopy.terms.PDPU Proctor & Volunteer` | PDPU Proctor & Volunteer | Проктор и волонтёр PDPU | PDPU proktori va koʻngillisi |
| `aboutCopy.terms.Uzbek` | Uzbek | Узбекский | Oʻzbek tili |
| `aboutCopy.terms.English` | English | Английский | Ingliz tili |
| `aboutCopy.terms.Russian` | Russian | Русский | Rus tili |
| `aboutCopy.terms.C2 (native)` | C2 (native) | C2 (родной) | C2 (ona tili) |
| `contactCopy.eyebrow` | Contact | Контакты | Aloqa |
| `contactCopy.title` | Let's talk about your next project. | Давайте обсудим ваш следующий проект. | Keyingi loyihangizni muhokama qilaylik. |
| `contactCopy.intro` | A website, a brand or a campaign. Write to me and I will reply. | Сайт, бренд или рекламная кампания — напишите мне, и я отвечу. | Sayt, brend yoki reklama kampaniyasi — menga yozing, javob beraman. |
| `contactCopy.copyEmail` | Copy email | Скопировать почту | Pochtani nusxalash |
| `contactCopy.copied` | Copied | Скопировано | Nusxalandi |
| `contactCopy.helpTitle` | What I can help with | Чем я могу помочь | Nimada yordam bera olaman |
| `contactCopy.help[0]` | Websites built from zero, in Next.js and React. | Сайты с нуля на Next.js и React. | Next.js va React asosida noldan yaratilgan saytlar. |
| `contactCopy.help[1]` | Brand identities: logo, colour, type and the kit around them. | Фирменный стиль: логотип, цвета, шрифты и всё, что к ним прилагается. | Brend uslubi: logotip, ranglar, shriftlar va ular atrofidagi toʻliq toʻplam. |
| `contactCopy.help[2]` | Ad creatives and Meta lead campaigns, with AI video. | Рекламные креативы, лид-кампании в Meta и ИИ-видео. | Reklama kreativlari, Meta lid kampaniyalari va AI videolar. |
| `contactCopy.elsewhere` | Find me on | Я в соцсетях | Ijtimoiy tarmoqlarda |
| `contactCopy.downloadCv` | Download CV | Скачать резюме | Rezyumeni yuklab olish |

## Experience

File: `data/experience.ts`

| key | EN | RU | UZ |
|---|---|---|---|
| `experience.GFS Group LLC.role` | IT Department · Frontend Developer & Brand Designer | IT-отдел · Frontend-разработчик и бренд-дизайнер | IT boʻlimi · Frontend dasturchi va brend dizayner |
| `experience.GFS Group LLC.points[0]` | Websites and brand kits built from zero for JJR Transportation and DAVR GROUP. | Сайты и фирменный стиль с нуля для JJR Transportation и DAVR GROUP. | JJR Transportation va DAVR GROUP uchun noldan yaratilgan saytlar va brend uslubi. |
| `experience.GFS Group LLC.points[1]` | Website redesign concepts for group companies. | Концепции редизайна сайтов для компаний группы. | Guruh kompaniyalari saytlari uchun redizayn konsepsiyalari. |
| `experience.GFS Group LLC.points[2]` | Ad creatives and Meta lead campaigns for Good Idea Cargo. | Рекламные креативы и лид-кампании в Meta для Good Idea Cargo. | Good Idea Cargo uchun reklama kreativlari va Meta lid kampaniyalari. |
| `experience.GFS Group LLC.points[3]` | AI video content. | Видеоконтент с помощью ИИ. | AI yordamida video kontent. |
| `experience.Freelance & startups.role` | Brand designer & developer | Бренд-дизайнер и разработчик | Brend dizayner va dasturchi |
| `experience.Freelance & startups.points[0]` | Fragrise: brand identity and website design. | Fragrise: фирменный стиль и дизайн сайта. | Fragrise: brend uslubi va sayt dizayni. |
| `experience.Freelance & startups.points[1]` | CleanPro: brand. | CleanPro: бренд. | CleanPro: brend. |
| `experience.Freelance & startups.points[2]` | ConvertBoost AI: own product. | ConvertBoost AI: собственный продукт. | ConvertBoost AI: shaxsiy mahsulot. |
| `experience.Freelance & startups.points[3]` | Co-building two startups in collaboration: Hirara and 8iz. | Совместно развиваю два стартапа: Hirara и 8iz. | Ikki startapni hamkorlikda rivojlantiryapman: Hirara va 8iz. |
| `experience.Ijarachi.role` | Graphic Designer & Content Creator | Графический дизайнер и контент-мейкер | Grafik dizayner va kontent yaratuvchi |
| `experience.UIC Games.role` | Visual Designer & Videographer | Визуальный дизайнер и видеограф | Vizual dizayner va videograf |
| `experience.Nuqta & XM Pro.role` | Visual Designer, Videographer & SMM | Визуальный дизайнер, видеограф и SMM-специалист | Vizual dizayner, videograf va SMM mutaxassisi |
| `experience.Grand Invest.role` | Graphic Designer | Графический дизайнер | Grafik dizayner |
| `experience.Grand Invest.points` | YouTube thumbnails. | Обложки для YouTube. | YouTube videolari uchun muqovalar. |
| `experience.Kinder.role` | Merchandiser | Мерчендайзер | Merchendayzer |

## Projects (cards and case studies)

File: `data/projects.ts`

| key | EN | RU | UZ |
|---|---|---|---|
| `projects.jjr-transportation.context` | Delivered at GFS Group | Выполнено в GFS Group | GFS Group’da bajarilgan |
| `projects.jjr-transportation.summary` | Website and brand kit for a US dry-van carrier, built from zero. | Сайт и фирменный стиль с нуля для американского грузоперевозчика (dry van). | AQShdagi dry van yuk tashuvchi kompaniya uchun noldan yaratilgan sayt va brend uslubi. |
| `projects.jjr-transportation.role` | Website + brand identity | Сайт + фирменный стиль | Sayt + brend uslubi |
| `projects.jjr-transportation.caseStudy.brief` | JJR Transportation is a US dry-van carrier. The work was done through GFS Group and started from nothing: no site and no brand kit. | JJR Transportation — американский грузоперевозчик (dry van). Работа шла через GFS Group и началась с нуля: не было ни сайта, ни фирменного стиля. | JJR Transportation — AQShdagi dry van yuk tashuvchi kompaniya. Ish GFS Group orqali bajarildi va noldan boshlandi: na sayt, na brend uslubi bor edi. |
| `projects.jjr-transportation.caseStudy.whatIDid[0]` | Designed and built the website in Next.js 16 with Tailwind CSS 4. | Спроектировал и разработал сайт на Next.js 16 и Tailwind CSS 4. | Saytni Next.js 16 va Tailwind CSS 4 asosida loyihalab, ishlab chiqdim. |
| `projects.jjr-transportation.caseStudy.whatIDid[1]` | Built three forms, sent through Web3Forms. | Сделал три формы с отправкой через Web3Forms. | Web3Forms orqali yuboriladigan uchta forma yaratdim. |
| `projects.jjr-transportation.caseStudy.whatIDid[2]` | Created the brand kit: logo variants, palette, typography, brand guide and fleet mockups. | Создал фирменный стиль: варианты логотипа, палитру, типографику, брендбук и мокапы автопарка. | Brend uslubini yaratdim: logotip variantlari, palitra, tipografika, brendbuk va avtopark maketlari. |
| `projects.jjr-transportation.caseStudy.result` | A live website and a complete brand kit delivered to the company. | Компания получила работающий сайт и полный фирменный стиль. | Kompaniyaga ishlayotgan sayt va toʻliq brend uslubi topshirildi. |
| `projects.jjr-transportation.caseStudy.brand.type[0].role` | Display | Заголовки | Sarlavhalar |
| `projects.jjr-transportation.caseStudy.brand.type[1].role` | Body | Основной текст | Asosiy matn |
| `projects.davr-group.summary` | Website and brand kit for a US trucking company, built from zero. | Сайт и фирменный стиль с нуля для американской транспортной компании. | AQShdagi yuk tashish kompaniyasi uchun noldan yaratilgan sayt va brend uslubi. |
| `projects.davr-group.caseStudy.brief` | DAVR GROUP LLC is a US trucking company. The work was done through GFS Group: a website and a brand kit, both from zero. | DAVR GROUP LLC — американская транспортная компания. Работа шла через GFS Group: сайт и фирменный стиль, оба с нуля. | DAVR GROUP LLC — AQShdagi yuk tashish kompaniyasi. Ish GFS Group orqali bajarildi: sayt va brend uslubi, ikkalasi ham noldan. |
| `projects.davr-group.caseStudy.whatIDid[0]` | Built the website as a static Next.js site with a three.js scene and tests. | Разработал статический сайт на Next.js со сценой на three.js и тестами. | Saytni three.js sahnasi va testlari bilan statik Next.js sayti sifatida ishlab chiqdim. |
| `projects.davr-group.caseStudy.whatIDid[1]` | Created the brand kit: logo variants, palette, typography, brand guide PDF and a trailer mockup. | Создал фирменный стиль: варианты логотипа, палитру, типографику, брендбук в PDF и мокап прицепа. | Brend uslubini yaratdim: logotip variantlari, palitra, tipografika, PDF brendbuk va tirkama maketi. |
| `projects.davr-group.caseStudy.result` | A website and a complete brand kit delivered to the company. | Компания получила сайт и полный фирменный стиль. | Kompaniyaga sayt va toʻliq brend uslubi topshirildi. |
| `projects.davr-group.caseStudy.brand.type[2].role` | Labels | Подписи | Yorliqlar |
| `projects.hirara.context` | Two-person startup, built in collaboration | Стартап из двух человек, создан в коллаборации | Ikki kishilik startap, hamkorlikda yaratilgan |
| `projects.hirara.summary` | Uzbek SaaS for Telegram shops, bio pages and landing pages. | Узбекский SaaS для Telegram-магазинов, bio-страниц и лендингов. | Telegram doʻkonlar, bio sahifalar va lendinglar uchun oʻzbek SaaS xizmati. |
| `projects.hirara.role` | Co-developer | Соразработчик | Hammuallif dasturchi |
| `projects.hirara.caseStudy.brief` | Hirara is an Uzbek SaaS for building a Telegram shop, a bio page and landing pages. It is a two-person startup, built in collaboration. | Hirara — узбекский SaaS для создания Telegram-магазина, bio-страницы и лендингов. Это стартап из двух человек, созданный в коллаборации. | Hirara — Telegram doʻkon, bio sahifa va lendinglar yaratish uchun oʻzbek SaaS xizmati. Bu hamkorlikda yaratilgan ikki kishilik startap. |
| `projects.hirara.caseStudy.whatIDid[0]` | Built the Ilgich store template. | Сделал шаблон магазина Ilgich. | Ilgich doʻkon shablonini yaratdim. |
| `projects.hirara.caseStudy.whatIDid[1]` | Added order notifications and limits. | Добавил уведомления о заказах и лимиты. | Buyurtma bildirishnomalari va limitlarni qoʻshdim. |
| `projects.hirara.caseStudy.whatIDid[2]` | Bug fixes. | Исправлял баги. | Xatolarni tuzatdim. |
| `projects.hirara.caseStudy.result` | In progress. The product is being connected to hirara.uz. | В работе: продукт подключается к домену hirara.uz. | Jarayonda: mahsulot hirara.uz domeniga ulanmoqda. |
| `projects.fragrise.summary` | Brand identity and website design for a CS2 tournament platform in Uzbekistan. | Фирменный стиль и дизайн сайта для платформы турниров по CS2 в Узбекистане. | Oʻzbekistondagi CS2 turnirlari platformasi uchun brend uslubi va sayt dizayni. |
| `projects.fragrise.role` | Brand identity + website design | Фирменный стиль + дизайн сайта | Brend uslubi + sayt dizayni |
| `projects.fragrise.caseStudy.brief` | FRAGRISE is a CS2 tournament platform in Uzbekistan. My part was the brand identity and the website design, not the development. | FRAGRISE — платформа турниров по CS2 в Узбекистане. Моя часть — фирменный стиль и дизайн сайта, разработкой я не занимался. | FRAGRISE — Oʻzbekistondagi CS2 turnirlari platformasi. Mening vazifam brend uslubi va sayt dizayni edi, dasturlash emas. |
| `projects.fragrise.caseStudy.whatIDid[0]` | Designed the brand identity: mark, wordmark lockup, palette and type pairing. | Разработал фирменный стиль: знак, комбинированный логотип со шрифтовой частью, палитру и шрифтовую пару. | Brend uslubini ishlab chiqdim: belgi, yozuvli kombinatsiyalangan logotip, palitra va shriftlar juftligi. |
| `projects.fragrise.caseStudy.whatIDid[1]` | Designed the website. | Сделал дизайн сайта. | Sayt dizaynini yaratdim. |
| `projects.fragrise.caseStudy.whatIDid[2]` | Mocked up the brand on social, share-image and stream overlay formats. | Показал бренд на мокапах: посты для соцсетей, изображения для репостов и оверлеи для стримов. | Brendni maketlarda koʻrsatdim: ijtimoiy tarmoq postlari, ulashish rasmlari va strim overleylari. |
| `projects.fragrise.caseStudy.result` | A complete brand kit and a live website at fragrise.uz. | Полный фирменный стиль и работающий сайт fragrise.uz. | Toʻliq brend uslubi va ishlayotgan fragrise.uz sayti. |
| `projects.fragrise.caseStudy.brand.type[0].role` | Wordmark / display (as on the live site) | Логотип / заголовки (как на сайте) | Yozuvli logotip / sarlavhalar (saytdagidek) |
| `projects.fragrise.caseStudy.brand.type[2].role` | Numerals / scores | Цифры / счёт | Raqamlar / hisob |
| `projects.8iz.summary` | Redesign of an Uzbek apparel brand's store. | Редизайн магазина узбекского бренда одежды. | Oʻzbek kiyim brendi doʻkonining redizayni. |
| `projects.8iz.role` | Co-founder · design and front-end | Сооснователь · дизайн и фронтенд | Hammuassis · dizayn va frontend |
| `projects.8iz.caseStudy.brief` | 8iz is an Uzbek apparel brand and store. The redesign is a two-person startup effort, built in collaboration. | 8iz — узбекский бренд одежды и магазин. Редизайн — работа стартапа из двух человек, созданная в коллаборации. | 8iz — oʻzbek kiyim brendi va doʻkoni. Redizayn ikki kishilik startap tomonidan hamkorlikda yaratilgan. |
| `projects.8iz.caseStudy.whatIDid[0]` | Designed the new 8iz.uz look (steel gear-unit style). | Разработал новый облик 8iz.uz (в стилистике стального редуктора). | 8iz.uz uchun yangi koʻrinishni ishlab chiqdim (poʻlat reduktor uslubida). |
| `projects.8iz.caseStudy.whatIDid[1]` | Built the redesign together with my co-founder. | Сделал редизайн вместе с сооснователем. | Redizaynni hammuassisim bilan birga yaratdim. |
| `projects.8iz.caseStudy.whatIDid[2]` | Features: outfit builder, print studio, 15-model catalog. | Функции: конструктор образов, студия принтов, каталог из 15 моделей. | Imkoniyatlar: obraz konstruktori, print studiyasi, 15 ta modeldan iborat katalog. |
| `projects.8iz.caseStudy.result` | Launching soon. | Скоро запуск. | Tez orada ishga tushadi. |
| `projects.good-idea-cargo-ads.localTitle` | Good Idea Cargo: Owner-Operator Recruiting | Good Idea Cargo: найм водителей со своим тягачом | Good Idea Cargo: oʻz yuk mashinasiga ega haydovchilarni yollash |
| `projects.good-idea-cargo-ads.context` | Made at GFS Group | Сделано в GFS Group | GFS Group’da tayyorlangan |
| `projects.good-idea-cargo-ads.summary` | Facebook and Instagram lead-form campaign recruiting owner-operators in the US. | Кампания с лид-формами в Facebook и Instagram по найму водителей со своим тягачом в США. | AQShda oʻz yuk mashinasiga ega haydovchilarni yollash uchun Facebook va Instagram lid-forma kampaniyasi. |
| `projects.good-idea-cargo-ads.role` | Ad creatives + campaign setup | Рекламные креативы + настройка кампании | Reklama kreativlari + kampaniyani sozlash |
| `projects.good-idea-cargo-ads.caseStudy.brief` | Recruit owner-operator drivers for Good Idea Cargo with a Facebook and Instagram lead-form campaign in the US, run in the Employment ad category (November 2026). | Найти для Good Idea Cargo водителей со своим тягачом через кампанию с лид-формами в Facebook и Instagram в США, в рекламной категории «Трудоустройство» (ноябрь 2026). | Good Idea Cargo uchun AQShda Facebook va Instagram lid-forma kampaniyasi orqali oʻz yuk mashinasiga ega haydovchilarni yollash. Kampaniya «Employment» (ishga yollash) reklama toifasida yuritildi (2026-yil, noyabr). |
| `projects.good-idea-cargo-ads.caseStudy.whatIDid[0]` | Set up the lead-form campaign in Meta Ads Manager. | Настроил кампанию с лид-формами в Meta Ads Manager. | Meta Ads Manager’da lid-forma kampaniyasini sozladim. |
| `projects.good-idea-cargo-ads.caseStudy.whatIDid[1]` | Designed creative A1, "Keep up to 88% of your gross", in 9:16 and 4:5. | Разработал креатив A1 «Keep up to 88% of your gross» в форматах 9:16 и 4:5. | «Keep up to 88% of your gross» A1 kreativini 9:16 va 4:5 formatlarida ishlab chiqdim. |
| `projects.good-idea-cargo-ads.caseStudy.whatIDid[2]` | Made creative A2: a Seedance clip with an end card. | Сделал креатив A2: ролик Seedance с финальной заставкой. | A2 kreativini tayyorladim: yakuniy kadrli Seedance klipi. |
| `projects.good-idea-cargo-ads.caseStudy.whatIDid[3]` | Made creative O1: a carousel. | Сделал креатив O1: карусель. | O1 kreativini tayyorladim: karusel. |
| `projects.good-idea-cargo-ads.caseStudy.whatIDid[4]` | Set up a call-log pipeline for the leads. | Настроил журнал звонков для обработки лидов. | Lidlar uchun qoʻngʻiroqlar jurnalini yuritish tizimini sozladim. |
| `projects.good-idea-cargo-ads.caseStudy.result` | Campaign launched with three ad videos; the opening hook held 39.9% of viewers. | Кампания запущена с тремя рекламными видео; первые секунды удержали 39,9% зрителей. | Kampaniya uchta reklama videosi bilan ishga tushirildi; videoning ilk soniyalari tomoshabinlarning 39,9 foizini ushlab qoldi. |
| `projects.good-idea-cargo-ads.caseStudy.ads.objective` | Owner-operator recruiting through Facebook and Instagram lead forms, US. | Найм водителей со своим тягачом через лид-формы Facebook и Instagram, США. | Facebook va Instagram lid-formalari orqali oʻz yuk mashinasiga ega haydovchilarni yollash, AQSh. |
| `projects.good-idea-cargo-ads.caseStudy.ads.facts[0]` | Facebook and Instagram lead-form campaign | Кампания с лид-формами в Facebook и Instagram | Facebook va Instagram lid-forma kampaniyasi |
| `projects.good-idea-cargo-ads.caseStudy.ads.facts[1]` | Audience: US, Employment ad category | Аудитория: США, категория «Трудоустройство» | Auditoriya: AQSh, «Employment» reklama toifasi |
| `projects.good-idea-cargo-ads.caseStudy.ads.facts[2]` | Hook rate: 39.9% | Удержание на старте (hook rate): 39,9% | Hook rate (ilk soniyalarda ushlab qolish): 39,9% |
| `projects.convertboost-ai.summary` | AI landing-page audit SaaS. | SaaS для ИИ-аудита лендингов. | Lendinglarni AI yordamida audit qiluvchi SaaS. |
| `projects.convertboost-ai.role` | Own product: design and development | Собственный продукт: дизайн и разработка | Shaxsiy mahsulot: dizayn va dasturlash |
| `projects.workers.summary` | Website for wrkrs.uz, a rap collective from Tashkent. | Сайт wrkrs.uz для рэп-объединения из Ташкента. | Toshkentlik rep jamoasi uchun wrkrs.uz sayti. |
| `projects.workers.role` | Website | Сайт | Sayt |
| `projects.motionforge.summary` | Studio website concept. | Концепт сайта студии. | Studiya sayti konsepti. |
| `projects.motionforge.role` | Own experiment: design and development | Собственный эксперимент: дизайн и разработка | Shaxsiy tajriba: dizayn va dasturlash |
| `projects.silk-road.summary` | Travel guide to Uzbekistan's Silk Road cities, in English, Russian and Uzbek. | Путеводитель по городам Шёлкового пути в Узбекистане на английском, русском и узбекском. | Oʻzbekistondagi Buyuk Ipak yoʻli shaharlari boʻyicha sayohat qoʻllanmasi: ingliz, rus va oʻzbek tillarida. |
| `projects.silk-road.role` | Own project: design and development | Собственный проект: дизайн и разработка | Shaxsiy loyiha: dizayn va dasturlash |
| `projects.cleanpro.summary` | Logo, color system and business cards for a cleaning service. | Логотип, цветовая система и визитки для клининговой компании. | Tozalash xizmati uchun logotip, ranglar tizimi va vizitkalar. |
| `projects.cleanpro.role` | Brand identity | Фирменный стиль | Brend uslubi |
| `projects.cleanpro.caseStudy.brief` | Logo, colour system and business cards. | Логотип, цветовая система и визитки. | Logotip, ranglar tizimi va vizitkalar. |
| `projects.cleanpro.caseStudy.result` | A concise identity package: logo, colors and business cards. | Компактный пакет фирменного стиля: логотип, цвета и визитки. | Ixcham brend paketi: logotip, ranglar va vizitkalar. |
| `projects.gfs-ads.localTitle` | GFS Group: ad video and motion | GFS Group: рекламное видео и моушн | GFS Group: reklama videosi va motion dizayn |
| `projects.gfs-ads.summary` | Owner-operator recruiting ad (9:16). | Реклама для найма водителей со своим тягачом (9:16). | Oʻz yuk mashinasiga ega haydovchilarni yollash reklamasi (9:16). |
| `projects.gfs-ads.role` | Ad video | Рекламное видео | Reklama videosi |

## Image alt text and captions (screen readers; ad captions are visible)

File: `data/projects.ts`

| key | EN | RU | UZ |
|---|---|---|---|
| `alt.jjr-transportation[0]` | JJR Transportation brand kit preview | Обзор фирменного стиля JJR Transportation | JJR Transportation brend uslubining umumiy koʻrinishi |
| `alt.jjr-transportation[1]` | JJR Transportation website, desktop | Сайт JJR Transportation, десктоп | JJR Transportation sayti, kompyuter versiyasi |
| `alt.jjr-transportation[2]` | JJR Transportation website, mobile | Сайт JJR Transportation, мобильная версия | JJR Transportation sayti, mobil versiya |
| `alt.jjr-transportation[3]` | JJR Transportation primary logo | Основной логотип JJR Transportation | JJR Transportation asosiy logotipi |
| `alt.jjr-transportation[4]` | JJR Transportation symbol | Знак JJR Transportation | JJR Transportation belgisi |
| `alt.jjr-transportation[5]` | JJR Transportation trailer livery mockup | Мокап брендирования прицепа JJR Transportation | JJR Transportation tirkamasini brendlash maketi |
| `alt.davr-group[0]` | DAVR GROUP brand kit preview | Обзор фирменного стиля DAVR GROUP | DAVR GROUP brend uslubining umumiy koʻrinishi |
| `alt.davr-group[1]` | DAVR GROUP website, desktop | Сайт DAVR GROUP, десктоп | DAVR GROUP sayti, kompyuter versiyasi |
| `alt.davr-group[2]` | DAVR GROUP website, mobile | Сайт DAVR GROUP, мобильная версия | DAVR GROUP sayti, mobil versiya |
| `alt.davr-group[3]` | DAVR GROUP primary logo | Основной логотип DAVR GROUP | DAVR GROUP asosiy logotipi |
| `alt.davr-group[4]` | DAVR GROUP symbol | Знак DAVR GROUP | DAVR GROUP belgisi |
| `alt.davr-group[5]` | DAVR GROUP trailer livery mockup | Мокап брендирования прицепа DAVR GROUP | DAVR GROUP tirkamasini brendlash maketi |
| `alt.hirara[0]` | Hirara, desktop | Hirara, десктоп | Hirara, kompyuter versiyasi |
| `alt.hirara[1]` | Hirara, desktop view 1 | Hirara, десктоп, экран 1 | Hirara, kompyuter versiyasi, 1-ekran |
| `alt.hirara[2]` | Hirara, desktop view 2 | Hirara, десктоп, экран 2 | Hirara, kompyuter versiyasi, 2-ekran |
| `alt.hirara[3]` | Hirara, desktop view 3 | Hirara, десктоп, экран 3 | Hirara, kompyuter versiyasi, 3-ekran |
| `alt.hirara[4]` | Hirara, desktop view 4 | Hirara, десктоп, экран 4 | Hirara, kompyuter versiyasi, 4-ekran |
| `alt.hirara[5]` | Hirara, desktop view 5 | Hirara, десктоп, экран 5 | Hirara, kompyuter versiyasi, 5-ekran |
| `alt.hirara[6]` | Hirara, mobile view 1 | Hirara, мобильная версия, экран 1 | Hirara, mobil versiya, 1-ekran |
| `alt.hirara[7]` | Hirara, mobile view 2 | Hirara, мобильная версия, экран 2 | Hirara, mobil versiya, 2-ekran |
| `alt.hirara[8]` | Hirara, mobile view 3 | Hirara, мобильная версия, экран 3 | Hirara, mobil versiya, 3-ekran |
| `alt.fragrise[0]` | FRAGRISE website, desktop | Сайт FRAGRISE, десктоп | FRAGRISE sayti, kompyuter versiyasi |
| `alt.fragrise[2]` | FRAGRISE website, mobile | Сайт FRAGRISE, мобильная версия | FRAGRISE sayti, mobil versiya |
| `alt.fragrise[3]` | FRAGRISE lockup, light version | Комбинированный логотип FRAGRISE, светлая версия | FRAGRISE kombinatsiyalangan logotipi, och versiya |
| `alt.fragrise[4]` | FRAGRISE lockup, dark version | Комбинированный логотип FRAGRISE, тёмная версия | FRAGRISE kombinatsiyalangan logotipi, toʻq versiya |
| `alt.fragrise[5]` | FRAGRISE mark, cream | Знак FRAGRISE, кремовый | FRAGRISE belgisi, krem rang |
| `alt.fragrise[6]` | FRAGRISE mark, black | Знак FRAGRISE, чёрный | FRAGRISE belgisi, qora |
| `alt.fragrise[7]` | FRAGRISE social post mockup | Мокап поста FRAGRISE для соцсетей | FRAGRISE ijtimoiy tarmoq posti maketi |
| `alt.fragrise[8]` | FRAGRISE share image | Изображение FRAGRISE для репостов | FRAGRISE ulashish rasmi |
| `alt.fragrise[9]` | FRAGRISE stream overlay mockup | Мокап оверлея FRAGRISE для стримов | FRAGRISE strim overleyi maketi |
| `alt.8iz[0]` | 8iz redesign, desktop | Редизайн 8iz, десктоп | 8iz redizayni, kompyuter versiyasi |
| `alt.8iz[1]` | 8iz redesign, home | Редизайн 8iz, главная страница | 8iz redizayni, bosh sahifa |
| `alt.8iz[2]` | 8iz redesign, desktop view 2 | Редизайн 8iz, десктоп, экран 2 | 8iz redizayni, kompyuter versiyasi, 2-ekran |
| `alt.8iz[3]` | 8iz redesign, desktop view 3 | Редизайн 8iz, десктоп, экран 3 | 8iz redizayni, kompyuter versiyasi, 3-ekran |
| `alt.8iz[4]` | 8iz redesign, mobile | Редизайн 8iz, мобильная версия | 8iz redizayni, mobil versiya |
| `alt.8iz[5]` | 8iz redesign, mobile view 2 | Редизайн 8iz, мобильная версия, экран 2 | 8iz redizayni, mobil versiya, 2-ekran |
| `alt.good-idea-cargo-ads[0]` | Good Idea Cargo ad A1, 9:16 | Реклама Good Idea Cargo, A1, 9:16 | Good Idea Cargo reklamasi, A1, 9:16 |
| `alt.good-idea-cargo-ads[1]` | Good Idea Cargo logo | Логотип Good Idea Cargo | Good Idea Cargo logotipi |
| `alt.good-idea-cargo-ads[2]` | Good Idea Cargo logo, square | Логотип Good Idea Cargo, квадратный | Good Idea Cargo logotipi, kvadrat |
| `alt.good-idea-cargo-ads[4]` | Good Idea Cargo ad A2, 9:16 | Реклама Good Idea Cargo, A2, 9:16 | Good Idea Cargo reklamasi, A2, 9:16 |
| `alt.good-idea-cargo-ads[5]` | Good Idea Cargo carousel, slide 1 | Карусель Good Idea Cargo, слайд 1 | Good Idea Cargo karuseli, 1-slayd |
| `alt.good-idea-cargo-ads[6]` | Creative A1, 9:16: Keep up to 88% of your gross | Креатив A1, 9:16: «Keep up to 88% of your gross» | A1 kreativi, 9:16: «Keep up to 88% of your gross» |
| `alt.good-idea-cargo-ads[7]` | Creative A1, 4:5: Keep up to 88% of your gross | Креатив A1, 4:5: «Keep up to 88% of your gross» | A1 kreativi, 4:5: «Keep up to 88% of your gross» |
| `alt.good-idea-cargo-ads[8]` | Creative A2, 9:16: Seedance clip with end card | Креатив A2, 9:16: ролик Seedance с финальной заставкой | A2 kreativi, 9:16: yakuniy kadrli Seedance klipi |
| `alt.good-idea-cargo-ads[9]` | Creative O1, carousel slide 1 | Креатив O1, слайд карусели 1 | O1 kreativi, karusel, 1-slayd |
| `alt.good-idea-cargo-ads[10]` | Creative O1, carousel slide 4 | Креатив O1, слайд карусели 4 | O1 kreativi, karusel, 4-slayd |
| `alt.good-idea-cargo-ads[11]` | Creative O1, carousel slide 5 | Креатив O1, слайд карусели 5 | O1 kreativi, karusel, 5-slayd |
| `alt.convertboost-ai[0]` | ConvertBoost AI website, desktop | Сайт ConvertBoost AI, десктоп | ConvertBoost AI sayti, kompyuter versiyasi |
| `alt.workers[0]` | Workers website, desktop | Сайт Workers, десктоп | Workers sayti, kompyuter versiyasi |
| `alt.motionforge[0]` | MotionForge website, desktop | Сайт MotionForge, десктоп | MotionForge sayti, kompyuter versiyasi |
| `alt.silk-road[0]` | Silk Road Uzbekistan website, desktop | Сайт Silk Road Uzbekistan, десктоп | Silk Road Uzbekistan sayti, kompyuter versiyasi |
| `alt.cleanpro[0]` | CleanPro business card, front | Визитка CleanPro, лицевая сторона | CleanPro vizitkasi, old tomoni |
| `alt.cleanpro[1]` | CleanPro logo | Логотип CleanPro | CleanPro logotipi |
| `alt.cleanpro[2]` | CleanPro logo colors | Цвета логотипа CleanPro | CleanPro logotipi ranglari |
| `alt.cleanpro[4]` | CleanPro business card, back | Визитка CleanPro, оборотная сторона | CleanPro vizitkasi, orqa tomoni |
| `alt.gfs-ads[0]` | GFS owner-operator ad video, poster frame | Рекламное видео GFS для водителей со своим тягачом, кадр-обложка | GFS reklama videosi (oʻz yuk mashinasiga ega haydovchilar uchun), muqova kadri |

## Earlier work archive (labels and alt text)

File: `data/projects.ts`

| key | EN | RU | UZ |
|---|---|---|---|
| `archive[0].label` | Iqtidor Academy | Iqtidor Academy | Iqtidor Academy |
| `archive[0].alt` | Iqtidor Academy grant announcement social post | Пост Iqtidor Academy с объявлением о гранте | Iqtidor Academy grant e’loni posti |
| `archive[1].alt` | Education consulting social media post | Пост для соцсетей об образовательном консалтинге | Ta’lim konsaltingi haqida ijtimoiy tarmoq posti |
| `archive[2].label` | Iqtidor School Banner | Баннер Iqtidor School | Iqtidor School banneri |
| `archive[2].alt` | Iqtidor School Russian course admission banner | Баннер набора на курс русского языка Iqtidor School | Iqtidor School rus tili kursiga qabul banneri |
| `archive[3].alt` | Iqtidor School green advertising banner variation | Зелёный вариант рекламного баннера Iqtidor School | Iqtidor School reklama bannerining yashil varianti |
| `archive[4].label` | Ijarachi Banners | Баннеры Ijarachi | Ijarachi bannerlari |
| `archive[4].alt` | Ijarachi real estate service horizontal banner | Горизонтальный баннер сервиса недвижимости Ijarachi | Ijarachi koʻchmas mulk xizmatining gorizontal banneri |
| `archive[5].alt` | Ijarachi horizontal advertising banner variation | Вариант горизонтального рекламного баннера Ijarachi | Ijarachi gorizontal reklama bannerining varianti |
| `archive[6].label` | Social Media Design | Дизайн для соцсетей | Ijtimoiy tarmoqlar uchun dizayn |
| `archive[6].alt` | Creative design service social post | Пост для соцсетей о сервисе креативного дизайна | Kreativ dizayn xizmati haqida ijtimoiy tarmoq posti |
| `archive[7].alt` | Dr Azamat social media post | Пост для соцсетей Dr Azamat | Dr Azamat uchun ijtimoiy tarmoq posti |
| `archive[8].alt` | Vertical Instagram post design | Дизайн вертикального поста для Instagram | Vertikal Instagram posti dizayni |
| `archive[9].alt` | Masterclass announcement social media post | Пост-анонс мастер-класса для соцсетей | Master-klass e’loni uchun ijtimoiy tarmoq posti |
| `archive[10].alt` | Sushi social media post design | Дизайн поста о суши для соцсетей | Sushi haqida ijtimoiy tarmoq posti dizayni |
| `archive[11].label` | Kofemator | Kofemator | Kofemator |
| `archive[11].alt` | Kofemator Russell Hobbs coffee machine product ad | Реклама кофемашины Russell Hobbs для Kofemator | Kofemator uchun Russell Hobbs qahva mashinasi reklamasi |
| `archive[12].label` | Organic Product Flyer | Флаер органического продукта | Organik mahsulot flayeri |
| `archive[12].alt` | Organic product tall poster layout | Вытянутый постер органического продукта | Organik mahsulot uchun uzun poster maketi |
| `archive[13].label` | Personal Projects | Личные проекты | Shaxsiy loyihalar |
| `archive[13].alt` | Vertical personal blog creative post | Вертикальный креативный пост для личного блога | Shaxsiy blog uchun vertikal kreativ post |
| `archive[14].alt` | Organic product flyer front | Флаер органического продукта, лицевая сторона | Organik mahsulot flayeri, old tomoni |
| `archive[15].alt` | Organic product flyer back | Флаер органического продукта, оборотная сторона | Organik mahsulot flayeri, orqa tomoni |

## SEO and share cards

File: `data/seo.ts`

| key | EN | RU | UZ |
|---|---|---|---|
| `seo.description` | Frontend Developer & Brand Designer in Tashkent. Websites, brand identities, and the ads that sell them. Open to freelance. | Frontend-разработчик и бренд-дизайнер в Ташкенте. Сайты, фирменный стиль и реклама, которая их продаёт. Открыт для фриланса. | Toshkentdagi frontend dasturchi va brend dizayner. Saytlar, brend uslubi va ularni sotadigan reklama. Frilansga ochiqman. |
| `seo.keywords[0]` | Azizbek Tursunov | Азизбек Турсунов | Azizbek Tursunov |
| `seo.keywords[1]` | frontend developer | frontend-разработчик | frontend dasturchi |
| `seo.keywords[2]` | brand designer | бренд-дизайнер | brend dizayner |
| `seo.keywords[3]` | web developer Tashkent | веб-разработчик Ташкент | veb-dasturchi Toshkent |
| `seo.keywords[4]` | brand identity | фирменный стиль | brend uslubi |
| `seo.keywords[5]` | Next.js developer | Next.js разработчик | Next.js dasturchi |
| `seo.keywords[6]` | Meta ads creatives | рекламные креативы Meta | Meta reklama kreativlari |
| `seo.keywords[7]` | freelance designer Uzbekistan | дизайнер на фрилансе Узбекистан | frilans dizayner Oʻzbekiston |
| `seo.keywords[8]` | portfolio | портфолио | portfolio |
| `seo.location` | Tashkent, Uzbekistan | Ташкент, Узбекистан | Toshkent, Oʻzbekiston |

