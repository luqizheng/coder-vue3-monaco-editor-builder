# 安装

默认已经导入 了 es5/es6 得代码提示。

``npm install coder-vue3-monaco-editor`

```
import  monacoEditor from 'coder-vue3-monaco-editor'
export default {
  compouents:{monacoEditor}
}
```

or

```
import monacoEditor from 'coder-vue3-monaco-editor'
app.use(monacoEditor)
```

```
<template>
  <coder-monaco-editor v-model="sourceCode"  />
</template>

<script setup>
import { ref, reactive } from "vue";
const sourceCode = ref("var a=1");
const onMessageTypeEdit = () => {
  messageTypeId.value = 0;
};
</script>


```

# mnonaco 基础设置

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
