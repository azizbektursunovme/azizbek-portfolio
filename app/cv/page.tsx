import type { Metadata } from "next";
import Link from "next/link";
import QRCode from "qrcode";
import { fontVariables } from "@/app/fonts";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { getProject } from "@/data/projects";
import type { Project } from "@/data/types";
import { tr } from "@/lib/localize";
import { SITE_URL } from "@/lib/site";
import "./cv.css";

/*
 * The CV as an A4 page. scripts/export-cv.ts prints it to
 * public/Azizbek_Tursunov_CV.pdf, which every "Download CV" link points to.
 * English only. It lives outside [lang], and the root layout only passes
 * children through, so this page brings its own <html> and <body>.
 * Every line comes from data/profile.ts, data/experience.ts and data/projects.ts.
 */

const TITLE = `${profile.name} — CV`;
const DESCRIPTION = `CV of ${profile.name}, ${profile.title} in Tashkent.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: profile.name }],
  alternates: { canonical: "/cv" },
  openGraph: { type: "profile", url: `${SITE_URL}/cv`, title: TITLE, description: DESCRIPTION, siteName: profile.name },
};

const SELECTED = ["jjr-transportation", "davr-group", "hirara", "8iz", "fragrise", "convertboost-ai"];
const SITE_HOST = new URL(SITE_URL).host;

/** "https://www.example.com/a/" -> "example.com/a" */
const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** "IT Department · Frontend Developer & Brand Designer" -> department and role. */
function splitRole(role: string): { unit?: string; title: string } {
  const at = role.indexOf(" · ");
  return at === -1 ? { title: role } : { unit: role.slice(0, at), title: role.slice(at + 3) };
}

function Section({ title, children, id }: { title: string; children: React.ReactNode; id: string }) {
  return (
    <section className="cv-section" aria-labelledby={id}>
      <h2 id={id} className="cv-h2">
        {title}
      </h2>
      <div className="cv-body">{children}</div>
    </section>
  );
}

/** Bold name with its role or detail beside it, in muted ink. */
function Headline({ name, detail }: { name: string; detail?: string }) {
  return (
    <h3 className="cv-headline">
      <span className="cv-h3">{name}</span>
      {detail ? <span className="cv-role">{detail}</span> : null}
    </h3>
  );
}

function Years({ children }: { children: string }) {
  return <span className="cv-years">{children}</span>;
}

function ProjectRow({ p }: { p: Project }) {
  const live = p.links.liveStatus === "live" && p.links.live ? p.links.live : undefined;
  const context = p.context ? tr(p.context, "en") : undefined;
  return (
    <li className="cv-project">
      <span className="cv-project-name">{p.title}</span>
      <span className="cv-project-role">
        {tr(p.role, "en")}
        {context ? (
          <>
            .{" "}
            <span className="cv-muted cv-context">{context}</span>
          </>
        ) : null}
      </span>
      {live ? (
        <a className="cv-project-link" href={live}>
          {bare(live)}
        </a>
      ) : (
        <span className="cv-project-link cv-muted">Launching soon</span>
      )}
    </li>
  );
}

export default async function CvPage() {
  const qr = await QRCode.toString(SITE_URL, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#151515ff", light: "#ffffff00" },
  });

  const onSite = experience.filter((e) => e.showOnSite);
  const additional = experience.filter((e) => !e.showOnSite);
  const selected = SELECTED.map((s) => getProject(s)).filter((p): p is Project => p !== undefined);

  return (
    <html lang="en" className={`${fontVariables} cv-html`}>
      <body className="cv-root">
        <nav className="cv-toolbar" aria-label="CV">
          <Link href="/en">Portfolio</Link>
          <a href={profile.cvPath} download>
            Download PDF
          </a>
        </nav>

        <main className="cv-sheet">
          <header className="cv-head">
            <div className="cv-id">
              <h1 className="cv-name">{profile.name}</h1>
              <p className="cv-title">{profile.title}</p>
              <p className="cv-tagline">{tr(profile.tagline, "en")}</p>
            </div>

            <dl className="cv-contact">
              <dt>Based in</dt>
              <dd>Tashkent, Uzbekistan</dd>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </dd>
              <dt>Telegram</dt>
              <dd>
                <a href={profile.telegram}>{bare(profile.telegram)}</a>
              </dd>
              <dt>Instagram</dt>
              <dd>
                <a href={profile.instagram}>{bare(profile.instagram)}</a>
              </dd>
              <dt>Portfolio</dt>
              <dd>
                <a href={SITE_URL}>{SITE_HOST}</a>
              </dd>
            </dl>

            <figure className="cv-qr" data-testid="cv-qr">
              <div aria-hidden="true" dangerouslySetInnerHTML={{ __html: qr }} />
              <figcaption>Scan for the portfolio</figcaption>
            </figure>
          </header>

          <Section title="Profile" id="cv-profile">
            <p className="cv-summary">
              {tr(profile.bio, "en")[0]} <span className="cv-strong">{tr(profile.openTo, "en")}.</span>
            </p>
          </Section>

          <Section title="Experience" id="cv-experience">
            <ol className="cv-list">
              {onSite.map((e) => {
                const { unit, title } = splitRole(tr(e.role, "en"));
                const points = tr(e.points, "en");
                return (
                  <li key={e.company} className="cv-entry" data-testid="cv-xp">
                    <div className="cv-row">
                      <Headline name={unit ? `${e.company} — ${unit}` : e.company} detail={title} />
                      <Years>{e.years}</Years>
                    </div>
                    {points.length > 0 ? (
                      <ul className="cv-points">
                        {points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </Section>

          <Section title="Selected work" id="cv-work">
            <ul className="cv-projects">
              {selected.map((p) => (
                <ProjectRow key={p.slug} p={p} />
              ))}
            </ul>
          </Section>

          <Section title="Skills & tools" id="cv-tools">
            <dl className="cv-pairs">
              {profile.tools.map((g) => (
                <div key={g.group} className="cv-pair">
                  <dt>{g.group}</dt>
                  <dd>{g.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="Education" id="cv-education">
            <ol className="cv-list cv-list-tight">
              {profile.education.map((ed) => (
                <li key={ed.school} className="cv-entry">
                  <div className="cv-row">
                    <Headline name={ed.school} detail={ed.detail} />
                    <Years>{ed.years}</Years>
                  </div>
                  {ed.roles?.map((r) => (
                    <div key={r.title} className="cv-row cv-subrow">
                      <p className="cv-role">{r.title}</p>
                      <Years>{r.years}</Years>
                    </div>
                  ))}
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Languages" id="cv-languages">
            <ul className="cv-langs">
              {profile.languages.map((l) => (
                <li key={l.name}>
                  <span className="cv-strong">{l.name}</span> {l.level}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Additional" id="cv-additional">
            <ul className="cv-list cv-list-tight">
              {additional.map((e) => (
                <li key={e.company} className="cv-entry">
                  <div className="cv-row">
                    <Headline name={e.company} detail={tr(e.role, "en")} />
                    <Years>{e.years}</Years>
                  </div>
                </li>
              ))}
            </ul>
          </Section>
        </main>
      </body>
    </html>
  );
}
