<template>
  <v-container
    class="login-container"
    fill-height
  >
    <v-row justify="center">
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card
          class="pa-4"
          elevation="8"
        >
          <v-card-title class="text-center mb-4">
            <h2>Login</h2>
          </v-card-title>

          <v-form @submit.prevent="handleLogin">
            <v-text-field
              v-model="email"
              label="E-mail"
              type="email"
              required
              outlined
              :rules="[rules.required, rules.email]"
            />

            <v-text-field
              v-model="password"
              label="Senha"
              type="password"
              required
              outlined
              :rules="[rules.required]"
            />

            <v-btn
              type="submit"
              color="primary"
              block
              class="mt-4"
            >
              Entrar
            </v-btn>
          </v-form>

          <v-alert
            v-if="errorMessage"
            type="error"
            class="mt-4"
          >
            {{ errorMessage }}
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      rules: {
        required: (value) => !!value || "Campo obrigatório.",
        email: (value) => /.+@.+\..+/.test(value) || "E-mail inválido.",
      },
    };
  },
  methods: {
    handleLogin() {
      // Simulação de autenticação
      if (this.email === "usuario@example.com" && this.password === "123456") {
        alert("Login bem-sucedido!");
        // Redirecionar ou executar lógica após o login
      } else {
        this.errorMessage = "E-mail ou senha incorretos.";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
