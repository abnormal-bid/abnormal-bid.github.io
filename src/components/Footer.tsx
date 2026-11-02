import Link from "next/link";
import { legalPages, site } from "@/data/site";
import { Brand } from "./Brand";
import { Icon } from "./Icon";
import styles from "./Footer.module.css";

export function Footer() {
  const supportEmail = site.contact.email.trim();

  return (
    <footer className={styles.siteFooter}>
      <div className="page-shell">
        <div className={styles.footerMain}>
          <div>
            <Brand />
            <p className={styles.footerTagline}>Your inbox. Your identity.</p>
          </div>
          <div>
            <p className={styles.footerLabel}>为每一次联系，找到合适的开始。</p>
            <Link className="text-link" href="/#services">
              探索邮箱服务 <Icon name="up-right" className="size-4" />
            </Link>
          </div>
          <div className={styles.footerContact}>
            <p className={styles.footerLabel}>保持联系 / CONTACT</p>
            {supportEmail && (
              <a
                className={styles.footerEmail}
                href={`mailto:${supportEmail}`}
                aria-label={`客服邮箱：${supportEmail}`}
              >
                {supportEmail}
              </a>
            )}
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} Abnormal. 让沟通更简单。</span>
          <div className={styles.footerMeta}>
            <p>邮箱服务与配置支持 · 具体方案以咨询确认为准</p>
            <nav className={styles.footerLegal} aria-label="法律信息">
              {legalPages.map(({ href, label }) => (
                <Link
                  className="transition-colors hover:text-foreground"
                  href={href}
                  key={href}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
