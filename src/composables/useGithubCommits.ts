import { ref, watch, type Ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

interface Commit {
  sha: string
  commit: {
    message: string
    author: {
      name: string
      date: string
    }
  }
  author: {
    login: string
    avatar_url: string
  } | null
  html_url: string
}

export default function useGithubCommits(
  repoFullName: Ref<string>, 
  branch: Ref<string>
) {
  const commits = ref<Commit[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const hasMore = ref(true)
  const page = ref(1)

  const loadMore = async () => {
    if (loading.value || !repoFullName.value || !branch.value || !hasMore.value) return
  
    loading.value = true
    error.value = null
    
    try {
      const userStore = useUserStore()
      
      const res = await axios.get(
        `https://api.github.com/repos/${repoFullName.value}/commits`,
        {
          headers: {
            Authorization: `Bearer ${userStore.token}`,
            Accept: 'application/vnd.github.v3+json',
          },
          params: {
            sha: branch.value,
            per_page: 20,
            page: page.value,
          },
        }
      )
  
      if (res.data.length < 20) hasMore.value = false
      commits.value = [...commits.value, ...res.data]
      page.value++
  
    } catch (err: any) {
      if (err.response?.status === 404) {
        error.value = `Repository or branch not found: ${repoFullName.value}/${branch.value}`
        commits.value = []
        hasMore.value = false
      } else {
        error.value = err.message
      }
    } finally {
      loading.value = false
    }
  }

  const resetCommits = () => {
    commits.value = []
    page.value = 1
    hasMore.value = true
    loadMore()
  }

  watch([repoFullName, branch], () => {
    if (repoFullName.value && branch.value) {
      resetCommits()
    }
  })

  return {
    commits,
    loading,
    error,
    hasMore,
    loadMore,
    resetCommits,
  }
}