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

    <v-text-field
      v-model="passwordConfirmation.value.value"
      :error-messages="passwordConfirmation.errorMessage.value"
      label="Confirm Password"
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

import {useField, useForm} from 'vee-validate'

const email = useField('email');
const password = useField('password');
const passwordConfirmation = useField('passwordConfirmation');

const {handleSubmit} = useForm({
  validationSchema: {
    email(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Niepoprawny adres e-mail.'
    },
    password(value) {
      if (value?.length >= 6) return true
      return 'Password must be at least 6 characters.'
    },
    passwordConfirmation(value) {
      if (value === password.value.value) return true
      return 'Passwords must match.'
    },
  },
})

  const handleReset = () => {
    email.resetField();
    password.resetField();
    passwordConfirmation.resetField();
  };

const submit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2))
})
</script>
