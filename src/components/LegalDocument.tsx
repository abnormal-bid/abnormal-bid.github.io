import Link from "next/link";
import { site, type Lang } from "@/data/site";
import { useCopy } from "@/i18n";
import { getTelegramUrl } from "@/lib/inquiry";
import type { LegalDocument as LegalContent } from "@/lib/legal";
import { Icon } from "./Icon";
import styles from "./LegalDocument.module.css";

export function LegalDocument({
  lang,
  document,
  href: currentPage,
}: {
  lang: Lang;
  document: LegalContent;
  /** 不带语言前缀的页面路径，如 /privacy/。 */
  href: string;
}) {
  const { title, eyebrow, summary, effective, updated, highlights, headings, html } = document;
  const { t, path } = useCopy(lang);
  const l = t.legal;
  const relatedPages = t.legalPages.filter(({ path: page }) => page !== currentPage);
  const sections = [...headings, { slug: "contact", text: l.contactTitle }];

  const dateFormatter = new Intl.DateTimeFormat(l.dateLocale, { dateStyle: "long", timeZone: "UTC" });
  const formatDate = (value: string) => dateFormatter.format(new Date(`${value}T00:00:00Z`));

  const email = site.contact.email.trim();
  const wechat = site.contact.wechat.trim();
  const telegram = getTelegramUrl(site.contact.telegram);
  const contacts: { label: string; value: string; href?: string }[] = [];
  if (email) contacts.push({ label: l.contactLabels.email, value: email, href: `mailto:${email}` });
  if (wechat) contacts.push({ label: l.contactLabels.wechat, value: wechat });
  if (telegram) contacts.push({ label: l.contactLabels.telegram, value: telegram, href: telegram });

  return (
    <>
      <section className={styles.legalHero} aria-labelledby="legal-title">
        <div className={`page-shell ${styles.legalHeroInner}`}>
          <div className={styles.legalHeroCopy}>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className={styles.legalTitle} id="legal-title">
              {title}
              <span className="text-signal">{t.dot}</span>
            </h1>
            <p className={styles.legalSummary}>{summary}</p>
          </div>
          <dl className={styles.legalDates}>
            <div>
              <dt>{l.effective}</dt>
              <dd>
                <time dateTime={effective}>{formatDate(effective)}</time>
              </dd>
            </div>
            <div>
              <dt>{l.updated}</dt>
              <dd>
                <time dateTime={updated}>{formatDate(updated)}</time>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <div className={`page-shell section-space ${styles.legalLayout}`}>
        <aside className={styles.legalSidebar}>
          <nav aria-label={l.tocLabel}>
            <p className={styles.legalNavLabel}>
              {l.tocHint} <span>CONTENTS</span>
            </p>
            <ol className={styles.legalNavList}>
              {sections.map(({ slug, text }, index) => (
                <li key={slug}>
                  <a className={styles.legalNavLink} href={`#${slug}`}>
                    <span className={styles.legalNavNumber}>{String(index + 1).padStart(2, "0")}</span>
                    {text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="min-w-0">
          <div className={styles.legalHighlights}>
            <div className={styles.highlightsHeading}>
              <p className={styles.highlightsLabel}>{l.highlights}</p>
              <p className={styles.highlightsNote}>{l.highlightsNote}</p>
            </div>
            <ul className={styles.highlightsList}>
              {highlights.map((item) => (
                <li key={item}>
                  <Icon name="check" className="mt-1 size-4 shrink-0 text-foreground" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.legalBody}>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <section id="contact">
              <h2>{l.contactTitle}</h2>
              <p>{l.contactBody(title)}</p>
              {contacts.length > 0 ? (
                <ul>
                  {contacts.map(({ label, value, href }) => (
                    <li key={label}>
                      {label}
                      {l.colon}
                      {href ? (
                        <a href={href} rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}>
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{l.contactPending}</p>
              )}
            </section>
          </div>

          <nav className={styles.legalRelated} aria-label={l.relatedLabel}>
            {relatedPages.map(({ path: page, label }) => (
              <Link className="text-link" href={path(page)} key={page}>
                {l.seeAlso(label)} <Icon name="up-right" className="size-4" />
              </Link>
            ))}
            <Link className="text-link" href={path("/")}>
              {l.backHome} <Icon name="arrow" className="size-4" />
            </Link>
          </nav>
        </article>
      </div>
    </>
  );
}
