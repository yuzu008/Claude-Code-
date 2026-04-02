import { useState } from "react";
import { WizardLayout, type StepGuide } from "../WizardLayout";
import { OutputPanel } from "../OutputPanel";
import form from "./wizard-form.module.css";

type Props = { onBack: () => void };

type HookEntry = {
  event: string;
  toolMatcher: string;
  command: string;
  timeout: number;
};

const stepLabels = ["フック設定", "完成"];

const stepGuides: StepGuide[] = [
  {
    heading: "自動処理（フック）を設定しよう",
    description:
      "フックとは「Claudeが何かをする前後に、自動でコマンドを実行する」仕組みです。\n\n例えば：\n・検索する前にインデックスを更新\n・ファイルを書いた後にフォーマッターを実行\n\n3つのことを決めます：\n1. いつ実行する？（ツール実行前 or 後）\n2. どのツールに対して？\n3. 何を実行する？",
    example:
      "タイミング: PreToolUse（実行前）\n対象ツール: Grep|Glob\nコマンド: echo '検索開始'",
    tips: "ツール名は「|」で複数指定できます。\n例: Grep|Glob|Bash",
  },
  {
    heading: "完成しました！",
    description:
      "hooks.json が生成されました。\n\n~/.claude/hooks.json に保存してください。Claude Codeを再起動すると反映されます。",
    tips: "フックが期待通りに動かない場合は、timeout の値を大きくしてみてください。",
  },
];

const eventOptions = [
  { value: "PreToolUse", label: "PreToolUse（ツール実行前）" },
  { value: "PostToolUse", label: "PostToolUse（ツール実行後）" },
];

export function HooksWizard({ onBack }: Props) {
  const [step, setStep] = useState(0);
  const [hooks, setHooks] = useState<HookEntry[]>([
    { event: "PreToolUse", toolMatcher: "", command: "", timeout: 8000 },
  ]);
  const [generated, setGenerated] = useState("");

  const updateHook = (index: number, field: keyof HookEntry, value: string | number) => {
    const next = [...hooks];
    next[index] = { ...next[index], [field]: value };
    setHooks(next);
  };

  const generate = () => {
    const validHooks = hooks.filter((h) => h.toolMatcher && h.command);
    const result: Record<string, unknown[]> = {};
    validHooks.forEach((h) => {
      if (!result[h.event]) result[h.event] = [];
      result[h.event].push({
        matcher: { tool_name: h.toolMatcher },
        hooks: [{ type: "command", command: h.command, timeout: h.timeout }],
      });
    });
    setGenerated(JSON.stringify({ hooks: result }, null, 2));
    setStep(1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <div className={form.fieldGroup}>
              <label className={form.label}>フックを設定</label>
              <span className={form.hint}>右側のガイドを参考に、各項目を入力してください</span>
            </div>
            {hooks.map((hook, i) => (
              <div key={i} style={{ marginBottom: "1.25rem", padding: "1rem", background: "#f8f9fc", borderRadius: "8px" }}>
                <div className={form.fieldGroup}>
                  <label className={form.label}>タイミング</label>
                  <select
                    className={form.input}
                    value={hook.event}
                    onChange={(e) => updateHook(i, "event", e.target.value)}
                  >
                    {eventOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className={form.fieldGroup}>
                  <label className={form.label}>対象ツール</label>
                  <input
                    className={form.input}
                    value={hook.toolMatcher}
                    onChange={(e) => updateHook(i, "toolMatcher", e.target.value)}
                    placeholder="例: Grep|Glob|Bash"
                  />
                </div>
                <div className={form.fieldGroup}>
                  <label className={form.label}>実行コマンド</label>
                  <input
                    className={form.input}
                    value={hook.command}
                    onChange={(e) => updateHook(i, "command", e.target.value)}
                    placeholder="例: echo 'ツール実行前処理'"
                  />
                </div>
                <div className={form.fieldGroup}>
                  <label className={form.label}>タイムアウト（ミリ秒）</label>
                  <input
                    className={form.input}
                    type="number"
                    value={hook.timeout}
                    onChange={(e) => updateHook(i, "timeout", parseInt(e.target.value) || 8000)}
                  />
                </div>
                {hooks.length > 1 && (
                  <button
                    className={form.removeButton}
                    onClick={() => setHooks(hooks.filter((_, j) => j !== i))}
                    type="button"
                  >
                    このフックを削除
                  </button>
                )}
              </div>
            ))}
            <button
              className={form.addButton}
              onClick={() =>
                setHooks([...hooks, { event: "PreToolUse", toolMatcher: "", command: "", timeout: 8000 }])
              }
              type="button"
            >
              + フックを追加
            </button>
          </>
        );
      case 1:
        return <OutputPanel content={generated} fileName="hooks.json" />;
      default:
        return null;
    }
  };

  return (
    <WizardLayout
      title="hooks.json を作成"
      currentStep={step}
      totalSteps={2}
      stepLabels={stepLabels}
      stepGuides={stepGuides}
      onBack={onBack}
      onPrev={() => setStep((s) => Math.max(0, s - 1))}
      onNext={generate}
      canNext={step < 1 && hooks.some((h) => h.toolMatcher && h.command)}
      isLastStep={step === 0}
    >
      {renderStep()}
    </WizardLayout>
  );
}
