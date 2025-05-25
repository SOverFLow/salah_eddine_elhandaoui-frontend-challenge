import { ref, computed, toRef, type Ref } from 'vue'

interface RepoLike {
  name: string
  description?: string
}

export function useRepoFilter<T extends RepoLike>(repos: Ref<T[]>) {
  const filter = ref('')

  const filteredRepos = computed(() => {
    const q = filter.value.toLowerCase()
    if (!q) return repos.value

    return repos.value.filter(repo => {
      const nameMatch = repo.name.toLowerCase().includes(q)
      const descMatch = repo.description?.toLowerCase().includes(q) ?? false
      return nameMatch || descMatch
    })
  })

  const highlight = (text: string) => {
    if (!filter.value) return text
    const escaped = filter.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return text.replace(new RegExp(`(${escaped})`, 'gi'), `<span class="bg-yellow-100 font-medium">$1</span>`)
  }

  return {
    filter,
    filteredRepos,
    highlight,
  }
}
