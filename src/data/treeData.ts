import type { TreeNode } from "../types";

// グローバル設定のツリー構造
export const globalTree: TreeNode = {
  id: "global-claude",
  name: "~/.claude/",
  type: "directory",
  children: [
    {
      id: "global-claude-md",
      name: "CLAUDE.md",
      type: "file",
    },
    {
      id: "global-settings",
      name: "settings.json",
      type: "file",
    },
    {
      id: "global-hooks",
      name: "hooks.json",
      type: "file",
    },
    {
      id: "global-rules",
      name: "rules/",
      type: "directory",
      children: [
        {
          id: "global-rules-example",
          name: "workflow-phases.md（例）",
          type: "file",
        },
      ],
    },
    {
      id: "global-commands",
      name: "commands/",
      type: "directory",
      children: [
        {
          id: "global-commands-example",
          name: "review.md（例）",
          type: "file",
        },
      ],
    },
    {
      id: "global-skills",
      name: "skills/",
      type: "directory",
    },
    {
      id: "global-plugins",
      name: "plugins/",
      type: "directory",
    },
    {
      id: "global-projects",
      name: "projects/",
      type: "directory",
      children: [
        {
          id: "global-projects-project",
          name: "{プロジェクト名}/",
          type: "directory",
          children: [
            {
              id: "global-projects-claude-md",
              name: "CLAUDE.md",
              type: "file",
            },
            {
              id: "global-projects-settings",
              name: "settings.json",
              type: "file",
            },
            {
              id: "global-projects-memory",
              name: "memory/",
              type: "directory",
            },
          ],
        },
      ],
    },
    {
      id: "global-sessions",
      name: "sessions/",
      type: "directory",
    },
  ],
};

// プロジェクトルートのツリー構造
export const projectTree: TreeNode = {
  id: "project-root",
  name: "{プロジェクト}/",
  type: "directory",
  children: [
    {
      id: "project-claude-md",
      name: "CLAUDE.md",
      type: "file",
    },
    {
      id: "project-dot-claude",
      name: ".claude/",
      type: "directory",
      children: [
        {
          id: "project-settings",
          name: "settings.json",
          type: "file",
        },
        {
          id: "project-rules",
          name: "rules/",
          type: "directory",
        },
        {
          id: "project-commands",
          name: "commands/",
          type: "directory",
        },
      ],
    },
  ],
};
