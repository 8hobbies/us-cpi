import configs from "@8hobbies/eslint-conf-baseline";
import globals from "globals";

export default [
  ...configs.recommended,
  {
    files: ["**.ts"],
    ignores: configs.ignores,
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: ["tsconfig.json", "tsconfig.noemit.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
