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
                          Iniciar sesión
                        </h1>
                        <h4 class="text-center mt-4 mb-2">
                          Tu información esta protegida con nosotros.
                        </h4>
                        <v-form v-model="validate">
                          <v-text-field
                            v-model="email"
                            suffix="@uabc.edu.mx"
                            label="Correo electronico"
                            name="Email"
                            prepend-icon="mdi-email"
                            type="text"
                            color="green darken-2"
                            :rules="[rules.required]"
                            required
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
                            @keyup.enter="checkCredentials"
                            required
                          />
                          <div class="text-center mt-5 mb-2">
                            <v-btn
                              :disabled="!validate"
                              rounded
                              color="accent-3"
                              dark
                              @click="checkCredentials"
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
                          Administración de proyectos de vinculación
                        </h2>
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
const { ipcRenderer } = window.require("electron");

export default {
  data() {
    return {
      validate: false,
      step: 1,
      email: "",
      password: "",
      isLogged: false,
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
    checkGoogleIdFile() {
      let isGoogleIdAvailable = ipcRenderer
        .invoke("loadGoogleId")
        .then((result) => {
          if (result) {
            return true;
          }
        })
        .catch((error) => {
          console.log("ERROR ON RENDERER OF HOME: " + error);
        });
      return isGoogleIdAvailable;
    },
    checkCredentials() {
      if (this.isLoading) return;
      this.isLoading = true;
      ipcRenderer
        .invoke("login", [
          JSON.stringify(this.email),
          JSON.stringify(this.password),
        ])
        .then((result) => {
          this.isLoading = false;
          if (result) {
            this.isLogged = result;
            const path = this.checkGoogleIdFile()
              ? "/EndView"
              : "/GoogleIdView";
            this.$router.push({ path: path });
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
