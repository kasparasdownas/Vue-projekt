import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from './App.vue';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'customLight',
    themes: {
      customLight: {
        dark: false,
        colors: {
          background: '#f7f7fb',
          surface: '#ffffff',
          primary: '#1e88e5',
          secondary: '#8e24aa',
          error: '#e53935',
          info: '#2196f3',
          success: '#43a047',
          warning: '#fb8c00',
        },
      },
    },
  },
});

createApp(App).use(vuetify).mount('#app');
