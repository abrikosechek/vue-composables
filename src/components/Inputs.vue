<template>

  <!-- Inputs with validation -->
  <form class="form">
    <!-- <label for="username">Username*</label>
    <input v-model="inputs.username" id="username" name="username" type="text"> -->
    <div v-for="(_, name) in inputs" :key="name" class="form__item">
      <label class="form__item__label" :for="name">{{ name }} <span v-if="rules[name]">*</span></label>
      <input type="text" v-model="inputs[name]" :id="name" :name="name">
      <p v-if="validatedInputs[name]?.errors.length">{{ validatedInputs[name]?.errors }}</p>
    </div>
  </form>

  <p>Form is valid: {{ isValid }}</p>
</template>

<script setup lang='ts'>
import { reactive } from 'vue';
import { useVuelidator } from '../composables/useVuelidator';
import type { Rules } from "../Types"

const inputs = reactive({
  username: null,
  email: null,
  password: null,
  about: null
})

const rules: Rules = {
  username: {
    required: true,
    minChars: 5
  },
  email: {
    required: true
  },
  password: {
    required: true
  },
}

const { isValid, inputs: validatedInputs } = useVuelidator(inputs, rules)

</script>

<style scoped lang='scss'>
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;

  &__item {
    display: flex;
    flex-direction: column;
    gap: 2px;

    &__label {
      &>span {
        color: red;
      }
    }
  }
}
</style>