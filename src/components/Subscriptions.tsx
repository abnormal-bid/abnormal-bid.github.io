import type { Lang } from "@/data/site";
import { useCopy } from "@/i18n";
import { Icon } from "./Icon";
import { InquiryButton } from "./InquiryDialog";
import { ProductCard } from "./ProductCard";
import styles from "./Subscriptions.module.css";

export function Subscriptions({ lang }: { lang: Lang }) {
  const { t } = useCopy(lang);
  const s = t.services;

  return (
    <section className={styles.servicesSection} id="services" aria-labelledby="services-title">
      <div className="page-shell section-space">
        <div className={styles.servicesHeading}>
          <div>
            <p className="eyebrow">
              <span className="mr-1 tabular-nums">02 /</span> Find your email
            </p>
            <h2 className="section-title" id="services-title">
              {s.titleLines[0]}
              {t.space}
              <br className={styles.mobileBreak} />
              {s.titleLines[1]}
              <span className="text-signal">{t.dot}</span>
            </h2>
          </div>
          <p className={styles.servicesIntro}>
            {s.intro[0]}
            <br />
            {s.intro[1]}
          </p>
        </div>
        <div className={styles.servicesGrid}>
          {s.products.map((product, index) => (
            <ProductCard lang={lang} product={product} index={index} key={product.name} />
          ))}
        </div>
        <div className={styles.servicesNote}>
          <p>
            <Icon name="chat" className="size-4" />
            {s.noteQuestion}
            <InquiryButton product={t.inquiry.otherProduct}>
              {s.noteAction} <Icon name="up-right" className="size-3" />
            </InquiryButton>
          </p>
          <span>{s.noteFine}</span>
        </div>
      </div>
    </section>
  );
}
