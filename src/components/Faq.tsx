import { faqs } from "@/data/site";
import { Icon } from "./Icon";
import { InquiryButton } from "./InquiryDialog";
import styles from "./Faq.module.css";

export function Faq() {
  return (
    <section
      className={`page-shell section-space ${styles.faqSection}`}
      id="faq"
      aria-labelledby="faq-title"
    >
      <div className={styles.faqIntro}>
        <p className="eyebrow">
          <span className="mr-1 tabular-nums">03 /</span>Good questions
        </p>
        <h2 className="section-title" id="faq-title">
          你可能还想知道<span className="text-brand">。</span>
        </h2>
        <p className={styles.faqDescription}>关于邮箱，先把问题说清楚。</p>
        <InquiryButton className={`text-link ${styles.faqContact}`}>
          其他问题，聊聊看 <Icon name="up-right" className="size-4" />
        </InquiryButton>
      </div>
      <div className={styles.faqList}>
        {faqs.map(({ question, answer }, index) => (
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
