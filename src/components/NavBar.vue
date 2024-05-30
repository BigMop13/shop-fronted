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
      <v-breadcrumbs class="breadcrumbs">
        <v-breadcrumbs-item v-if="!token" to="/login">Login</v-breadcrumbs-item>
        <v-breadcrumbs-item v-if="!token">/</v-breadcrumbs-item>
        <v-breadcrumbs-item v-if="!token" to="/register">Register</v-breadcrumbs-item>
        <v-breadcrumbs-item v-if="token" to="/user/purchase/history">{{ name }} {{ surname }}</v-breadcrumbs-item>
      </v-breadcrumbs>
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
    token: localStorage.getItem('userToken'),
    name: '',
    surname: ''
  }),

  setup() {
    const router = useRouter();
    return {router};
  },

  mounted() {
    this.fetchData();
    if (this.token) {
      this.fetchUserDetails();
    }
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

    async fetchUserDetails() {
      const env = import.meta.env.VITE_APP_API_BASE_URL;
      const response = await fetch(env + 'user_data', {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });
      const data = await response.json();
      this.name = data.name;
      this.surname = data.surname;
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
