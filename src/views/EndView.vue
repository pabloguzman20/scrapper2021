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
                          rounded
                          color="accent-3"
                          dark
                          >Iniciar</v-btn
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
    };
  },
  props: {
    source: String,
  },
  computed: {},
  methods: {
  },
};
</script>
