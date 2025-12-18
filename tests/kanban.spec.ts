import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import * as vuetifyComponents from 'vuetify/components';
import * as vuetifyDirectives from 'vuetify/directives';
import KanbanBoard from '../components/KanbanBoard.vue';
import Column from '../components/Column.vue';
import CardItem from '../components/CardItem.vue';
import { STATUSES } from '../components/types';

function createVuetifyPlugin() {
  return createVuetify({
    components: vuetifyComponents,
    directives: vuetifyDirectives,
  });
}

describe('Column', () => {
  it('shows empty state and emits add', async () => {
    const wrapper = mount(Column, {
      global: {
        plugins: [createVuetifyPlugin()],
      },
      props: {
        column: STATUSES[0],
        cards: [],
        active: false,
      },
    });

    expect(wrapper.text()).toContain('Ingen kort endnu. Slip et kort her.');

    await wrapper.find('button').trigger('click');
    const emitted = wrapper.emitted('add');
    expect(emitted?.[0][0]).toBe(STATUSES[0].id);
  });

  it('emits drop and dragover events', async () => {
    const wrapper = mount(Column, {
      global: {
        plugins: [createVuetifyPlugin()],
      },
      props: {
        column: STATUSES[1],
        cards: [],
        active: false,
      },
    });

    await wrapper.trigger('dragover');
    await wrapper.trigger('drop');

    expect(wrapper.emitted('dragover')?.[0][0]).toBe(STATUSES[1].id);
    expect(wrapper.emitted('drop')?.[0][0]).toBe(STATUSES[1].id);
  });
});

describe('KanbanBoard', () => {
  it('renders one column per status', () => {
    const wrapper = mount(KanbanBoard, {
      global: {
        plugins: [createVuetifyPlugin()],
      },
    });

    const columns = wrapper.findAllComponents(Column);
    expect(columns).toHaveLength(STATUSES.length);
  });
});

describe('CardItem', () => {
  const sampleCard = {
    id: 'c1',
    title: 'Titel',
    description: 'Beskrivelse',
    status: 'todo',
  };

  it('emits edit and delete', async () => {
    const wrapper = mount(CardItem, {
      props: { card: sampleCard },
      global: { plugins: [createVuetifyPlugin()] },
    });

    const buttons = wrapper.findAll('button');
    await buttons[0].trigger('click'); // edit
    await buttons[1].trigger('click'); // delete

    expect(wrapper.emitted('edit')?.[0][0]).toEqual(sampleCard);
    expect(wrapper.emitted('delete')?.[0][0]).toEqual(sampleCard);
  });

  it('emits dragstart with card id', async () => {
    const wrapper = mount(CardItem, {
      props: { card: sampleCard },
      global: { plugins: [createVuetifyPlugin()] },
    });

    await wrapper.trigger('dragstart');
    expect(wrapper.emitted('dragstart')?.[0][0]).toBe(sampleCard.id);
  });
});
