<template>
  <div class="repo-list">
    <input type="text" v-model="filter" placeholder="Filter repos..." class="filter-input" />
    <ul>
      <li
        v-for="repo in filteredRepos"
        :key="repo.id"
        @click="$emit('select', repo.name)"
        :class="{ selected: repo.name === selected }"
      >
        {{ repo.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
const props = defineProps({
  repos: Array,
  selected: String,
})
const filter = ref('')
const filteredRepos = computed(() =>
  props.repos.filter(r => r.name.toLowerCase().includes(filter.value.toLowerCase()))
)
</script>

<style scoped>
.repo-list {
  width: 250px;
  border-right: 1px solid #ccc;
  padding: 10px;
}
.selected {
  font-weight: bold;
  background: #f0f0f0;
}
.filter-input {
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
}
</style>