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
                        <h3 class="text-center mt-4">
                          Tu información esta protegida con nosotros.
                        </h3>
                        <v-form>
                          <v-text-field
                            v-model="email"
                            suffix="@uabc.edu.mx"
                            label="Correo electronico"
                            name="Email"
                            prepend-icon="mdi-email"
                            type="text"
                            color="green darken-2"
                            :rules="[rules.required]"
                          />
                          <v-text-field
                            id="password"
                            v-model="password"
                            label="Contraseña"
                            name="password"
                            prepend-icon="mdi-lock"
                            type="password"
                            color="green darken-2"
                            :rules="[rules.required]"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-5 mb-5">
                        <v-btn rounded color="accent-3" dark @click="step++"
                          >Iniciar</v-btn
                        >
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="green darken-2">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">
                          Administración de proyectos de vinculación
                        </h1>
                        <v-img
                          v-bind:src="require('../assets/escudoUabc.png')"
                          :aspect-ratio="0.75"
                          :width="180"
                          class="mt-4 ml-16"
                        />
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="green darken-2">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1 font-weight-medium">
                          Falta poco...
                        </h1>
                        <h4 class="text-center mt-3 font-weight-medium">
                          Si necesitas ayuda para encontrar el ID de tu
                          documento, presiona el boton!
                        </h4>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--"
                          >Consultar</v-btn
                        >
                      </div>
                      <v-card-text class="white--text mt-3">
                        <v-img
                          v-bind:src="require('../assets/escudoUabc.png')"
                          :aspect-ratio="0.75"
                          :width="180"
                          class="ml-16"
                        />
                      </v-card-text>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-3 --text text--accent-3 font-weight-medium mt-16"
                        >
                          Ingresa el Google ID
                        </h1>
                        <h3 class="text-center mt-4">
                          Sencillo, rapido y eficiente.
                        </h3>
                        <v-form>
                          <v-text-field
                            label="Google ID"
                            name="id"
                            prepend-icon="mdi-cloud-upload"
                            type="text"
                            color="green darken-3"
                            :rules="[rules.required]"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5 mb-5">
                        <v-btn rounded color="accent-3" dark>Verificar</v-btn>
                      </div>
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
export default {
  data() {
    return {
      step: 1,
      email: "",
      password: "",
      rules: {
        required: (value) => !!value || "Requerido",
      },
    };
  },
  props: {
    source: String,
  },
  methods: {},
};
</script>
