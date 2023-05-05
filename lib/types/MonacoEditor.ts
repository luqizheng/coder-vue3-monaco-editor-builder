import { mode } from "crypto-js";
import * as monaco from "monaco-editor";
import { Ref } from "vue";
import { MonacoBuilder, SnapShot } from "..";
import { EditorModelInfo } from "./EditorModelInfo";

export class MonacoEditor {
  editor: monaco.editor.IStandaloneCodeEditor;
  builder: MonacoBuilder;
  htmlElement: HTMLElement;
  /**
   *
   */
  constructor(
    editor: monaco.editor.IStandaloneCodeEditor,
    builder: MonacoBuilder,
    htmlElement: HTMLElement
  ) {
    this.htmlElement = htmlElement;
    this.editor = editor;
    this.builder = builder;
    this.editor.onDidChangeModelContent(() => {
      var codeStr = this.editor.getValue();
      var key = this.editor.getModel()?.uri;
      if (key) {
        const modelInfo = this.builder.getModel(key);
        if (modelInfo) modelInfo.code.value = codeStr;
      }
    });
  }

  /**
   * 暂停builder 所有的 model，避免在builder之间共享 module的提示。
   *
   */
  setModleEnable(enable: boolean) {
    this.builder.setModleEnable(enable)
  }

  /**
   * 格式化
   */
  formatCode() {
    this.editor?.getAction("editor.action.formatDocument").run();
  }
  /**
   *
   * @param uri
   * @param code
   * @param codeRelative
   * @param lang
   * @param showCode 是否在代码编辑器中显示。
   * @returns
   */
  setGlobalCode(
    uri: string,
    code: Ref<string>,
    showCode: boolean = false,
    lang: string = "javascript"
  ): monaco.editor.ITextModel {
    const uriName = monaco.Uri.parse(uri);
    let model = this.builder.getGlobalModel(uriName);
    if (!model) {
      var codeModel = monaco.editor.createModel(code.value, lang, uriName);

      model = {
        code,
        model: codeModel,
      };
      this.builder.globalModelMap.set(codeModel.uri.toString(), model);
      this.editor.setModel(codeModel);
    }

    return model.model;
  }
  setCode(uri: string, code: Ref<string>, lang: string = "javascript"): void {
    const uriName = monaco.Uri.parse(uri);

    const builder = () => {
      return {
        model: monaco.editor.createModel(code.value, lang, uriName),
        code,
      } as EditorModelInfo;
    };

    var codeInfo = this.builder.setIndependModule(uriName, builder);

    this.editor.setModel(codeInfo.model);
  }
}
