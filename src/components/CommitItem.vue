<template>
  <div class="commit-item">
    <h4>{{ commit.commit.message }}</h4>
    <small>{{ commit.commit.author.name }} - {{ commit.commit.author.date }}</small>
  </div>
</template>

<script setup>
const props = defineProps({
  commit: Object,
})
</script>

<style scoped>
.commit-item {
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
</style>