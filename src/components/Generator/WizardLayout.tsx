import type { ReactNode } from "react";
import styles from "./WizardLayout.module.css";

// ガイドデータの型
export type StepGuide = {
  heading: string;
  description: string;
  example?: string;
  tips?: string;
};

type Props = {
  title: string;
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  stepGuides: StepGuide[];
  onBack: () => void;
  onPrev: () => void;
  onNext: () => void;
  canNext: boolean;
  isLastStep: boolean;
  children: ReactNode;
};

export function WizardLayout({
  title,
  currentStep,
  totalSteps,
  stepLabels,
  stepGuides,
  onBack,
  onPrev,
  onNext,
  canNext,
  isLastStep,
  children,
}: Props) {
  const guide = stepGuides[currentStep];

  return (
    <div className={styles.wizard}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack} type="button">
          ← ファイル選択に戻る
        </button>
        <h2 className={styles.title}>{title}</h2>
      </div>

      {/* ステッププログレス */}
      <div className={styles.progress}>
        {stepLabels.map((label, i) => (
          <div
            key={label}
            className={`${styles.step} ${i <= currentStep ? styles.stepActive : ""} ${i < currentStep ? styles.stepDone : ""}`}
          >
            <span className={styles.stepDot}>
              {i < currentStep ? "✓" : i + 1}
            </span>
            <span className={styles.stepLabel}>{label}</span>
          </div>
        ))}
      </div>

      {/* 左右分割: フォーム + ガイド */}
      <div className={styles.body}>
        <div className={styles.formSide}>{children}</div>
        {guide && (
          <aside className={styles.guideSide}>
            <div className={styles.guideInner}>
              <h3 className={styles.guideHeading}>{guide.heading}</h3>
              <p className={styles.guideDesc}>{guide.description}</p>
              {guide.example && (
                <div className={styles.guideExample}>
                  <span className={styles.guideExampleLabel}>記入例</span>
                  <pre className={styles.guideCode}><code>{guide.example}</code></pre>
                </div>
              )}
              {guide.tips && (
                <div className={styles.guideTips}>
                  <span className={styles.guideTipsLabel}>ヒント</span>
                  <p className={styles.guideTipsText}>{guide.tips}</p>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* ナビゲーション */}
      <div className={styles.nav}>
        <button
          className={styles.navButton}
          onClick={onPrev}
          disabled={currentStep === 0}
          type="button"
        >
          ← 前へ
        </button>
        <span className={styles.stepCount}>
          {currentStep + 1} / {totalSteps}
        </span>
        <button
          className={`${styles.navButton} ${styles.navNext}`}
          onClick={onNext}
          disabled={!canNext}
          type="button"
        >
          {isLastStep ? "生成する" : "次へ →"}
        </button>
      </div>
    </div>
  );
}
