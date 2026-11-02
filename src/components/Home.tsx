import type { Lang } from "@/data/site";
import { useCopy } from "@/i18n";
import { Faq } from "./Faq";
import { Hero } from "./Hero";
import { Icon } from "./Icon";
import { InquiryButton } from "./InquiryDialog";
import { Process } from "./Process";
import { Start } from "./Start";
import { Subscriptions } from "./Subscriptions";
import styles from "./Home.module.css";

/** 首页：src/app/(zh)/page.tsx（中文）与 src/app/(en)/en/page.tsx（英文）共用。 */
export function Home({ lang }: { lang: Lang }) {
  const { t, links } = useCopy(lang);
  return (
    <>
      <Hero lang={lang} />
      <div className={`page-shell ${styles.valueStrip}`}>
        <p>
          {t.valueStrip.lead}
          <strong>{t.valueStrip.strong}</strong>
        </p>
        <div>
          {t.valueStrip.labels.map((label) => (
            <span key={label}>
              <Icon name="spark" className="size-3.5" />
              {label}
            </span>
          ))}
        </div>
      </div>
      <Start lang={lang} />
      <Subscriptions lang={lang} />
      <Process lang={lang} />
      <Faq lang={lang} />
      <section className={`page-shell ${styles.closingSection}`} aria-labelledby="closing-title">
        <div className={styles.closingCard}>
          <div className={styles.closingDecoration} aria-hidden="true">
            <span>@</span>
          </div>
          <div className={styles.closingCopy}>
            <p className="eyebrow">Make every connection count</p>
            <h2 id="closing-title">
              {t.closing.titleLines[0]}
              {t.space}
              <br className={styles.closingBreak} />
              {t.closing.titleLines[1]}
              {t.dot}
            </h2>
            <span>{t.closing.body}</span>
          </div>
          <div className={styles.closingActions}>
            <a className={`btn btn-primary ${styles.closingButton}`} href={links.shop}>
              {t.closing.buy} <Icon name="arrow" className="size-4" />
            </a>
            <InquiryButton className={`btn btn-outline ${styles.closingButton}`}>
              {t.closing.custom} <Icon name="up-right" className="size-4" />
            </InquiryButton>
          </div>
        </div>
      </section>
    </>
  );
}
