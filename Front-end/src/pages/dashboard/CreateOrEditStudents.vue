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
            v-model="isFormValid"
            @submit.prevent="saveStudent"
          >
            <template
              v-for="field in fields"
              :key="field.model"
            >
              <v-text-field
                v-model="student[field.model]"
                :label="field.label"
                :type="field.type"
                required
                outlined
                :rules="field.rules"
                :disabled="field.disabled"
              />
            </template>

            <v-row
              class="mt-4"
              justify="space-between"
            >
              <v-btn
                color="#333"
                @click="cancel"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="primary"
                type="submit"
                :loading="isLoading"
                :disabled="isLoading || !isFormValid"
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
import api from "@/utils/api";

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  name: "CreateOrEditStudents",
  data() {
    return {
      student: {
        name: "",
        email: "",
        ra: "",
        cpf: "",
      },
      isEditMode: false,
      errorMessage: "",
      isLoading: false,
      fields: [
        {
          model: "name",
          label: "Nome",
          rules: [(value) => !!value || "Campo obrigatório."],
          disabled: false,
        },
        {
          model: "email",
          label: "E-mail",
          type: "email",
          rules: [
            (value) => !!value || "Campo obrigatório.",
            (value) => /.+@.+\..+/.test(value) || "E-mail inválido.",
          ],
          disabled: false,
        },
        {
          model: "ra",
          label: "Registro Acadêmico (RA)",
          rules: [(value) => !!value || "Campo obrigatório."],
          disabled: true,
        },
        {
          model: "cpf",
          label: "CPF",
          rules: [
            (value) => !!value || "Campo obrigatório.",
            (value) =>
              /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value) ||
              "CPF inválido. Formato correto: 000.000.000-00",
          ],
          disabled: true,
        },
      ],
      form: null,
      isFormValid: false,
    };
  },
  mounted() {
    const studentId = this.$route.query.id;
    if (studentId) {
      this.fetchStudent(studentId);
    } else {
      this.fields = this.fields.map((field) =>
        ["ra", "cpf"].includes(field.model)
          ? { ...field, disabled: false }
          : field
      );
    }
  },
  methods: {
    async fetchStudent(id) {
      try {
        const response = await api.get(`/student/${id}`);
        const studentData = response.data[0];

        this.student.name = studentData.name;
        this.student.email = studentData.email;
        this.student.ra = studentData.ra;
        this.student.cpf = studentData.cpf;

        this.isEditMode = true;

        this.fields = this.fields.map((field) => {
          if (field.model === "ra" || field.model === "cpf") {
            return {
              ...field,
              value: this.student[field.model],
              disabled: true,
            };
          } else {
            return {
              ...field,
              value: this.student[field.model],
              disabled: false,
            };
          }
        });
      } catch (error) {
        console.log(error);
        this.errorMessage = "Não foi possível carregar os dados do estudante.";
      }
    },

    async saveStudent() {
      const formValid = this.$refs.form.validate();
      if (formValid) {
        this.isLoading = true;
        try {
          if (this.isEditMode) {
            await api.put(`/student/${this.$route.query.id}`, {
              name: this.student.name,
              email: this.student.email,
            });
            alert("Estudante atualizado com sucesso!");
          } else {
            await api.post("/student", this.student);
            alert("Estudante cadastrado com sucesso!");
          }
          this.$router.push("/dashboard");
        } catch (error) {
          this.errorMessage =
            error.response?.data?.message || "Erro ao cadastrar o estudante";
        } finally {
          this.isLoading = false;
        }
      } else {
        this.errorMessage = "Por favor, preencha todos os campos corretamente.";
      }
    },

    cancel() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style scoped>
.v-container {
  padding-top: 40px;
}
</style>
