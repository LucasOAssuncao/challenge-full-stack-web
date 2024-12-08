<template>
  <v-app>
    <v-navigation-drawer
      app
      permanent
    >
      <v-list dense>
        <v-list-subheader>Módulo Acadêmico</v-list-subheader>

        <v-divider />

        <v-list-item
          link
          @click="navigateTo('/dashboard')"
        >
          <v-list-item-title>Alunos</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "MainLayout",
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>
