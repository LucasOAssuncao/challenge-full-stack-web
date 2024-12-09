<template>
  <v-container>
    <v-row
      class="mb-4"
      justify="space-between"
      align="center"
    >
      <v-col
        cols="8"
        sm="6"
        md="4"
      >
        <v-text-field
          v-model="search"
          label="Search"
          clearable
          outlined
          dense
        />
      </v-col>

      <v-col
        cols="4"
        class="text-right"
      >
        <v-btn
          block
          color="primary"
          @click="goToCreate"
        >
          Cadastrar Aluno
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-data-table
        :headers="headers"
        :items="filteredStudents"
        item-value="id"
        class="elevation-2"
        dense
      >
        <template #[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editStudent(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteStudent(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
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
  name: "StudentList",
  data() {
    return {
      search: "",
      students: [],
      loading: true,
      headers: [
        { title: "Registro Acadêmico", key: "ra" },
        { title: "Nome", key: "name" },
        { title: "CPF", key: "cpf" },
        { title: "Ações", key: "actions", sortable: false, align: "center" },
      ],
    };
  },
  computed: {
    filteredStudents() {
      return this.students.filter((student) =>
        student.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  mounted() {
    this.fetchStudents();
  },
  methods: {
    async fetchStudents() {
      try {
        const response = await api.get("/student");
        this.students = response.data;
      } catch (error) {
        console.error("Erro ao buscar os estudantes:", error);
        alert("Não foi possível carregar a lista de estudantes.");
      } finally {
        this.loading = false;
      }
    },
    goToCreate() {
      this.$router.push("/dashboard/createoreditstudents");
    },
    editStudent(student) {
      this.$router.push({
        path: "/dashboard/createoreditstudents",
        query: { id: student.id },
      });
},
    async deleteStudent(student) {
      const confirmDelete = confirm(
        `Tem certeza que deseja excluir ${student.name}?`
      );
      if (confirmDelete) {
        try {
          await api.delete(`/student/${student.id}`);
          this.students = this.students.filter((s) => s.id !== student.id);
          alert("Aluno excluído com sucesso!");
        } catch (error) {
          console.error("Erro ao excluir o estudante:", error);
          alert("Não foi possível excluir o estudante.");
        }
      }
    },
  },
};
</script>

<style scoped>
.v-container {
  padding-top: 20px;
}
</style>
