export * from "./types";

import { MonacoBuilder } from "./types/MonacoBuilder";

import * as monaco from "monaco-editor";
import es5 from "./editor/lib.es6.d.txt?raw";
import es6 from "./editor/lib.es5.d.txt?raw";
import { IntellisenceEnv } from "./types";

const instellMap = new Map<string, monaco.IDisposable>();

export const useIntellisence = (): IntellisenceEnv => {
  const result = {} as IntellisenceEnv;

  result.setNoLib = (): IntellisenceEnv => {
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      noLib: true,
      allowNonTsExtensions: true,
    });
    return result;
  };

  result.setEs5 = (): IntellisenceEnv => {
    return result.set("es5", es5);
  };
  result.setEs6 = (): IntellisenceEnv => {
    return result.set("es6", es6);
  };

  result.removeEs5 = (): IntellisenceEnv => {
    return result.remove("es5");
  };
  result.removeEs6 = (): IntellisenceEnv => {
    return result.remove("es6");
  };
  result.set = (key: string, defineTsCode: string): IntellisenceEnv => {
    if (!instellMap.has(key)) {
      const model =
        monaco.languages.typescript.javascriptDefaults.addExtraLib(
          defineTsCode
        );
      instellMap.set(key, model);
    }
 
    return result;
  };

  result.remove = (key: string): IntellisenceEnv => {
    if (instellMap.has(key)) {
      const model = instellMap.get(key);
      model?.dispose();
      instellMap.delete(key);
    }
    return result;
  };

  return result;
};

export const useBuilder = (): MonacoBuilder => {
  return new MonacoBuilder();
};
