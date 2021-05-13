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
                      <v-card-text class="white--text mt-12">
                        <h2
                          class="text-center mx-auto mb-3 display-1 font-weight-regular"
                        >
                          Falta poco..
                        </h2>
                        <h4
                          class="text-center justify-center mx-auto font-weight-medium"
                        >
                          Si necesitas ayuda para encontrar el ID de tu
                          documento, presiona el boton de consultar!
                        </h4>
                      </v-card-text>
                      <div class="text-center mx-auto">
                        <v-btn rounded outlined dark @click="value++"
                          >Consultar</v-btn
                        >
                      </div>
                      <v-card-text class="white--text">
                        <v-img
                          v-bind:src="require('../assets/escudoUabc.png')"
                          :aspect-ratio="0.75"
                          :width="150"
                          class="mx-auto"
                        />
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h2
                          class="text-center display-2 --text text--accent-3 font-weight-medium mt-16"
                        >
                          Ingresa el Google ID
                        </h2>
                        <h4 class="text-center mt-4">
                          Sencillo, rapido y eficiente.
                        </h4>
                        <v-form>
                          <v-text-field
                            label="Google ID"
                            name="id"
                            prepend-icon="mdi-cloud-upload"
                            type="text"
                            color="green darken-3"
                            v-model="googleId"
                            :rules="[rules.required]"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mx-auto mb-4">
                        <v-btn
                          rounded
                          color="accent-3"
                          @click="saveGoogleIdFile"
                          dark
                          >Verificar</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="14">
                      <v-card-text>
                        <h2
                          class="text-center display-2 --text text--accent-3 font-weight-medium mt-16"
                        >
                          Obtener el Google ID
                        </h2>
                        <h4 class="text-center mt-4">
                          Para obtenerlo, sigue la instruccion grafica.
                        </h4>
                      </v-card-text>
                      <v-img
                        v-bind:src="require('../assets/googleID.gif')"
                        :aspect-ratio="2.8"
                        width="650px"
                        class="mx-auto"
                      />
                      <div class="text-center mt-5 mb-5">
                        <v-btn rounded color="accent-3" @click="value--" dark
                          >Regresar</v-btn
                        >
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
const formatter = require("../scraping_system/formatter.js");
const { ipcRenderer } = window.require("electron");
export default {
  data() {
    return {
      value: 1,
      googleId: "",
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
      this.$router.push({ name: "GoogleIdUser" });
    },
    saveGoogleIdFile() {
      this.isLoading = true;
      ipcRenderer
        .invoke("saveGoogleId", [
          JSON.stringify(formatter.formatGoogleID(this.googleId)),
        ])
        .then((result) => {
          this.isLoading = false;
          if (result) {
            alert("Google ID guardado con éxito");
            this.$router.push({path:'GoogleUserView'});
          }
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },
    checkGoogleIdFile() {
      ipcRenderer
        .invoke("loadGoogleId")
        .then((result) => {
          console.log(result + "Conseguido");
          this.googleId = result;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
