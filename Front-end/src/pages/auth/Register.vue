<template>
  <v-container
    class="register-container"
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
            <h2>Registrar</h2>
          </v-card-title>

          <v-form
            ref="form"
            @submit.prevent="handleRegister"
          >
            <v-text-field
              v-model="name"
              label="Nome"
              required
              outlined
              :rules="[rules.required]"
            />

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
              Registrar
            </v-btn>

            <v-btn
              color="secondary"
              block
              class="mt-2"
              @click="redirectToLogin"
            >
              Já tem uma conta? Faça login
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
import api from "@/utils/api";

export default {
  name: "RegisterPage",
  data() {
    return {
      name: "",
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
    async handleRegister() {
      const isValid = this.$refs.form.validate();
      if (!isValid) return;

      try {
        const response = await api.post("auth/register", {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        if (response.status === 201) {
          alert("Conta criada com sucesso! Redirecionando para o login...");
          this.$router.push("/auth/login");
        } else {
          this.errorMessage = "Erro ao criar conta.";
        }
      } catch (error) {
        console.log(error);
        this.errorMessage = error.response?.data?.message || "Erro ao criar conta.";
      }
    },

    redirectToLogin() {
      this.$router.push("/auth/login");
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
