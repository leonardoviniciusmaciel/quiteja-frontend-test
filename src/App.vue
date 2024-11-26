<template>
  <div id="app">
    <v-app>
      <v-app-bar app color="primary" dark>
        <v-toolbar-title>Gerenciar Usuários</v-toolbar-title>
        <v-spacer></v-spacer>
        <nav>
          <v-btn text to="/" exact tag="router-link">Home</v-btn>
          <v-btn text to="/usuarios" tag="router-link">Admin</v-btn>
        </nav>
      </v-app-bar>

      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  a {
    font-weight: bold;
    text-decoration: none;
    color: #ffffff;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
