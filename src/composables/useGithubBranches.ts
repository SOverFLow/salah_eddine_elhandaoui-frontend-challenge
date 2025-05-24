import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

interface Branch {
  name: string
  commit: {
    sha: string
    url: string
  }
  protected: boolean
}

export function useGithubBranches() {
  const branches = ref<Branch[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchBranches = async (repoFullName: string) => {
    if (!repoFullName) {
      branches.value = []
      return
    }

    loading.value = true
    error.value = null
    
    try {
      const userStore = useUserStore()
      
     
      if (!userStore.token) {
        throw new Error('GitHub token not found')
      }

      
      const url = `https://api.github.com/repos/${repoFullName}/branches`
      console.log('Fetching branches from:', url)

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
          Accept: 'application/vnd.github.v3+json',
        },
        validateStatus: (status) => status < 500 
      })

      if (res.status === 404) {
        throw new Error(`Repository '${repoFullName}' not found or access denied`)
      }

      branches.value = res.data
    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching branches:', err)
      branches.value = []
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