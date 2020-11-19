<template>
    <div>
        <v-app-bar app color="blue lighten-3" dark drepressed> 
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="white--text">DC</v-toolbar-title>
        </v-app-bar> 
        <v-navigation-drawer v-model="drawer" color="blue lighten-3" app temporary class="container">
           <v-row mt-4 align-center>
               <v-col>
                    <v-toolbar-title class="white--text mt-3 ml-3 headline container">DC</v-toolbar-title>
               </v-col>
           </v-row>
           <v-row>
               <v-col>
                   <v-btn color="boton" block dark depressed :to="{name: 'home'}">Home</v-btn>
               </v-col>
           </v-row>
           <v-row>
               <v-col>
                    <v-btn color="boton" block dark mt-2 depressed :to="{name: 'tareas-crud'}">Tareas</v-btn>
               </v-col>
           </v-row>
        </v-navigation-drawer>
    </div>
</template>
<script>
export default {
    name: 'Toolbar',
    data(){
        return{
            drawer: false
        };
    }
}
</script>