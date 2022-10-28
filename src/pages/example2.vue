<template>
    <coder-vue3-monaco-editor v-model="sourceCode" language="json" />
  </template>
  
  <script setup>
  import { ref, reactive } from "vue";
  const sourceCode = ref('{"a":"aaa","asdf":2}');
  const onMessageTypeEdit = () => {
    messageTypeId.value = 0;
  };
  </script>
  