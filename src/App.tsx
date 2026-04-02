import { useState } from "react";
import { Header, type TabId } from "./components/Header/Header";
import { TreeView } from "./components/TreeView/TreeView";
import { ExplanationPanel } from "./components/ExplanationPanel/ExplanationPanel";
import { GeneratorPage } from "./components/Generator/GeneratorPage";
import { ConceptsPage } from "./components/Concepts/ConceptsPage";
import { globalTree, projectTree } from "./data/treeData";
import { explanations } from "./data/explanations";
import styles from "./App.module.css";

function App() {
  const [activeTab, setActiveTab] = useState<TabId>("guide");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const currentExplanation = selectedId ? explanations[selectedId] ?? null : null;

  const trees = [
    { label: "グローバル設定", tree: globalTree },
    { label: "プロジェクトルート", tree: projectTree },
  ];

  return (
    <div className={styles.app}>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "guide" && (
        <main className={styles.main}>
          <aside className={styles.sidebar}>
            <TreeView
              trees={trees}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </aside>
          <div className={styles.content}>
            <ExplanationPanel explanation={currentExplanation} />
          </div>
        </main>
      )}

      {activeTab === "generator" && (
        <main className={styles.generatorMain}>
          <GeneratorPage />
        </main>
      )}

      {activeTab === "concepts" && (
        <ConceptsPage />
      )}
    </div>
  );
}

export default App;
