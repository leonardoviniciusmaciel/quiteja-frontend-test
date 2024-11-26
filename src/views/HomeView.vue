<template>
  <v-container class="pa-5">
    <v-row class="mb-4">
      <v-col cols="12" class="text-center">
        <h1 class="text-h2 display-2 font-weight-bold mx-auto blue--text">Seja Bem-vindo</h1>
        <h3 class="text-primary mt-4">Aqui você pode gerenciar seus usuários de forma simples e rápida.</h3>
      </v-col>

      <v-col cols="12" class="d-flex justify-center">
        <v-btn color="primary" @click="navigateToUsers">Ir para Usuários</v-btn>
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12" md="12" lg="12" class="d-flex align-center justify-center">
        <v-img
          src="https://img.freepik.com/free-vector/new-employee-concept-illustration_114360-8899.jpg?semt=ais_hybrid"
          alt="Imagem de Apresentação"
          max-width="500"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    navigateToUsers() {
      this.$router.push('/usuarios');
    }
  }
}
</script>

<style scoped>
.v-btn {
  font-weight: bold;
}
.subtitle-1 {
  color: #757575;
}
</style>
