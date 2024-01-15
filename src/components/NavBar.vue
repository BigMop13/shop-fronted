<template>
  <v-card>
    <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      align-tabs="center"
    >
      <v-tab v-for="item in tabItems" :key="item.id" :value="item.id">
        {{ item.name }}
      </v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
import EventBus from "@/plugins/eventBus";

export default {
  data: () => ({
    tab: null,
    tabItems: [],
  }),

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
    }
  }
}

</script>
