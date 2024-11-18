<script lang="ts" setup>
//
</script>

<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<style scoped>
  .v-app {
  height: 100vh;
  overflow: hidden;
}

.v-main {
  height: calc(100vh - 64px);
  overflow-y: auto;
}
  </style>
