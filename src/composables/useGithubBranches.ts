import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

export function useGithubBranches() {
  const branches = ref<string[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchBranches = async (repoName: string) => {
    loading.value = true
    error.value = null
    try {
      const userStore = useUserStore()
      const res = await axios.get(`https://api.github.com/repos/${userStore.username}/${repoName}/branches`, {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      })
      branches.value = res.data.map((branch: any) => branch.name)
    } catch (err: any) {
      console.error(err)
      error.value = 'Failed to fetch GitHub branches.'
    } finally {
      loading.value = false
    }
  }

  return {
    branches,
    loading,
    error,
    fetchBranches,
  }
}
