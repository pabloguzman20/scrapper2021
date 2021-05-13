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
                        <v-btn rounded color="accent-3" @click="avanzarVista" dark
                          >Siguiente</v-btn
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
      this.$router.push({ name: "EndView" });
    },
  },
};
</script>
