
import { App } from 'vue'

import editor from './editor/index.vue'

editor.install = (app: App) => {
  app.component('coder-vue3-monaco-editor', editor)
}

export default editor;