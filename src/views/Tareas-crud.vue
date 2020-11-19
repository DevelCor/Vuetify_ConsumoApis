<template>
    <div>
        <v-container grid-list-xl>
            <br><br><br> 
            <v-row wrap>
                <v-col md6>
                    <v-card class="mb-3"  v-for="(item, index) in listaTareas" :key="item.id">
                        <v-card-text>
                             <v-chip class="ma-0" color="cyan darken-1" label text-color="white">
                                 <v-icon left>label</v-icon>
                                  {{item.titulo}}
                             </v-chip>
                            <p>{{item.descripcion}}</p>
                            <v-btn color="blue accent-1" class="ml-0 white--text" dark depressed @click="editar(index)">Editar</v-btn>
                            <v-btn color="indigo accent-4" class="ml-2 white--text" dark depressed @click="eliminarTarea(item.id)">Eliminar</v-btn>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col md6 class="mb-3" v-if="formAgregar">
                    <v-card class="pa-3">
                        <v-form @submit.prevent="agregarTarea">
                            <v-text-field label="Titulo de la tarea" v-model="titulo" autocomplete="off"></v-text-field>
                            <v-textarea label="Descripcion de tarea" auto-grow v-model="descripcion"></v-textarea>
                            <v-btn block color="blue accent-1" dark type="submit" class="white--text">Agregar tarea</v-btn>
                        </v-form>
                    </v-card>
                </v-col>

                <v-col md6 class="mb-3" v-if="!formAgregar">
                    <v-card class="pa-3">
                        <v-form @submit.prevent="editarTarea">
                            <v-text-field label="Titulo de la tarea" v-model="titulo" autocomplete="off">{{}}</v-text-field>
                            <v-textarea label="Descripcion de tarea" auto-grow v-model="descripcion"></v-textarea>
                            <v-btn block color="cyan darken-1" dark type="submit" class="white--text">Editar tarea</v-btn>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
                
        <v-snackbar v-model="snackbar">
      {{ mensaje }}

      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
        </v-container>  
    </div>
</template>
<script>
import Toolbar from '@/components/Toolbar.vue';
export default {
    name: 'Tareas-crud',
    components: {
        Toolbar
    },
    data(){
        return{
            band: false,
            titulo: '',
            descripcion: '',
            snackbar: false,
            formAgregar: true,
            mensaje: 'asdasd',
            indexTarea: '',
            listaTareas: []
        }
    },
    methods: {
        getTareas(){
            if(localStorage.getItem('tareas')===null){
                this.listaTareas=[];
            }else{
                this.listaTareas = JSON.parse(localStorage.getItem('tareas'));
            }
            return this.listaTareas;
        },
        agregarTarea(){
            if(this.titulo === '' || this.descripcion === ''){
                this.snackbar=true;
                this.mensaje= 'Llena todos los campos!';
            }else{
                    this.listaTareas = this.getTareas();
                    this.listaTareas.push({
                    id: Date.now(),
                    titulo: this.titulo,
                    descripcion: this.descripcion
                })
                localStorage.setItem('tareas',JSON.stringify(this.listaTareas))
                this.titulo=''
                this.descripcion=''
                this.snackbar=true
                this.mensaje='Tarea Agregada!'
            }
        },
        eliminarTarea(id){
            this.listaTareas = this.listaTareas.filter( e => e.id != id)
            this.listaTareas.forEach((index)=>{
                if(this.listaTareas.id === id){
                    this.listaTareas.splice(index,1)
                }
            });
            localStorage.setItem('tareas',JSON.stringify(this.listaTareas))
        },
        editar(index){
            this.formAgregar = false;
            this.titulo = this.listaTareas[index].titulo;
            this.descripcion= this.listaTareas[index].descripcion;
            this.indexTarea = index
        },
        editarTarea(){
            this.listaTareas[this.indexTarea].titulo = this.titulo
            this.listaTareas[this.indexTarea].descripcion = this.descripcion
            this.formAgregar = true
            this.titulo = ''
            this.descripcion = ''
            this.snackbar = true
            this.mensaje = 'Editaste la tarea!'
        }

    },
    created() {
        if(localStorage.getItem('tareas')===null){
            this.listaTareas=[]
        }else{
            this.listaTareas = JSON.parse(localStorage.getItem('tareas'))
        }
    },
}
</script>