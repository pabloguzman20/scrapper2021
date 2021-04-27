<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-15">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-3 --text text--accent-3 font-weight-medium"
                        >
                          Iniciar sesión
                        </h1>
                        <h4 class="text-center mt-4">
                          Tu información esta protegida con nosotros.
                        </h4>
                        <v-form>
                          <v-text-field
                            v-model="email"
                            suffix="@uabc.edu.mx"
                            label="Correo electronico"
                            name="Email"
                            prepend-icon="mdi-email"
                            type="text"
                            color="green darken-2"
                          />
                          <v-text-field
                            id="password"
                            v-model="password"
                            label="Contraseña"
                            name="password"
                            prepend-icon="mdi-lock"
                            type="password"
                            color="green darken-2"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-5 mb-5">
                        <v-btn rounded color="accent-3" dark
                        @click="validarSesion">Iniciar</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="green darken-2">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">
                          Bienvenido al sistema de administración de proyectos de vinculación!
                        </h1>
                        <h5 class="text-center">
                          La información de tus alumnos con unos cuantos clicks.
                          {{this.email +"uabc.edu.mx"}}
                        </h5>
                        <v-img
                          v-bind:src="require('../assets/escudoUabc.png')"
                          :aspect-ratio=".75"
                          :width ="150"
                          class="mt-4 ml-8 mb-5"
                        />
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
const axios = require('axios').default;
export default {
  data() {
    return {
      step: 1,
      email: "",
      password: "",
      rules: {
        requisito: (value) => !!value || "Requerido",
        correo: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Correo invalido.";
        },
      },
    };
  },
  props: {
    source: String,
  },
  methods: {
    validarSesion : function(){
      axios.post('https://llave.uabc.edu.mx/auth/login',{
        username: "pguzman89",
        password: "Pablo@GTFO1",
      })
      .then(function(response){
        console.log("SUCCESS: " + response);
      })
      .catch(function(e){
        console.log("ERROR: " + e);
      })
    }
  },
};
</script>
