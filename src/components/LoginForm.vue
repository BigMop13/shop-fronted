<template>
  <form @submit.prevent="submit">
    <v-text-field
      v-model="email.value.value"
      :error-messages="email.errorMessage.value"
      label="E-mail"
    ></v-text-field>

    <v-text-field
      v-model="password.value.value"
      :error-messages="password.errorMessage.value"
      label="Password"
      type="password"
    ></v-text-field>

    <v-btn
      class="me-4"
      type="submit"
    >
      submit
    </v-btn>

    <v-btn @click="handleReset">
      clear
    </v-btn>
  </form>
</template>

<script setup>

import {useField} from 'vee-validate'

const email = useField('email');
const password = useField('password');

  const handleReset = () => {
    email.resetField();
    password.resetField();
  };

</script>
