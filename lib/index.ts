export * from './types'
import { App } from 'vue'
import { Options } from './types'
import editor from './editor/index.vue'

export default {

  install: (app: App, option: Options) => {
    app.component('coder-monaco-editor', editor)
  }
}