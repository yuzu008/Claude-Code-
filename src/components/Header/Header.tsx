import styles from "./Header.module.css";

export type TabId = "guide" | "generator" | "concepts";

type Props = {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
};

export function Header({ activeTab, onTabChange }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <h1 className={styles.title}>Claude Code 設定ファイルガイド</h1>
      </div>
      <nav className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "guide" ? styles.active : ""}`}
          onClick={() => onTabChange("guide")}
          type="button"
        >
          ガイド
        </button>
        <button
          className={`${styles.tab} ${activeTab === "generator" ? styles.active : ""}`}
          onClick={() => onTabChange("generator")}
          type="button"
        >
          ファイル作成
        </button>
        <button
          className={`${styles.tab} ${activeTab === "concepts" ? styles.active : ""}`}
          onClick={() => onTabChange("concepts")}
          type="button"
        >
          概念説明
        </button>
      </nav>
    </header>
  );
}
