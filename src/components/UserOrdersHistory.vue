<template>
  <div>
    <div v-for="(order, index) in userOrders" :key="index">
      <p>Data zamówienia: {{ order.orderDate }}</p>
      <p>Całkowita cena: {{ order.totalPrice }}</p>
      //finisz this, products are not showing
    </div>
  </div>
</template>

<script>
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
        const response = await fetch(`${env}history/orders`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
          }
        });
        const data = await response.json();
        this.userOrders = data.map(order => ({
          name: order.name,
          totalPrice: order.total_price,
          orderDate: order.order_date
        }));
        console.log(this.userOrders);
      } catch (error) {
        console.error('There was an error!', error);
      }
    }
  }
};
</script>
