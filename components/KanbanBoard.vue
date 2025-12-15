<template>
  <section class="board">
    <div class="board__controls">
      <div class="add-card">

        <label class="field">
          <span>Titel</span>
          <input v-model="newCard.title" type="text" placeholder="Titel på kort" />
        </label>

        <div class="field-inline">
          <label class="field">
            <span>Status</span>
            <select v-model="newCard.status">
              <option v-for="column in columns" :key="column.id" :value="column.id">
                {{ column.label }}
              </option>
            </select>
          </label>
          <button type="button" @click="addCard">Tilføj</button>
        </div>

        <label class="field">
          <span>Beskrivelse (valgfri)</span>
          <textarea
            v-model="newCard.description"
            rows="2"
            placeholder="Kort beskrivelse"
            class="add-card__textarea"
          />
        </label>
      </div>
    </div>

    <div class="board__grid">
      <article v-for="column in groupedColumns" :key="column.id" class="column">
        <header class="column__header">
          <div class="column__title">{{ column.label }}</div>
          <span class="muted">{{ column.items.length }} kort</span>
        </header>

        <div class="column__body">
          <p v-if="!column.items.length" class="empty">Ingen kort her endnu.</p>

          <div v-for="card in column.items" :key="card.id" class="card">
            <p class="card__title">{{ card.title }}</p>

            <p v-if="card.description" class="card__description">
              {{ card.description }}
            </p>

            <select :id="`status-${card.id}`" :value="card.status" @change="onStatusChange(card.id, $event)">
              <option v-for="status in columns" :key="status.id" :value="status.id">
                {{ status.label }}
              </option>
            </select>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

type StatusId =  'todo' | 'doing' | 'review' | 'done';

type StatusColumn = {
  id: StatusId;
  label: string;
};

type Card = {
  id: string;
  title: string;
  description?: string;
  status: StatusId;
};

const columns: StatusColumn[] = [
  { id: 'todo', label: 'To do' },
  { id: 'doing', label: 'I gang' },
  { id: 'review', label: 'Til review' },
  { id: 'done', label: 'Færdig' },
];

const initialCards: Card[] = [
  {
    id: createId(),
    title: 'Opgave 1',
    description: '1...',
    status: 'todo',
  },
  {
    id: createId(),
    title: 'Opgave 2',
    description: '2...',
    status: 'doing',
  },
  {
    id: createId(),
    title: 'Opgave 3',
    description: '3...',
    status: 'review',
  },
  {
    id: createId(),
    title: 'Opgave 4',
    description: '4...',
    status: 'done',
  },
];

const cards = ref<Card[]>([...initialCards]);
const newCard = reactive({
  title: '',
  description: '',
  status: columns[0].id as StatusId,
});

const groupedColumns = computed(() =>
  columns.map((column) => ({
    ...column,
    items: cards.value.filter((card) => card.status === column.id),
  })),
);

function createId(): string {
  return `card-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function addCard(): void {
  const title = newCard.title.trim();
  const description = newCard.description.trim();
  if (!title) return;

  cards.value.unshift({
    id: createId(),
    title,
    description: description || undefined,
    status: newCard.status,
  });

  newCard.title = '';
  newCard.description = '';
  newCard.status = columns[0].id;
}

function onStatusChange(cardId: string, event: Event): void {
  const target = event.target as HTMLSelectElement | null;
  if (!target) return;
  const next = target.value;
  if (isValidStatus(next)) {
    updateStatus(cardId, next);
  }
}

function isValidStatus(value: string): value is StatusId {
  return columns.some((column) => column.id === value);
}

function updateStatus(cardId: string, status: StatusId): void {
  const card = cards.value.find((item) => item.id === cardId);
  if (card) {
    card.status = status;
  }
}

</script>

<style scoped>
.board,
.board__controls,
.add-card,
.column__body,
.card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.board {
  gap: 12px;
}

.board__controls,
.column,
.card {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 10px;
  background: #fff;
}

.field,
.field-inline {
  display: flex;
  gap: 6px;
}

.field {
  flex-direction: column;
}

.field-inline {
  align-items: flex-end;
}

.field > span,
.muted {
  margin: 0;
  color: #4b5563;
  font-size: 13px;
}

.board__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 10px;
}

.column__header {
  display: flex;
  justify-content: space-between;
}

.card__title {
  margin: 0;
  font-weight: 700;
}

.card__description,
.empty {
  margin: 0;
  color: #4b5563;
}

input,
select,
textarea,
button {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 9px;
  font-size: 14px;
  background: #fff;
}

button {
  background: #0ea5e9;
  color: #fff;
  cursor: pointer;
}
</style>
