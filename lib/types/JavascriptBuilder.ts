import * as monaco from "monaco-editor";
import { MonacoBuilder } from "./MonacoBuilder";
import { Ref } from "vue";

export class JavascriptBuilder extends MonacoBuilder {
  constructor(builder: MonacoBuilder) {
    super();
    this.options = builder.options;
    this.globalModelMap = builder.globalModelMap;
    this.independModel = builder.independModel;
  }
}
