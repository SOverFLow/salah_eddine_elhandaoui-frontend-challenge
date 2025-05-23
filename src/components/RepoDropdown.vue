<template>
  <select
    class="border border-gray-300 rounded px-3 py-2"
    
  >
    <option
      v-for="repo in repos"
      :key="repo"
      :value="repo"
    >
      {{ repo }}
    </option>
  </select>
</template>

<script setup lang="ts">
defineProps<{
  repos: string[],
  modelValue: string
}>()
defineEmits(['update:modelValue'])
</script>
