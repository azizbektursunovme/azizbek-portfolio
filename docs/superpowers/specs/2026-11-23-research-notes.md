# Portfolio + CV qayta qurish rejasi (qoralama, 2026-11-23)

Holat: tadqiqot tugadi, savol-javob bosqichi. Hali hech qanday kod o'zgartirilmagan.

## 0. Topilganlar (qisqa)

**Sayt** (`azizbek-portfolio-main/`): Next.js 15, React 19, Tailwind 4 alpha, framer-motion, EN/RU/UZ.
- Kirgan odam 10 soniyada faqat ism va "design/development"ni ko'radi. Proof ham, CTA ham yo'q.
- "Featured works" kartochkalarida abstrakt gradient chiqadi, haqiqiy ishlar ko'rinmaydi (`FeaturedWorks.tsx:119-134`).
- Hamma loyihalar faqat grafik dizayn. Web, ads va AI ishlari yo'q. GFS Group umuman tilga olinmagan.
- Saytdagi tajriba CV bilan zid. Saytda "Lead Brand & Product Designer, Nuqta 2023-2024" va "Grant Invest 2021-2023" yozilgan, CV'da esa Nuqta 2024 va Grand Invest 2024.
- Texnik qarz: mojibake (`PORTFOLIO Â©`), `cursor:none`, iframe preview'lar, OG image va favicon yo'q, matnlarning bir qismi i18n'dan tashqarida.

**CV:** sarlavha "Visual & Brand Designer". GFS faqat "Frontend & Marketing Department" deb yozilgan. Meta ads, IG kontent, Higgsfield/Flow, tillar, JJR/DAVR/Hirara yo'q.

**GitHub** (`azizbektursunovme`):
| Loyiha | Holat | Live |
|---|---|---|
| Alikuloff/hirara (collab, 9/26 commit) | private | yo'q, screenshot kerak |
| jjr-transportation-website | private kod | https://jjr-transportation-website.vercel.app |
| convertboost-ai | private kod | https://convertboost-ai.vercel.app |
| MotionForge | public | https://motionforge-dun.vercel.app |
| gfs-group-redesign v1/v2 | public | GitHub Pages |
| goodideacargo-redesign | public | GitHub Pages |
| gfs-xpress / lionking / t-logistics redesign | public | GitHub Pages ("redesign seriyasi") |
| silk-road-uzbekistan | public | deploy qilinmagan |
| Alikuloff/8iz (collab, 1/5 commit, "steel gear-unit" dizayni) | private | 8iz.uz (do'kon egasiniki) |

**Assetlar:**
- DAVR: `Documents/davr-group`. Next.js sayt va to'liq brand kit (logo, guide PDF, fleet mockup) bor. Git'da remote yo'q, matnlarda hali `[placeholder]` turibdi.
- JJR: `Documents/jjr-transportation` va Desktop'dagi JJR-Logo + brand kit zip.
- Good Idea Cargo: logolar, 4x5/9x16 ad videolar, "Who we are" slaydlar.
- 8iz: Desktop/8iz (redesign HTML, apparel mockuplar).
- GFS: logo, design-system spec, 9x16 ad video.
- **Fragrise: hech narsa topilmadi.** Fayllarni siz berishingiz kerak.
- Diqqat: ItSoft-dev/davr-group-frontend'da sizning commit'ingiz yo'q, shuning uchun u ko'rsatilmaydi. Ko'rsatiladigan DAVR sayti sizning lokal repongiz.

## 1. Redesign kerakmi? Ha.
Sabab shunchaki "eski ko'rinish" emas. Hozirgi struktura sizning haqiqiy profilingizni ko'rsata olmaydi: web + brand + growth/ads + AI.
Stack (Next.js, Satoshi, i18n) saqlanadi. Hero, ishlar, case study'lar va proof qaytadan quriladi.

Yo'nalishlar (batafsil: chatda):
- **A. Operator:** minimal design-engineer uslubi (paco.me, emilkowal.ski, samuelkraft.com). 1-2 hafta.
- **B. Signal:** bold creative developer, GSAP + Lenis (dennissnellenberg.com). 3-5 hafta, xavfli.
- **C. Ledger:** editorial bento + case study (hamishw.com, laxspace.co, abhishekjha.me). 2-3 hafta. **Tavsiya.**

## 2. Rol nomi variantlari
(chatda muhokama qilinadi)

## 3. Yangi struktura (C yo'nalishi bo'yicha qoralama)
1. Hero: rol, bir qatorli taklif, "IT @ GFS Group", CTA (Ishlar / CV yuklab olish), mijoz logolari qatori
2. Bento: JJR sayt, DAVR brand, Hirara, ad reel, Meta ads raqamlari, stack/AI
3. Ishlar, 3 tab: **Web** (JJR, DAVR, Hirara, ConvertBoost, GFS redesign seriyasi, MotionForge) / **Identity** (JJR, DAVR, Good Idea Cargo, Fragrise, CleanPro, 8iz) / **Growth & Content** (Meta ads, IG, AI videolar)
4. Case study sahifalari: brief, rol, stack, jarayon, natija, screenshot + live link (iframe emas)
5. Tajriba (CV bilan bir xil, to'g'rilangan)
6. Tools: Figma, Adobe, Next.js/React/TS, Meta Ads Manager, Higgsfield, Google Flow...
7. Kontakt + CV PDF

## 4. Ish tartibi (savol-javobdan keyin)
1. Kontent: rol nomi, haqiqiy tajriba sanalari, har bir loyiha uchun brief va natija
2. Assetlar: screenshotlar (Playwright), logolar, videolarni optimallashtirish, `public/` ga yig'ish
3. DAVR: GitHub'ga private repo qilib push, Vercel preview (rozilik bo'lsa)
4. Dizayn tizimi: tokenlar, shriftlar (next/font)
5. Bo'limlarni qayta qurish, i18n (EN/RU/UZ)
6. SEO: OG image, favicon, sitemap, hreflang
7. CV yangilash, PDF, saytga ulash
8. Review: kod, a11y, Lighthouse, vizual tekshiruv

## 5. Ochiq savollar
- Portfolio kim uchun? (ish beruvchi / freelance mijoz / ikkalasi)
- Rol nomi
- Dizayn yo'nalishi
- Sanalar: Nuqta, UIC, Grand Invest. Qaysi biri to'g'ri?
- DAVR sayti ishga tushganmi (domen)? Mijozlar ishlarini ommaga ko'rsatishga rozimi?
- Fragrise fayllari qayerda?
- Meta ads natijalari (CPL, leadlar soni) ko'rsatiladimi?
- Hirara va 8iz'da aniq nima qilgansiz?
- CV formati: hozirgi dizaynni yangilash yoki yangidan qilish?
