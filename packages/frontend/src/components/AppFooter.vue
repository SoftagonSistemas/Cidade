<script setup lang="ts">
const items = [
  {
    title: 'Softagon Sistemas',
    icon: 'softagon',
    href: 'https://softagon.com.br/',
  },
  {
    title: 'Suporte Técnico',
    icon: 'mdi-help-network',
    href: 'https://help.softagon.com.br',
  },
]
</script>

<template>
  <v-footer height="40" app>
    <a
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      :title="item.title"
      class="d-inline-block mx-2 social-link"
      rel="noopener noreferrer"
      target="_blank"
    >
      <v-icon
        v-if="item.icon === 'softagon'"
        :size="24"
      >
        <img src="@/assets/softagon.svg" height="24" alt="Softagon Icon">
      </v-icon>
      <v-icon v-else :icon="item.icon" :size="24" />
    </a>

    <div
      class="text-caption text-disabled"
      style="position: absolute; right: 16px;"
    >
      &copy; 2005-{{ (new Date()).getFullYear() }} <span class="d-none d-sm-inline-block">Softagon Sistemas, LTDA</span>
    </div>
  </v-footer>
</template>

<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)
</style>
