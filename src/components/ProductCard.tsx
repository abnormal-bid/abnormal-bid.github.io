import type { Product } from "@/data/site";
import { Icon } from "./Icon";
import { InquiryButton } from "./InquiryDialog";
import styles from "./ProductCard.module.css";

const symbols = ["mail", "domain", "team", "settings"];

export function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const symbol = symbols[index];

  return (
    <article
      className={`${styles.productCard} ${product.featured ? styles.isFeatured : ""}`}
      data-product={product.name}
    >
      <div className={styles.cardTop}>
        <span
          className={`${styles.productSymbol} ${symbol === "domain" ? styles.symbolDomain : ""}`}
          aria-hidden="true"
        >
          {symbol === "mail" ? (
            <svg viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <path d="m4 7 8 6 8-6" />
            </svg>
          ) : symbol === "domain" ? (
            <span>@</span>
          ) : symbol === "team" ? (
            <svg viewBox="0 0 24 24">
              <circle cx="9" cy="8" r="3" />
              <path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6m3 9v-2a6 6 0 0 0-2-4" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              <path d="M5 4v9m0 4v3m7-16v3m0 4v9m7-16v9m0 4v3" />
              <circle cx="5" cy="15" r="2" />
              <circle cx="12" cy="9" r="2" />
              <circle cx="19" cy="15" r="2" />
            </svg>
          )}
        </span>
        <span className={styles.productCategory}>{product.category}</span>
      </div>
      <h3>
        {product.name}
        <span aria-hidden="true">0{index + 1}</span>
      </h3>
      <p className={styles.productDescription}>{product.description}</p>
      <div className={styles.productTags}>
        {product.tags.map((tag) => (
          <span key={tag}>
            <Icon name="check" className="size-3" />
            {tag}
          </span>
        ))}
      </div>
      <div className={styles.productPrice}>
        <strong data-price>{product.price || "咨询报价"}</strong>
        <span data-price-note>{product.priceNote}</span>
      </div>
      <InquiryButton
        className={`btn ${styles.productAction} ${product.featured ? "btn-primary" : "btn-outline"}`}
        product={product.name}
        aria-label={`咨询这项服务：${product.name}`}
      >
        咨询这项服务 <Icon name="up-right" className="size-4" />
      </InquiryButton>
    </article>
  );
}
