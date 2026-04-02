import { useState } from "react";
import type { TreeNode as TreeNodeType } from "../../types";
import styles from "./TreeView.module.css";

type Props = {
  node: TreeNodeType;
  selectedId: string | null;
  onSelect: (id: string) => void;
  depth: number;
};

export function TreeNodeItem({ node, selectedId, onSelect, depth }: Props) {
  const [expanded, setExpanded] = useState(depth < 2);
  const isDirectory = node.type === "directory";
  const isSelected = selectedId === node.id;
  const hasChildren = isDirectory && node.children && node.children.length > 0;

  const handleClick = () => {
    if (isDirectory) {
      setExpanded((prev) => !prev);
    }
    onSelect(node.id);
  };

  return (
    <li className={styles.nodeItem}>
      <button
        className={`${styles.nodeButton} ${isSelected ? styles.selected : ""}`}
        onClick={handleClick}
        style={{ paddingLeft: `${depth * 1.2 + 0.5}rem` }}
        type="button"
      >
        <span className={styles.icon}>
          {isDirectory ? (expanded ? "📂" : "📁") : "📄"}
        </span>
        <span className={styles.nodeName}>{node.name}</span>
      </button>

      {hasChildren && expanded && (
        <ul className={styles.childList}>
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
