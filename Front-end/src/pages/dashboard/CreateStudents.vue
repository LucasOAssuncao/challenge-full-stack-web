<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="8"
        md="6"
      >
        <v-card
          class="pa-4"
          elevation="8"
        >
          <v-card-title class="text-center mb-4">
            <h2>Cadastrar Aluno</h2>
          </v-card-title>

          <v-form
            ref="form"
            @submit.prevent="saveStudent"
          >
            <v-text-field
              v-model="name"
              label="Name"
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
              v-model="ra"
              label="Academic Record (RA)"
              required
              outlined
              :rules="[rules.required]"
            />

            <v-text-field
              v-model="cpf"
              label="CPF"
              required
              outlined
              :rules="[rules.required, rules.cpf]"
            />

            <v-row
              class="mt-4"
              justify="space-between"
            >
              <v-btn
                color="grey"
                @click="cancel"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="primary"
                type="submit"
              >
                Salvar
              </v-btn>
            </v-row>
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
  name: "CreateStudents",
  data() {
    return {
      name: "",
      email: "",
      ra: "",
      cpf: "",
      errorMessage: "",
      rules: {
        required: value => !!value || "Campo obrigatório.",
        email: value => /.+@.+\..+/.test(value) || "E-mail inválido.",
        cpf: value => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value) || "CPF inválido. Formato correto: 000.000.000-00"
      }
    };
  },
  methods: {
    saveStudent() {
      const formValid = this.$refs.form.validate();
      if (formValid) {
        alert(`Aluno ${this.name} cadastrado com sucesso!`);
        this.name = "";
        this.email = "";
        this.ra = "";
        this.cpf = "";
      } else {
        this.errorMessage = "Por favor, preencha todos os campos corretamente.";
      }
    },
    cancel() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.v-container {
  padding-top: 40px;
}
</style>
