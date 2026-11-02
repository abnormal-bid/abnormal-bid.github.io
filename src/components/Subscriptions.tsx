import { otherProduct, products } from "@/data/site";
import { Icon } from "./Icon";
import { InquiryButton } from "./InquiryDialog";
import { ProductCard } from "./ProductCard";
import styles from "./Subscriptions.module.css";

export function Subscriptions() {
  return (
    <section
      className={styles.servicesSection}
      id="services"
      aria-labelledby="services-title"
    >
      <div className="page-shell section-space">
        <div className={styles.servicesHeading}>
          <div>
            <p className="eyebrow">
              <span className="mr-1 tabular-nums">01 /</span> Find your email
            </p>
            <h2 className="section-title" id="services-title">
              总有一个邮箱，
              <br className={styles.mobileBreak} />
              适合你的日常<span className="text-brand">。</span>
            </h2>
          </div>
          <p className={styles.servicesIntro}>
            从一人的灵感，到一群人的协作。
            <br />
            选一项想了解的服务，聊聊你的邮箱需求。
          </p>
        </div>
        <div className={styles.servicesGrid}>
          {products.map((product, index) => (
            <ProductCard product={product} index={index} key={product.name} />
          ))}
        </div>
        <div className={styles.servicesNote}>
          <p>
            <Icon name="chat" className="size-4" />
            有其他邮箱或团队配置需求？
            <InquiryButton product={otherProduct}>
              和我们聊聊 <Icon name="up-right" className="size-3" />
            </InquiryButton>
          </p>
          <span>具体服务方案及费用，以咨询确认为准。</span>
        </div>
      </div>
    </section>
  );
}
