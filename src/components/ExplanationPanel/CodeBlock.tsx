import styles from "./ExplanationPanel.module.css";

type Props = {
  code: string;
};

export function CodeBlock({ code }: Props) {
  return (
    <pre className={styles.codeBlock}>
      <code>{code}</code>
    </pre>
  );
}
