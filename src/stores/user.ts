import { defineStore } from 'pinia'


interface GithubUser {
  login: string
  name?: string
  avatar_url?: string
  email?: string
  html_url?: string
  [key: string]: any
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as GithubUser | null,
    token: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user && !!state.token,
    username: (state) => state.user?.login || '',
    avatar: (state) => state.user?.avatar_url || '',
  },
  actions: {
    setUser(user: GithubUser) {
      this.user = user
    },
    setToken(token: string) {
      this.token = token
    },
    clearUser() {
      this.user = null
      this.token = null
    },
  },
  persist: true,
})
