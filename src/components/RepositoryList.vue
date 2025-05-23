<template>
  <div>
    <input type="text" placeholder="Search repositories..." class="border p-2 w-full mb-4" />
    <ul>
      <li v-for="repo in mockRepos" :key="repo" class="p-2 border-b">{{ repo }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const mockRepos = ['repo-1', 'repo-2', 'repo-3']
</script>
