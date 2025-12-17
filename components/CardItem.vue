<template>
  <v-card
    class="card"
    variant="elevated"
    elevation="2"
    draggable="true"
    @dragstart="emit('dragstart', card.id)"
  >
    <v-card-title class="card__header">
      <span class="card__title">{{ card.title }}</span>
      <div class="card__actions">
        <v-btn
          icon="mdi-pencil"
          variant="text"
          density="comfortable"
          class="card__action"
          @click.stop="emit('edit', card)"
        />
        <v-btn
          icon="mdi-delete"
          variant="text"
          density="comfortable"
          class="card__action card__action--delete"
          @click.stop="emit('delete', card)"
        />
      </div>
    </v-card-title>
    <v-card-text class="card__text">
      <p v-if="card.description" class="card__description">
        {{ card.description }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Card } from './types';

const props = defineProps<{
  card: Card;
}>();

const emit = defineEmits<{
  (e: 'edit', card: Card): void;
  (e: 'delete', card: Card): void;
  (e: 'dragstart', cardId: string): void;
}>();
</script>

<style scoped>
.card {
  padding: 12px 12px 14px;
}

.card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 0;
  margin-bottom: 8px;
}

.card__title {
  padding: 0;
  font-weight: 700;
  margin-left: 5px;
  font-size: 18px;
}

.card__actions {
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0.45;
  transition: opacity 0.15s ease, color 0.15s ease;
}

.card:hover .card__actions {
  opacity: 1;
}

.card__action {
  color: inherit;
}

.card__action--delete:hover {
  color: #e53935;
}

.card__text {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 0;
}

.card__description {
  margin: 0;
  color: #4b5563;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
