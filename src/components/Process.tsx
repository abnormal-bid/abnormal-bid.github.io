import type { Lang } from "@/data/site";
import { useCopy } from "@/i18n";
import { Icon } from "./Icon";
import styles from "./Process.module.css";

export function Process({ lang }: { lang: Lang }) {
  const { t, links } = useCopy(lang);
  return (
    <section className={styles.processSection} id="how-it-works" aria-labelledby="process-title">
      <div className="page-shell section-space">
        <div className={styles.processHeading}>
          <div>
            <p className="eyebrow">
              <span className="mr-1 tabular-nums">03 /</span>A simple way to get started
            </p>
            <h2 className="section-title" id="process-title">
              {t.process.title}
              <span className="text-signal">{t.dot}</span>
            </h2>
          </div>
          <p className={styles.processIntro}>
            {t.process.intro[0]}
            {t.space}
            <br className="hidden md:block" />
            {t.process.intro[1]}
          </p>
        </div>
        <div className={styles.processGrid}>
          {t.process.steps.map((step, index) => (
            <article className={styles.processStep} key={step.title}>
              <div className={styles.stepTopline}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.stepLine} aria-hidden="true"></span>
                <span className={styles.stepIcon}>
                  <Icon name={step.icon} />
                </span>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
              <a className={`text-link ${styles.stepLink}`} href={links[step.link]}>
                {step.action} <Icon name="up-right" className="size-3.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
