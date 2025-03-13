# Vue3 TS composables (Input validation and requests)

Usage of composables:


useValidator: works like Vuelidate library. Has next rules: required, maxChards, minChars, regexp. Returns object {isValid: boolean, inputs: (info about validating each field)}


useFetch: accepts reactive url path, returns { data, error }


Run server:


npm install

npm run dev
