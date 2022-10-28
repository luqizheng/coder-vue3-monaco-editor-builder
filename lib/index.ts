export * from './types'
import { App } from 'vue'
import { Options } from './types'
import editor from './editor/index.vue'
export const coderVue3MonacoEditor = editor
export default {

  install: (app: App) => {
    //coder-vue3-monaco-editor
    app.component('coder-vue3-monaco-editor', editor)
  }
}