<template>
  <div>
    <a-checkbox v-model:checked="readonly">readonly</a-checkbox>
    <coder-monaco-editor
      v-model="sourceCode"
      :editorOptions="options"
      :read-only="readonly"
    />

    <coder-preview :dataSource="dataSource"/>

  </div>
</template>

<script setup>
/** 只是page引用的 */
import { Checkbox as aCheckbox } from "ant-design-vue";
import { ref, reactive } from "vue";
const sourceCode = ref("var a=1");
const onMessageTypeEdit = () => {
  messageTypeId.value = 0;
};

const readonly = ref(false);
const dataSource = ref(null)
const options = ref({
  readonly: true,
});
</script>
