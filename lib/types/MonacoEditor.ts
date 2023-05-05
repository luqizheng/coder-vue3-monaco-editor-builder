import { mode } from "crypto-js";
import * as monaco from "monaco-editor";
import { Ref } from "vue";
export class MonacoEditor {
  editor: monaco.editor.IStandaloneCodeEditor;

  modelMap: Map<
    string,
    { model: monaco.editor.ITextModel; code: Ref<string> }
  > = new Map<string, { model: monaco.editor.ITextModel; code: Ref<string> }>();
  /**
   *
   */
  constructor(editor: monaco.editor.IStandaloneCodeEditor) {
    this.editor = editor;
    this.editor.onDidChangeModelContent(() => {
      var key = this.editor.getModel()?.uri.toString() ?? "";
      var code = this.modelMap.get(key)?.code;
      code?.value == this.editor.getValue();
    });
  }
  formatCode() {
    this.editor?.getAction("editor.action.formatDocument").run();
  }
  sync(
    uri: string,
    code: Ref<string>,
    lang: string = "javascript"
  ): monaco.editor.ITextModel {
    const uriName = monaco.Uri.parse(uri);
    let model = this.modelMap.get(uriName.toString());
    if (!model) {
      var codeModel = monaco.editor.createModel(code.value, lang, uriName);

      model = {
        code,
        model: codeModel,
      };
      this.modelMap.set(codeModel.uri.toString(), model);
      this.editor.setModel(codeModel);
    }
    return model.model;
  }

  /**
   * 添加代码引用，在这个编辑器内获得这个model代码提示。
   * 一般用于 全局代码 引入
   * @param model code
   */
  setModel(model: monaco.editor.ITextModel) {
    this.editor.setModel(model);
  }
}
