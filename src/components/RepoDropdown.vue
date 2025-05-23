<template>
  <div class="relative inline-block w-64">
    <select
      class="block w-full bg-white border border-gray-300 text-gray-800 py-2 px-3 pr-10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option disabled value="">Select a repository</option>
      <option
        v-for="repo in repos"
        :key="repo.id"
        :value="repo.name"
      >
        {{ repo.name }}
      </option>
    </select>
    <div class="absolute right-2 top-2.5 text-gray-500 pointer-events-none">
      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  repos: { id: number; name: string }[],
  modelValue: string
}>()
defineEmits(['update:modelValue'])
</script>
