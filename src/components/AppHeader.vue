<template>
  <header
    class="fixed top-0 inset-x-0 z-50 bg-gray-900 border-b border-gray-800 shadow-lg"
  >
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <h1 class="text-white font-semibold text-lg">GitHub Viewer</h1>
      </div>

      <div v-if="user" class="relative" v-click-outside="closeDropdown">
        <button
          @click="toggleDropdown"
          class="flex items-center gap-3 group hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors"
          aria-haspopup="true"
          :aria-expanded="isDropdownOpen"
        >
          <img
            :src="user.avatar_url"
            :alt="`${user.login}'s avatar`"
            class="w-8 h-8 rounded-full border-2 border-gray-600"
          />
          <span class="text-gray-300 font-medium text-sm">{{
            user.login
          }}</span>
          <ChevronDownIcon
            class="w-4 h-4 text-gray-400 transition-transform"
            :class="{ 'rotate-180': isDropdownOpen }"
          />
        </button>

        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2 border border-gray-700"
            role="menu"
          >
            <div class="px-4 py-3 border-b border-gray-700">
              <p class="text-sm text-white font-medium truncate">
                {{ user.name }}
              </p>
            </div>
            <button
              @click="handleLogout"
              class="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2 transition-colors"
              role="menuitem"
            >
              <LogoutIcon class="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon.vue";
import LogoutIcon from "@/components/icons/LogoutIcon.vue";
import type { User } from "@/types/user";

const props = defineProps<{ user: User | null }>();
const router = useRouter();
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const handleLogout = async () => {
  try {
    await router.push("/login");
  } finally {
    useUserStore().clearUser();
    closeDropdown();
  }
};
</script>
