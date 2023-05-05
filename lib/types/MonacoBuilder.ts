import * as monaco from "monaco-editor";

import { MonacoEditor } from "./MonacoEditor";
import { EditorModelInfo } from "./EditorModelInfo";
import { SnapShot } from "..";

function ToSnapShot(el: EditorModelInfo): SnapShot {
  return {
    snapShot: el.model.createSnapshot(),
    code: el.code,
    lang: el.model.getLanguageId(),
    uri: el.model.uri,
  } as SnapShot;
}

function ToEditorModelInfo(snapShot: SnapShot): EditorModelInfo {
  var result = {
    model: monaco.editor.createModel("", snapShot.lang, snapShot.uri),
    code: snapShot.code,
  } as EditorModelInfo;
  result.model.setValue(snapShot.snapShot);
  return result;
}

/**
 * MonacoBuilder 的 全局 对象。
 */
export class MonacoBuilder {
  public globalModelMap: Map<string, EditorModelInfo> = new Map<
    string,
    EditorModelInfo
  >();

  public independModel: EditorModelInfo | undefined = undefined;

  public globalSnapShot: SnapShot[] = [];
  public independModelSnapshot: SnapShot | undefined;

  options: monaco.editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false },
    theme: "vs-dark",
    language: "javascript",
    multiCursorModifier: "ctrlCmd",
    scrollbar: {
      verticalScrollbarSize: 8,
      horizontalScrollbarSize: 8,
    },
    tabSize: 2,
    automaticLayout: true, // 自适应宽高
  };

  build(htmlElement: HTMLElement): MonacoEditor {
    var editor = monaco.editor.create(htmlElement, this.options);
    return new MonacoEditor(editor, this, htmlElement);
  }

  /**
   * 获取model 不区分 是否 builder 中的全局Model还是独立的Modle
   * @param uri
   * @returns
   */
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
   *
   *  如果uri一样，就不覆盖，不一样就采用 @param build 出来的对象覆盖原来的
   * 每个builder 只允许 一个 独立 module。
   * @param uri key值
   * @param buildFunc 如果uri一样，就不覆盖，不一样就采用build 出来的对象覆盖原来的
   */
  setIndependModule(
    uri: monaco.Uri,
    buildFunc: { (): EditorModelInfo }
  ): EditorModelInfo {
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

  setModleEnable(enable: boolean) {
    if (enable == false) {
      this.globalModelMap.forEach((el) => {
        var snapShot = ToSnapShot(el);
        this.globalSnapShot.push(snapShot);
        el.model.dispose();
      });
      this.globalModelMap.clear();
      if (this.independModel) {
        this.independModelSnapshot = ToSnapShot(this.independModel);
        this.independModel.model.dispose();
        this.independModel = undefined;
      }
    } else {
      this.globalSnapShot.forEach((globalSnapshot) => {
        var t = ToEditorModelInfo(globalSnapshot);
        this.globalModelMap.set(t.model.uri.toString(), t);
      });

      if (this.independModelSnapshot) {
        var t = ToEditorModelInfo(this.independModelSnapshot);
        this.independModel = t;
      }
    }
  }
}
