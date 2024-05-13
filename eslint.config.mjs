// https://eslint.org/docs/latest/use/configure/configuration-files
import js from "@eslint/js";
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import typescriptEslint from "@typescript-eslint/eslint-plugin";


export default [
  js.configs.recommended,
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,


  {
    plugins: {
      typescriptEslint: typescriptEslint,
    },
    // https://eslint.org/docs/latest/rules/
    rules: {
      "semi": ["error", "always"], //Enforces the use of semicolons at the end of statements.
      "quotes": ["error", "single"], //Enforces the use of single quotes for string literals.
      "indent": ["error", 2], //Enforces a consistent indentation style, typically two spaces.
      "no-console": "error", //Disallows the use of console statements.
      "no-unused-vars": "error", //Warns about unused variables.
      "no-extra-semi": "error", //Disallows unnecessary semicolons.
      "no-multiple-empty-lines": ["error", { "max": 1 }], // Limits the number of consecutive empty lines.
      "no-var": "error",  //Encourages the use of const or let instead of var.
      "no-shadow": "error",//Prevents variable shadowing within the same scope.
      "prefer-const": "error", //Encourages the use of const for variables that are not reassigned.
      "no-undef": "error", //Disallows the use of undeclared variables.
      "prefer-template": "error",// Encourages the use of template literals instead of string concatenation.
      "no-empty-function": "warn",// Disallows empty functions.
      "no-else-return": "error", //Disallows else blocks after return statements in if statements.
      "no-extra-parens": "error",// Disallows unnecessary parentheses.
      "no-trailing-spaces": "error", //Disallows trailing whitespace at the end of lines.
      "object-curly-spacing": ["error", "always"],// Enforces consistent spacing inside braces of object literals.
      "@typescript-eslint/no-explicit-any": "off"
    }
  },
];