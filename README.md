# Vue3 TS composables (Input validation and requests)

Usage of composables:


useValidator: works like Vuelidate library. Has next rules: required, maxChards, minChars, regexp. Returns object {isValid: boolean, inputs: (info about validating each field)}


useFetch: accepts reactive url path, returns { data, error }


This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
