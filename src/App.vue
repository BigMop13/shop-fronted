<template>
<v-app>
    <looged-nav-bar v-if="$route.meta.loggedNavbar"/>
    <start-nav-bar v-else/>
      <router-view />
    <default-footer />
    </v-app>
</template>

<script setup>
  import StartNavBar from "@/components/StartNavBar.vue";
  import LoogedNavBar from '@/components/NavBar.vue'
  import DefaultFooter from '@/components/Footer.vue'
</script>

<style>
/* Styl dla głównego kontenera */
html, body {
  height: 100%;
  margin: 0;
}

/* Styl dla stopki */
.v-footer {
  margin-top: auto; /* To spowoduje, że stopka przylegnie do dołu */
}
</style>