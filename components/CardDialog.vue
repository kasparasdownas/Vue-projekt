<template>
  <v-dialog :model-value="modelValue" max-width="600" @update:model-value="emit('update:modelValue', $event)">
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <span>{{ form.id ? 'Redigér kort' : 'Tilføj kort' }}</span>
        <v-btn icon="mdi-close" variant="text" @click="emit('update:modelValue', false)" />
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.title"
              label="Titel"
              variant="outlined"
              density="comfortable"
              placeholder="Titel på kort"
              autofocus
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="form.status"
              :items="statuses"
              item-title="label"
              item-value="id"
              label="Status"
              variant="outlined"
              density="comfortable"
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="form.description"
              label="Beskrivelse (valgfri)"
              variant="outlined"
              density="comfortable"
              auto-grow
              placeholder="Kort beskrivelse"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="emit('update:modelValue', false)">Annuller</v-btn>
        <v-btn color="primary" @click="submit">{{ form.id ? 'Gem' : 'Tilføj' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { Card, StatusColumn, StatusId } from './types';

type FormState = {
  id: string;
  title: string;
  description: string;
  status: StatusId;
};

const props = defineProps<{
  modelValue: boolean;
  value: Card | null;
  statuses: StatusColumn[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'save', payload: FormState): void;
}>();

const form = reactive<FormState>({
  id: '',
  title: '',
  description: '',
  status: props.statuses[0]?.id ?? 'todo',
});

watch(
  () => props.value,
  (card) => {
    form.id = card?.id ?? '';
    form.title = card?.title ?? '';
    form.description = card?.description ?? '';
    form.status = card?.status ?? (props.statuses[0]?.id as StatusId);
  },
  { immediate: true },
);

function submit(): void {
  const title = form.title.trim();
  if (!title) return;
  emit('save', { ...form, title, description: form.description.trim() });
}
</script>
