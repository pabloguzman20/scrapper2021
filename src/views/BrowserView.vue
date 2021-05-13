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
                          class="text-center display-2 --text text--accent-3 font-weight-medium"
                        >
                          Configuracion inicial
                        </h1>
                        <h4 class="text-center mt-4 mb-2">
                          Necesitamos conocer esta información para el sistema.
                        </h4>
                        <v-form v-model="validate">
                          <v-select
                            v-model="sistemaOperativo"
                            color="green darken-2"
                            :items="itemsDos"
                            label="Que sistema operativo utilizas?"
                            required
                          ></v-select>
                          <v-select
                            v-model="navegador"
                            color="green darken-2"
                            :items="items"
                            label="Que navegador utilizas?"
                            required
                          ></v-select>
                          <div class="text-center mt-5 mb-2">
                            <v-btn
                              rounded
                              color="accent-3"
                              dark
                              @click="avanzarVista"
                              ><v-progress-circular
                                indeterminate
                                color="green"
                                v-if="isLoading"
                              ></v-progress-circular>
                              <span v-if="!isLoading">Aceptar</span>
                              <span v-if="isLoading" class="mx-2"
                                >Cargando</span
                              ></v-btn
                            >
                          </div>
                        </v-form>
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" md="4" class="green darken-2">
                      <v-card-text class="white--text mt-12">
                        <h2 class="text-center headline">
                          Importante!
                        </h2>
                        <p class="text-center">
                          Debes de seleccionar las opciones que correspondan.
                        </p>
                        <v-img
                          v-bind:src="require('../assets/escudoUabc.png')"
                          :aspect-ratio="0.75"
                          :width="150"
                          height=""
                          class="mx-auto"
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
export default {
  data() {
    return {
      validate: false,
      value: 1,
      navegador: "",
      sistemaOperativo: "",
      isLogged: false,
      isLoading: false,
      items: [`Google Chrome`, "Firefox"],
      itemsDos: ["Windows", "Linux"],
      rules: {
        required: (value) => !!value || "Requerido",
      },
    };
  },
  props: {
    source: String,
  },
  computed: {},
  methods: {
    avanzarVista() {
      this.$router.push({ name: "GoogleIdView" });
    },
  },
};
</script>
