<template>
  <Inputs />

  <!-- Field for dynamic request -->
  <div class="container requests-block">
    <label for="url">Request URL</label>
    <input type="text" v-model="url" id="url" name="url">

    <template v-if="data || error">
      <p>{{ data }}</p>
      <p>{{ error }}</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Inputs from './components/Inputs.vue';
import { useFetch } from './composables/useFetch';

const url = ref()

const { data, error } = useFetch(url)
</script>

<style scoped lang="scss">
.requests-block {
  display: flex;
  flex-direction: column;
  margin-top: 45px;
}
</style>
