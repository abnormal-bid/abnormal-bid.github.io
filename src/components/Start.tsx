import { site, type Lang } from "@/data/site";
import { useCopy } from "@/i18n";
import { Icon } from "./Icon";
import styles from "./Start.module.css";

export function Start({ lang }: { lang: Lang }) {
  const { t, links } = useCopy(lang);
  const s = t.start;
  const supportEmail = site.contact.email.trim();

  return (
    <section className={styles.startSection} id="start" aria-labelledby="start-title">
      <div className="page-shell section-space">
        <div className={styles.startHeading}>
          <div>
            <p className="eyebrow">
              <span className="mr-1 tabular-nums">01 /</span> Start here
            </p>
            <h2 className="section-title" id="start-title">
              {s.title}
              <span className="text-signal">{t.dot}</span>
            </h2>
          </div>
          <p className={styles.startIntro}>
            {s.intro[0]}
            {t.space}
            <br className="hidden md:block" />
            {s.intro[1]}
          </p>
        </div>
        <div className={styles.startGrid}>
          {s.entries.map((entry, index) => (
            <a
              className={`${styles.startCard} ${entry.primary ? styles.isPrimary : ""}`}
              href={links[entry.link]}
              key={entry.title}
            >
              <span className={styles.startTop}>
                <span className={styles.startIcon} aria-hidden="true">
                  <Icon name={entry.icon} className="size-5" />
                </span>
                <span className={styles.startEyebrow}>{entry.eyebrow}</span>
              </span>
              <span className={styles.startTitle}>
                {entry.title}
                <span aria-hidden="true">0{index + 1}</span>
              </span>
              <span className={styles.startDescription}>{entry.description}</span>
              <span className={styles.startAction}>
                {entry.action}
                <Icon name="up-right" className="size-4" />
              </span>
            </a>
          ))}
        </div>
        <div className={styles.startMore}>
          {s.secondary.map(({ link, label }) => (
            <a className="text-link" href={links[link]} key={link}>
              {label} <Icon name="up-right" className="size-3.5" />
            </a>
          ))}
          {supportEmail && (
            <a className="text-link" href={`mailto:${supportEmail}`}>
              {s.support} {supportEmail}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
