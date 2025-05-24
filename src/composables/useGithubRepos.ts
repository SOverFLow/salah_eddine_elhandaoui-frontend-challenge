import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

export interface Repository {
  id: number
  name: string
  full_name: string
  owner: string
  private: boolean
  archived: boolean
  default_branch: string
}

export function useGithubRepos() {
  const repositories = ref<Repository[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchRepos = async () => {
    loading.value = true
    error.value = null
    try {
      const userStore = useUserStore()
      
      if (!userStore.token) {
        throw new Error('GitHub token not found')
      }

      const res = await axios.get('https://api.github.com/user/repos', {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
          Accept: 'application/vnd.github.v3+json',
        },
        params: {
          affiliation: 'owner',
          per_page: 100,
          sort: 'updated',
          direction: 'desc'
        }
      })

      const rawRepos: Repository[] = res.data.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        owner: repo.owner.login,
        private: repo.private,
        archived: repo.archived,
        default_branch: repo.default_branch
      }))

      repositories.value = rawRepos.filter(repo => !repo.archived)

    } catch (err: any) {
      console.error('Repo fetch error:', err)
      error.value = err.response?.data?.message || 'Failed to fetch repositories'
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