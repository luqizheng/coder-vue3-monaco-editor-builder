import * as monaco from "monaco-editor";

import { MonacoBuilder } from "..";
import { CodeProvider, EditorModelInfo } from "./EditorModelInfo";

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
        if (modelInfo) modelInfo.code.set(codeStr);
      }
    });
  }

  /**
   * 暂停builder 所有的 model，避免在builder之间共享 module的提示。
   *
   */
  setModleEnable(enable: boolean) {
    this.builder.setModleEnable(enable);
  }

  /**
   * 格式化
   */
  formatCode() {
  
      this.editor?.getAction("editor.action.formatDocument")?.run();
  }
  /**
   *
   * @param uri 用于表示代码的唯一key，采用monaco.Uri。当切换代码的时候用此进行对比
   * @param code 代码
   * @param lang 语言id 根据woker的进行设置。
   * @param showCode 是否在代码编辑器中显示。
   * @returns
   */
  setCode(
    uri: string,
    code: CodeProvider,
    showCode: boolean = true,
    lang: string = "javascript"
  ): monaco.editor.ITextModel {
    const uriName = monaco.Uri.parse(uri);
    let model = this.builder.getGlobalModel(uriName);
    if (!model) {
      var codeModel = monaco.editor.createModel(code.get(), lang, uriName);

      model = {
        code,
        model: codeModel,
        decorations: undefined,
      };
      this.builder.globalModelMap.set(codeModel.uri.toString(), model);
      if (showCode) {
        this.editor.setModel(codeModel);
      }
    }
    if (model.decorations) {
      model.model.deltaDecorations(model.decorations, []);
    }
    model.model.setValue(code.get());
    return model.model;
  }
  setIndependCode(
    uri: string,
    code: CodeProvider,
    lang: string = "javascript"
  ): monaco.editor.ITextModel {
    const uriName = monaco.Uri.parse(uri);
    const builder = () => {
      return {
        model: monaco.editor.createModel(code.get(), lang, uriName),
        code,
      } as EditorModelInfo;
    };
    var codeInfo = this.builder.setIndependModule(uriName, builder);
    codeInfo.model.setValue(code.get());

    this.editor.setModel(codeInfo.model);
    return codeInfo.model;
  }
  /**
   * 高亮代码行数。
   * @param line 代码行数
   * @returns
   */

  hightLine(line: number, hightStyeClass: string) {
    if (!this.editor) return;
    const key = this.editor.getModel()?.uri;
    if (!key) throw new Error("不存在module无法找到");
    const module = this.builder.getModel(key);

    let decorations = module?.model.deltaDecorations(
      [],
      [
        {
          range: new monaco.Range(line, 1, line, 1),
          options: {
            isWholeLine: true,
            className: hightStyeClass,
            /*glyphMarginClassName: "myGlyphMarginClass",*/
          },
        },
      ]
    );
    if (decorations && module) module.decorations = decorations;
  }

  readonly(readonly: boolean) {
    this.editor.updateOptions({ readOnly: readonly });
  }

  changeOption(setting: any) {
    this.editor.updateOptions(setting);
  }
}
