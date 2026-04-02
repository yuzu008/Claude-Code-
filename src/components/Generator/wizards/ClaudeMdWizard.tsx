import { useState } from "react";
import { WizardLayout, type StepGuide } from "../WizardLayout";
import { OutputPanel } from "../OutputPanel";
import form from "./wizard-form.module.css";

type Props = { onBack: () => void };

const stepLabels = ["役割", "ルール", "ツール", "注意事項", "完成"];

const stepGuides: StepGuide[] = [
  {
    heading: "Claudeの「役割」を決めよう",
    description:
      "ここでは、Claudeにどんなキャラクターで仕事してほしいかを伝えます。\n\n「先輩エンジニアのように教えてほしい」「慎重に確認しながら進めてほしい」など、あなたの理想の仕事の進め方を書きましょう。",
    example:
      "あなたはシニアエンジニア兼ペアプロです。\n不明点があれば必ず質問してから作業してください。",
    tips: "空欄でもOKですが、書くほどClaudeの応答が好みに近づきます。まずは1〜2行から始めてみましょう。",
  },
  {
    heading: "守ってほしい「ルール」を追加",
    description:
      "Claudeがどの言語で回答するか、どんなルールで作業するかを決めます。\n\n例えばこんなルールがよく使われます：\n・日本語で回答する\n・推測で進めず必ず確認する\n・コミットメッセージは日本語で書く",
    example: "不明点は推測せず質問する\nコメントは日本語で記述する",
    tips: "「+ルールを追加」ボタンで何個でも追加できます。あとから変更もできるので、思いつくものをまず書いてみましょう。",
  },
  {
    heading: "使う「ツール」を設定",
    description:
      "あなたのプロジェクトで使っている技術を教えてあげましょう。\n\nこれを書いておくと、Claudeが正しいコマンドやライブラリを使って作業してくれます。",
    example: "ランタイム: Node.js / TypeScript\nパッケージマネージャ: npm\nテスト: Vitest",
    tips: "分からない項目は空欄でOKです。あとから CLAUDE.md を直接編集して追加もできます。",
  },
  {
    heading: "「注意事項」を伝える",
    description:
      "「これだけは絶対やらないで！」というルールがあれば書いておきましょう。\n\n例えば：\n・.envファイルをコミットしない\n・mainブランチに直接pushしない\n・破壊的な変更の前に確認を取る",
    example: "- .env ファイルはコミットしない\n- 破壊的変更の前に確認を取る",
    tips: "特になければ空欄で大丈夫です。思い当たることがあれば、箇条書きで書くと分かりやすいです。",
  },
  {
    heading: "完成しました！",
    description:
      "CLAUDE.md が生成されました。\n\n「コピー」ボタンでクリップボードにコピーするか、「ダウンロード」ボタンでファイルとして保存できます。\n\n保存先は ~/.claude/CLAUDE.md（全プロジェクト共通）またはプロジェクトルートの CLAUDE.md です。",
    tips: "最初は完璧でなくてOK。使いながら少しずつルールを足していくのがおすすめです。",
  },
];

export function ClaudeMdWizard({ onBack }: Props) {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("");
  const [language, setLanguage] = useState("日本語");
  const [rules, setRules] = useState<string[]>([""]);
  const [runtime, setRuntime] = useState("");
  const [pkgManager, setPkgManager] = useState("npm");
  const [testFramework, setTestFramework] = useState("");
  const [notes, setNotes] = useState("");
  const [generated, setGenerated] = useState("");

  const generate = () => {
    let md = "# CLAUDE.md\n\n";
    md += "This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.\n\n";

    if (role) {
      md += `## 役割\n${role}\n\n`;
    }

    md += "## 共通ルール\n";
    md += `### 言語\n- 回答・コミット・コメント全て${language}\n\n`;

    const activeRules = rules.filter((r) => r.trim());
    if (activeRules.length > 0) {
      md += "### ルール\n";
      activeRules.forEach((r) => { md += `- ${r}\n`; });
      md += "\n";
    }

    if (runtime || pkgManager || testFramework) {
      md += "### ランタイム・ツール\n";
      if (runtime) md += `- ランタイム: ${runtime}\n`;
      if (pkgManager) md += `- パッケージマネージャ: ${pkgManager}\n`;
      if (testFramework) md += `- テスト: ${testFramework}\n`;
      md += "\n";
    }

    if (notes) {
      md += `## 注意事項\n${notes}\n`;
    }

    setGenerated(md);
    setStep(4);
  };

  const handleNext = () => {
    if (step === 3) {
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
            <label className={form.label}>Claudeにどんな役割を求めますか？</label>
            <span className={form.hint}>
              右側の「記入例」も参考にしてみてください
            </span>
            <textarea
              className={form.textarea}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="あなたはシニアエンジニア兼ペアプロです。不明点があれば必ず質問してから作業してください。"
            />
          </div>
        );
      case 1:
        return (
          <>
            <div className={form.fieldGroup}>
              <label className={form.label}>使用言語</label>
              <span className={form.hint}>Claudeが回答やコミットメッセージで使う言語</span>
              <input
                className={form.input}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
            </div>
            <div className={form.fieldGroup}>
              <label className={form.label}>守ってほしいルール</label>
              <span className={form.hint}>右側のガイドも参考にしてください</span>
              {rules.map((rule, i) => (
                <div key={i} className={form.listItem}>
                  <input
                    className={form.input}
                    value={rule}
                    onChange={(e) => {
                      const next = [...rules];
                      next[i] = e.target.value;
                      setRules(next);
                    }}
                    placeholder="例: 不明点は推測せず質問する"
                  />
                  {rules.length > 1 && (
                    <button
                      className={form.removeButton}
                      onClick={() => setRules(rules.filter((_, j) => j !== i))}
                      type="button"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                className={form.addButton}
                onClick={() => setRules([...rules, ""])}
                type="button"
              >
                + ルールを追加
              </button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className={form.fieldGroup}>
              <label className={form.label}>ランタイム / 言語</label>
              <input
                className={form.input}
                value={runtime}
                onChange={(e) => setRuntime(e.target.value)}
                placeholder="Node.js / TypeScript"
              />
            </div>
            <div className={form.fieldGroup}>
              <label className={form.label}>パッケージマネージャ</label>
              <input
                className={form.input}
                value={pkgManager}
                onChange={(e) => setPkgManager(e.target.value)}
                placeholder="npm"
              />
            </div>
            <div className={form.fieldGroup}>
              <label className={form.label}>テストフレームワーク</label>
              <input
                className={form.input}
                value={testFramework}
                onChange={(e) => setTestFramework(e.target.value)}
                placeholder="Vitest"
              />
            </div>
          </>
        );
      case 3:
        return (
          <div className={form.fieldGroup}>
            <label className={form.label}>注意事項・その他のルール（任意）</label>
            <span className={form.hint}>右側のガイドに例があります</span>
            <textarea
              className={form.textarea}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="- .env ファイルはコミットしない&#10;- 破壊的変更の前に確認を取る"
            />
          </div>
        );
      case 4:
        return <OutputPanel content={generated} fileName="CLAUDE.md" />;
      default:
        return null;
    }
  };

  return (
    <WizardLayout
      title="CLAUDE.md を作成"
      currentStep={step}
      totalSteps={5}
      stepLabels={stepLabels}
      stepGuides={stepGuides}
      onBack={onBack}
      onPrev={() => setStep((s) => Math.max(0, s - 1))}
      onNext={handleNext}
      canNext={step < 4}
      isLastStep={step === 3}
    >
      {renderStep()}
    </WizardLayout>
  );
}
