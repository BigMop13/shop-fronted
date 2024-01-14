<template>
  <v-card>
    <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      align-tabs="center"
    >
      <v-tab :value="1">Register</v-tab>
      <v-tab :value="2">Login</v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
import EventBus from "@/plugins/eventBus";

export default {
  data: () => ({
    tab: null,
  }),

  watch: {
    tab(category) {
      EventBus.emit('tabSelected', {category: category})
      console.log(category)
    }
  }
}

</script>
