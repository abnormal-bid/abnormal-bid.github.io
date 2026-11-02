import { processSteps } from "@/data/site";
import { Icon } from "./Icon";
import styles from "./Process.module.css";

export function Process() {
  return (
    <section
      className={styles.processSection}
      id="how-it-works"
      aria-labelledby="process-title"
    >
      <div className="page-shell section-space">
        <div className={styles.processHeading}>
          <div>
            <p className="eyebrow">
              <span className="mr-1 tabular-nums">02 /</span>A simple way to get
              started
            </p>
            <h2 className="section-title" id="process-title">
              三步，开始使用你的邮箱<span className="text-brand">。</span>
            </h2>
          </div>
          <p className={styles.processIntro}>
            从需求到配置，
            <br className="hidden md:block" />
            每一步都先和你说清楚。
          </p>
        </div>
        <div className={styles.processGrid}>
          {processSteps.map((step, index) => (
            <article className={styles.processStep} key={step.title}>
              <div className={styles.stepTopline}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.stepLine} aria-hidden="true"></span>
                <span className={styles.stepIcon}>
                  <Icon name={step.icon} />
                </span>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
