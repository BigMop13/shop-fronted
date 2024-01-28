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
import { mapState } from 'vuex';
import {toRaw} from "vue";

export default {
  computed: {
    ...mapState(['products']),
    shoppingCartItems() {
      console.log(toRaw(this.products))
      return this.products;
    },
    headers() {
      return [
        { text: 'Nazwa produktu', value: 'name' },
        //dodaj resztę wartości po naprawie
      ];
    },
  },
  data() {
    return {
      search: '',
    };
  },
};
</script>

<style>
.thick-button {
  height: 62px;
}
</style>
