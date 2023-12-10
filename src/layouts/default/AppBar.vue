<template>
  <v-card>
    <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      align-tabs="center"
    >
      <v-tab :value="1">Landscape</v-tab>
      <v-tab :value="2">City</v-tab>
      <v-tab :value="3">Abstract</v-tab>
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
    tab(newValue) {
      EventBus.emit('tabSelected', newValue)
      console.log(newValue)
    }
  }
}

</script>
