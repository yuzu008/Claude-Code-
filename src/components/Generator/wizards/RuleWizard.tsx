import { useState } from "react";
import { WizardLayout, type StepGuide } from "../WizardLayout";
import { OutputPanel } from "../OutputPanel";
import form from "./wizard-form.module.css";

type Props = { onBack: () => void };

const stepLabels = ["テーマ", "ルール内容", "完成"];

const stepGuides: StepGuide[] = [
  {
    heading: "ルールのテーマを決めよう",
    description:
      "ルールファイルは「1ファイル = 1テーマ」で作ります。\n\nCLAUDE.md に全部書くと長くなりすぎるので、テーマごとにファイルを分けて管理する仕組みです。\n\n例えばこんなテーマで分けられます：\n・ワークフロー（作業の進め方）\n・コーディング規約\n・レビューの観点\n・Git のルール",
    example:
      "workflow-phases → 作業フローの定義\ncoding-style → コーディング規約\nreview-checklist → レビュー観点\ngit-rules → Git のルール",
    tips: "ファイル名は半角英数字とハイフンで。日本語の内容はファイルの中に書きます。",
  },
  {
    heading: "ルールの内容を書こう",
    description:
      "Claudeに守ってほしいルールを Markdown で書きます。\n\nポイント：\n・見出し（#）でセクションを分ける\n・箇条書きで具体的に書く\n・「やること」「やらないこと」を明確に\n・曖昧な表現は避ける\n\n普段チームのドキュメントに書くような感覚でOKです。",
    example:
      "# ワークフロー Phase 定義\n\n## Phase 0: インテイク\n- 依頼の要約 + 未確定事項の質問\n- ここで止まる（勝手に進めない）\n\n## Phase 1: 合意形成\n- 受入条件・非目標を確認",
    tips: "「〜してください」より「〜する」「〜しない」と断定的に書くと、Claudeがルールをより厳密に守ります。",
  },
  {
    heading: "完成しました！",
    description:
      "ルールファイルが生成されました。\n\n保存先：\n・全プロジェクト共通 → ~/.claude/rules/\n・特定プロジェクト → .claude/rules/\n\nCLAUDE.md から参照すると整理されます：\n「※ 詳細は .claude/rules/○○.md を参照」",
    tips: "プロジェクトの .claude/rules/ に保存して Git にコミットすれば、チーム全員に共有できます。",
  },
];

export function RuleWizard({ onBack }: Props) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [generated, setGenerated] = useState("");

  const generate = () => {
    let md = "";
    if (title) {
      md += `# ${title}\n\n`;
    }
    md += content;
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
              <label className={form.label}>ファイル名</label>
              <span className={form.hint}>
                半角英数字とハイフンで。右側のガイドに例があります。
              </span>
              <input
                className={form.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="workflow-phases"
              />
            </div>
            <div className={form.fieldGroup}>
              <label className={form.label}>ルールのタイトル</label>
              <span className={form.hint}>
                ファイルの見出しになります
              </span>
              <input
                className={form.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ワークフロー Phase 定義"
              />
            </div>
          </>
        );
      case 1:
        return (
          <div className={form.fieldGroup}>
            <label className={form.label}>ルールの内容</label>
            <span className={form.hint}>右側のガイドを参考に、Markdown で書いてください</span>
            <textarea
              className={form.textarea}
              style={{ minHeight: "250px" }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`## Phase 0: インテイク\n- 依頼の要約 + 未確定事項の質問\n- ここで止まる（勝手に進めない）\n\n## Phase 1: 合意形成\n- 受入条件・非目標を確認\n- 中規模以上は SPEC を作成\n\n## Phase 2: 実装計画\n- 変更方針・ステップ・テスト計画を提示\n- 承認を得てから次へ\n\n## Phase 3: 実行\n- 「GO」が出るまで編集しない`}
            />
          </div>
        );
      case 2:
        return <OutputPanel content={generated} fileName={`${name || "rule"}.md`} />;
      default:
        return null;
    }
  };

  return (
    <WizardLayout
      title="ルールファイルを作成"
      currentStep={step}
      totalSteps={3}
      stepLabels={stepLabels}
      stepGuides={stepGuides}
      onBack={onBack}
      onPrev={() => setStep((s) => Math.max(0, s - 1))}
      onNext={handleNext}
      canNext={step === 0 ? !!name : step === 1 ? !!content : false}
      isLastStep={step === 1}
    >
      {renderStep()}
    </WizardLayout>
  );
}
