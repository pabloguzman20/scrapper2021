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
                    <v-col cols="12" md="14">
                      <v-card-text>
                        <h2
                          class="text-center display-2 --text text--accent-3 font-weight-medium mt-3"
                        >
                          Compartir documento
                        </h2>
                        <h4 class="text-center mt-4">
                          Para acceder a la opcion, sigue la instruccion
                          grafica.
                        </h4>
                      </v-card-text>
                      <v-img
                        v-bind:src="require('../assets/vincularDos.gif')"
                        :aspect-ratio="2.8"
                        width="650px"
                        class="mx-auto"
                      />
                      <div class="text-center mt-5 mb-5">
                        <v-btn rounded color="accent-3" @click="value++" dark
                          >Siguiente</v-btn
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
                          Compartir documento
                        </h2>
                        <h4 class="text-center mt-4 mb-3">
                          Copia el siguiente correo y pegalo en el campo de
                          invitar personas.
                        </h4>
                        <v-card
                          class="mx-auto text-center"
                          max-width="400"
                          elevation="10"
                          shaped
                        >
                          <b>uabc-628@pvvc-307101.iam.gserviceaccount.com</b>
                        </v-card>
                      </v-card-text>
                      <v-img
                        v-bind:src="require('../assets/vincularUno.gif')"
                        :aspect-ratio="2.8"
                        width="650px"
                        class="mx-auto"
                      />
                      <div class="text-center mt-5 mb-5">
                        <h4 class="text-center mt-4 mb-3">
                          No olvides asignar permisos de editor.
                        </h4>
                        <v-btn
                          rounded
                          color="accent-3"
                          @click="checkGoogleId"
                          dark
                          ><v-progress-circular
                            indeterminate
                            color="green"
                            v-if="isLoading"
                          ></v-progress-circular>
                          <span v-if="!isLoading">Siguiente</span>
                          <span v-if="isLoading" class="mx-2"
                            >Cargando</span
                          ></v-btn
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
const { ipcRenderer } = window.require("electron");

export default {
  data() {
    return {
      value: 1,
      googleId: "",
      isLoading: false,
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
      this.$router.push({ name: "EndView" });
    },
    async checkGoogleId() {
      if (this.isLoading) return;
      this.isLoading = true;
      const msg = await ipcRenderer.invoke("checkAuthGoogleService");
      this.isLoading = false;
      if (msg.includes("Vínculo correcto.")) {
        this.$router.push({ path: "/EndView" });
      } else {
        alert(
          "Error[403]: El sistema no tiene permisos de editor en el documento."
        );
      }
    },
    saveGoogleIdFile() {
      this.isLoading = true;
      ipcRenderer
        .invoke("saveGoogleId")
        .then((result) => {
          this.isLoading = false;
          if (result) {
            this.$router.push({ path: "/GoogleUserView" });
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
