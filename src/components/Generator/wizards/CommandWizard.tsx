import { useState } from "react";
import { WizardLayout, type StepGuide } from "../WizardLayout";
import { OutputPanel } from "../OutputPanel";
import form from "./wizard-form.module.css";

type Props = { onBack: () => void };

const stepLabels = ["基本情報", "指示内容", "完成"];

const stepGuides: StepGuide[] = [
  {
    heading: "コマンドの基本情報を決めよう",
    description:
      "カスタムコマンドとは、よく使う指示を「/コマンド名」で呼び出せるようにする機能です。\n\n例えば /review というコマンドを作れば、毎回「レビューして」と長い指示を書かなくても、/review と打つだけでOKになります。\n\nまずはコマンドの名前を決めましょう。",
    example: "review → /review で呼び出し\ntest-check → /test-check で呼び出し\ndeploy → /deploy で呼び出し",
    tips: "名前は半角英数字とハイフン（-）が使えます。短くて覚えやすい名前にしましょう。",
  },
  {
    heading: "Claudeへの指示を書こう",
    description:
      "このコマンドが実行されたときに、Claudeに何をしてほしいかを書きます。\n\n普段チャットでClaudeに送るメッセージと同じように書けばOKです。\n\n「引数を受け取る」にチェックした場合、$ARGUMENTS と書いた部分が実行時の引数に置き換わります。",
    example:
      "以下の観点でコードをレビューしてください：\n1. バグの可能性\n2. パフォーマンスの問題\n3. セキュリティリスク\n\n対象: $ARGUMENTS",
    tips: "コマンドは Markdown 形式で書けます。箇条書きや見出しを使うと分かりやすくなります。",
  },
  {
    heading: "完成しました！",
    description:
      "コマンドファイルが生成されました。\n\n保存先：\n・全プロジェクト共通 → ~/.claude/commands/\n・特定プロジェクト → .claude/commands/\n\nファイル名がそのままコマンド名になります。",
    tips: "プロジェクトの .claude/commands/ に保存してGitにコミットすれば、チーム全員で使えます。",
  },
];

export function CommandWizard({ onBack }: Props) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [useArgs, setUseArgs] = useState(false);
  const [generated, setGenerated] = useState("");

  const generate = () => {
    let md = "";
    if (description) {
      md += `# ${name || "command"}\n\n`;
      md += `${description}\n\n`;
    }
    md += instructions;
    if (useArgs && !instructions.includes("$ARGUMENTS")) {
      md += "\n\n対象: $ARGUMENTS";
    }
    setGenerated(md);
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
          <>
            <div className={form.fieldGroup}>
              <label className={form.label}>コマンド名</label>
              <span className={form.hint}>
                ファイル名になります。右側のガイドに例があります。
              </span>
              <input
                className={form.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="review"
              />
            </div>
            <div className={form.fieldGroup}>
              <label className={form.label}>コマンドの説明（任意）</label>
              <input
                className={form.input}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="コードをレビューするコマンド"
              />
            </div>
            <div className={form.fieldGroup}>
              <label className={form.checkboxLabel}>
                <input
                  type="checkbox"
                  className={form.checkbox}
                  checked={useArgs}
                  onChange={(e) => setUseArgs(e.target.checked)}
                />
                引数を受け取る（$ARGUMENTS を使う）
              </label>
              <span className={form.hint}>
                「/review src/App.tsx」のように引数を渡したい場合にチェック
              </span>
            </div>
          </>
        );
      case 1:
        return (
          <div className={form.fieldGroup}>
            <label className={form.label}>Claudeへの指示内容</label>
            <span className={form.hint}>右側のガイドに記入例があります</span>
            <textarea
              className={form.textarea}
              style={{ minHeight: "200px" }}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder={`以下の観点でコードをレビューしてください：\n1. バグの可能性\n2. パフォーマンスの問題\n3. セキュリティリスク\n4. 可読性の改善点${useArgs ? "\n\n対象: $ARGUMENTS" : ""}`}
            />
          </div>
        );
      case 2:
        return <OutputPanel content={generated} fileName={`${name || "command"}.md`} />;
      default:
        return null;
    }
  };

  return (
    <WizardLayout
      title="カスタムコマンドを作成"
      currentStep={step}
      totalSteps={3}
      stepLabels={stepLabels}
      stepGuides={stepGuides}
      onBack={onBack}
      onPrev={() => setStep((s) => Math.max(0, s - 1))}
      onNext={handleNext}
      canNext={step === 0 ? !!name : step === 1 ? !!instructions : false}
      isLastStep={step === 1}
    >
      {renderStep()}
    </WizardLayout>
  );
}
