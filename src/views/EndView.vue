<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-15">
              <v-window v-model="value">
                <v-window-item :value="1">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="green darken-2">
                      <v-card-text class="white--text">
                        <v-img
                          v-bind:src="require('../assets/escudoUabc.png')"
                          :aspect-ratio="0.75"
                          :width="150"
                          class="mx-auto mt-7"
                        />
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h2
                          class="text-center display-2 --text text--accent-3 font-weight-medium"
                        >
                          Todo listo!
                        </h2>
                        <h4 class="text-center mt-4">
                          Solo estas a un click!
                        </h4>
                      </v-card-text>
                      <div class="text-center mx-auto mb-4">
                        <v-btn
                          v-if="!isLoading"
                          rounded
                          color="accent-3"
                          outlined
                          @click="avanzarVentana"
                          >Regresar</v-btn
                        >
                        <v-btn
                          rounded
                          color="accent-3 ml-4"
                          dark
                          @click="runScraper"
                          ><v-progress-circular
                            indeterminate
                            color="green"
                            v-if="isLoading"
                          ></v-progress-circular>
                          <span v-if="!isLoading">Iniciar!</span>
                          <span v-if="isLoading" class="mx-2"
                            >Cargando</span
                          ></v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="green darken-2">
                      <v-card-text class="white--text">
                        <v-img
                          v-bind:src="require('../assets/escudoUabc.png')"
                          :aspect-ratio="0.75"
                          :width="150"
                          class="mx-auto mt-7"
                        />
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h2
                          class="text-center display-2 --text text--accent-3 font-weight-medium"
                        >
                          Gracias por utilizar la aplicación!
                        </h2>
                        <h4 class="text-center mt-4">
                          Puedes cerrar el programa..
                        </h4>
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
const { ipcRenderer } = window.require("electron");

export default {
  data() {
    return {
      value: 1,
      isLoading: false,
    };
  },
  props: {
    source: String,
  },
  computed: {},
  methods: {
    avanzarVentana() {
      this.$router.push({ name: "GoogleIdView" });
    },
    runScraper() {
      if (this.isLoading) return;
      this.isLoading = true;
      ipcRenderer
        .invoke("scrap")
        .then((result) => {
          this.isLoading = false;
          if (result) {
            alert(result);
            this.value++;
          }
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },
  },
};
</script>
