import Link from "next/link";
import { site, type Lang } from "@/data/site";
import { useCopy } from "@/i18n";
import { Brand } from "./Brand";
import { Icon } from "./Icon";
import styles from "./Footer.module.css";

export function Footer({ lang }: { lang: Lang }) {
  const { t, links, path } = useCopy(lang);
  const f = t.footer;
  const productLinks = f.productLinks.map(({ link, label }) => ({ href: links[link], label }));
  const supportLinks = f.supportLinks.map(({ link, label }) => ({ href: links[link], label }));
  const supportEmail = site.contact.email.trim();

  return (
    <footer className={styles.siteFooter}>
      <div className="page-shell">
        <div className={styles.footerMain}>
          <div className={styles.footerBrand}>
            <Brand lang={lang} />
            <p className={styles.footerTagline}>Your inbox. Your identity.</p>
          </div>
          <nav className={styles.footerLinks} aria-label={f.productLabel}>
            <p className={styles.footerLabel}>{f.productLabel}</p>
            <ul>
              {productLinks.map(({ href, label }) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <nav className={styles.footerLinks} aria-label={f.supportLabel}>
            <p className={styles.footerLabel}>{f.supportLabel}</p>
            <ul>
              {supportLinks.map(({ href, label }) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
              <li>
                <Link href={path("/#faq")}>{f.faq}</Link>
              </li>
            </ul>
          </nav>
          <div className={styles.footerContact}>
            <p className={styles.footerLabel}>{f.contactLabel}</p>
            {supportEmail && (
              <a className={styles.footerEmail} href={`mailto:${supportEmail}`} aria-label={f.emailAria(supportEmail)}>
                {supportEmail}
              </a>
            )}
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>{f.copyright(new Date().getFullYear())}</span>
          <div className={styles.footerMeta}>
            <p>
              <a className={styles.footerCta} href={links.shop}>
                {f.buyOnline} <Icon name="up-right" className="size-3.5" />
              </a>
            </p>
            <nav className={styles.footerLegal} aria-label={f.legalLabel}>
              {t.legalPages.map(({ path: page, label }) => (
                <Link className="transition-colors hover:text-foreground" href={path(page)} key={page}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
