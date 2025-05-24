<template>
  <div class="min-h-screen bg-gray-100">
    <header class="fixed top-0 right-0 left-0 z-50 bg-[#0d1117] border-b border-gray-800">
      <div class="container mx-auto px-4 h-16 flex items-center justify-end">
        <div class="flex items-center gap-3 flex-row-reverse">
          <img 
            :src="userStore.user.avatar_url" 
            alt="User avatar"
            class="w-8 h-8 rounded-full border-2 border-gray-600 hover:border-gray-400 transition-all"
          />
          <span class="text-gray-300 font-medium text-sm hover:text-white transition-colors">
            {{ userStore.user.login }}
          </span>
        </div>
      </div>
    </header>

    <div class="flex pt-16 h-screen">
      <aside class="w-80 border-r bg-white border-gray-200 overflow-y-auto p-4">
        <RepoList
          :repos="repositories"
          :selected="selectedRepo"
          @select="selectRepo"
        />
      </aside>

      <main class="flex-1 p-6 overflow-y-auto bg-gray-100">
        <div class="max-w-5xl mx-auto">
          <div v-if="selectedRepo" class="mb-6 flex items-center gap-4">
            <select
              v-model="selectedBranch"
              class="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="!selectedRepo || branches.length === 0"
            >
              <option v-if="branchesLoading" value="" disabled>
                Loading branches...
              </option>
              <option v-else-if="branches.length === 0" value="" disabled>
                No branches found
              </option>
              <option
                v-for="branch in branches"
                :key="branch.name"
                :value="branch.name"
                class="text-gray-900"
              >
                {{ branch.name }}
              </option>
            </select>
          </div>

          <CommitList
            v-if="selectedRepo && selectedBranch"
            :commits="commits"
            :loading="loadingCommits"
            :hasMore="hasMore"
            @load-more="loadMore"
            class="bg-white border border-gray-200 rounded-lg overflow-hidden"
          />

          <div v-else class="h-full flex items-center justify-center text-gray-500">
            <p class="text-sm">
              {{ !selectedRepo ? 'Select a repository to view commits' : 'Select a branch to view commits' }}
            </p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import RepoList from "@/components/RepoList.vue";
import CommitList from "@/components/CommitList.vue";
import { useGithubRepos } from "@/composables/useGithubRepos";
import { useGithubBranches } from "@/composables/useGithubBranches";
import useGithubCommits from "@/composables/useGithubCommits";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const { repositories, fetchRepos } = useGithubRepos();
const selectedRepo = ref<string>("");

const selectedBranch = ref<string>("");
const { branches, loading: branchesLoading, fetchBranches } = useGithubBranches();

const { commits, loading: loadingCommits, hasMore, loadMore, resetCommits } = 
  useGithubCommits(selectedRepo, selectedBranch);

watch(selectedBranch, (newBranch) => {
  if (newBranch && selectedRepo.value) {
    resetCommits();
  }
}, { immediate: true });

const selectRepo = async (repoFullName: string) => {
  try {
    const repo = repositories.value.find((r) => r.full_name === repoFullName);
    if (!repo) return;

    selectedRepo.value = repoFullName;
    selectedBranch.value = "";
    await fetchBranches(repoFullName);

    if (branches.value.length > 0) {
      selectedBranch.value = repo.default_branch;
      if (!branches.value.some((b) => b.name === repo.default_branch)) {
        selectedBranch.value = branches.value[0].name;
      }
    }
  } catch (error) {
    console.error("Error selecting repo:", error);
    repositories.value = repositories.value.filter(
      (r) => r.full_name !== repoFullName
    );
  }
};
</script>