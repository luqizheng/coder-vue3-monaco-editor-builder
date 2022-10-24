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
