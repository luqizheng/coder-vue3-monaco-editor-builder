import * as monaco from "monaco-editor";
import { JavascriptBuilder } from "./JavascriptBuilder";
import { MonacoEditor } from "./MonacoEditor";
import { Ref } from "vue";
export declare type EditorModelInfo = {
  model: monaco.editor.ITextModel;
  code: Ref<string>;
};
export class MonacoBuilder {
  public globalModelMap: Map<string, EditorModelInfo> = new Map<
    string,
    EditorModelInfo
  >();

  public independModel: EditorModelInfo | undefined = undefined;

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

  forJs(): JavascriptBuilder {
    this.options.language = "javascript";
    return new JavascriptBuilder(this);
  }

  build(htmlElement: HTMLElement): MonacoEditor {
    var editor = monaco.editor.create(htmlElement, this.options);
    return new MonacoEditor(editor, this, htmlElement);
  }

  getModel(uri: monaco.Uri): EditorModelInfo | undefined {
    var key = uri.toString();

    return this.independModel?.model.uri.toString() == key
      ? this.independModel
      : this.globalModelMap.get(key);
  }

  getGlobalModel(uri: monaco.Uri): EditorModelInfo | undefined {
    return this.globalModelMap.get(uri.toString());
  }

  /**
   *  如果uri一样，就不覆盖，不一样就采用build 出来的对象覆盖原来的
   * @param uri key值
   * @param buildFunc 如果uri一样，就不覆盖，不一样就采用build 出来的对象覆盖原来的
   */
  tryReplaceIndependModule(
    uri: monaco.Uri,
    buildFunc: { (): EditorModelInfo }
  ): EditorModelInfo {
    debugger;
    if (this.independModel) {
      const isSamme = this.independModel.model.uri.toString() == uri.toString();
      if (!isSamme) {
        this.independModel.model.dispose();
        this.independModel = undefined;
      }
    }
    if (!this.independModel) this.independModel = buildFunc();

    return this.independModel;
  }
}
