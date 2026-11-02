import Link from "next/link";
import { Icon } from "./Icon";
import styles from "./Hero.module.css";

const promises = ["费用提前确认", "按需选择方案", "专人协助配置"];

export function Hero() {
  return (
    <section
      className={`page-shell ${styles.hero}`}
      aria-labelledby="hero-title"
    >
      <div className={styles.heroCopy}>
        <p className={`eyebrow ${styles.heroEyebrow}`}>Email, made personal</p>
        <h1 id="hero-title">
          好用的邮箱，
          <br />
          <span className={styles.heroSecondLine}>
            沟通更简单<span className={styles.heroPeriod}>。</span>
          </span>
        </h1>
        <p className={styles.heroDescription}>
          一个邮箱，连接日常与工作。
          <br />
          从个人收发到团队协作，找到适合你的邮箱方案。
        </p>
        <div className={styles.heroActions}>
          <Link className="btn btn-primary" href="/#services">
            探索邮箱服务 <Icon name="arrow" className="size-4" />
          </Link>
          <a className="text-link" href="#how-it-works">
            了解服务流程 <Icon name="up-right" className="size-4" />
          </a>
        </div>
        <div className={styles.heroPromises}>
          {promises.map((promise) => (
            <span key={promise}>
              <Icon name="check" className="size-3.5" />
              {promise}
            </span>
          ))}
        </div>
      </div>

      <div
        className={styles.heroVisual}
        role="img"
        aria-label="邮箱服务概念示意：清晰的收件箱和专属域名地址，连接日常与工作。"
      >
        <div className={styles.visualOrbit} aria-hidden="true"></div>
        <span
          className={`${styles.visualPlus} ${styles.plusOne}`}
          aria-hidden="true"
        >
          +
        </span>
        <span
          className={`${styles.visualPlus} ${styles.plusTwo}`}
          aria-hidden="true"
        >
          +
        </span>
        <div className={styles.identityNote} aria-hidden="true">
          <span className={styles.noteBrand}>
            a<Icon name="up-right" />
          </span>
          <span>
            GOOD MAIL.
            <br />
            GOOD DAYS.
          </span>
          <span className={styles.noteFlower}>✳</span>
        </div>
        <div className={styles.inboxWindow} aria-hidden="true">
          <div className={styles.windowChrome}>
            <span className={styles.windowDots}>
              <i></i>
              <i></i>
              <i></i>
            </span>
            <span>YOUR EVERYDAY INBOX</span>
            <Icon name="shield" className="size-3.5" />
          </div>
          <div className={styles.inboxBody}>
            <div className={styles.inboxHeading}>
              <div>
                <span className={styles.inboxOverline}>
                  A LITTLE MORE CONNECTED
                </span>
                <p>
                  每一封，都有归处<span>。</span>
                </p>
              </div>
              <span className={styles.inboxAvatar}>a.</span>
            </div>
            <div className={styles.inboxTabs}>
              <span>
                收件箱 <b>03</b>
              </span>
              <span>星标邮件</span>
              <Icon name="plus" className="size-4" />
            </div>
            <div className={styles.mailRow}>
              <span className={`${styles.mailAvatar} ${styles.avatarSage}`}>
                <Icon name="spark" />
              </span>
              <div>
                <strong>新的连接，新的可能。</strong>
                <span>让每一次沟通，都成为美好的开始。</span>
              </div>
              <span className={styles.mailTime}>
                09:41<span className={styles.unreadDot}></span>
              </span>
            </div>
            <div className={styles.mailRow}>
              <span className={styles.mailAvatar}>
                <Icon name="chat" />
              </span>
              <div>
                <strong>关于我们的下一个计划</strong>
                <span>灵感、想法，还有期待已久的好消息。</span>
              </div>
              <span className={styles.mailTime}>昨天</span>
            </div>
            <div className={`${styles.mailRow} ${styles.lastMail}`}>
              <span className={styles.mailAvatar}>
                <Icon name="check" />
              </span>
              <div>
                <strong>一切就绪，开始吧。</strong>
                <span>你的日常，从一个顺手的邮箱开始。</span>
              </div>
              <span className={styles.mailTime}>昨天</span>
            </div>
          </div>
        </div>
        <div className={styles.domainNote} aria-hidden="true">
          <span className={styles.domainAt}>@</span>
          <div>
            <span>你的名字，就是你的地址</span>
            <strong>
              hello@<span>yourname</span>.com
            </strong>
          </div>
          <span className={styles.domainCheck}>
            <Icon name="check" className="size-3.5" />
          </span>
        </div>
        <p className={styles.visualCaption} aria-hidden="true">
          <span></span> YOUR INBOX. YOUR IDENTITY.{" "}
          <span className={styles.demoLabel}>概念示意</span>
        </p>
      </div>
    </section>
  );
}
