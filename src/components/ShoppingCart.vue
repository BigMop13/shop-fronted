<template>
  <v-card flat title="Twoje zakupy">
    <v-data-table
      :headers="headers"
      :items="shoppingCartItems"
      :search="search"
    >
      <template v-slot:item.action="{ item }">
        <v-icon small @click="removeItem(item)" color="red">mdi-minus</v-icon>
      </template>
    </v-data-table>
  </v-card>
  <v-btn color="primary" @click="completePurchase">Złóż zamówienie</v-btn>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      search: '',
      shoppingCartItems: [],
      headers: [
        { text: 'Nazwa', value: 'name' },
        { text: 'Kategoria', value: 'category.name' },
        { text: 'Ilość', value: 'quantity' },
        { text: 'Cena', value: 'price' },
        { text: 'Akcja', value: 'action', sortable: false }
      ],
    };
  },
  created() {
    this.loadCartProducts();
  },
  methods: {
    loadCartProducts() {
      let products = localStorage.getItem('cartProducts');
      this.shoppingCartItems = products ? JSON.parse(products) : [];
    },
    removeItem(item) {
      const index = this.shoppingCartItems.findIndex(i => i.name === item.name);
      if (index !== -1) {
        if (this.shoppingCartItems[index].quantity > 1) {
          this.shoppingCartItems[index].quantity--;
        } else {
          this.shoppingCartItems.splice(index, 1);
        }
        this.updateLocalStorage();
      }
    },
    updateLocalStorage() {
      localStorage.setItem('cartProducts', JSON.stringify(this.shoppingCartItems));
    },
    completePurchase() {
      const orderDetails = this.shoppingCartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      }));

      const totalPrice = this.shoppingCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

      const orderData = {
        total_price: totalPrice,
        order_date: new Date().toISOString(),
        order_details: orderDetails
      }

      const env = import.meta.env.VITE_APP_API_BASE_URL;
      axios.post(`${env}place_order`, orderData)
        .then(response => {
          localStorage.removeItem('cartProducts');
          this.$router.push('/products/1');
        })
        .catch(error => {
          console.error(error);
        })
    }
  }
};
</script>

<style>
.thick-button {
  height: 62px;
}
</style>
