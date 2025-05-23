<template>
  <input
    type="text"
    class="border border-gray-300 rounded px-3 py-2 w-full"
    placeholder="Start searching by name..."
    
  />
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits(['update:modelValue'])
</script>
