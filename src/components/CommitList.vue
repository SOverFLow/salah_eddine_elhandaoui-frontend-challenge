<template>
  <div class="commit-list">
    <CommitItem v-for="commit in commits" :key="commit.sha" :commit="commit" />
    <button v-if="hasMore && !loading" @click="loadMore">Load More</button>
    <p v-if="loading">Loading...</p>
    <p v-if="!hasMore">No more commits.</p>
  </div>
</template>

<script setup>
import CommitItem from './CommitItem.vue'
const props = defineProps({
  commits: Array,
  loading: Boolean,
  hasMore: Boolean,
  loadMore: Function,
})
</script>

<style scoped>
.commit-list {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}
</style>