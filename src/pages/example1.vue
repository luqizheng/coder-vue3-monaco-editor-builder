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
import { ref, reactive, onMounted, nextTick, watch } from "vue";
const sourceCodeGlobal = ref("var a=1;function SayHello(){console.log('hello')}");
const sourceCode1 = ref("var b=3");
const sourceCode2 = ref("var d=4;");
const activitKey = ref('global')
const editorGlobalRef = ref()
const editr2Ref = ref()
const editr1Ref = ref();

const monacoBuilder = useBuilder();

import { useBuilder, useIntellisence } from '../../lib/index'
import { MonacoEditor } from '../../lib/types'
let editorGlobal: MonacoEditor | null = null
let editor1: MonacoEditor | null = null
let editor2: MonacoEditor | null = null

const sourceCodeGlobalProvider = {
  get: () => sourceCodeGlobal.value,
  set: (v) => sourceCodeGlobal.value = v
}

const sourceCode1Provider = {
  get: () => sourceCode1.value,
  set: (v) => sourceCode1.value = v
}


const sourceCode2Provider = {
  get: () => sourceCode2.value,
  set: (v) => sourceCode2.value = v
}


onMounted(() => {
  useIntellisence()
    .setNoLib()
    .setEs5().setEs6();

  editorGlobal = monacoBuilder.build(editorGlobalRef.value);
  SetGlobal();

})

const uriSetting = {
  global: 'global',
  source1: 'source1',
  source2: 'source2'
}

function SetGlobal() {
  editorGlobal?.setCode(uriSetting.global, sourceCodeGlobalProvider, true);
}
function SetSource1() {
  editor1?.setIndependCode(uriSetting.source1, sourceCode1Provider, "javascript");
}

function SetSource2() {
  editor2?.setIndependCode(uriSetting.source2, sourceCode2Provider, 'javascript');
}

watch(() => sourceCode1.value, () => {
  SetSource1();
})

watch(() => sourceCode2.value, () => {
  SetSource2()
})
watch(() => sourceCodeGlobal.value, () => {
  SetGlobal();
})

const onTabChange = (key: any) => {
  switch (key) {
    case "global":
      SetGlobal();
      break;
    case "1":
      debugger
      if (!editor1) {
        nextTick(() => {
          editor1 = monacoBuilder.build(editr1Ref.value);
          SetSource1();
          editor1?.hightLine(1, "myContentClass");
        })
      }
      else {

        SetSource1();
        editor1?.hightLine(1, "myContentClass");
      }
      break;
    case "2":

      if (!editor2) {
        nextTick(() => {
          editor2 = monacoBuilder.build(editr2Ref.value);
          SetSource2();
        })

      }
      else {
        SetSource2();
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




.myContentClass {
  color: #c41d7f;
  background: #870036;
  border-color: #ffadd2;
}
</style>