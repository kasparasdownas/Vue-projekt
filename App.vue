<template>
  <v-app>
    <v-main>
      <v-container class="page py-10">
        <header class="page__header">
          <h1 class="headline">Kanban board</h1>
        </header>

        <KanbanBoard />
      </v-container>
    </v-main>
  </v-app>
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
}

.page__header {
  margin-bottom: 12px;
}

.headline {
  margin: 0;
  font-size: 30px;
}
</style>
