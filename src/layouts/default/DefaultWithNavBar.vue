<template>
  <v-app>
    <default-bar />
      <slot />
    <default-footer />
  </v-app>
</template>

<script setup>
  import DefaultBar from '@/components/NavBar.vue'
  import DefaultFooter from '@/components/Footer.vue'
</script>
