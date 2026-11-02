import type { Lang } from "@/data/site";
import { useCopy } from "@/i18n";
import { Icon } from "./Icon";
import { InquiryButton } from "./InquiryDialog";
import styles from "./Faq.module.css";

export function Faq({ lang }: { lang: Lang }) {
  const { t } = useCopy(lang);
  return (
    <section className={`page-shell section-space ${styles.faqSection}`} id="faq" aria-labelledby="faq-title">
      <div className={styles.faqIntro}>
        <p className="eyebrow">
          <span className="mr-1 tabular-nums">04 /</span>Good questions
        </p>
        <h2 className="section-title" id="faq-title">
          {t.faq.title}
          <span className="text-signal">{t.dot}</span>
        </h2>
        <p className={styles.faqDescription}>{t.faq.description}</p>
        <InquiryButton className={`text-link ${styles.faqContact}`}>
          {t.faq.contact} <Icon name="up-right" className="size-4" />
        </InquiryButton>
      </div>
      <div className={styles.faqList}>
        {t.faq.items.map(({ question, answer }, index) => (
          <details className={styles.faqItem} key={question}>
            <summary>
              <span className={styles.faqNumber} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.faqQuestion}>{question}</span>
              <span className={styles.faqToggle}>
                <Icon name="plus" className="size-4" />
              </span>
            </summary>
            <p className={styles.faqAnswer}>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
