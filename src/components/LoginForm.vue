<template>
  <form @submit.prevent="submit">
    <v-text-field
      v-model="email.value"
      :error-messages="email.errorMessage"
      label="E-mail"
    ></v-text-field>

    <v-text-field
      v-model="password.value"
      :error-messages="password.errorMessage"
      label="Password"
      type="password"
    ></v-text-field>

    <v-btn class="me-4" type="submit">
      Submit
    </v-btn>

    <v-btn @click="handleReset">
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
import {useRouter} from "vue-router";

const defaultCategory = 1;
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
      dialog: {
        show: false,
        title: '',
        message: ''
      },
    };
  },

  methods: {
    async submit() {
      try {
        const env = import.meta.env.VITE_APP_API_BASE_URL;
        const response = await axios.post(`${env}login_check`, {
          username: this.email.value,
          password: this.password.value
        });

        localStorage.setItem('userToken', response.data.token);
        const nextResponse = await fetch(env + 'user_data', {
          headers: {
            'Authorization': `Bearer ` + response.data.token,
          }
        });
        const data = await nextResponse.json();
        console.log(data);
        localStorage.setItem('userName', data.name);
        localStorage.setItem('userSurname', data.surname);
        this.showDialog('Logowanie udane', 'Zostałeś zalogowany do sklepu');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.showDialog('Logowanie nieudane', 'Nieprawidłowy email lub hasło');
        }
      }
    },

    handleReset() {
      this.email.value = '';
      this.password.value = '';
      this.email.errorMessage = '';
      this.password.errorMessage = '';
    },

    showDialog(title, message) {
      this.dialog.title = title;
      this.dialog.message = message;
      this.dialog.show = true;
    },

    closeDialog() {
      if (this.dialog.title === 'Logowanie udane'){
        this.router.push({name: 'products_list', params: {categoryId: defaultCategory}});
      }
      this.dialog.show = false;
    }
  }
};
</script>
