<template>
  <section>
    <div class="board__header">
      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        size="small"
        elevation="1"
        rounded="lg"
        class="add-btn"
        @click="openCreateDialog()"
      >
        Tilføj kort
      </v-btn>
    </div>

    <CardDialog
      v-model="dialogOpen"
      :value="dialogValue"
      :statuses="STATUSES"
      @save="handleSave"
    />

    <v-dialog v-model="confirmOpen" max-width="420">
      <v-card>
        <v-card-title>Bekræft sletning</v-card-title>
        <v-card-text>
          Er du sikker på at du vil slette kortet<span v-if="deleteTarget"> "{{ deleteTarget.title }}"</span>?
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="confirmOpen = false">Fortryd</v-btn>
          <v-btn color="error" @click="deleteCard">Slet</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row dense>
      <v-col
        v-for="column in groupedColumns"
        :key="column.id"
        cols="12"
        sm="6"
        md="3"
      >
        <Column
          :column="column"
          :cards="column.items"
          :active="hoveredColumn === column.id"
          @add="openCreateDialog"
          @dragover="onDragOver"
          @dragleave="onDragLeave"
          @drop="onDrop"
          @dragstart="onDragStart"
          @edit="openEditDialog"
          @delete="confirmDelete"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import CardDialog from './CardDialog.vue';
import Column from './Column.vue';
import { STATUSES, type Card, type StatusId } from './types';

const cards = ref<Card[]>([
  { id: createId(), title: 'Opgave 1', description: '1...', status: 'todo' },
  { id: createId(), title: 'Opgave 2', description: '2...', status: 'doing' },
  { id: createId(), title: 'Opgave 3', description: '3...', status: 'review' },
  { id: createId(), title: 'Opgave 4', description: '4...', status: 'done' },
]);

const draggingId = ref<string | null>(null);
const hoveredColumn = ref<StatusId | null>(null);
const dialogOpen = ref(false);
const dialogValue = ref<Card | null>(null);
const confirmOpen = ref(false);
const deleteTarget = ref<Card | null>(null);

const groupedColumns = computed(() =>
  STATUSES.map((column) => ({
    ...column,
    items: cards.value.filter((card) => card.status === column.id),
  })),
);

function createId(): string {
  return `card-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function openCreateDialog(status?: StatusId): void {
  dialogValue.value = {
    id: '',
    title: '',
    description: '',
    status: status ?? STATUSES[0].id,
  };
  dialogOpen.value = true;
}

function openEditDialog(card: Card): void {
  dialogValue.value = { ...card };
  dialogOpen.value = true;
}

function handleSave(payload: Card): void {
  const title = payload.title.trim();
  const description = payload.description?.trim();
  if (!title) return;

  if (payload.id) {
    const card = cards.value.find((item) => item.id === payload.id);
    if (card) {
      card.title = title;
      card.description = description || undefined;
      card.status = payload.status;
    }
  } else {
    cards.value.unshift({
      id: createId(),
      title,
      description: description || undefined,
      status: payload.status,
    });
  }

  dialogOpen.value = false;
  dialogValue.value = null;
}

function onDragStart(cardId: string): void {
  draggingId.value = cardId;
}

function onDragOver(columnId: StatusId): void {
  hoveredColumn.value = columnId;
}

function onDragLeave(): void {
  hoveredColumn.value = null;
}

function onDrop(columnId: StatusId): void {
  if (draggingId.value) {
    updateStatus(draggingId.value, columnId);
  }
  draggingId.value = null;
  hoveredColumn.value = null;
}

function updateStatus(cardId: string, status: StatusId): void {
  const card = cards.value.find((item) => item.id === cardId);
  if (card) {
    card.status = status;
  }
}

function confirmDelete(card: Card): void {
  deleteTarget.value = card;
  confirmOpen.value = true;
}

function deleteCard(): void {
  if (deleteTarget.value) {
    cards.value = cards.value.filter((item) => item.id !== deleteTarget.value?.id);
    if (dialogValue.value?.id === deleteTarget.value.id) {
      dialogOpen.value = false;
      dialogValue.value = null;
    }
  }
  deleteTarget.value = null;
  confirmOpen.value = false;
}
</script>

<style scoped>
.board__header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}

.add-btn {
  min-width: 0;
}
</style>
