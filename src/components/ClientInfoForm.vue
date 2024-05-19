<template>
  <form @submit.prevent="submitForm" class="form-container">
    <label for="firstName" class="form-label">Imię</label>
    <input id="firstName" v-model="form.firstName" required class="form-input">

    <label for="lastName" class="form-label">Nazwisko</label>
    <input id="lastName" v-model="form.lastName" required class="form-input">

    <label for="address" class="form-label">Adres</label>
    <input id="address" v-model="form.address" required class="form-input">

    <label for="email" class="form-label">Email</label>
    <input id="email" type="email" v-model="form.email" required class="form-input">

    <label for="phone" class="form-label">Telefon</label>
    <input id="phone" v-model="form.phone" required class="form-input">

    <button type="submit" class="form-submit">Złóż zamówienie</button>
  </form>

  <v-dialog v-model="showDialogSuccess">
    <v-card>
      <v-card-title class="text-h5">Potwierdzenie</v-card-title>
      <v-card-text>Zamówienie złożone pomyślnie, dziękujemy</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="showDialogSuccess = false">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="showDialogFailure">
    <v-card>
      <v-card-title class="text-h5">Komunikat</v-card-title>
      <v-card-text>Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie później lub skonsultuj się z właścicielem sklepu</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="showDialogFailure = false">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const form = ref({
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      phone: ''
    })

    const showDialogSuccess = ref(false)
    const showDialogFailure = ref(false)
    function submitForm() {
      const shoppingCartItems = JSON.parse(localStorage.getItem('cartProducts')) || [];
      const orderDetails = shoppingCartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      }));

      const totalPrice = shoppingCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

      const orderData = {
        client: {
          name: form.value.firstName,
          surname: form.value.lastName,
          address: form.value.address,
          email: form.value.email,
          phone_number: form.value.phone
        },
        total_price: totalPrice,
        order_date: new Date().toISOString(),
        order_details: orderDetails
      }

      const env = import.meta.env.VITE_APP_API_BASE_URL;
      axios.post(`${env}place_order`, orderData)
        .then(response => {
          localStorage.removeItem('cartProducts');
          showDialogSuccess.value = true;
          this.router.push('/products/:categoryId');
        })
        .catch(error => {
          showDialogFailure.value = true;
        })
    }

    return { form, submitForm, showDialogSuccess, showDialogFailure }
  }
}
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-input {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
}

.form-submit {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
