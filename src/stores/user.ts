import { defineStore } from "pinia";

export interface GithubUser {
  login: string;
  name?: string;
  avatar_url?: string;
  email?: string;
  html_url?: string;
  [key: string]: any;
}

interface UserState {
  user: GithubUser | null;
  token: string | null;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user: null,
    token: null,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.user && !!state.token,
    username: (state): string => state.user?.login || "",
    avatar: (state): string => state.user?.avatar_url || "",
    name: (state): string => state.user?.name || "",
    githubProfileUrl: (state): string => state.user?.html_url || "",
  },

  actions: {
    setUser(user: GithubUser) {
      if (!user || typeof user.login !== "string") {
        console.warn("Invalid user payload:", user);
        return;
      }
      this.user = user;
    },

    setToken(token: string) {
      if (!token) {
        console.warn("Empty token");
        return;
      }
      this.token = token;
    },

    clearUser() {
      this.user = null;
      this.token = null;
    },
  },

  persist: true,
});
