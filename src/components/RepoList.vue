<template>
  <div class="p-4 bg-gray-50 border-r border-gray-200 h-full">
    <div class="relative">
      <input
        type="text"
        v-model="filter"
        placeholder="Search repositories..."
        class="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <ul class="mt-2 space-y-1">
      <li
        v-for="repo in filteredRepos"
        :key="repo.id"
        @click="selectRepo(repo)"
        class="group px-3 py-2 text-sm rounded-md cursor-pointer transition-colors hover:bg-gray-100"
        :class="{
          'bg-blue-50 border border-blue-200': repo.full_name === selected,
        }"
      >
        <div class="font-medium text-gray-900">
          <span v-html="highlight(repo.name)" />
        </div>
        <div
          v-if="repo.description"
          class="text-xs text-gray-500 mt-1 truncate"
        >
          <span v-html="highlight(repo.description)" />
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
import { toRef } from "vue";
import { useRepoFilter } from "@/composables/useRepoFilter";

const props = defineProps<{
  repos: Repository[];
  selected: string;
}>();

const emit = defineEmits<{
  (e: "select", fullName: string): void;
}>();

const reposRef = toRef(props, "repos");
const { filter, filteredRepos, highlight } = useRepoFilter(reposRef);

function selectRepo(repo: Repository) {
  if (!repo?.full_name) return;
  emit("select", repo.full_name);
  filter.value = "";
}
</script>
