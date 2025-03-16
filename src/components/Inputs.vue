<template>
  <!-- Inputs with validation -->
  <form class="container">
    <div v-for="(_, name) in inputs" :key="name" class="form-item">
      <label class="form-item__label" :for="name">
        {{ name }}
        <span v-if="rules[name]">*</span>
      </label>
      <input type="text" v-model="inputs[name]" :id="name" :name="name" />
      <p v-if="validatedInputs[name]?.errors.length" class="form-item__warning">
        {{ validatedInputs[name]?.errors }}
      </p>
    </div>

    <p>{{ isValid ? "Form is valid" : "Form is not valid " }}</p>
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useVuelidator } from "../composables/useVuelidator";
import type { Rules } from "../composables/useVuelidator";

const inputs = reactive({
  username: null,
  email: null,
  password: null,
  about: null,
});

const rules: Rules = {
  username: {
    required: true,
    minChars: 5,
  },
  email: {
    required: true,
  },
  password: {
    required: true,
  },
};

const { isValid, inputs: validatedInputs } = useVuelidator(inputs, rules);
</script>

<style scoped lang="scss">
.form-item {
  display: flex;
  flex-direction: column;
  gap: 2px;

  &__label {
    & > span {
      color: red;
    }
  }

  &__warning {
    color: var(--warning);
  }
}
</style>
