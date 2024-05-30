<template>
  <v-card>
    <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      align-tabs="center"
    >
      <v-tab @click="navigate('register')" :value="1">Register</v-tab>
      <v-tab @click="navigate('login')" :value="2">Login</v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
import EventBus from "@/plugins/eventBus";
import { useRouter } from 'vue-router';

export default {
  data: () => ({
    tab: null,
  }),

  setup() {
    const router = useRouter();
    return {router};
  },

  methods: {
    navigate(routeName) {
      this.router.push({name: routeName});
    }
  },

  watch: {
    tab(category) {
      EventBus.emit('tabSelected', {category: category})
    }
  }
}
</script>
