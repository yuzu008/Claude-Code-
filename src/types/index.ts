// ツリーノードの型定義
export type TreeNode = {
  id: string;
  name: string;
  type: "file" | "directory";
  children?: TreeNode[];
};

// 作り方の手順
export type Step = {
  title: string;
  description: string;
  code?: string;
};

// 説明データの型定義
export type Explanation = {
  id: string;
  title: string;
  why: string;
  what: string;
  howToWrite?: string;
  steps?: Step[];
  example?: string;
  tips?: string;
};
