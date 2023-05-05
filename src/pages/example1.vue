<template>
  <a-tabs v-model:active-key="activitKey" @change="onTabChange">

    <a-tab-pane tab="global" key="global">
      <textarea v-model="sourceCodeGlobal" />
      <div ref="editorGlobalRef" class="editor"></div>
    </a-tab-pane>
    <a-tab-pane tab="1号" key="1">
      <textarea v-model="sourceCode1" />
      <div ref="editr1Ref" class="editor"></div>
    </a-tab-pane>


    <a-tab-pane tab="2号" key="2">
      <textarea v-model="sourceCode2" />
      <div ref="editr2Ref" class="editor"></div>

    </a-tab-pane>

  </a-tabs>
</template>

<script setup lang="ts">
/** 只是page引用的 */
import * as monaco from 'monaco-editor'
import { Checkbox as aCheckbox, Tabs as ATabs, TabPane as ATabPane } from "ant-design-vue";
import { ref, reactive, onMounted, nextTick } from "vue";
const sourceCodeGlobal = ref("var a=1;function SayHello(){console.log('hello')}");
const sourceCode1 = ref("var b=3");
const sourceCode2 = ref("var d=4;");
const activitKey = ref('global')
const editorGlobalRef = ref()
const editr2Ref = ref()
const editr1Ref = ref();


import * as editorHelper from '../../lib/index'
let editorGlobal: editorHelper.MonacoEditor | null = null
let editor1: editorHelper.MonacoEditor | null = null
let editor2: editorHelper.MonacoEditor | null = null
onMounted(() => {
  editorHelper
    .useIntellisence()
    .setNoLib()
    .setEs5().setEs6();

  editorGlobal = editorHelper.useBuilder(editorGlobalRef.value).forJs().build();

  editorGlobal?.sync("obal.ts", sourceCodeGlobal, "javascript");

})

const onTabChange = (key: any) => {
  switch (key) {
    case "global":
      editorGlobal?.sync("http://gg.com/1.ts", sourceCodeGlobal, "javascript");
      break;
    case "1":

      if (!editor1) {
        nextTick(() => {
          editor1 = editorHelper.useBuilder(editr1Ref.value).forJs().build();
          editor1?.sync("http://cc.com/2.ts", sourceCode1, "javascript");
        })
      }


      break;
    case "2":

      if (!editor2) {
        nextTick(() => {
          editor2 = editorHelper.useBuilder(editr2Ref.value).forJs().build();
          editor2?.sync("file://3.ts", sourceCode2, "javascript");
        })

      }

      break
  }
}
</script>
<style>
.editor {
  width: 100%;
  height: 90vh;
  box-sizing: border-box;
}
</style>