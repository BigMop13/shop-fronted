<template>
  <div>
    <h1>Historia zamówień</h1>
    <div v-for="order in userOrders" :key="order.id" class="order">
      <h2>Zamówienie #{{ order.id }}</h2>
      <p>Data zamówienia: {{ new Date(order.orderDate).toLocaleDateString() }}</p>
      <p>Status: {{ order.status }}</p>
      <p>Całkowita cena: {{ order.totalPrice }}</p>
      <div v-for="detail in order.orderDetails" :key="detail.id" class="order-detail">
        <h3>Produkt: {{ detail.product.name }}</h3>
        <p>Ilość: {{ detail.quantity }}</p>
        <p>Cena: {{ detail.product.price }}</p>
        <img :src="detail.product.photo" alt="Zdjęcie produktu">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userOrders: []
    };
  },
  created() {
    this.loadUserOrders();
  },
  methods: {
    async loadUserOrders() {
      try {
        const env = import.meta.env.VITE_APP_API_BASE_URL;
        const token = localStorage.getItem('userToken');
        const headers = token ? {Authorization: `Bearer ${token}`} : {};
        const response = await axios.get(`${env}history/orders`, {headers});
        this.userOrders = response.data;
      } catch (error) {
        console.error('There was an error!', error);
      }
    }
  }
};
</script>

<style>
.order {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
}

.order-detail {
  border-top: 1px solid #ccc;
  padding-top: 10px;
  margin-top: 10px;
  background-color: #d1cecd;
}
</style>
