import * as monaco from "monaco-editor";
import { Ref } from "vue";

export declare type EditorModelInfo = {
  model: monaco.editor.ITextModel;
  code: Ref<string>;
};
