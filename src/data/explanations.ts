import type { Explanation } from "../types";

export const explanations: Record<string, Explanation> = {
  // === グローバル設定 ===
  "global-claude": {
    id: "global-claude",
    title: "~/.claude/（グローバル設定フォルダ）",
    why: "Claude Codeの設定を一箇所にまとめておく場所です。パソコンにインストールしたアプリが設定ファイルを保存するフォルダのようなものです。",
    what: "Claude Codeの全プロジェクト共通の設定・履歴・プラグインなどが入っています。Claude Codeをインストールすると自動で作られます。",
    tips: "このフォルダの中身を直接いじることはあまりありません。主に CLAUDE.md と settings.json を編集することが多いです。",
  },

  "global-claude-md": {
    id: "global-claude-md",
    title: "~/.claude/CLAUDE.md（グローバル指示書）",
    why: "すべてのプロジェクトで共通して Claude に守ってほしいルールを書く場所です。毎回同じことを伝える手間がなくなります。",
    what: "Claude Codeが会話を始めるたびに最初に読む「指示書」です。ここに書いたルールは、どのプロジェクトで作業しても必ず適用されます。",
    howToWrite: `Markdown形式で記述します。以下のような内容を書くと効果的です：

- **役割の定義**: Claudeにどう振る舞ってほしいか
- **共通ルール**: 言語（日本語）、コーディング規約、確認の取り方
- **使用ツール**: テストフレームワーク、パッケージマネージャなど`,
    steps: [
      {
        title: "ファイルを作成する",
        description: "ホームディレクトリの .claude フォルダ内に CLAUDE.md を作ります。",
        code: `# macOS / Linux の場合
touch ~/.claude/CLAUDE.md

# Windows (PowerShell) の場合
New-Item -Path "$env:USERPROFILE\\.claude\\CLAUDE.md" -ItemType File`,
      },
      {
        title: "役割を定義する",
        description: "まず「Claudeにどんな風に仕事してほしいか」を書きます。これが一番大事な部分です。",
        code: `# 役割
あなたはシニアエンジニア兼ペアプロです。
不明点があれば必ず質問してから作業してください。`,
      },
      {
        title: "共通ルールを追加する",
        description: "言語設定やコーディング規約など、どのプロジェクトでも守ってほしいルールを追加します。",
        code: `# 共通ルール
## 言語
- 回答・コミット・コメント全て日本語

## ランタイム・ツール
- Node.js / TypeScript
- パッケージマネージャ: npm
- テスト: Vitest`,
      },
      {
        title: "動作を確認する",
        description: "Claude Code を起動して、ルールが反映されているか確認しましょう。「あなたの役割を教えて」と聞いてみると、CLAUDE.md の内容を参照した回答が返ってきます。",
      },
    ],
    example: `# 役割
あなたはシニアエンジニア兼ペアプロです。

# 共通ルール
## 言語
- 回答・コミット・コメント全て日本語

## ランタイム・ツール
- Node.js / TypeScript
- パッケージマネージャ: npm
- テスト: Vitest`,
    tips: "「こういう風に仕事してほしい」をまとめた説明書だと思ってください。書けば書くほど、Claudeの動きがあなた好みになります。",
  },

  "global-settings": {
    id: "global-settings",
    title: "~/.claude/settings.json（グローバル設定）",
    why: "Claude Codeが使えるツールの許可設定や、外部ツールとの連携を管理するためです。セキュリティと利便性のバランスを取る重要なファイルです。",
    what: "以下の3つを主に設定します：\n\n1. **permissions** — Claudeが自動で使えるツールの許可リスト\n2. **mcpServers** — 外部ツール（GitHub、Playwright等）との連携設定\n3. **enabledPlugins** — 有効にするプラグイン",
    howToWrite: `JSON形式で記述します。主要な設定項目：

- permissions.allow: 自動許可するツール名の配列
- mcpServers: MCP（Model Context Protocol）サーバーの接続設定
- enabledPlugins: プラグインの有効/無効`,
    steps: [
      {
        title: "ファイルを作成する",
        description: "まだなければ、settings.json を作成します。",
        code: `# macOS / Linux の場合
touch ~/.claude/settings.json

# 最小限の内容で作成
echo '{}' > ~/.claude/settings.json`,
      },
      {
        title: "ツールの自動許可を設定する",
        description: "よく使うツールを「毎回聞かなくていいよ」と許可します。これで作業がスムーズになります。\n\n設定できる主なツール名：Read、Write、Edit、WebSearch、Bash(git *)、Bash(npm *) など。\nBash は「Bash(git *)」のようにコマンドを限定できます。",
        code: `{
  "permissions": {
    "allow": [
      "Read",
      "Write",
      "Edit",
      "Bash(git *)",
      "Bash(npm *)"
    ]
  }
}`,
      },
      {
        title: "MCPサーバーを追加する（任意）",
        description: "外部ツールと連携したい場合に設定します。MCPサーバーとは、Claude CodeにGitHub操作やブラウザ操作などの追加能力を与える仕組みです。",
        code: `{
  "permissions": { "allow": ["Read", "Write", "Edit"] },
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--headless"]
    }
  }
}`,
      },
      {
        title: "Claude Codeを再起動して確認する",
        description: "設定を反映するには Claude Code を再起動してください。起動時に settings.json が読み込まれ、許可したツールは確認なしで使えるようになります。",
      },
    ],
    example: `{
  "permissions": {
    "allow": [
      "Read",
      "Write",
      "Edit",
      "Bash(git *)",
      "Bash(npm *)"
    ]
  },
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--headless"]
    }
  }
}`,
    tips: "permissions に追加すると、毎回「このツールを使っていいですか？」と聞かれなくなります。よく使うツールは追加しておくと便利です。",
  },

  "global-hooks": {
    id: "global-hooks",
    title: "~/.claude/hooks.json（フック設定）",
    why: "Claudeがツールを使う前後に、自動でコマンドを実行したい場合に使います。例えば「コードを検索する前にインデックスを更新する」といった自動化ができます。",
    what: "Claude Codeの特定のイベント（ツール実行前・実行後など）に、シェルコマンドを自動実行する仕組みです。",
    howToWrite: `JSON形式で記述します。主なイベント：

- PreToolUse: ツール実行前に実行
- PostToolUse: ツール実行後に実行
- matcher: どのツールに対して実行するか`,
    steps: [
      {
        title: "hooks.json を作成する",
        description: "~/.claude/ に hooks.json を作成します。",
        code: `touch ~/.claude/hooks.json`,
      },
      {
        title: "基本構造を書く",
        description: "hooks.json の基本的な形を理解しましょう。「いつ」「どのツールで」「何を実行するか」の3つを指定します。",
        code: `{
  "hooks": {
    "イベント名": [
      {
        "matcher": {
          "tool_name": "対象ツール名"
        },
        "hooks": [
          {
            "type": "command",
            "command": "実行したいコマンド",
            "timeout": 8000
          }
        ]
      }
    ]
  }
}`,
      },
      {
        title: "実際のフックを設定する",
        description: "例として、Claude が検索系ツール（Grep, Glob, Bash）を使う前にメッセージを出すフックを作ります。\n\ntool_name は正規表現が使えます。「Grep|Glob」のように「|」で複数指定できます。",
        code: `{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": {
          "tool_name": "Grep|Glob|Bash"
        },
        "hooks": [
          {
            "type": "command",
            "command": "echo 'ツールを実行します'",
            "timeout": 8000
          }
        ]
      }
    ]
  }
}`,
      },
      {
        title: "Claude Codeを再起動して確認する",
        description: "フックの設定を反映するには再起動が必要です。対象ツールが使われたときにコマンドが実行されることを確認しましょう。",
      },
    ],
    example: `{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": {
          "tool_name": "Grep|Glob|Bash"
        },
        "hooks": [
          {
            "type": "command",
            "command": "echo '検索を開始します'",
            "timeout": 8000
          }
        ]
      }
    ]
  }
}`,
    tips: "最初は設定しなくても大丈夫です。慣れてきて「この作業を自動化したいな」と思ったときに使いましょう。",
  },

  "global-rules": {
    id: "global-rules",
    title: "~/.claude/rules/（ルールファイル）",
    why: "CLAUDE.md が長くなりすぎるのを防ぐための仕組みです。ルールをテーマごとに分けて管理できます。",
    what: "CLAUDE.md に全部書くと読みにくくなる場合に、ルールを個別の Markdown ファイルに分割して保存するフォルダです。ここに置いたファイルは CLAUDE.md と同じように Claude が読み込みます。",
    howToWrite: `Markdown ファイルを1ルール1ファイルで作成します。

- ファイル名でルールの内容が分かるようにする（例: workflow-phases.md）
- CLAUDE.md から「詳細は .claude/rules/○○.md を参照」と書いてリンクすると整理しやすい`,
    steps: [
      {
        title: "rules フォルダを作成する",
        description: "~/.claude/ の下に rules フォルダを作ります。",
        code: `mkdir -p ~/.claude/rules`,
      },
      {
        title: "ルールファイルを作成する",
        description: "テーマごとにファイルを分けて作ります。ファイル名を見ただけで中身が分かる名前にしましょう。",
        code: `# 例: ワークフローのルールを書く
touch ~/.claude/rules/workflow-phases.md`,
      },
      {
        title: "ルールの内容を書く",
        description: "そのテーマに関するルールを Markdown で書きます。CLAUDE.md と同じ書き方でOKです。",
        code: `# ワークフロー Phase 定義

## Phase 0: インテイク
- 依頼の要約 + 未確定事項の質問
- ここで止まる（勝手に進めない）

## Phase 1: 合意形成
- 受入条件・非目標を確認
- 中規模以上は SPEC を作成

## Phase 2: 実装計画
- 変更方針・ステップ・テスト計画を提示
- 承認を得てから次へ

## Phase 3: 実行
- 「GO」が出るまで編集しない`,
      },
      {
        title: "CLAUDE.md から参照する",
        description: "CLAUDE.md に「詳細は rules/○○.md を参照」と書いておくと、構造が整理されて読みやすくなります。",
        code: `# CLAUDE.md に追加する例：
# ワークフロー
※ 各Phaseの詳細は .claude/rules/workflow-phases.md を参照`,
      },
    ],
    example: `# rules/ の使い方の例

~/.claude/
├── CLAUDE.md           ← 「概要はここ、詳細は rules/ を参照」
└── rules/
    ├── workflow-phases.md  ← ワークフローのルール
    ├── coding-style.md    ← コーディング規約
    └── review-checklist.md ← レビュー観点`,
    tips: "CLAUDE.md が50行を超えてきたら、rules/ に分割することを検討しましょう。テーマごとにファイルを分けると、後から見つけやすく、修正も楽になります。",
  },

  "global-rules-example": {
    id: "global-rules-example",
    title: "workflow-phases.md（ルール例）",
    why: "チームの作業フローを明文化しておくと、Claudeが勝手に先に進まず、決められた手順で確認しながら作業してくれるようになります。",
    what: "ワークフローの Phase 定義（インテイク → 合意形成 → 実装計画 → 実行）を記述したルールファイルの例です。",
    example: `# ワークフロー Phase 定義

## Phase 0: インテイク
- 依頼の要約 + 未確定事項の質問
- ここで止まる（勝手に進めない）

## Phase 1: 合意形成
- 受入条件・非目標を確認
- 中規模以上は SPEC を作成

## Phase 2: 実装計画
- 変更方針・ステップ・テスト計画を提示

## Phase 3: 実行
- 「GO」が出るまで編集しない
- 高リスク操作・方針分岐・想定外は即停止して質問`,
    tips: "自分のチームの作業フローに合わせてカスタマイズしましょう。「ここで止まれ」「勝手に進むな」のポイントを明記するのがコツです。",
  },

  "global-commands": {
    id: "global-commands",
    title: "~/.claude/commands/（カスタムコマンド）",
    why: "よく使う指示を「スラッシュコマンド」として登録しておけます。毎回長い指示を打たなくても、短いコマンド一発で実行できるようになります。",
    what: "Markdownファイルを置くと、それがスラッシュコマンド（例: /review）として使えるようになります。ファイル名がコマンド名になります。",
    howToWrite: `Markdownファイルを作成します：

- ファイル名 = コマンド名（例: review.md → /review）
- 中身 = Claudeへの指示文
- $ARGUMENTS でコマンドに渡した引数を受け取れます`,
    steps: [
      {
        title: "commands フォルダを確認する",
        description: "~/.claude/commands/ フォルダがあるか確認します。なければ作成します。",
        code: `mkdir -p ~/.claude/commands`,
      },
      {
        title: "コマンドファイルを作成する",
        description: "ファイル名がそのままコマンド名になります。例えば review.md を作ると /review コマンドが使えるようになります。",
        code: `# 「/review」コマンドを作る例
touch ~/.claude/commands/review.md`,
      },
      {
        title: "コマンドの中身を書く",
        description: "ファイルの中に、Claudeへの指示を Markdown で書きます。\n\n$ARGUMENTS と書くと、コマンド実行時に渡した引数（ファイル名など）がその位置に入ります。",
        code: `以下の観点でコードをレビューしてください：
1. バグの可能性がないか
2. パフォーマンスに問題がないか
3. セキュリティリスクがないか
4. もっと読みやすくできないか

対象: $ARGUMENTS`,
      },
      {
        title: "コマンドを使ってみる",
        description: "Claude Code の入力欄で / を打つとコマンド一覧が表示されます。作成したコマンドを選んで実行してみましょう。",
        code: `# Claude Code の入力欄で以下のように入力：
/review src/App.tsx`,
      },
    ],
    example: `# review.md の例

以下の観点でコードをレビューしてください：
1. バグの可能性
2. パフォーマンスの問題
3. セキュリティリスク
4. 可読性の改善点

対象: $ARGUMENTS`,
    tips: "チーム内で便利なコマンドを共有すると、全員が同じ品質のレビューを受けられるようになります。",
  },

  "global-commands-example": {
    id: "global-commands-example",
    title: "review.md（コマンド例）",
    why: "コードレビューの指示を毎回手で書くのは大変です。コマンドにしておけば /review と打つだけで統一的なレビューが受けられます。",
    what: "/review というスラッシュコマンドの定義ファイルです。実行すると、ファイル内の指示に従ってClaude がコードレビューを行います。",
    example: `# 実際の使い方
# ターミナルで以下を入力：
/review src/components/App.tsx`,
    tips: "自分のチームでよく指摘される項目をコマンドに盛り込んでおくと効果的です。",
  },

  "global-skills": {
    id: "global-skills",
    title: "~/.claude/skills/（スキル）",
    why: "Claude Codeに「得意技」を追加できます。例えば、PDF作成、スライド作成、特定のフレームワークに特化した機能などです。",
    what: "スキルはClaude Codeの拡張機能です。Anthropic公式のスキルや、サードパーティのスキルをインストールして使えます。自動的に管理されるフォルダなので、手動編集は不要です。",
    steps: [
      {
        title: "公式スキルをインストールする",
        description: "Anthropic公式が提供するスキルは、Claude Code の中から簡単にインストールできます。",
        code: `# Claude Code の入力欄で：
/install-skill`,
      },
      {
        title: "インストール済みスキルを確認する",
        description: "~/.claude/skills/ フォルダの中身を見ると、インストール済みスキルが確認できます。\n\n公式スキルは anthropic-official フォルダの下にシンボリックリンクとして配置されます。",
        code: `ls ~/.claude/skills/
# 出力例：
# algorithmic-art -> .../anthropic-official/skills/algorithmic-art
# pdf -> .../anthropic-official/skills/pdf
# xlsx -> .../anthropic-official/skills/xlsx`,
      },
      {
        title: "スキルを使う",
        description: "スキルは特定の状況で自動的に呼び出されるか、スラッシュコマンドのように明示的に使えます。\n\n例えば pdf スキルは「PDFを作って」と言うだけで自動的に使われます。",
      },
      {
        title: "独自スキルを作る（上級者向け）",
        description: "自分でスキルを作ることもできます。スキルは Markdown ファイルで、Claude への特定分野の指示をまとめたものです。\n\n/skill-creator コマンドを使うと対話的にスキルを作成できます。",
        code: `# Claude Code の入力欄で：
/skill-creator`,
      },
    ],
    tips: "よく使う作業パターンがあるなら、スキルにまとめておくと毎回指示を書かなくて済みます。まずは公式スキルを試してみましょう。",
  },

  "global-plugins": {
    id: "global-plugins",
    title: "~/.claude/plugins/（プラグイン）",
    why: "外部サービス（Figma、Slack等）とClaude Codeを連携させるための仕組みです。",
    what: "インストールしたプラグインの情報が保存されています。settings.json の enabledPlugins で有効/無効を切り替えます。自動管理されるフォルダです。",
    tips: "プラグインの管理は settings.json から行います。このフォルダを直接編集する必要はありません。",
  },

  "global-projects": {
    id: "global-projects",
    title: "~/.claude/projects/（プロジェクト別データ）",
    why: "プロジェクトごとに異なる設定や記憶を保存するためです。仕事のプロジェクトAと個人プロジェクトBで違う振る舞いをさせたい場合に役立ちます。",
    what: "Claude Codeが各プロジェクトで作業した内容の記憶や、プロジェクト固有の設定を保存するフォルダです。プロジェクトのパスに基づいて自動的にフォルダが作られます。",
    tips: "自動生成されるフォルダなので、通常は意識する必要はありません。CLAUDE.md と memory/ だけ知っていれば十分です。",
  },

  "global-projects-project": {
    id: "global-projects-project",
    title: "{プロジェクト名}/（個別プロジェクト）",
    why: "プロジェクトごとにClaude の振る舞いをカスタマイズするためです。",
    what: "特定のプロジェクトの作業ディレクトリに対応したフォルダです。そのプロジェクト専用のCLAUDE.md、設定、記憶が入っています。",
    tips: "フォルダ名はプロジェクトのパスを変換したものになります（例: /mnt/c/projects/my-app → -mnt-c-projects-my-app）。",
  },

  "global-projects-claude-md": {
    id: "global-projects-claude-md",
    title: "projects/{project}/CLAUDE.md",
    why: "特定のプロジェクトでだけ有効にしたいルールがある場合に使います。グローバルのCLAUDE.mdと併用できます。",
    what: "プロジェクト固有の指示書です。グローバルのCLAUDE.mdの内容に加えて、このファイルの内容も適用されます。",
    howToWrite: "グローバルのCLAUDE.mdと同じMarkdown形式です。そのプロジェクトにだけ必要なルール（使用するDB、API仕様など）を書きます。",
    tips: "グローバルに書いた内容をここで繰り返す必要はありません。プロジェクト特有のことだけ書きましょう。",
  },

  "global-projects-settings": {
    id: "global-projects-settings",
    title: "projects/{project}/settings.json",
    why: "プロジェクトごとに異なるツール許可やMCP設定を使いたい場合に設定します。",
    what: "グローバルの settings.json と同じ形式ですが、このプロジェクトでのみ有効な設定を書きます。",
    tips: "特別な理由がなければ、グローバルの settings.json だけで十分なことが多いです。",
  },

  "global-projects-memory": {
    id: "global-projects-memory",
    title: "projects/{project}/memory/（記憶）",
    why: "会話が終わっても、次の会話で前回の文脈を引き継ぎたい場合に使います。Claudeが「覚えておいて」と言われた内容が保存されます。",
    what: "Claude Codeの記憶システムです。ユーザーの好み、プロジェクトの背景、フィードバックなどがMarkdownファイルとして保存されます。",
    howToWrite: "直接編集も可能ですが、通常はClaude に「これを覚えておいて」と伝えるだけで自動的に保存されます。",
    tips: "「前回話したあの件、覚えてる？」と聞くと、ここに保存された記憶から回答してくれます。",
  },

  "global-sessions": {
    id: "global-sessions",
    title: "~/.claude/sessions/（セッション履歴）",
    why: "過去の会話を振り返りたい場合に使います。",
    what: "Claude Codeとの会話セッションの履歴が保存されています。自動管理されるフォルダです。",
    tips: "通常は意識する必要はありません。Claude Code が自動で管理しています。",
  },

  // === プロジェクトルート ===
  "project-root": {
    id: "project-root",
    title: "{プロジェクト}/（プロジェクトルート）",
    why: "ここがClaude Codeで作業するときの「作業場所」です。プロジェクトのコードと、Claude への指示を一緒に管理します。",
    what: "あなたのプロジェクトのルートディレクトリです。ここに CLAUDE.md と .claude/ を置くことで、チームメンバー全員が同じClaude の設定を共有できます。",
    tips: "CLAUDE.md をGitリポジトリに含めれば、チーム全員で同じルールを使えます。",
  },

  "project-claude-md": {
    id: "project-claude-md",
    title: "{プロジェクト}/CLAUDE.md（プロジェクト指示書）",
    why: "チーム全員が同じClaude の振る舞いを得るために、プロジェクトに同梱する指示書です。Gitで管理すれば全員に共有されます。",
    what: "プロジェクトルートに置くCLAUDE.mdです。ビルドコマンド、テスト方法、アーキテクチャの概要など、そのプロジェクト固有の情報を書きます。",
    howToWrite: `以下の内容を含めると効果的です：

- **ビルド・テストコマンド**: npm run dev, npm test など
- **アーキテクチャ概要**: 技術スタック、ディレクトリ構成の意図
- **コーディング規約**: そのプロジェクト独自のルール
- **注意事項**: 触ってはいけないファイル、特殊な設定など`,
    steps: [
      {
        title: "プロジェクトルートにファイルを作成する",
        description: "プロジェクトのいちばん上のフォルダ（package.json と同じ場所）に CLAUDE.md を作ります。",
        code: `# プロジェクトのルートで：
touch CLAUDE.md`,
      },
      {
        title: "ヘッダーを書く",
        description: "まずファイルの先頭に、このファイルが何かを示す説明を書きます。",
        code: `# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.`,
      },
      {
        title: "ビルド・テストコマンドを書く",
        description: "Claudeが「ビルドしたい」「テストしたい」と思ったときに使うコマンドを書きます。\nこれがあると、Claude が自分でビルドやテストを実行できるようになります。",
        code: `## コマンド
- 開発サーバー: npm run dev
- テスト: npm test
- ビルド: npm run build
- 型チェック: npx tsc --noEmit`,
      },
      {
        title: "アーキテクチャを書く",
        description: "プロジェクトの技術スタックや構成の意図を書きます。「なぜこの技術を選んだか」まで書くとさらに効果的です。",
        code: `## アーキテクチャ
- Vite + React + TypeScript
- スタイリング: CSS Modules
- 状態管理: useState のみ（外部ライブラリ不使用）`,
      },
      {
        title: "Gitにコミットして共有する",
        description: "CLAUDE.md をコミットすれば、チーム全員がこの指示書の恩恵を受けられます。",
        code: `git add CLAUDE.md
git commit -m "CLAUDE.md を追加"`,
      },
    ],
    example: `# CLAUDE.md

## ビルド・テスト
- 開発サーバー: npm run dev
- テスト: npm test
- ビルド: npm run build

## アーキテクチャ
- Vite + React + TypeScript
- スタイリング: CSS Modules
- 状態管理: React の useState/useContext のみ

## 注意事項
- .env ファイルはコミットしない
- APIキーは環境変数から読む`,
    tips: "これがいちばん重要なファイルです。チームの新メンバーが読んで「このプロジェクトの使い方がわかる」レベルの情報を書きましょう。",
  },

  "project-dot-claude": {
    id: "project-dot-claude",
    title: "{プロジェクト}/.claude/（プロジェクト設定）",
    why: "プロジェクト固有のClaude Code設定やカスタムコマンドを、チームで共有するためのフォルダです。",
    what: "プロジェクトルートに置く .claude/ ディレクトリです。settings.json やカスタムコマンドを入れておくと、そのプロジェクトでの作業時に自動で読み込まれます。",
    steps: [
      {
        title: ".claude フォルダを作成する",
        description: "プロジェクトのルートに .claude フォルダを作ります。",
        code: `mkdir -p .claude`,
      },
      {
        title: "必要に応じてファイルを配置する",
        description: "settings.json（設定）や commands/（カスタムコマンド）を必要に応じて追加します。",
        code: `# 設定ファイルを作る場合
touch .claude/settings.json

# コマンドフォルダを作る場合
mkdir -p .claude/commands`,
      },
      {
        title: "Gitにコミットして共有する",
        description: ".claude/ フォルダをコミットすれば、チーム全員が同じ設定・コマンドを使えます。",
        code: `git add .claude/
git commit -m "プロジェクト固有のClaude Code設定を追加"`,
      },
    ],
    tips: "Gitに含めてチームで共有できます。グローバル設定よりも、こちらの設定が優先されます。",
  },

  "project-settings": {
    id: "project-settings",
    title: "{プロジェクト}/.claude/settings.json",
    why: "プロジェクト内で使うツールの許可設定を、チームで統一するためです。",
    what: "そのプロジェクトでのみ有効な permissions や MCP サーバー設定を書きます。Gitで共有すれば、チーム全員が同じ設定で作業できます。",
    howToWrite: "グローバルの settings.json と同じJSON形式です。",
    steps: [
      {
        title: "settings.json を作成する",
        description: ".claude/ フォルダの中に settings.json を作ります。",
        code: `touch .claude/settings.json`,
      },
      {
        title: "プロジェクト固有の許可を設定する",
        description: "このプロジェクトで使うツールの許可を設定します。グローバル設定に加えて、ここで追加の許可が可能です。",
        code: `{
  "permissions": {
    "allow": [
      "Read",
      "Write",
      "Bash(npm test *)"
    ]
  }
}`,
      },
      {
        title: "Gitにコミットする",
        description: "チーム全員で共有するためにコミットします。",
        code: `git add .claude/settings.json
git commit -m "プロジェクト固有の権限設定を追加"`,
      },
    ],
    example: `{
  "permissions": {
    "allow": [
      "Read",
      "Write",
      "Bash(npm test *)"
    ]
  }
}`,
    tips: "プロジェクト固有のMCPサーバーがある場合は、ここに設定するとチーム全員で使えます。",
  },

  "project-rules": {
    id: "project-rules",
    title: "{プロジェクト}/.claude/rules/",
    why: "そのプロジェクト固有のルールを、チームで共有するためです。Git にコミットすれば全員が同じルールで作業できます。",
    what: "プロジェクトの .claude/rules/ にルールファイルを置くと、そのプロジェクトでのみ適用されるルールになります。グローバルの rules/ と同じ形式です。",
    howToWrite: "グローバルの rules/ と同じ Markdown 形式です。プロジェクト固有のコーディング規約やレビュー観点などを置きましょう。",
    steps: [
      {
        title: "rules フォルダを作成する",
        description: "プロジェクトの .claude/ の下に rules フォルダを作ります。",
        code: `mkdir -p .claude/rules`,
      },
      {
        title: "ルールファイルを作成する",
        description: "プロジェクト固有のルールを Markdown で書きます。",
        code: `# 例: このプロジェクトのコーディング規約
cat > .claude/rules/coding-style.md << 'EOF'
# コーディング規約

- コンポーネントは関数コンポーネントで書く
- CSS は CSS Modules を使う
- 状態管理は useState / useContext のみ
- 外部ライブラリの追加は事前に相談する
EOF`,
      },
      {
        title: "Git にコミットして共有する",
        description: "コミットすればチーム全員に共有されます。",
        code: `git add .claude/rules/
git commit -m "プロジェクト固有のルールを追加"`,
      },
    ],
    tips: "グローバルの rules/ と重複する内容はここに書く必要はありません。プロジェクト特有のルールだけ書きましょう。",
  },

  "project-commands": {
    id: "project-commands",
    title: "{プロジェクト}/.claude/commands/",
    why: "そのプロジェクト専用のスラッシュコマンドを、チームで共有するためです。",
    what: "プロジェクトルートの .claude/commands/ にMarkdownファイルを置くと、そのプロジェクトでのみ使えるスラッシュコマンドになります。",
    howToWrite: "グローバルの commands/ と同じ形式です。ファイル名がコマンド名になります。",
    steps: [
      {
        title: "commands フォルダを作成する",
        description: "プロジェクトの .claude/ の下に commands フォルダを作ります。",
        code: `mkdir -p .claude/commands`,
      },
      {
        title: "コマンドファイルを作成する",
        description: "例えば、このプロジェクト固有のデプロイ手順をコマンド化してみましょう。",
        code: `# .claude/commands/deploy-check.md を作成
cat > .claude/commands/deploy-check.md << 'EOF'
デプロイ前のチェックリストを実行してください：

1. npm run build が成功するか確認
2. npm test が全てパスするか確認
3. TypeScriptの型エラーがないか確認
4. 未コミットの変更がないか確認

結果をまとめて報告してください。
EOF`,
      },
      {
        title: "チームで共有する",
        description: "Gitにコミットすれば、チーム全員が /deploy-check コマンドを使えるようになります。",
        code: `git add .claude/commands/
git commit -m "デプロイ前チェックコマンドを追加"`,
      },
    ],
    tips: "プロジェクト固有のデプロイ手順やチェックリストをコマンド化しておくと便利です。",
  },
};
