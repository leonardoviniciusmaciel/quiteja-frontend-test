<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" persistent max-width="500" transition="dialog-transition">
      <v-card class="elevation-10" style="border-radius: 12px; overflow: hidden;">
        <v-card-title class="text-h5 font-weight-bold">
          Confirmar Ação
        </v-card-title>
        <v-card-text class="text-body-1">
          {{ message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1 white--text"
            rounded
            small
            @click="confirm"
            class="btn-action"
            style="border-radius: 20px;"
          >
            Confirmar
          </v-btn>
          <v-btn
            color="grey darken-1 white--text"
            rounded
            small
            @click="cancel"
            class="btn-action"
            style="border-radius: 20px;"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'ConfirmationDialog',
  props: {
    message: {
      type: String,
      default: 'Tem certeza?',
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isOpen: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('update:value', val);
      }
    },
  },
  methods: {
    confirm() {
      this.isOpen = false;
      this.$emit('confirm');
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped>
.v-card {
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-btn {
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0.5px;
}

.v-btn:hover {
  transform: translateY(-2px);
}

.text-h5 {
  font-weight: 600;
}

.text-body-1 {
  font-size: 16px;
  line-height: 1.6;
}

.btn-action {
  padding: 10px 16px;
}
</style>
