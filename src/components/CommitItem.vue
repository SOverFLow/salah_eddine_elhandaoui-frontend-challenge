<template>
  <div class="mb-4 pb-3 border-b border-gray-200">
    <h4 class="text-sm font-medium text-gray-900">
      {{ commit.commit.message }}
    </h4>
    <small class="text-xs text-gray-500">
      {{ commit.commit.author.name }} -
      {{ formatDate(commit.commit.author.date) }}
    </small>
  </div>
</template>

<script setup lang="ts">
import { useCommitList } from "@/composables/useCommitList";

const props = defineProps<{
  commit: {
    commit: {
      message: string;
      author: {
        name: string;
        date: string;
      };
    };
  };
}>();

const { formatDate } = useCommitList();
</script>
