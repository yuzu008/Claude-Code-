# Claude Code 設定ファイルガイド

社内エンジニア向けの **Claude Code 設定ファイル構成ガイド** Webアプリです。  
初級エンジニアでも理解できるよう、平易な日本語で Claude Code の設定方法を解説します。

## 機能

### ガイドタブ
左のディレクトリツリーからファイルやフォルダをクリックすると、右のパネルに解説が表示されます。

- **なぜ必要？** — そのファイルが存在する理由
- **何をするもの？** — 役割の説明
- **作り方（ステップバイステップ）** — 順を追った作成手順
- **実際の例** — コードブロックで実例を表示
- **ヒント** — 初心者向けの補足

対象ファイル:
- `~/.claude/` 配下（CLAUDE.md、settings.json、hooks.json、rules/、commands/、skills/ 等）
- プロジェクトルート（CLAUDE.md、.claude/ 配下）

### ファイル作成タブ
ウィザード形式でClaude Code の設定ファイルを対話的に生成できます。

| ウィザード | 内容 |
|---|---|
| **CLAUDE.md** | 役割 → ルール → ツール → 注意事項 |
| **settings.json** | ツール許可 → MCPサーバー設定 |
| **hooks.json** | フック（自動処理）の設定 |
| **ルールファイル** | テーマ別ルールの作成 |
| **カスタムコマンド** | スラッシュコマンドの作成 |
| **スキル** | Claudeの得意技の作成 |

各ステップの右側にガイドパネル（説明・記入例・ヒント）が表示されます。  
生成結果はコピーまたは `.md` / `.json` ファイルとしてダウンロードできます。

### 概念説明タブ
Claude Code を使う上で知っておくべき4つの概念を、初心者向けにやさしく解説します。

| 概念 | 内容 |
|---|---|
| **コンテキストウィンドウ** | Claudeが一度に覚えていられる情報量の限界 |
| **ツール** | Claude Code が使える道具（Read, Write, Bash 等） |
| **MCPサーバー** | 外部ツール連携の仕組み（Playwright, GitHub 等） |
| **サブエージェント** | メインの会話を圧迫せず別室で作業するアシスタント |

## 技術スタック

- [Vite](https://vite.dev/) + [React](https://react.dev/) 19 + TypeScript
- スタイリング: CSS Modules
- 外部UIライブラリ不使用

## セットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

## ディレクトリ構成

```
src/
├── components/
│   ├── Concepts/          # 概念説明タブ
│   ├── ExplanationPanel/  # ガイドタブの説明パネル
│   ├── Generator/         # ファイル作成タブ（ウィザード群）
│   ├── Header/            # ヘッダー（タブ切り替え）
│   └── TreeView/          # ガイドタブのツリー表示
├── data/
│   ├── concepts.ts        # 概念説明データ
│   ├── explanations.ts    # ツリーノードの説明データ
│   └── treeData.ts        # ツリー構造データ
└── types/
    └── index.ts           # 共通型定義
```

## コンテンツの追加方法

### ガイドタブにノードを追加する

1. `src/data/treeData.ts` にツリーノードを追加（`id` はユニーク）
2. `src/data/explanations.ts` に同じ `id` で説明データを追加

### 概念説明を追加する

`src/data/concepts.ts` の `concepts` 配列に新しい概念オブジェクトを追加

## ライセンス

[MIT](LICENSE)
