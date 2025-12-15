<template>
  <div class="page">
    <header class="page__header">
      <h1 class="headline">Kanban board</h1>
    </header>
    <KanbanBoard />
  </div>
</template>

<script setup lang="ts">
import KanbanBoard from './components/KanbanBoard.vue';
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 24px 16px 40px;
  max-width: 1100px;
  margin: 0 auto;
  font-family: "Inter", system-ui, -apple-system, sans-serif;
  color: #1f2937;
  background: #f7f7f7;
}

.page__header {
  margin-bottom: 16px;
}

.headline {
  margin: 0;
  font-size: 30px;
}
</style>
