<template>
  <div class="space-y-2">
    <div v-for="commit in mockCommits" :key="commit" class="p-3 bg-white shadow">
      {{ commit }}
    </div>
  </div>
</template>

<script setup lang="ts">
const mockCommits = ['Initial commit', 'Fix bug', 'Add feature']
</script>
