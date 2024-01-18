<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-img :src="item.imageUrl" height="300px"></v-img>
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-subtitle>{{ item.category.name }}</v-card-subtitle>
          <v-card-text>
            <div>Description: {{ item.description }}</div>
            <div>Price: ${{ item.price }}</div>
            <div>Quantity: {{ item.stockQuantity }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="buyItem(item)">Buy Now</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      item: {}
    };
  },
  created() {
    this.fetchItemDetails();
  },
  methods: {
    async fetchItemDetails() {
      const itemId = this.$route.params.id;
      // Fetch the item details from your API or data store
      // Replace the URL with your actual API endpoint
      const env = import.meta.env.VITE_APP_API_BASE_URL;

      const response = await fetch(env + 'products/' + itemId);
      this.item = await response.json();
    },

    buyItem(item) {
      // Implement the logic to handle the purchase
      console.log('Buying item:', item);
      // For example, add the item to the shopping cart
      // Or navigate to a checkout page with this.$router.push(...)
    }
  }
};
</script>

<style>
/* Add any specific styles for your item details view here */
</style>
