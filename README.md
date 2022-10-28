# eidtor
设置 editor
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

```
  <coder-vue3-monaco-editor v-model="sourceCode" language="json" />
```