<template>
  <form @submit.prevent="submit">
    <v-text-field
      v-model="email.value"
      :error-messages="email.errorMessage.value"
      label="E-mail"
    ></v-text-field>

    <v-text-field
      v-model="password.value"
      :error-messages="password.errorMessage.value"
      label="Password"
      type="password"
    ></v-text-field>

    <v-text-field
      v-model="passwordConfirmation.value"
      :error-messages="passwordConfirmation.errorMessage.value"
      label="Confirm Password"
      type="password"
    ></v-text-field>

    <v-text-field
      v-model="clientDataInput.name"
      label="Name"
    ></v-text-field>

    <v-text-field
      v-model="clientDataInput.surname"
      label="Surname"
    ></v-text-field>

    <v-text-field
      v-model="clientDataInput.address"
      label="Address"
    ></v-text-field>

    <v-text-field
      v-model="clientDataInput.phone_number"
      label="Phone Number"
    ></v-text-field>

    <v-btn class="me-4" type="submit">
      Submit
    </v-btn>

    <v-btn>
      Clear
    </v-btn>
  </form>

  <v-dialog v-model="dialog.show" persistent max-width="300px">
    <v-card>
      <v-card-title>{{ dialog.title }}</v-card-title>
      <v-card-text>{{ dialog.message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="closeDialog">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    return { router };
  },

  data() {
    return {
      email: {
        value: '',
        errorMessage: ''
      },
      password: {
        value: '',
        errorMessage: ''
      },
      passwordConfirmation: {
        value: '',
        errorMessage: ''
      },
      clientDataInput: {
        name: '',
        surname: '',
        address: '',
        phone_number: ''
      },
      dialog: {
        show: false,
        title: '',
        message: ''
      }
    };
  },

  methods: {
    async submit() {
      this.email.errorMessage = '';
      this.password.errorMessage = '';
      this.passwordConfirmation.errorMessage = '';

      try {
        const env = import.meta.env.VITE_APP_API_BASE_URL;
        await axios.post(`${env}register_user`, {
          email: this.email.value,
          password: this.password.value,
          client_data_input: {
            name: this.clientDataInput.name,
            surname: this.clientDataInput.surname,
            address: this.clientDataInput.address,
            phone_number: this.clientDataInput.phone_number
          }
        });

        this.showDialog('Rejestracja powiodła się');
      } catch (error) {
        this.showDialog('Błąd rejestracji');
      }
    },

    showDialog(title, message) {
      this.dialog.title = title;
      this.dialog.message = message;
      this.dialog.show = true;
    },

    closeDialog() {
      this.dialog.show = false;
      this.redirectToLogin();
    },

    redirectToLogin() {
      this.router.push('/login');
    }
  }
};
</script>
