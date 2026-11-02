import type { Lang } from "@/data/site";
import { useCopy } from "@/i18n";
import { Icon } from "./Icon";
import styles from "./Hero.module.css";

const avatars = [
  { className: styles.avatarSage, icon: "spark" },
  { className: "", icon: "chat" },
  { className: "", icon: "check" },
] as const;

export function Hero({ lang }: { lang: Lang }) {
  const { t, links } = useCopy(lang);
  const h = t.hero;

  return (
    <section className={`page-shell ${styles.hero}`} aria-labelledby="hero-title">
      <div className={styles.heroCopy}>
        <p className={`eyebrow ${styles.heroEyebrow}`}>Email, made personal</p>
        <h1 id="hero-title">
          {h.titleLines[0]}
          <br />
          <span className={styles.heroSecondLine}>
            {h.titleLines[1]}
            <span className={styles.heroPeriod}>{t.dot}</span>
          </span>
        </h1>
        <p className={styles.heroDescription}>
          {h.description[0]}
          <br />
          {h.description[1]}
        </p>
        <div className={styles.heroActions}>
          <a className="btn btn-primary" href={links.shop}>
            {h.buy} <Icon name="arrow" className="size-4" />
          </a>
          <a className="btn btn-outline" href={links.redeem}>
            {h.haveCode} <Icon name="up-right" className="size-4" />
          </a>
        </div>
        <p className={styles.heroLogin}>
          {h.loginPrompt}
          <a className="text-link" href={links.webmail}>
            {h.loginLink} <Icon name="up-right" className="size-3.5" />
          </a>
        </p>
        <div className={styles.heroPromises}>
          {h.promises.map((promise) => (
            <span key={promise}>
              <Icon name="check" className="size-3.5" />
              {promise}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.heroVisual} role="img" aria-label={h.visualLabel}>
        <div className={styles.visualOrbit} aria-hidden="true"></div>
        <span className={`${styles.visualPlus} ${styles.plusOne}`} aria-hidden="true">
          +
        </span>
        <span className={`${styles.visualPlus} ${styles.plusTwo}`} aria-hidden="true">
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
                <span className={styles.inboxOverline}>{h.mock.overline}</span>
                <p>
                  {h.mock.heading}
                  <span>{t.dot}</span>
                </p>
              </div>
              <span className={styles.inboxAvatar}>a.</span>
            </div>
            <div className={styles.inboxTabs}>
              <span>
                {h.mock.inbox} <b>03</b>
              </span>
              <span>{h.mock.starred}</span>
              <Icon name="plus" className="size-4" />
            </div>
            {h.mock.mails.map((mail, index) => (
              <div
                className={`${styles.mailRow} ${index === h.mock.mails.length - 1 ? styles.lastMail : ""}`}
                key={mail.title}
              >
                <span className={`${styles.mailAvatar} ${avatars[index]?.className ?? ""}`}>
                  <Icon name={avatars[index]?.icon ?? "spark"} />
                </span>
                <div>
                  <strong>{mail.title}</strong>
                  <span>{mail.body}</span>
                </div>
                <span className={styles.mailTime}>
                  {mail.time}
                  {index === 0 && <span className={styles.unreadDot} />}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.domainNote} aria-hidden="true">
          <span className={styles.domainAt}>@</span>
          <div>
            <span>{h.mock.domainNote}</span>
            <strong>
              hello@<span>yourname</span>.com
            </strong>
          </div>
          <span className={styles.domainCheck}>
            <Icon name="check" className="size-3.5" />
          </span>
        </div>
        <p className={styles.visualCaption} aria-hidden="true">
          <span></span> YOUR INBOX. YOUR IDENTITY. <span className={styles.demoLabel}>{h.mock.demoLabel}</span>
        </p>
      </div>
    </section>
  );
}
