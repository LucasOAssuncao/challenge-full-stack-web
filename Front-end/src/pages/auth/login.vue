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

          <v-form
            ref="form"
            @submit.prevent="handleLogin"
          >
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
              :rules="[rules.required, rules.password]"
            />

            <v-btn
              type="submit"
              color="primary"
              block
              class="mt-4"
            >
              Entrar
            </v-btn>

            <v-btn
              color="secondary"
              block
              class="mt-2"
              @click="redirectToRegister"
            >
              Não tem uma conta? Registre-se
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
import axios from "axios";

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
        password: (value) =>
          (value.length >= 8 &&
            /[A-Z]/.test(value) &&
            /[a-z]/.test(value) &&
            /\d/.test(value) &&
            /\W/.test(value)) ||
          "A senha deve conter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.",
      },
    };
  },
  methods: {
    async handleLogin() {
      const isValid = this.$refs.form.validate();
      if (!isValid) return;

      try {
        const response = await axios.post("", {
          email: this.email,
          password: this.password,
        });

        if (response.status === 200) {
          alert("Login bem-sucedido!");
        } else {
          this.errorMessage = "Falha no login.";
        }
      } catch (error) {
        console.log(error);

        this.errorMessage = "E-mail ou senha incorretos.";
      }
    },

    redirectToRegister() {
      this.$router.push("/auth/register");
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
