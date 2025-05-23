<template>
  <div class="home-page">
    <aside class="sidebar">
      <RepoList :repos="repositories" :selected="selectedRepo" @select="selectRepo" />
    </aside>

    <div class="main-content">
      <!-- Header with user info -->
      <header class="header">
        <img :src="userStore.user.avatar_url" alt="User avatar" class="avatar" />
        <span class="username">{{ userStore.user.login }}</span>
      </header>

      <!-- Branch select -->
      <select v-model="selectedBranch" class="branch-select">
        <option v-for="branch in branches" :key="branch.name" :value="branch.name">
          {{ branch.name }}
        </option>
      </select>

      <!-- Commits list -->
      <CommitList
        :commits="commits"
        :loading="loadingCommits"
        :hasMore="hasMore"
        :loadMore="loadMore"
      />
    </div>
  </div>
</template>

<script setup>
import RepoList from '@/components/RepoList.vue'
import CommitList from '@/components/CommitList.vue'
import { useGithubRepos } from '@/composables/useGithubRepos'
import { useGithubCommits } from '@/composables/useGithubCommits'
import { ref, watch } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()


const { repositories, fetchRepos } = useGithubRepos()


const selectedRepo = ref('')
const selectedBranch = ref('')
const branches = ref([])


const {
  commits,
  loading: loadingCommits,
  hasMore,
  loadMore,
  resetCommits,
} = useGithubCommits(selectedRepo, selectedBranch)


const selectRepo = async (repoName) => {
  selectedRepo.value = repoName
  const res = await axios.get(
    `https://api.github.com/repos/${userStore.username}/${repoName}/branches`,
    {
      headers: { Authorization: `Bearer ${userStore.token}` },
      Accept: 'application/vnd.github.v3+json',
    }
  )
  branches.value = res.data
  selectedBranch.value = branches.value[0]?.name || 'main'
  resetCommits()
}
</script>

<style scoped>
.home-page {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 300px;
  border-right: 1px solid #ccc;
  overflow-y: auto;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow: auto;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.username {
  font-weight: bold;
  font-size: 16px;
}

.branch-select {
  margin-bottom: 15px;
  padding: 5px;
}
</style>
