<template>
  <div class="bg-white border p-2 rounded my-1 shadow-sm">
    <p class="text-gray-800 font-medium">{{ commit.message }}</p>
    <p class="text-sm text-gray-500">by {{ commit.author }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  commit: {
    id: number,
    message: string,
    author: string
  }
}>()
</script>
