<template>
  <div class="w-full">
    <div v-if="commits.length === 0 && !loading" class="p-6 text-center text-gray-500">
      No commits found for this branch
    </div>

    <ul v-else class="border rounded-lg border-gray-200 bg-white">
      <li 
        v-for="commit in commits" 
        :key="commit.sha"
        class="px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
      >
        <a :href="commit.html_url" target="_blank" class="block group">
          <div class="flex items-start gap-3">
            <img
              v-if="commit.author"
              :src="commit.author.avatar_url"
              :alt="commit.author.login"
              class="w-5 h-5 rounded-full mt-1"
            />
            <div class="flex-1 min-w-0">
              <div class="text-sm text-gray-900 font-medium truncate mb-1 group-hover:text-blue-600">
                {{ commit.commit.message }}
              </div>
              <div class="flex items-center gap-2 text-xs text-gray-500">
                <span class="font-medium">
                  {{ commit.author?.login || commit.commit.author.name }}
                </span>
                <span>·</span>
                <span>{{ formatDate(commit.commit.author.date) }}</span>
              </div>
            </div>
          </div>
        </a>
      </li>

      <li v-if="loading" class="px-4 py-3 text-center text-sm text-gray-500">
        Loading more commits...
      </li>

      <li v-if="hasMore && !loading" class="p-4 border-t border-gray-100">
        <button 
          @click="$emit('load-more')"
          class="w-full px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-md transition-colors"
        >
          Load More
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  commits: Array<{
    sha: string
    commit: {
      message: string
      author: {
        name: string
        date: string
      }
    }
    author: {
      login: string
      avatar_url: string
    } | null
    html_url: string
  }>
  loading: boolean
  hasMore: boolean
}>()

defineEmits(['load-more'])

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>