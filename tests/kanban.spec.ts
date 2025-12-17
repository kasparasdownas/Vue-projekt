import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import * as vuetifyComponents from 'vuetify/components';
import * as vuetifyDirectives from 'vuetify/directives';
import KanbanBoard from '../components/KanbanBoard.vue';
import Column from '../components/Column.vue';
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
