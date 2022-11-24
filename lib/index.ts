export * from './types'
import { App } from 'vue'
import editor from './editor/index.vue'


export const MonacoEditor = editor

editor.install = (app: App) => {
  app.component('coder-monaco-editor', editor)
}

export default editor