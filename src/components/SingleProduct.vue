<template>
  <div v-if="item">
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-img :src="item.photo" height="300px"></v-img>
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-subtitle>{{ item.category.name }}</v-card-subtitle>
          <v-card-text>
            <div>Description: {{ item.description }}</div>
            <div>Price: ${{ item.price }}</div>
            <div>Quantity: {{ item.stockQuantity }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="buyItem(item)">Dodaj do koszyka</v-btn>
            <v-btn color="secondary" @click="goToCart">Przejdź do koszyka</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </div>

  <v-dialog v-model="showDialog">
    <v-card>
      <v-card-title class="text-h5">Potwierdzenie</v-card-title>
      <v-card-text>Produkt został dodany do koszyka</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="showDialog = false">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {useRouter} from "vue-router";

export default {
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      item: null,
      showDialog: false,
    };
  },
  created() {
    this.fetchItemDetails();
  },
  methods: {
    async fetchItemDetails() {
      if (this.$route.params.id) {
        const itemId = this.$route.params.id;

        const env = import.meta.env.VITE_APP_API_BASE_URL;

        const response = await fetch(env + 'products/' + itemId);
        this.item = await response.json();
      }
    else {
        const productName = this.$route.params.name;

        const env = import.meta.env.VITE_APP_API_BASE_URL;

        const response = await fetch(env + 'get_product_by_name' + `?name=${productName}`);
        this.item = await response.json();
      }
    console.log(this.item.photo)
    },

    buyItem(item) {
      let cartProducts = localStorage.getItem('cartProducts');
      cartProducts = cartProducts ? JSON.parse(cartProducts) : [];
      const existingProductIndex = cartProducts.findIndex(p => p.id === item.id);
      if (existingProductIndex !== -1) {
        cartProducts[existingProductIndex].quantity += 1;
        cartProducts[existingProductIndex].price = cartProducts[existingProductIndex].price * cartProducts[existingProductIndex].quantity;
      } else {
        const newItem = { ...item, quantity: 1 };
        cartProducts.push(newItem);
      }
      localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
      this.showDialog = true;
    },

    goToCart() {
      this.router.push({ name: 'shopping-cart' });
    }

  }
};
</script>
