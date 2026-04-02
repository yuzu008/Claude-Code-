import { useState } from "react";
import styles from "./OutputPanel.module.css";

type Props = {
  content: string;
  fileName: string;
};

export function OutputPanel({ content, fileName }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.output}>
      <div className={styles.header}>
        <h3 className={styles.title}>生成結果: {fileName}</h3>
        <div className={styles.actions}>
          <button
            className={styles.button}
            onClick={handleCopy}
            type="button"
          >
            {copied ? "コピーしました!" : "コピー"}
          </button>
          <button
            className={`${styles.button} ${styles.download}`}
            onClick={handleDownload}
            type="button"
          >
            ダウンロード
          </button>
        </div>
      </div>
      <pre className={styles.preview}>
        <code>{content}</code>
      </pre>
    </div>
  );
}
