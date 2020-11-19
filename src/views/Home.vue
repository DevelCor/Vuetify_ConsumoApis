<template>
  <div>
    <br><br><br><br>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-date-picker v-model="fecha"
          full-width
          locale="es-ve"
          :min="minimo"
          :max="maximo"
          @change="getDolar(fecha)"
          ></v-date-picker>
        </v-card>
        <v-card color="primary" dark>
          <v-card-text class="display-1 text-md-center white--text">
            {{valor}} 
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <v-card  color="">
          <v-card-title class="headline">
            Dolar today: {{dolarToday}} Bs  a las: {{fecha2}}
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import {mapMutations} from "vuex";
import Toolbar from '@/components/Toolbar.vue';

export default {
  data(){
    return{
      fecha: new Date().toISOString().substr(0, 10),
      minimo: '1984',
      maximo: new Date().toISOString().substr(0, 10),
      valor: null,
      dolarToday: '',
      fecha2: ''
    }
  },
  methods: {
    ...mapMutations(['mostrarLoading','ocultarLoading']),

    async getDolar(dia) {
      let arrayFecha = dia.split(['-'])
      let ddmmyy =  arrayFecha[2]+'-'+arrayFecha[1]+'-'+arrayFecha[0]
      

      try {            
        this.mostrarLoading({titulo: 'Accediendo a informacion', color: 'secondary'})       
        let dato = await axios.get(`https://mindicador.cl/api/dolar/${ddmmyy}`)
        let dolarVenezula = await axios.get('https://s3.amazonaws.com/dolartoday/data.json')
        this.dolarToday = dolarVenezula.data.USD.transferencia
        this.fecha2 = dolarVenezula.data._timestamp.fecha
     
       if(dato.data.serie.length > 0 ){
          this.valor = await dato.data.serie[0].valor    
        }
        else{
          this.valor= 'Sin resultados'
        }
      } catch (error) {
        console.log(error);
      }
      finally{
        this.ocultarLoading()
      }
    }
  },
  created() {
    this.getDolar(this.fecha);
  },
  components:{
    Toolbar
  }

}
</script>