import * as monaco from "monaco-editor";
import { Ref } from "vue";
export * from "./MonacoBuilder";
export * from "./MonacoEditor";
export * from "./EditorModelInfo";
export type SnapShot = {
  snapShot: monaco.editor.ITextSnapshot;
  lang: "";
  code: Ref<string>;
  uri: monaco.Uri;
};
export type IntellisenceEnv = {
  set(key: string, code: string): IntellisenceEnv;
  remove(key: string): IntellisenceEnv;
  setEs5(): IntellisenceEnv;
  removeEs5(): IntellisenceEnv;
  setEs6(): IntellisenceEnv;
  removeEs6(): IntellisenceEnv;
  setNoLib(): IntellisenceEnv;
};
