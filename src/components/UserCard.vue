<template>
  <v-card
    class="mx-auto my-2"
    max-width="340"
    min-width="240"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-avatar
        tile
        size="80"
        :color="user.picture ? '' : 'grey lighten-2'"
      >
        <v-img
          v-if="user.picture"
          :src="user.picture"
          :alt="getFullName"
          cover
        />
        <v-icon v-else size="48">mdi-account-circle</v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="text-h6 font-weight-bold mb-1 text-wrap">
          {{ user.title }} {{ getFullName }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions class="d-flex justify-center grey lighten-2">
      <v-btn
        color="primary"
        rounded
        small
        @click="handleEdit"
        :loading="loadingAction === 'edit'"
        :disabled="isLoading"
        aria-label="Editar Usuário"
      >
        Editar
      </v-btn>
      <v-btn
        color="error"
        rounded
        small
        @click="handleDelete"
        :loading="loadingAction === 'delete'"
        :disabled="isLoading"
        aria-label="Excluir Usuário"
      >
        Excluir
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loadingAction: null, // Tracks the action being performed ('edit' or 'delete')
    };
  },
  computed: {
    isLoading() {
      return this.loadingAction !== null;
    },
    getFullName() {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
  },
  methods: {
    async handleEdit() {
      this.startLoading("edit");
      try {
        this.$emit("edit", this.user.id);
      } catch (error) {
        console.error("Erro ao editar usuário:", error);
      } finally {
        this.stopLoading();
      }
    },
    async handleDelete() {
      this.startLoading("delete");
      try {
        this.$emit("delete", this.user.id);
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
      } finally {
        this.stopLoading();
      }
    },
    startLoading(action) {
      this.loadingAction = action;
    },
    stopLoading() {
      this.loadingAction = null;
    },
  },
};
</script>

<style scoped>
.v-btn {
  min-width: 100px;
}
</style>
