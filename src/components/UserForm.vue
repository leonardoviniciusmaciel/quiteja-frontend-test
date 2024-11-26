<template>
  <v-container>
    <v-col class="d-flex align-center justify-center">
      <v-form ref="form" @submit.prevent="submitForm">
        <v-row>
          <v-col cols="12" md="2">
            <v-select v-model="localUser.title" :items="['mr', 'mrs', 'ms', 'miss']" label="Título" dense></v-select>
          </v-col>
          <v-col cols="12" md="5">
            <v-text-field v-model="localUser.firstName" label="Primeiro Nome *" name="name" :rules="[rules.required]"
              dense></v-text-field>
          </v-col>
          <v-col cols="12" md="5">
            <v-text-field v-model="localUser.lastName" label="Último Nome *" name="last-name" :rules="[rules.required]"
              dense></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="localUser.email" label="Email *" :rules="[rules.required, rules.email]" type="email" dense></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="localUser.phone" label="Telefone" dense></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-select v-model="localUser.gender" :items="['male', 'female', 'other']" label="Gênero" dense
              placeholder="Selecione o Gênero"></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="localUser.dateOfBirth" label="Data de Nascimento" type="datetime-local" dense />
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field v-model="localUser.picture" label="Foto (URL)" type="url" dense></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="localUser.location.street" label="Rua" dense></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="localUser.location.city" label="Cidade" dense></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="localUser.location.state" label="Estado" dense></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="localUser.location.country" label="País" dense></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="localUser.location.timezone" label="Fuso Horário" dense></v-text-field>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col class="d-flex justify-center">
            <v-btn color="primary" @click="submitForm" large>
              {{ isEditMode ? 'Atualizar' : 'Salvar' }}
            </v-btn>
            <v-btn color="secondary" @click="cancel" large class="ml-4">
              Cancelar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: 'UserForm',
  props: {
    user: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      localUser: this.initializeLocalUser(this.user),
      isEditMode: false,
      originalEmail: '',
      rules: {
        required: value => !!value || 'Campo obrigatório.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'E-mail inválido.'
        },
      },

    };
  },
  watch: {
    user(newUser) {
      if (newUser) {
        this.isEditMode = true;
        this.localUser = { ...newUser };
        this.originalEmail = newUser.email;
      } else {
        this.localUser = this.initializeLocalUser();
      }
    },
  },
  methods: {
    initializeLocalUser(user = null) {
      if (user) {
        return { ...user };
      }
      return {
        id: '',
        title: 'mr',
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        phone: '',
        gender: 'male',
        location: {
          street: '',
          city: '',
          state: '',
          country: '',
          timezone: '',
        },
        picture: '',
        registerDate: '',
        updatedDate: '',
      };
    },

    submitForm() {
      const hasErrors = Object.values(this.$refs.form.errorBag).some(error => error === true);

      if (!this.localUser.phone) {
        delete this.localUser.phone;
      }

      if(hasErrors) {
        this.$emit('on-error', { message: 'Por favor, preencha todos os campos com *', color: 'error' });
        return;
      }

      this.$emit('save', this.localUser);
    },
    cancel() {
      this.isEditMode = false;
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss" scoped>
.user-form {
  max-width: 800px;
  border: 1px solid #ccc;
}
</style>