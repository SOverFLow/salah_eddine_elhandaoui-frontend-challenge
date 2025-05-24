<template>
  <div class="space-y-2">
    <input
      type="text"
      v-model="filter"
      placeholder="Find a repository..."
      class="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <ul class="space-y-1">
      <li
        v-for="repo in filteredRepos"
        :key="repo.id"
        @click="handleClick(repo)"
        class="px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
        :class="{ 'bg-blue-50 border border-blue-200': repo.full_name === selected }"
      >
        {{ repo.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Repository {
  id: number
  name: string
  full_name: string
  description?: string
}

const props = defineProps<{
  repos: Repository[]
  selected: string
}>()

const emit = defineEmits<{
  (e: 'select', fullName: string): void
}>()

const filter = ref('')
const filteredRepos = computed(() =>
  props.repos.filter(r =>
    r.name.toLowerCase().includes(filter.value.toLowerCase()) ||
    (r.description && r.description.toLowerCase().includes(filter.value.toLowerCase()))
  )
)

const handleClick = (repo: Repository) => {
  if (repo?.full_name) {
    console.log('Emitting repo:', repo.full_name)
    emit('select', repo.full_name)
  } else {
    console.error('Invalid repo object:', repo)
  }
}
</script>

<style scoped>
.repo-list {
  padding: 16px;
  background-color: #f6f8fa;
}

.filter-input {
  width: 100%;
  padding: 8px 12px;
  margin-bottom: 16px;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
}

li {
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.selected {
  background-color: #0366d6;
  color: white;
}
</style>