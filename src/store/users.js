import { getUserList, createUser, getUserById, updateUser, deleteUser } from '@/services/userService';

export default {
  namespaced: true,
  state: {
    users: [],
    selectedUser: null,
    totalUsers: 0,
    currentPage: 1,
    pageSize: 15,
    error: null,
  },
  mutations: {
    SET_USER(state, user) {
      const index = state.users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        state.users[index] = {
          ...state.users[index],
          ...user,
          email: state.users[index].email,
        };
      } else {
        state.users.push(user);
      }
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_TOTAL_USERS(state, total) {
      state.totalUsers = total;
    },
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },
    SET_SELECTED_USER(state, user) {
      state.selectedUser = user;
    },
    SET_PAGE_SIZE(state, size) {
      state.pageSize = size;
    },
    SET_SAVING_ERROR(state, error) {
      state.error = error;
    },
    ADD_USER(state, user) {
      if (state.currentPage === Math.ceil(state.totalUsers / state.pageSize) - 1) {
        state.users.push(user);
      }
    },
    UPDATE_USER(state, updatedUser) {
      const index = state.users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) state.users.splice(index, 1, updatedUser);
    },
    DELETE_USER(state, userId) {
      state.users = state.users.filter(user => user.id !== userId);
    },
  },
  actions: {
    async loadUsers({ commit }, { page = 1, limit = 9 }) {
      try {
        const { data } = await getUserList(limit, page);
        commit('SET_USERS', data.data);
        commit('SET_TOTAL_USERS', data.total);
        commit('SET_CURRENT_PAGE', data.page);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      }
    },

    async selectUser({ commit }, userId) {
      try {
        const { data } = await getUserById(userId);
        commit('SET_SELECTED_USER', data);
      } catch (error) {
        console.error('Erro ao selecionar usuário:', error);
      }
    },

    async saveUser({ commit, state }, user) {
      try {
        const { data } = user.id
          ? await updateUser(user.id, user)
          : await createUser(user);

        if (state.currentPage === Math.ceil(state.totalUsers / state.pageSize)) {
          commit('ADD_USER', data);
        }

        commit(user.id ? 'UPDATE_USER' : 'ADD_USER', data);
        commit('SET_SAVING_ERROR', null);
      } catch (error) {
        commit('SET_SAVING_ERROR', error);
      }
    },

    async removeUser({ commit }, userId) {
      try {
        await deleteUser(userId);
        commit('DELETE_USER', userId);
      } catch (error) {
        console.error('Erro ao remover usuário:', error);
      }
    },
  },
  getters: {
    isSavingError: (state) => state.isSavingError,
  },
};
