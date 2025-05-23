<template>
  <div>
    <h2 class="text-xl font-semibold mb-2">{{ repo }}</h2>
    <div v-for="(commits, date) in groupedCommits" :key="date" class="mb-6">
      <h3 class="font-bold text-gray-700">{{ date }}</h3>
      <div v-for="commit in commits" :key="commit.id" class="pl-4">
        <CommitItem :commit="commit" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CommitItem from './CommitItem.vue'

const props = defineProps<{ repo: string }>()

const fakeCommits = {
  'Mar 2, 2021': [
    { id: 1, message: 'Fix missing content', author: 'OthmanDev' },
    { id: 2, message: 'Platform > Change wording', author: 'OthmanDev' }
  ],
  'Mar 1, 2021': [
    { id: 3, message: 'Fix api requests captcha bug', author: 'Anfisse' },
    { id: 4, message: 'Fix login captcha', author: 'Anfisse' }
  ]
}

const groupedCommits = fakeCommits
</script>
