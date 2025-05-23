import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

export function useGithubCommits() {
  const commits = ref<any[]>([])
  const page = ref(1)
  const hasMore = ref(true)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCommits = async (repoName: string, branch: string, reset = false) => {
    if (loading.value || !hasMore.value) return

    if (reset) {
      commits.value = []
      page.value = 1
      hasMore.value = true
    }

    loading.value = true
    error.value = null

    try {
      const userStore = useUserStore()
      const res = await axios.get(`https://api.github.com/repos/${userStore.username}/${repoName}/commits`, {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
          Accept: 'application/vnd.github.v3+json',
        },
        params: {
          sha: branch,
          per_page: 10,
          page: page.value,
        },
      })

      if (res.data.length < 10) {
        hasMore.value = false
      }

      commits.value.push(...res.data)
      page.value++
    } catch (err: any) {
      console.error(err)
      error.value = 'Failed to fetch commits.'
    } finally {
      loading.value = false
    }
  }

  return {
    commits,
    loading,
    error,
    hasMore,
    fetchCommits,
  }
}
