# monaco editor 前期工作

需要添加 woker

参考 https://github.com/microsoft/monaco-editor/blob/main/docs/integrate-esm.md 中的
Using Vite 这一章节

```
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);


window.MonacoEnvironment = {
  // 提供一个定义worker路径的全局变量
  getWorker(_: any, label: string) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker(); // 基础功能文件， 提供了所有语言通用功能 无论使用什么语言，monaco都会去加载他。
  },
};
```

# start

默认已经导入 了 es5/es6 得代码提示。

``npm install coder-vue3-monaco-editor-builder`

```html
<div ref="editr2Ref" class="editor"></div>
```

```javascript
const monacoBuilder = useBuilder();
let editor: MonacoEditor | null = null;
const editr2Ref = ref();
/* 支持的提示西信息,内置了es5/es6的基础js库*/
useIntellisence().setNoLib().setEs5().setEs6();

onMounted(() => {
  editor = monacoBuilder.build(editr2Ref.value);
  /**
   *
   * @param uri 用于表示代码的唯一key，采用monaco.Uri。当切换代码的时候用此进行对比
   * @param code 代码
   * @param showCode 是否在代码编辑器中显示。
   * @param lang 语言id 根据woker的进行设置。
   * @returns
   */
  editor?.setCode("http://cc.com/2.ts", sourceCode1, true, "javascript");
  editor?.highlight(1) 
});
```



