<template>
  <v-card>
    <div class="tabs-container">
      <v-tabs
        v-model="tab"
        color="deep-purple-accent-4"
        class="v-tabs"
      >
        <v-tab @click="navigate(item.id)" v-for="item in tabItems" :key="item.id" :value="item.id">
          {{ item.name }}
        </v-tab>
      </v-tabs>
      <v-breadcrumbs :items="['Login', 'Register']" class="breadcrumbs"></v-breadcrumbs>
    </div>
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

<style>
.tabs-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.v-tabs {
  max-width: calc(100% - 200px);
}

.breadcrumbs {
  margin-left: auto;
}
</style>
