
import * as monaco from 'monaco-editor'

import es5 from "./lib.es6.d.txt?raw"
import es6 from "./lib.es5.d.txt?raw"

//https://juejin.cn/post/7044413663892996109 参考这边文章，但是经过改造过。
monaco.languages.typescript.javascriptDefaults.addExtraLib(es5)
monaco.languages.typescript.javascriptDefaults.addExtraLib(es6)


monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
  noLib: true,
  allowNonTsExtensions: true
})



export default function useMonaco(language = 'javascript') {
  //let monacoEditor: monaco.editor.IStandaloneCodeEditor | null = null
  let initReadOnly = false
  async function updateVal(monacoEditor: monaco.editor.IStandaloneCodeEditor, val: string) {
    monacoEditor?.setValue(val);
  }

  const createEditor = (el: HTMLElement | null, editorOption: monaco.editor.IStandaloneEditorConstructionOptions = {}) => {

    initReadOnly = !!editorOption.readOnly
    let monacoEditor = el && monaco.editor.create(el, {
      language: language,
      minimap: { enabled: false },
      theme: 'vs-dark',
      multiCursorModifier: 'ctrlCmd',
      scrollbar: {
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8,
      },
      tabSize: 2,
      automaticLayout: true, // 自适应宽高
      ...editorOption
    })
    return monacoEditor
  }

  const onFormatDoc = (monacoEditor:monaco.editor.IStandaloneCodeEditor) => {
    monacoEditor?.getAction('editor.action.formatDocument').run()
  }
  return {
    updateVal,
    createEditor,
    onFormatDoc
  }
}
