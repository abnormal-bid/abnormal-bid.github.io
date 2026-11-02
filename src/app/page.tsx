import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Icon } from "@/components/Icon";
import { InquiryButton } from "@/components/InquiryDialog";
import { Process } from "@/components/Process";
import { Subscriptions } from "@/components/Subscriptions";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = pageMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className={`page-shell ${styles.valueStrip}`}>
        <p>
          少一点配置的麻烦。<strong>多一点沟通的从容。</strong>
        </p>
        <div>
          {["日常收发", "专属域名", "团队协作", "配置支持"].map((label) => (
            <span key={label}>
              <Icon name="spark" className="size-3.5" />
              {label}
            </span>
          ))}
        </div>
      </div>
      <Subscriptions />
      <Process />
      <Faq />
      <section
        className={`page-shell ${styles.closingSection}`}
        aria-labelledby="closing-title"
      >
        <div className={styles.closingCard}>
          <div className={styles.closingDecoration} aria-hidden="true">
            <span>@</span>
          </div>
          <div className={styles.closingCopy}>
            <p className="eyebrow">Make every connection count</p>
            <h2 id="closing-title">
              下一封邮件，
              <br className={styles.closingBreak} />
              从这里开始。
            </h2>
            <span>聊聊你的使用场景，一起找到合适的邮箱方案。</span>
          </div>
          <InquiryButton className={`btn btn-primary ${styles.closingButton}`}>
            聊聊邮箱需求 <Icon name="up-right" className="size-4" />
          </InquiryButton>
        </div>
      </section>
    </>
  );
}
