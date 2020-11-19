<template>
  <v-app>
    <Toolbar></Toolbar>
    <v-container>  
      <v-dialog
          v-model="loading.estado"
          hide-overlay
          persistent
          width="300"
         >
         <v-card :color="loading.color" dark>
             <v-card-text>
               {{loading.titulo}}
                <v-progress-linear
                  indeterminate
                  color="white"
                  class="mb-0"
                ></v-progress-linear>
              </v-card-text>
          </v-card>
      </v-dialog>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>

import {mapState} from "vuex";
import Toolbar from '@/components/Toolbar.vue';


export default {
  name: 'App',

  components: {
    Toolbar
  },
  data: () => ({
    
  }),
  computed:{
    ...mapState(['loading'])
  }
};
</script>
