import * as monaco from "monaco-editor";
import { JavascriptBuilder } from "./JavascriptBuilder";
import { MonacoEditor } from "./MonacoEditor";

export class MonacoBuilder {
  public htmlElement: HTMLElement;
  options: monaco.editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false },
    theme: "vs-dark",
    multiCursorModifier: "ctrlCmd",
    scrollbar: {
      verticalScrollbarSize: 8,
      horizontalScrollbarSize: 8,
    },
    tabSize: 2,
    automaticLayout: true, // 自适应宽高
  };
  /**
   *
   */
  constructor(htmlElement: HTMLElement) {
    this.htmlElement = htmlElement;
  }

  forJs(): JavascriptBuilder {
    this.options.language = "javascript";
    return new JavascriptBuilder(this);
  }

  build(): MonacoEditor {
    var editor = monaco.editor.create(this.htmlElement, this.options);
    return new MonacoEditor(editor);
  }
}
