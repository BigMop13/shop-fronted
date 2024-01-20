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

    <v-btn class="me-4" type="submit">
      Submit
    </v-btn>

    <v-btn @click="handleReset">
      Clear
    </v-btn>
  </form>

  <!-- Dialog for displaying messages -->
  <v-dialog v-model="isDialogVisible" persistent max-width="300px">
    <v-card>
      <v-card-title class="text-h5">{{ dialogMessage }}</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeDialog">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

// State for dialog visibility and message
let isDialogVisible = false;
let dialogMessage = '';

// Define the validation schema using yup
const schema = yup.object({
  email: yup.string().email('Niepoprawny adres e-mail.').required(),
  password: yup.string().min(6, 'Password must be at least 6 characters.').required(),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match.')
    .required()
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema
});

const email = useField('email');
const password = useField('password');
const passwordConfirmation = useField('passwordConfirmation');

const submit = handleSubmit(async values => {
  try {
    const env = import.meta.env.VITE_APP_API_BASE_URL;
    const response = await fetch(`${env}register_user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      // Handle the API error response here
      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }

    const responseData = await response.json();
    dialogMessage = 'Everything went well!';
    isDialogVisible = true;
  } catch (error) {
    dialogMessage = error.message || 'There was an error, try again later ';
    isDialogVisible = true;
  }
});


const handleReset = () => {
  resetForm();
};

const closeDialog = () => {
  isDialogVisible = false;
};
</script>
