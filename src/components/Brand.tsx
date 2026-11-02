import Link from "next/link";
import styles from "./Brand.module.css";

export function Brand() {
  return (
    <Link className={styles.brand} href="/" aria-label="Abnormal 首页">
      <span className={styles.brandMark} aria-hidden="true">
        a<span>↗</span>
      </span>
      <span>
        abnormal<span className={styles.brandPeriod}>.</span>
      </span>
    </Link>
  );
}
