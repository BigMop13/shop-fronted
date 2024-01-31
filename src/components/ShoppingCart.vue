<template>
  <v-card flat title="Twoje zakupy">
    <v-data-table
      :headers="headers"
      :items="shoppingCartItems"
      :search="search"
    ></v-data-table>
  </v-card>
  <v-btn class="thick-button" variant="tonal">
    Kup
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      shoppingCartItems: [],
      headers: [
        { text: 'Nazwa', value: 'name' },
        { text: 'Kategoria', value: 'category.name' },
        { text: 'Ilość', value: 'quantity' },
        { text: 'Cena', value: 'price'},
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
      console.log(products)
    }
  }
};
</script>

<style>
.thick-button {
  height: 62px;
}
</style>
