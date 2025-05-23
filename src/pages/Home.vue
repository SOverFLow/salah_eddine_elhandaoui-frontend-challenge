<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <NotificationBanner />
    <div class="flex items-center justify-between mb-4">
      <div class="text-2xl font-bold">SMIA KNIA</div>
      <div class="rounded-full w-10 h-10 bg-gray-300 flex items-center justify-center">
        <i class="fas fa-user"></i>
      </div>
    </div>

    <div class="mb-4 flex gap-2">
      <SearchBar v-model="searchQuery" />
      <RepoDropdown :repos="repositories" v-model="selectedRepo" />
    </div>

    <CommitList :repo="selectedRepo" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NotificationBanner from '@/components/NotificationBanner.vue'
import SearchBar from '@/components/SearchBar.vue'
import RepoDropdown from '@/components/RepoDropdown.vue'
import CommitList from '@/components/CommitList.vue'

const repositories = ['Repository A', 'Repository B', 'Repository C', 'Repository D']
const selectedRepo = ref(repositories[3])
const searchQuery = ref('')
</script>
