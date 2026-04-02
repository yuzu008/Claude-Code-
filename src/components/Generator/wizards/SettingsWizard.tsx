import { useState } from "react";
import { WizardLayout, type StepGuide } from "../WizardLayout";
import { OutputPanel } from "../OutputPanel";
import form from "./wizard-form.module.css";

type Props = { onBack: () => void };

const stepLabels = ["許可ツール", "MCPサーバー", "完成"];

const stepGuides: StepGuide[] = [
  {
    heading: "Claudeに使わせるツールを選ぼう",
    description:
      "Claudeはファイルの読み書きやコマンド実行ができますが、最初は毎回「使っていいですか？」と聞いてきます。\n\nここでチェックしたツールは、確認なしで自動的に使えるようになります。",
    example:
      "Read    → ファイルを読む\nWrite   → ファイルを作る\nEdit    → ファイルを編集する\nBash(git *) → Gitコマンドを実行",
    tips: "迷ったら Read / Write / Edit だけチェックすればOK。あとから追加できます。",
  },
  {
    heading: "外部ツールとの連携（MCP）",
    description:
      "MCPサーバーとは、Claude Codeに追加の能力を与える仕組みです。\n\n例えば Playwright を追加すると、Claude がブラウザを操作してテストできるようになります。\n\n必要なければスキップしてそのまま「生成する」を押してOKです。",
    example:
      "名前: playwright\nコマンド: npx\n引数: @playwright/mcp@latest --headless",
    tips: "最初は設定しなくて大丈夫。必要になったら settings.json を直接編集して追加もできます。",
  },
  {
    heading: "完成しました！",
    description:
      "settings.json が生成されました。\n\n保存先は ~/.claude/settings.json（全プロジェクト共通）またはプロジェクトの .claude/settings.json です。",
    tips: "プロジェクトの .claude/settings.json に保存すれば、Gitでチーム全員に共有できます。",
  },
];

const availableTools = [
  "Read",
  "Write",
  "Edit",
  "WebSearch",
  "WebFetch",
  "Bash(git *)",
  "Bash(npm *)",
  "Bash(npx *)",
  "Bash(ls *)",
  "Bash(mkdir *)",
];

export function SettingsWizard({ onBack }: Props) {
  const [step, setStep] = useState(0);
  const [permissions, setPermissions] = useState<string[]>(["Read", "Write", "Edit"]);
  const [mcpServers, setMcpServers] = useState<{ name: string; command: string; args: string }[]>([]);
  const [newMcp, setNewMcp] = useState({ name: "", command: "", args: "" });
  const [generated, setGenerated] = useState("");

  const togglePermission = (tool: string) => {
    setPermissions((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  const addMcpServer = () => {
    if (newMcp.name && newMcp.command) {
      setMcpServers([...mcpServers, { ...newMcp }]);
      setNewMcp({ name: "", command: "", args: "" });
    }
  };

  const generate = () => {
    const settings: Record<string, unknown> = {};

    if (permissions.length > 0) {
      settings.permissions = { allow: permissions };
    }

    if (mcpServers.length > 0) {
      const servers: Record<string, unknown> = {};
      mcpServers.forEach((s) => {
        servers[s.name] = {
          command: s.command,
          args: s.args ? s.args.split(/\s+/) : [],
        };
      });
      settings.mcpServers = servers;
    }

    setGenerated(JSON.stringify(settings, null, 2));
    setStep(2);
  };

  const handleNext = () => {
    if (step === 1) {
      generate();
    } else {
      setStep((s) => s + 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className={form.fieldGroup}>
            <label className={form.label}>自動許可するツールを選択</label>
            <span className={form.hint}>右側のガイドで各ツールの意味を確認できます</span>
            <div className={form.checkboxGrid}>
              {availableTools.map((tool) => (
                <label
                  key={tool}
                  className={
                    permissions.includes(tool)
                      ? form.checkboxLabelChecked
                      : form.checkboxLabel
                  }
                >
                  <input
                    type="checkbox"
                    className={form.checkbox}
                    checked={permissions.includes(tool)}
                    onChange={() => togglePermission(tool)}
                  />
                  {tool}
                </label>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div className={form.fieldGroup}>
            <label className={form.label}>MCPサーバーを追加（任意）</label>
            <span className={form.hint}>不要ならそのまま「生成する」へ進んでください</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <input
                className={form.input}
                value={newMcp.name}
                onChange={(e) => setNewMcp({ ...newMcp, name: e.target.value })}
                placeholder="サーバー名（例: playwright）"
              />
              <input
                className={form.input}
                value={newMcp.command}
                onChange={(e) => setNewMcp({ ...newMcp, command: e.target.value })}
                placeholder="コマンド（例: npx）"
              />
              <input
                className={form.input}
                value={newMcp.args}
                onChange={(e) => setNewMcp({ ...newMcp, args: e.target.value })}
                placeholder="引数（例: @playwright/mcp@latest --headless）"
              />
              <button
                className={form.addButton}
                onClick={addMcpServer}
                type="button"
                disabled={!newMcp.name || !newMcp.command}
                style={{ alignSelf: "flex-start" }}
              >
                + 追加
              </button>
            </div>
            {mcpServers.length > 0 && (
              <div className={form.tags}>
                {mcpServers.map((s, i) => (
                  <span key={i} className={form.tag}>
                    {s.name}: {s.command}
                    <button
                      className={form.tagRemove}
                      onClick={() => setMcpServers(mcpServers.filter((_, j) => j !== i))}
                      type="button"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      case 2:
        return <OutputPanel content={generated} fileName="settings.json" />;
      default:
        return null;
    }
  };

  return (
    <WizardLayout
      title="settings.json を作成"
      currentStep={step}
      totalSteps={3}
      stepLabels={stepLabels}
      stepGuides={stepGuides}
      onBack={onBack}
      onPrev={() => setStep((s) => Math.max(0, s - 1))}
      onNext={handleNext}
      canNext={step < 2}
      isLastStep={step === 1}
    >
      {renderStep()}
    </WizardLayout>
  );
}
