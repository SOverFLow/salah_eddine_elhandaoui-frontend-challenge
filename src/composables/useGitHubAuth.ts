import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const loading = ref(false);

export function useGitHubAuth() {
  const router = useRouter();
  const store = useUserStore();

  const clientId = process.env.VUE_APP_GITHUB_CLIENT_ID;
  const redirectUri = process.env.VUE_APP_REDIRECT_URI;

  function redirectToGitHub() {
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=read:user`;
    window.location.href = url;
  }

  onMounted(async () => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    if (!code) return;

    loading.value = true;
    try {
      const response = await fetch("http://localhost:4000/auth/github/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      if (data.user && data.token) {
        store.setUser(data.user);
        store.setToken(data.token);
        router.push("/");
      } else {
        alert("Login failed.");
      }
    } catch (error) {
      console.error("GitHub auth error:", error);
      alert("An error occurred during GitHub login.");
    } finally {
      loading.value = false;
    }
  });

  return {
    loading,
    redirectToGitHub,
  };
}
