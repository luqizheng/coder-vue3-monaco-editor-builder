import * as monaco from "monaco-editor";
import { MonacoBuilder } from "./MonacoBuilder";


export class JavascriptBuilder extends MonacoBuilder {
    constructor(builder: MonacoBuilder) {
        super(builder.htmlElement);
        this.options = builder.options;
    }
    addExlib(code: string): monaco.IDisposable {
        return monaco.languages.typescript.javascriptDefaults.addExtraLib(code);
    }

    removeExtendlIb() {
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
            noLib: true,
            allowNonTsExtensions: true,
        });
    }
}
