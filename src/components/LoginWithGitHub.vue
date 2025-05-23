<template>
  <div class="flex flex-col items-center space-y-4">
    <button
      @click="redirectToGitHub"
      :disabled="loading"
      class="flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="w-5 h-5"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 0C5.372 0 0 5.373 0 12a12 12 0 008.208 11.385c.6.11.82-.261.82-.58v-2.01c-3.338.726-4.042-1.61-4.042-1.61-.547-1.387-1.336-1.756-1.336-1.756-1.093-.748.082-.733.082-.733 1.21.085 1.845 1.243 1.845 1.243 1.074 1.84 2.814 1.308 3.502.998.11-.776.42-1.308.764-1.61-2.666-.305-5.466-1.334-5.466-5.933 0-1.31.47-2.382 1.243-3.22-.124-.305-.538-1.534.117-3.2 0 0 1.01-.323 3.3 1.23a11.52 11.52 0 013.004-.404c1.02.005 2.047.137 3.004.404 2.29-1.553 3.297-1.23 3.297-1.23.657 1.666.243 2.895.12 3.2.776.838 1.243 1.91 1.243 3.22 0 4.61-2.803 5.625-5.475 5.92.43.37.823 1.101.823 2.222v3.293c0 .322.218.696.825.578A12.006 12.006 0 0024 12c0-6.627-5.373-12-12-12z"
        />
      </svg>
      <span>{{ loading ? "Loading..." : "Login with GitHub" }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const loading = ref(false);
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
const router = useRouter();

const store = useUserStore();

const clientId = process.env.VUE_APP_GITHUB_CLIENT_ID;

function redirectToGitHub() {
  const redirectUri = process.env.VUE_APP_REDIRECT_URI;
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=read:user`;
  window.location.href = githubAuthUrl;
}

onMounted(async () => {
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  if (code) {
    loading.value = true;
    const res = await fetch("http://localhost:4000/auth/github/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();
    loading.value = false;

    if (data.user && data.token) {
      store.setUser(data.user)
      store.setToken(data.token)
      router.push('/')
    } else {
      alert('Login failed.')
    }
  }
});
</script>
