<template>
  <v-card>
    <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      align-tabs="center"
    >
      <v-tab @click="navigate(item.id)" v-for="item in tabItems" :key="item.id" :value="item.id">
        {{ item.name }}
      </v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
import EventBus from "@/plugins/eventBus";
import {useRouter} from "vue-router";

export default {
  data: () => ({
    tab: null,
    tabItems: [],
  }),

  setup() {
    const router = useRouter();
    return {router};
  },

  mounted() {
    this.fetchData();
  },

  watch: {
    tab(category) {
      EventBus.emit('tabSelected', {category: category})
    }
  },

  methods: {
    async fetchData() {
      const env = import.meta.env.VITE_APP_API_BASE_URL;
      const response = await fetch(env + 'categories');
      this.tabItems = await response.json();
    },

    navigate(itemCategories) {
      this.$router.push({ name: 'products_list', params: { categoryId: itemCategories} });
    }
  }
}

</script>
