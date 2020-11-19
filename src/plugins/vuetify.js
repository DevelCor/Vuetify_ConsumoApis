import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import es from 'vuetify/es5/locale/es';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#2196F3',
        secondary: '#0B5997',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#ee44aa',
        success: '#4CAF50',
        warning: '#FFC107',
        boton: '#42A5F5'
      },
    },
  },
    lang: {
      locales: { es },
      current: 'es',
    },
  icons: {
    iconfont: 'md',
  },
});
