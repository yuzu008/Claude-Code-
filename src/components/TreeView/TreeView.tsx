import type { TreeNode } from "../../types";
import { TreeNodeItem } from "./TreeNode";
import styles from "./TreeView.module.css";

type Props = {
  trees: { label: string; tree: TreeNode }[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function TreeView({ trees, selectedId, onSelect }: Props) {
  return (
    <nav className={styles.treeView}>
      {trees.map(({ label, tree }) => (
        <section key={tree.id} className={styles.section}>
          <h2 className={styles.sectionTitle}>{label}</h2>
          <ul className={styles.rootList}>
            <TreeNodeItem
              node={tree}
              selectedId={selectedId}
              onSelect={onSelect}
              depth={0}
            />
          </ul>
        </section>
      ))}
    </nav>
  );
}
