import { useState } from "react";
import { WizardLayout, type StepGuide } from "../WizardLayout";
import { OutputPanel } from "../OutputPanel";
import form from "./wizard-form.module.css";

type Props = { onBack: () => void };

const stepLabels = ["基本情報", "トリガー", "指示内容", "完成"];

const stepGuides: StepGuide[] = [
  {
    heading: "スキルの基本情報を決めよう",
    description:
      "スキルとは、Claudeに「得意技」を教える仕組みです。\n\n例えば「コードレビュースキル」を作ると、レビューのやり方を毎回説明しなくても、Claudeが自動的にそのスキルを使ってレビューしてくれます。\n\nまずはスキルの名前と、何をするスキルかを決めましょう。",
    example:
      "名前: code-reviewer\n説明: コードレビューを包括的に行い、\nバグ・パフォーマンス・セキュリティの\n観点からフィードバックを提供する",
    tips: "名前は半角英数字とハイフンで。日本語は使えません。説明は日本語でOKです。",
  },
  {
    heading: "トリガーワードを設定しよう",
    description:
      "トリガーとは「この言葉が出たらこのスキルを使う」という合言葉です。\n\nユーザーがこれらの言葉を含むメッセージを送ると、Claudeが自動的にこのスキルを呼び出します。\n\n日本語でも英語でも設定できます。",
    example:
      "レビューして\nコードチェック\nreview this code",
    tips: "よく使う言い回しを複数登録しておくと、スキルが呼ばれやすくなります。",
  },
  {
    heading: "Claudeへの指示を書こう",
    description:
      "このスキルが呼ばれたとき、Claudeがどう振る舞うかを書きます。\n\nポイント：\n・何をするかを具体的に\n・チェック項目があれば箇条書きで\n・やってはいけないことも書く\n\n「制約・注意事項」には、守るべきルールを書きます。",
    example:
      "以下の観点でコードをレビューしてください：\n\n1. バグの可能性がないか確認する\n2. パフォーマンスのボトルネックを探す\n3. セキュリティリスクをチェックする\n4. 可読性の改善点を提案する",
    tips: "指示が具体的であればあるほど、スキルの品質が上がります。最初はざっくりでも大丈夫、使いながら改善しましょう。",
  },
  {
    heading: "完成しました！",
    description:
      "スキルファイルが生成されました。\n\n保存先：~/.claude/skills/ の中に、スキル名のフォルダを作って保存します。\n\n例：\n~/.claude/skills/code-reviewer/\n  └ code-reviewer.md",
    tips: "/skill-creator コマンドを使えば、Claude Code上で対話的にスキルを作成・テストすることもできます。",
  },
];

export function SkillWizard({ onBack }: Props) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [triggers, setTriggers] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState("");
  const [constraints, setConstraints] = useState("");
  const [generated, setGenerated] = useState("");

  const generate = () => {
    let md = `---\nname: ${name || "my-skill"}\n`;
    md += `description: ${description || "カスタムスキル"}\n`;

    const activeTriggers = triggers.filter((t) => t.trim());
    if (activeTriggers.length > 0) {
      md += `triggers:\n`;
      activeTriggers.forEach((t) => { md += `  - "${t}"\n`; });
    }

    md += "---\n\n";
    md += `# ${name || "my-skill"}\n\n`;

    if (description) {
      md += `${description}\n\n`;
    }

    if (instructions) {
      md += `## 指示\n\n${instructions}\n\n`;
    }

    if (constraints) {
      md += `## 制約・注意事項\n\n${constraints}\n`;
    }

    setGenerated(md);
    setStep(3);
  };

  const handleNext = () => {
    if (step === 2) {
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
              <label className={form.label}>スキル名</label>
              <span className={form.hint}>右側のガイドに命名ルールがあります</span>
              <input
                className={form.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="code-reviewer"
              />
            </div>
            <div className={form.fieldGroup}>
              <label className={form.label}>スキルの説明</label>
              <span className={form.hint}>このスキルが何をするかを短く説明してください</span>
              <textarea
                className={form.textarea}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="コードレビューを包括的に行い、バグ・パフォーマンス・セキュリティの観点からフィードバックを提供するスキル"
              />
            </div>
          </>
        );
      case 1:
        return (
          <div className={form.fieldGroup}>
            <label className={form.label}>トリガーワード</label>
            <span className={form.hint}>右側のガイドを参考に、呼び出しキーワードを追加してください</span>
            {triggers.map((trigger, i) => (
              <div key={i} className={form.listItem}>
                <input
                  className={form.input}
                  value={trigger}
                  onChange={(e) => {
                    const next = [...triggers];
                    next[i] = e.target.value;
                    setTriggers(next);
                  }}
                  placeholder="例: レビューして"
                />
                {triggers.length > 1 && (
                  <button
                    className={form.removeButton}
                    onClick={() => setTriggers(triggers.filter((_, j) => j !== i))}
                    type="button"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              className={form.addButton}
              onClick={() => setTriggers([...triggers, ""])}
              type="button"
            >
              + トリガーを追加
            </button>
          </div>
        );
      case 2:
        return (
          <>
            <div className={form.fieldGroup}>
              <label className={form.label}>Claudeへの指示</label>
              <span className={form.hint}>右側のガイドに記入例があります</span>
              <textarea
                className={form.textarea}
                style={{ minHeight: "160px" }}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder={`以下の観点でコードをレビューしてください：\n\n1. バグの可能性がないか確認する\n2. パフォーマンスのボトルネックを探す\n3. セキュリティリスクをチェックする`}
              />
            </div>
            <div className={form.fieldGroup}>
              <label className={form.label}>制約・注意事項（任意）</label>
              <textarea
                className={form.textarea}
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                placeholder="- 修正コードは提案のみ。自動で書き換えない&#10;- 日本語で回答する"
              />
            </div>
          </>
        );
      case 3:
        return <OutputPanel content={generated} fileName={`${name || "my-skill"}.md`} />;
      default:
        return null;
    }
  };

  return (
    <WizardLayout
      title="スキルを作成"
      currentStep={step}
      totalSteps={4}
      stepLabels={stepLabels}
      stepGuides={stepGuides}
      onBack={onBack}
      onPrev={() => setStep((s) => Math.max(0, s - 1))}
      onNext={handleNext}
      canNext={step === 0 ? !!name : step < 3}
      isLastStep={step === 2}
    >
      {renderStep()}
    </WizardLayout>
  );
}
