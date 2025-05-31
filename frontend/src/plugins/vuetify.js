import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import '@mdi/font/css/materialdesignicons.css';

import { mdi } from "vuetify/iconsets/mdi";
import { customSVGs } from "@/plugins/customIcons";

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi,
      custom: customSVGs
    }
  }
})
