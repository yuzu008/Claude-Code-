import { useState } from "react";
import { ClaudeMdWizard } from "./wizards/ClaudeMdWizard";
import { SettingsWizard } from "./wizards/SettingsWizard";
import { HooksWizard } from "./wizards/HooksWizard";
import { RuleWizard } from "./wizards/RuleWizard";
import { CommandWizard } from "./wizards/CommandWizard";
import { SkillWizard } from "./wizards/SkillWizard";
import styles from "./GeneratorPage.module.css";

type FileType = "claude-md" | "settings" | "hooks" | "rule" | "command" | "skill";

const fileTypes: { id: FileType; label: string; description: string }[] = [
  {
    id: "claude-md",
    label: "CLAUDE.md",
    description: "Claudeへの指示書を作成",
  },
  {
    id: "settings",
    label: "settings.json",
    description: "ツール許可やMCPサーバーを設定",
  },
  {
    id: "hooks",
    label: "hooks.json",
    description: "ツール実行前後の自動処理を設定",
  },
  {
    id: "rule",
    label: "ルールファイル",
    description: "テーマ別のルールを分割管理",
  },
  {
    id: "command",
    label: "カスタムコマンド",
    description: "スラッシュコマンドを作成",
  },
  {
    id: "skill",
    label: "スキル",
    description: "Claudeの得意技を作成",
  },
];

export function GeneratorPage() {
  const [selectedType, setSelectedType] = useState<FileType | null>(null);

  if (!selectedType) {
    return (
      <div className={styles.page}>
        <div className={styles.selector}>
          <h2 className={styles.selectorTitle}>
            どのファイルを作りますか？
          </h2>
          <p className={styles.selectorHint}>
            作りたいファイルの種類を選んでください。ウィザード形式で順番にガイドします。
          </p>
          <div className={styles.cards}>
            {fileTypes.map((ft) => (
              <button
                key={ft.id}
                className={styles.card}
                onClick={() => setSelectedType(ft.id)}
                type="button"
              >
                <span className={styles.cardLabel}>{ft.label}</span>
                <span className={styles.cardDesc}>{ft.description}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const handleBack = () => setSelectedType(null);

  return (
    <div className={styles.page}>
      {selectedType === "claude-md" && <ClaudeMdWizard onBack={handleBack} />}
      {selectedType === "settings" && <SettingsWizard onBack={handleBack} />}
      {selectedType === "hooks" && <HooksWizard onBack={handleBack} />}
      {selectedType === "rule" && <RuleWizard onBack={handleBack} />}
      {selectedType === "command" && <CommandWizard onBack={handleBack} />}
      {selectedType === "skill" && <SkillWizard onBack={handleBack} />}
    </div>
  );
}
