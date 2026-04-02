# 設計書: Claude Code 利用説明アプリ

## 1. 概要

### 目的
社内エンジニア（初級者含む）がClaude Codeの設定ファイル構成を視覚的に理解できるインタラクティブWebアプリ。

### コンセプト
- ディレクトリツリーをクリック → サイドパネルに「なぜ必要か」「何をするファイルか」「書き方」を表示
- 初級エンジニアでも理解できる平易な日本語
- 実際の環境の内容を参考例として掲載

---

## 2. 技術スタック

| 項目 | 技術 |
|---|---|
| フレームワーク | Vite + React 19 |
| 言語 | TypeScript |
| スタイリング | CSS Modules |
| テスト | Vitest |
| パッケージマネージャ | npm |

### 外部ライブラリ
- 最小限に抑える（React + Viteのみ。UIライブラリは不使用）

---

## 3. 画面構成

```
+----------------------------------------------------------+
|  ヘッダー: Claude Code 設定ファイルガイド                    |
+-------------------+--------------------------------------+
|                   |                                      |
|  ディレクトリ       |  サイドパネル                          |
|  ツリー            |                                      |
|                   |  [ファイル名]                          |
|  📁 ~/.claude/    |                                      |
|    📄 CLAUDE.md   |  ● なぜ必要？                          |
|    📁 commands/   |    やさしい説明文                       |
|    📄 settings.json|                                     |
|    📁 projects/   |  ● どう書く？                          |
|    ...            |    書き方の説明 + コード例               |
|                   |                                      |
+-------------------+--------------------------------------+
```

### レイアウト
- **左ペイン（30%）**: ディレクトリツリー。折りたたみ可能
- **右ペイン（70%）**: 説明パネル。選択なし時はウェルカムメッセージ
- レスポンシブ: モバイルではツリーとパネルを縦並び

---

## 4. データ構造

### ツリーデータ (`src/data/treeData.ts`)

```typescript
export type TreeNode = {
  id: string;            // ユニークID
  name: string;          // 表示名（例: "CLAUDE.md"）
  type: "file" | "directory";
  children?: TreeNode[];
};
```

### 説明データ (`src/data/explanations.ts`)

```typescript
export type Explanation = {
  id: string;              // TreeNodeのidと対応
  title: string;           // 表示タイトル
  why: string;             // なぜ必要か（平易な説明）
  what: string;            // 何をするファイル/ディレクトリか
  howToWrite?: string;     // 書き方（ファイルの場合）
  example?: string;        // 実際の例（コードブロック）
  tips?: string;           // 初心者向けのヒント
};
```

---

## 5. ツリーに掲載するファイル/ディレクトリ

### グローバル設定 (`~/.claude/`)

```
~/.claude/
├── CLAUDE.md          ← グローバル指示書
├── settings.json      ← 権限・MCP・プラグイン設定
├── hooks.json         ← ツール実行前後のフック
├── commands/          ← カスタムスラッシュコマンド
│   ├── review.md
│   ├── dead-code.md
│   ├── duplicates.md
│   └── quick-check.md
├── skills/            ← スキル（拡張機能）
├── plugins/           ← プラグイン管理
├── projects/          ← プロジェクトごとの記憶・設定
│   └── {project}/
│       ├── CLAUDE.md  ← プロジェクト別指示
│       ├── settings.json
│       └── memory/    ← Claude の記憶
└── sessions/          ← 会話セッション履歴
```

### プロジェクトルート

```
{プロジェクト}/
├── CLAUDE.md          ← プロジェクトルートの指示書
└── .claude/
    ├── settings.json  ← プロジェクト設定
    └── commands/      ← プロジェクト固有コマンド
```

---

## 6. コンポーネント構成

```
src/
├── App.tsx                 ← メインレイアウト（ツリー + パネル）
├── components/
│   ├── TreeView/
│   │   ├── TreeView.tsx    ← ツリー全体
│   │   ├── TreeNode.tsx    ← 個別ノード（再帰コンポーネント）
│   │   └── TreeView.module.css
│   ├── ExplanationPanel/
│   │   ├── ExplanationPanel.tsx  ← 説明表示パネル
│   │   ├── CodeBlock.tsx         ← コード例の表示
│   │   └── ExplanationPanel.module.css
│   └── Header/
│       ├── Header.tsx
│       └── Header.module.css
├── data/
│   ├── treeData.ts         ← ツリー構造定義
│   └── explanations.ts     ← 各ノードの説明データ
├── types/
│   └── index.ts            ← 共通型定義
├── main.tsx
└── index.css               ← グローバルスタイル
```

---

## 7. 主要な振る舞い

### ツリー操作
1. ディレクトリノードをクリック → 展開/折りたたみ + 説明表示
2. ファイルノードをクリック → 説明表示
3. 選択中のノードはハイライト

### サイドパネル
1. 初期状態: ウェルカムメッセージ（「左のツリーから気になるファイルをクリックしてください」）
2. ノード選択時: セクション構成
   - **なぜ必要？** — そのファイル/ディレクトリが存在する理由
   - **何をするもの？** — 役割の説明
   - **書き方** — 具体的な記述方法（ファイルの場合）
   - **実際の例** — コードブロックで実例を表示
   - **ヒント** — 初心者向けの補足

---

## 8. 非目標（スコープ外）

- バックエンド / データベース
- ユーザー認証
- デプロイ設定（後で追加可能）
- ファイル編集機能（閲覧のみ）
- 検索機能（v1では不要）
