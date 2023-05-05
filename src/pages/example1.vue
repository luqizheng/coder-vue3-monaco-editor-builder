<template>
  <a-tabs v-model:active-key="activitKey">

    <a-tab-pane tab="1号" key="1">
      <a-checkbox v-model:checked="readonly">readonly</a-checkbox>
      <coder-monaco-editor v-model="sourceCode" :editorOptions="options" :read-only="readonly" />
    </a-tab-pane>
    <a-tab-pane tab="2号" key="22">
      <a-checkbox v-model:checked="readonly">readonly</a-checkbox>
      <coder-monaco-editor v-model="sourceCode" :editorOptions="options" :read-only="readonly" />
    </a-tab-pane>
  </a-tabs>
</template>

<script setup>
/** 只是page引用的 */
import { Checkbox as aCheckbox, Tabs as ATabs, TabPane as ATabPane } from "ant-design-vue";
import { ref, reactive } from "vue";
const sourceCode = ref("var a=1");
const onMessageTypeEdit = () => {
  messageTypeId.value = 0;
};
const activitKey = ref("1");
const readonly = ref(false);
const dataSource = ref(null)
const options = ref({
  readonly: true,
});
</script>
