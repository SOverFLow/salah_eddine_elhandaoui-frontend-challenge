<script setup lang="ts">
import GitHubLogin from "@/components/GitHubLogin.vue";
import RepositoryList from "@/components/RepositoryList.vue";
import CommitHistory from "@/components/CommitHistory.vue";
import BranchSwitcher from "@/components/BranchSwitcher.vue";
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-blue-500">
    <h1 class="text-3xl font-bold">Welcome to GitHub Viewer</h1>
  </div>
  <div class="p-6 space-y-4">
    <GitHubLogin />
    <RepositoryList />
    <BranchSwitcher />
    <CommitHistory />
  </div>
</template>


