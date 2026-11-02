import Link from "next/link";
import { legalPages, site } from "@/data/site";
import { getTelegramUrl } from "@/lib/inquiry";
import type { LegalDocument as LegalContent } from "@/lib/legal";
import { Icon } from "./Icon";
import styles from "./LegalDocument.module.css";

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  dateStyle: "long",
  timeZone: "UTC",
});
const formatDate = (value: string) =>
  dateFormatter.format(new Date(`${value}T00:00:00Z`));

export function LegalDocument({
  document,
  href: currentHref,
}: {
  document: LegalContent;
  href: string;
}) {
  const {
    title,
    eyebrow,
    summary,
    effective,
    updated,
    highlights,
    headings,
    html,
  } = document;
  const relatedPages = legalPages.filter(({ href }) => href !== currentHref);
  const sections = [...headings, { slug: "contact", text: "联系我们" }];

  const email = site.contact.email.trim();
  const wechat = site.contact.wechat.trim();
  const telegram = getTelegramUrl(site.contact.telegram);
  const contacts: { label: string; value: string; href?: string }[] = [];
  if (email)
    contacts.push({ label: "邮箱", value: email, href: `mailto:${email}` });
  if (wechat) contacts.push({ label: "微信", value: wechat });
  if (telegram)
    contacts.push({ label: "Telegram", value: telegram, href: telegram });

  return (
    <>
      <section className={styles.legalHero} aria-labelledby="legal-title">
        <div className={`page-shell ${styles.legalHeroInner}`}>
          <div className={styles.legalHeroCopy}>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className={styles.legalTitle} id="legal-title">
              {title}
              <span className="text-brand">。</span>
            </h1>
            <p className={styles.legalSummary}>{summary}</p>
          </div>
          <dl className={styles.legalDates}>
            <div>
              <dt>生效日期</dt>
              <dd>
                <time dateTime={effective}>{formatDate(effective)}</time>
              </dd>
            </div>
            <div>
              <dt>最后更新</dt>
              <dd>
                <time dateTime={updated}>{formatDate(updated)}</time>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <div className={`page-shell section-space ${styles.legalLayout}`}>
        <aside className={styles.legalSidebar}>
          <nav aria-label="目录">
            <p className={styles.legalNavLabel}>
              本页目录 <span>CONTENTS</span>
            </p>
            <ol className={styles.legalNavList}>
              {sections.map(({ slug, text }, index) => (
                <li key={slug}>
                  <a className={styles.legalNavLink} href={`#${slug}`}>
                    <span className={styles.legalNavNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="min-w-0">
          <div className={styles.legalHighlights}>
            <div className={styles.highlightsHeading}>
              <p className={styles.highlightsLabel}>要点速览</p>
              <p className={styles.highlightsNote}>
                摘要仅供快速了解，具体以正文为准。
              </p>
            </div>
            <ul className={styles.highlightsList}>
              {highlights.map((item) => (
                <li key={item}>
                  <Icon
                    name="check"
                    className="mt-1 size-4 shrink-0 text-foreground"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.legalBody}>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <section id="contact">
              <h2>联系我们</h2>
              <p>
                如对本{title}
                有任何疑问，或需要查询、更正、删除你的信息，请通过以下方式联系我们。为便于处理，请说明你的诉求及相关订单信息；请勿在消息中发送密码、验证码或支付卡信息。
              </p>
              {contacts.length > 0 ? (
                <ul>
                  {contacts.map(({ label, value, href }) => (
                    <li key={label}>
                      {label}：
                      {href ? (
                        <a
                          href={href}
                          rel={
                            href.startsWith("mailto:")
                              ? undefined
                              : "noopener noreferrer"
                          }
                        >
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>联系渠道即将公布，公布后会更新在本页面。</p>
              )}
            </section>
          </div>

          <nav className={styles.legalRelated} aria-label="相关页面">
            {relatedPages.map(({ href, label }) => (
              <Link className="text-link" href={href} key={href}>
                另见 {label} <Icon name="up-right" className="size-4" />
              </Link>
            ))}
            <Link className="text-link" href="/">
              返回首页 <Icon name="arrow" className="size-4" />
            </Link>
          </nav>
        </article>
      </div>
    </>
  );
}
