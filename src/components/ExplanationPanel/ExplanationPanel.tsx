import type { Explanation } from "../../types";
import { CodeBlock } from "./CodeBlock";
import styles from "./ExplanationPanel.module.css";

type Props = {
  explanation: Explanation | null;
};

export function ExplanationPanel({ explanation }: Props) {
  if (!explanation) {
    return (
      <div className={styles.panel}>
        <div className={styles.welcome}>
          <h2 className={styles.welcomeTitle}>
            ようこそ！
          </h2>
          <p className={styles.welcomeText}>
            左のツリーからファイルやフォルダをクリックすると、
            <br />
            ここに説明が表示されます。
          </p>
          <p className={styles.welcomeHint}>
            まずは <strong>~/.claude/</strong> や{" "}
            <strong>CLAUDE.md</strong> から見てみましょう。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <article className={styles.content}>
        <h2 className={styles.title}>{explanation.title}</h2>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>なぜ必要？</h3>
          <p className={styles.text}>{explanation.why}</p>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>何をするもの？</h3>
          <p className={styles.text}>{explanation.what}</p>
        </section>

        {explanation.howToWrite && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>書き方</h3>
            <p className={styles.text}>{explanation.howToWrite}</p>
          </section>
        )}

        {explanation.steps && explanation.steps.length > 0 && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>作り方（ステップバイステップ）</h3>
            <ol className={styles.stepList}>
              {explanation.steps.map((step, index) => (
                <li key={index} className={styles.stepItem}>
                  <div className={styles.stepHeader}>
                    <span className={styles.stepNumber}>{index + 1}</span>
                    <strong className={styles.stepTitle}>{step.title}</strong>
                  </div>
                  <p className={styles.stepDescription}>{step.description}</p>
                  {step.code && <CodeBlock code={step.code} />}
                </li>
              ))}
            </ol>
          </section>
        )}

        {explanation.example && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>実際の例</h3>
            <CodeBlock code={explanation.example} />
          </section>
        )}

        {explanation.tips && (
          <section className={`${styles.section} ${styles.tipsSection}`}>
            <h3 className={styles.sectionTitle}>ヒント</h3>
            <p className={styles.text}>{explanation.tips}</p>
          </section>
        )}
      </article>
    </div>
  );
}
