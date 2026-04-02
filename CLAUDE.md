# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

社内エンジニア向けのClaude Code設定ファイル構成ガイドアプリ。ディレクトリツリーをクリックすると、各ファイル/フォルダの「なぜ必要か」「何をするか」「書き方」がサイドパネルに表示される。

## 技術スタック

- Vite + React 19 + TypeScript
- スタイリング: CSS Modules
- パッケージマネージャ: npm

## コマンド

```bash
npm run dev      # 開発サーバー起動
npm run build    # TypeScript型チェック + ビルド
npm run preview  # ビルド結果のプレビュー
npx tsc --noEmit # 型チェックのみ
```

## アーキテクチャ

### データ駆動設計
ツリー構造と説明データはTSファイル（`src/data/`）で管理。コンポーネントはデータを受け取って表示するだけ。コンテンツを追加するには `treeData.ts` にノードを追加し、`explanations.ts` に同じIDの説明を追加する。

### コンポーネント構成
- `TreeView` / `TreeNodeItem`: 再帰コンポーネントによるツリー描画。`TreeNodeItem` が自身の子を再帰的にレンダリング
- `ExplanationPanel`: 選択されたノードIDに対応する説明データを表示。未選択時はウェルカムメッセージ
- 状態管理は `App.tsx` の `useState` のみ（selectedId）

### コンテンツ追加手順
1. `src/data/treeData.ts` のツリーに `TreeNode` を追加（`id` はユニーク）
2. `src/data/explanations.ts` に同じ `id` で `Explanation` を追加
3. 説明は初級エンジニアでも理解できる平易な日本語で記述

## 設計書

- `docs/design.md` — 画面構成、データ構造、コンポーネント設計
