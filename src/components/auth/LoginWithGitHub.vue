<template>
  <div class="flex flex-col items-center space-y-4">
    <button
      @click="redirectToGitHub"
      :disabled="loading"
      class="flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span>{{ loading ? "Loading..." : "Login with GitHub" }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useGitHubAuth } from "@/composables/useGitHubAuth";
const { redirectToGitHub, loading } = useGitHubAuth();
</script>
