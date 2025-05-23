import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as null | { login: string },
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    setUser(user: { login: string }) {
      this.user = user
    },
    clearUser() {
      this.user = null
    },
  },
  persist: true,
})
