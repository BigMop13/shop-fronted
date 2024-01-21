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

    <v-btn
      class="me-4"
      type="submit"
    >
      Submit
    </v-btn>

    <v-btn @click="handleReset">
      Clear
    </v-btn>
  </form>
</template>

<script setup>
import axios from 'axios';
import { useField } from 'vee-validate';

const email = useField('email');
const password = useField('password');

const submit = async () => {
  try {
    const env = import.meta.env.VITE_APP_API_BASE_URL;
    console.log(email.value)
    const response = await axios.post(env + 'login_check', {
      username: email.value,
      password: password.value
    });
    console.log(response.data.token);
    localStorage.setItem('userToken', response.data.token);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert('Incorrect email or password.');
    } else {
      alert('An error occurred. Please try again.');
    }
  }
};

const handleReset = () => {
  email.resetField();
  password.resetField();
};
</script>
