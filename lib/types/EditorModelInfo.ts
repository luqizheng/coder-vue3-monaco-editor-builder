import * as monaco from "monaco-editor";


export declare type EditorModelInfo = {
  model: monaco.editor.ITextModel;
  code: CodeProvider
  decorations: string[] | undefined;
};
/**
 * 代码提供
 */
export type CodeProvider = {
  get: { (): string };
  set: { (v: string): void };
};
