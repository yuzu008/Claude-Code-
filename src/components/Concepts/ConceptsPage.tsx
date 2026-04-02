import { useState } from "react";
import { concepts } from "../../data/concepts";
import { ConceptDetail } from "./ConceptDetail";
import styles from "./ConceptsPage.module.css";

export function ConceptsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedConcept = selectedId
    ? concepts.find((c) => c.id === selectedId) ?? null
    : null;

  return (
    <div className={styles.layout}>
      {/* 左サイドメニュー */}
      <nav className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>概念説明</h2>
        <ul className={styles.menu}>
          {concepts.map((concept) => (
            <li key={concept.id}>
              <button
                className={`${styles.menuItem} ${selectedId === concept.id ? styles.menuItemActive : ""}`}
                onClick={() => setSelectedId(concept.id)}
                type="button"
              >
                <span className={styles.menuIcon}>{concept.icon}</span>
                <div className={styles.menuText}>
                  <span className={styles.menuLabel}>{concept.title}</span>
                  <span className={styles.menuDesc}>{concept.summary}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* 右側コンテンツ */}
      <div className={styles.content}>
        {selectedConcept ? (
          <ConceptDetail concept={selectedConcept} />
        ) : (
          <div className={styles.welcome}>
            <h2 className={styles.welcomeTitle}>Claude Code の主要な概念</h2>
            <p className={styles.welcomeText}>
              左のメニューから気になる概念をクリックすると、
              <br />
              ここにやさしい解説が表示されます。
            </p>
            <p className={styles.welcomeHint}>
              まずは <strong>コンテキストウィンドウ</strong> から
              読んでみましょう。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
