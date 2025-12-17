<template>
  <v-card
    elevation="4"
    class="column-card"
    :class="{ 'column--active': active }"
    @dragover.prevent="emit('dragover', column.id)"
    @dragleave="emit('dragleave')"
    @drop.prevent="emit('drop', column.id)"
  >
    <v-card-title class="d-flex align-center justify-space-between">
      <div class="d-flex align-center column-title">
        <v-chip color="primary" variant="tonal" density="comfortable" class="text-uppercase">
          {{ column.label }}
        </v-chip>
      </div>
      <div class="d-flex align-center ga-2">
        <span class="muted">{{ cards.length }} kort</span>
        <v-btn icon="mdi-plus" density="comfortable" variant="text" @click="emit('add', column.id)" />
      </div>
    </v-card-title>

    <v-card-text class="column__body">
      <div v-if="!cards.length" class="empty">
        Ingen kort endnu. Slip et kort her.
      </div>
      <CardItem
        v-for="card in cards"
        :key="card.id"
        :card="card"
        @dragstart="emit('dragstart', $event)"
        @edit="emit('edit', $event)"
        @delete="emit('delete', $event)"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import CardItem from './CardItem.vue';
import type { Card, StatusColumn } from './types';

const props = defineProps<{
  column: StatusColumn;
  cards: Card[];
  active: boolean;
}>();

const emit = defineEmits<{
  (e: 'add', statusId: StatusColumn['id']): void;
  (e: 'dragover', statusId: StatusColumn['id']): void;
  (e: 'dragleave'): void;
  (e: 'drop', statusId: StatusColumn['id']): void;
  (e: 'dragstart', cardId: string): void;
  (e: 'edit', card: Card): void;
  (e: 'delete', card: Card): void;
}>();
</script>

<style scoped>
.column-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f6f7fb;
}

.column--active {
  border: 2px dashed #1e88e5;
}

.column__body {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 8px;
}

.muted {
  color: #4b5563;
  font-size: 13px;
}

.column-title {
  gap: 8px;
}

.empty {
  margin: 0;
  color: #4b5563;
  padding: 12px;
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  background: #fafafa;
  font-size: 13px;
}
</style>
