<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-tr from-zinc-300 to-black text-white px-4"
  >
    <div
      class="bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-lg max-w-md w-full p-8 space-y-8"
    >
      <div class="flex flex-col items-center gap-3">
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub Logo"
          class="w-14 h-14"
        />
        <h1 class="text-2xl font-semibold text-gray-900">Welcome</h1>
        <p class="text-sm text-gray-500">
          Sign in to continue using your GitHub account.
        </p>
      </div>

      <LoginWithGitHub />
    </div>
  </div>
</template>

<script setup>
import LoginWithGitHub from "../components/LoginWithGitHub.vue";
</script>
