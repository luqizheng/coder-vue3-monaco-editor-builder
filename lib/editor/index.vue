<template>
  <div
    class="jsEditor"
    :class="{ 'full-screen': fullScreen }"
    :style="{ width, height }"
  >
    <div class="toolbar">
      <a-space class="buttons">
        <a-button size="small" type="default" @click="formatDoc" title="格式化"
          ><BarsOutlined
        /></a-button>
        <a-button size="small" @click="onFullSize" type="default">
          <FullscreenOutlined v-if="!fullScreen" /><FullscreenExitOutlined
            v-if="fullScreen"
          />
        </a-button>
      </a-space>
    </div>
    <div ref="el" class="editor-area" style="width: 100%; height: 90%"></div>
  </div>
</template>

<script lang="ts" setup>
import {
  BarsOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons-vue";
import useMonaco from "./useMonaco";
import * as monaco from "monaco-editor";
import { Button as AButton, Space as ASpace } from "ant-design-vue";
import { ref, computed, watch, onMounted, PropType } from "vue";

const el = ref();
const $emit = defineEmits(["update:modelValue", "blur", "focus"]);
const props = defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "90vh",
  },
  language: {
    type: String,
    default: "javascript",
  },
  preComment: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  editorOptions: {
    type: Object,
    default: () => ({}),
  },
});

const { updateVal, createEditor, onFormatDoc } = useMonaco(props.language);
let monacoEditor: any = null;
const fullScreen = ref(false);
// 代码更新来源是 monacoEditor 内部还是外部。主要解决
//是 同步到 父组件的 modeValue出现循环更新，fouse 总是在 第一行第一列。
let changeByEditor = false;
watch(
  () => props.modelValue,
  (val: string) => {
    if (!changeByEditor) {
      val !== monacoEditor?.getValue() && updateMonacoVal(val);
    }
    changeByEditor = false;
  }
);

const updateMonacoVal = (_val?: string) => {
  const { modelValue, preComment } = props;
  const val = preComment
    ? `${preComment}\n${_val || modelValue}`
    : _val || modelValue;
  updateVal(monacoEditor, val);
  onFormatDoc(monacoEditor);
};
const formatDoc = () => {
  onFormatDoc(monacoEditor);
};
const onFullSize = () => {
  fullScreen.value = !fullScreen.value;
};
onMounted(() => {
  if (el) {
    monacoEditor = createEditor(el.value, props.editorOptions);
    updateMonacoVal();
    monacoEditor!.onDidChangeModelContent(() => {
      changeByEditor = true;
      $emit("update:modelValue", monacoEditor!.getValue());
    });
    monacoEditor!.onDidBlurEditorText(() => {
      $emit("blur");
    });

    monacoEditor!.onDidFocusEditorWidget(() => {
      $emit("focus");
    });
  }
});

const hightLine = (line: number) => {
  if (!monacoEditor) return;
  let decorations = monacoEditor.deltaDecorations(
    [],
    [
      {
        range: new monaco.Range(line, 1, line, 1),
        options: {
          isWholeLine: true,
          className: "myContentClass",
          glyphMarginClassName: "myGlyphMarginClass",
        },
      },
    ]
  );
};

defineExpose({
  hightLine,
});
</script>

<style>
.myGlyphMarginClass {
  color: #c41d7f;
  background: #fff0f6;
  border-color: #ffadd2;
}
.myContentClass {
  color: #c41d7f;
  background: #870036;
  border-color: #ffadd2;
}
</style>

<style scoped>
.full-screen {
  position: fixed !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100% !important;
  z-index: 999999;
}
.editor-area {
  /* border: 1px solid #ddd; */
  border-radius: 4px;
  overflow: hidden;
  /* padding: 5px; */
  padding-left: 0;
  background-color: #fff;
  box-sizing: border-box;
}
.toolbar {
  text-align: left;
  background-color: #f3f3f3;
  border-top: 1px solid #cbcccc;

  font-size: 12px;
  /* -webkit-box-shadow: inset 0 1px 0 0 #fff;
  -moz-box-shadow: inset 0 1px 0 0 #fff; */
  box-shadow: inset 0 1px 0 0 #fff;
  background-color: #f5f5f5;
  /* background-image: -webkit-linear-gradient(top,#f5f5f5,#eee); */
  /*background-image: -moz-linear-gradient(top, #f5f5f5, #eee);
  background-image: -ms-linear-gradient(top, #f5f5f5, #eee);
  background-image: -o-linear-gradient(top, #f5f5f5, #eee);*/
  background-image: linear-gradient(to top, #f5f5f5, #eee);
  /*border-bottom: 1px solid #aaaaaa;*/
  /*margin-bottom: 10px;*/
}
.jsEditor {
  -webkit-appearance: none;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  font-size: inherit;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.jsEditor .body {
  min-height: 300px;
  text-align: left;
  width: 100%;
}
.buttons {
  display: flex;
  margin: 5px 5px;
}
</style>
