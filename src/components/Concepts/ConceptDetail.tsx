import type { Concept } from "../../data/concepts";
import styles from "./ConceptDetail.module.css";

type Props = {
  concept: Concept;
};

export function ConceptDetail({ concept }: Props) {
  return (
    <div className={styles.detail}>
      <h2 className={styles.title}>
        <span className={styles.icon}>{concept.icon}</span>
        {concept.title}
      </h2>

      {concept.sections.map((section, i) => (
        <section key={i} className={styles.section}>
          <h3 className={styles.sectionHeading}>{section.heading}</h3>
          <p className={styles.sectionContent}>{section.content}</p>
          {section.diagram && (
            <pre className={styles.diagram}>
              <code>{section.diagram}</code>
            </pre>
          )}
        </section>
      ))}
    </div>
  );
}
