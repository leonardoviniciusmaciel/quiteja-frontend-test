<template>
  <v-container>
    <v-col cols="12" class="d-flex justify-end">
      <v-btn v-show="!isUserFormVisible" color="primary" class="mb-4" @click="showCreateUserForm">
        <v-icon left>mdi-plus</v-icon>
        Novo
      </v-btn>
    </v-col>

    <v-col v-show="!isUserFormVisible" cols="10 offset-1" md="12 offset-md-0" lg="12 offset-lg-0">
      <v-row>
        <v-col xs="12" sm="6" md="4" lg="3" v-for="user in users" :key="user.id">
          <UserCard :user="user" @edit="handleEditUser(user)" @delete="confirmUserDeletion(user.id)" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="d-flex justify-center align-center mt-4">
          <v-btn icon @click="goToFirstPage" :disabled="isLoading || isOnFirstPage">
            <v-icon>mdi-chevron-double-left</v-icon>
          </v-btn>
          <v-btn icon @click="goToPreviousPage" :disabled="isLoading || isOnFirstPage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <span class="mx-2">{{ currentPage }} de {{ totalPages }}</span>
          <v-btn icon @click="goToNextPage" :disabled="isLoading || isOnLastPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
          <v-btn icon @click="goToLastPage" :disabled="isLoading || isOnLastPage">
            <v-icon>mdi-chevron-double-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>

    <UserForm
      v-show="isUserFormVisible"
      :user="selectedUser"
      @save="handleUserSave"
      @cancel="resetUserSelection"
      @on-error="showSnackbar($event.message, $event.color)"
    />

    <ConfirmationDialog
      v-model="isConfirmDialogVisible"
      message="Deseja realmente excluir o usuário?"
      @confirm="deleteUser"
      @cancel="isConfirmDialogVisible = false"
    />

    <AlertSnackbar ref="alertSnackbar" />
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AlertSnackbar from '@/components/AlertSnackbar.vue';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import UserCard from '@/components/UserCard.vue';
import UserForm from '@/components/UserForm.vue';

export default {
  name: 'UsersView',
  components: { AlertSnackbar, ConfirmationDialog, UserCard, UserForm },

  data() {
    return {
      selectedUser: null,
      userToDelete: null,
      currentPage: 1,
      isUserFormVisible: false,
      isConfirmDialogVisible: false,
      isLoading: false,
    };
  },

  computed: {
    ...mapState('users', ['users', 'pageSize', 'totalUsers', 'error']),
    totalPages() {
      return Math.ceil(this.totalUsers / this.pageSize) - 1;
    },
    isOnFirstPage() {
      return this.currentPage === 1;
    },
    isOnLastPage() {
      return this.currentPage >= this.totalPages;
    },
  },

  methods: {
    ...mapActions('users', ['saveUser', 'removeUser', 'selectUser']),

    async handleUserSave(user) {
      if (this.selectedUser && this.selectedUser.email !== user.email) {
        this.showSnackbar('O email não pode ser alterado.', 'error');
        return;
      }

      const updatedUser = { ...this.selectedUser, ...user };

      await this.saveUser(updatedUser);

      const error = this.error;
      if (error) {
        this.showSnackbar('Erro: ' + error.response.data.error + '. Código de erro: ' + error.response.status  , 'error');
      } else {
        this.showSnackbar('Usuário atualizado com sucesso.', 'success');
        this.resetUserSelection()
      }
    },

    async loadUsers() {
      if (this.isLoading) return;
      this.isLoading = true;

      await this.$store.dispatch('users/loadUsers', {
        page: this.currentPage,
        limit: this.pageSize,
      });

      this.isLoading = false;
    },

    async goToPreviousPage() {
      if (!this.isOnFirstPage) {
        this.currentPage -= 1;
        this.updateQueryParams();
        await this.loadUsers();
      }
    },

    async goToNextPage() {
      if (!this.isOnLastPage) {
        this.currentPage += 1;
        this.updateQueryParams();
        await this.loadUsers();
      }
    },

    async goToFirstPage() {
      this.currentPage = 1;
      this.updateQueryParams();
      await this.loadUsers();
    },

    async goToLastPage() {
      this.currentPage = this.totalPages;
      this.updateQueryParams();
      await this.loadUsers();
    },

    updateQueryParams() {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, page: this.currentPage, limit: this.pageSize },
      });
    },

    showCreateUserForm() {
      this.selectedUser = null;
      this.isUserFormVisible = true;
    },

    async handleEditUser(user) {
      await this.selectUser(user.id);
      this.selectedUser = this.$store.state.users.selectedUser;
      this.isUserFormVisible = true;
    },

    confirmUserDeletion(userId) {
      this.userToDelete = userId;
      this.isConfirmDialogVisible = true;
    },

    async deleteUser() {
      await this.removeUser(this.userToDelete);
      this.isConfirmDialogVisible = false;
      this.showSnackbar('Usuário excluído com sucesso', 'success');
    },

    resetUserSelection() {
      this.selectedUser = null;
      this.isUserFormVisible = false;
    },

    showSnackbar(message, color = 'success') {
      this.$refs.alertSnackbar.showSnackbar(message, color);
    },
  },

  mounted() {
    const pageFromUrl = parseInt(this.$route.query.page, 10) || 1;
    const limitFromUrl = parseInt(this.$route.query.limit, 10) || this.pageSize;

    this.currentPage = pageFromUrl;
    this.$store.commit('users/SET_PAGE_SIZE', limitFromUrl);
    this.loadUsers();
  },

  watch: {
    '$route.query.page'(newPage) {
      const pageFromUrl = parseInt(newPage, 10) || 1;
      if (this.currentPage !== pageFromUrl) {
        this.currentPage = pageFromUrl;
        this.loadUsers();
      }
    },
    '$route.query.limit'(newLimit) {
      const limitFromUrl = parseInt(newLimit, 10) || this.pageSize;
      if (this.pageSize !== limitFromUrl) {
        this.pageSize = limitFromUrl;
        this.loadUsers();
      }
    },
  },
};
</script>
