<template>
  <v-app>
    <v-navigation-drawer
      v-if="!isAuthRoute"
      app
      permanent
    >
      <v-list dense>
        <v-list-subheader
          class="text-body-1 font-weight-medium"
          color="black"
        >
          Módulo Acadêmico
        </v-list-subheader>

        <v-divider />

        <v-list-item
          link
          :class="{'v-list-item--active': isActive('/dashboard')}"
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
  computed: {
    isAuthRoute() {
      return this.$route.path === '/auth/login' || this.$route.path === '/auth/register';
    },
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    isActive(route) {
      return this.$route.path === route;
    },
  },
};
</script>
