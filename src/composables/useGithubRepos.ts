import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

export function useGithubRepos() {
  const repositories = ref<{ id: number; name: string }[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchRepos = async () => {
    loading.value = true
    error.value = null
    try {
      const userStore = useUserStore()
      const res = await axios.get('https://api.github.com/user/repos', {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      })
      repositories.value = res.data.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
      }))
    } catch (err: any) {
      console.error(err)
      error.value = 'Failed to fetch GitHub repositories.'
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchRepos)

  return {
    repositories,
    loading,
    error,
    fetchRepos,
  }
}
