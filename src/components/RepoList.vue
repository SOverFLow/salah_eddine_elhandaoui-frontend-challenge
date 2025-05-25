<template>
  <div class="p-4 bg-gray-50 border-r border-gray-200 h-full">
    <div class="relative">
      <input
        type="text"
        v-model="filter"
        placeholder="Search repositories..."
        class="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        @input="handleInput"
      />
    </div>

    <ul class="mt-2 space-y-1">
      <li
        v-for="repo in filteredRepos"
        :key="repo.id"
        @click="handleClick(repo)"
        class="group px-3 py-2 text-sm rounded-md cursor-pointer transition-colors hover:bg-gray-100"
        :class="{ 'bg-blue-50 border border-blue-200': repo.full_name === selected }"
      >
        <div class="font-medium text-gray-900">
          <span v-html="highlightMatch(repo.name, filter)" />
        </div>
        <div 
          v-if="repo.description"
          class="text-xs text-gray-500 mt-1 truncate"
        >
          <span v-html="highlightMatch(repo.description, filter)" />
        </div>
      </li>
      
      <li 
        v-if="filteredRepos.length === 0"
        class="px-3 py-2 text-sm text-gray-500"
      >
        No repositories found matching "{{ filter }}"
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

const filteredRepos = computed(() => {
  const query = filter.value.toLowerCase()
  if (!query) return props.repos

  return props.repos.filter(r => {
    const nameMatch = r.name.toLowerCase().includes(query)
    const descMatch = r.description?.toLowerCase().includes(query) ?? false
    return nameMatch || descMatch
  })
})

const highlightMatch = (text: string, query: string) => {
  if (!query) return text
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escapedQuery})`, 'gi')
  return text.replace(regex, '<span class="bg-yellow-100 font-medium">$1</span>')
}

const handleClick = (repo: Repository) => {
  if (repo?.full_name) {
    filter.value = ''
    emit('select', repo.full_name)
  }
}

</script>