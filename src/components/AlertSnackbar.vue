<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="2000"
    :color="snackbarColor"
    bottom
    right
    :style="{ borderRadius: '10px', padding: '12px 20px' }"
    class="elevation-5"
  >
    <span class="font-weight-bold">{{ snackbarText }}</span>
    <template v-slot:action="{ attrs }">
      <v-btn
        text
        v-bind="attrs"
        @click="snackbar = false"
        class="ml-4 text-bold"
        style="color: white; font-weight: 600;"
      >
        Fechar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'AlertSnackbar',
  data() {
    return {
      snackbar: false,
      snackbarText: '',
      snackbarColor: '',
    };
  },
  methods: {
    showSnackbar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },
  },
};
</script>

<style scoped>
.v-snackbar {
  font-family: 'Roboto', sans-serif;
}

.v-btn {
  font-size: 14px;
  font-weight: bold;
}
</style>
