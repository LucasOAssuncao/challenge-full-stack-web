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
          color="primary"
          @click="goToCreate"
        >
          Cadastrar Aluno
        </v-btn>
      </v-col>
    </v-row>

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
  </v-container>
</template>

<script>
export default {
  name: "StudentList",
  data() {
    return {
      search: "",
      students: [
        { id: "RA001", name: "João Silva", cpf: "123.456.789-00" },
        { id: "RA002", name: "Maria Oliveira", cpf: "987.654.321-00" },
        { id: "RA003", name: "João Silva", cpf: "123.456.789-00" },
        { id: "RA004", name: "Maria Oliveira", cpf: "987.654.321-00" },
        { id: "RA005", name: "João Silva", cpf: "123.456.789-00" },
        { id: "RA006", name: "Maria Oliveira", cpf: "987.654.321-00" },
        { id: "RA007", name: "João Silva", cpf: "123.456.789-00" },
        { id: "RA008", name: "Maria Oliveira", cpf: "987.654.321-00" },
        { id: "RA009", name: "João Silva", cpf: "123.456.789-00" },
        { id: "RA010", name: "Maria Oliveira", cpf: "987.654.321-00" },
      ],
      headers: [
        { title: "Registro Acadêmico", key: "id" },
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
  methods: {
    goToCreate() {
      this.$router.push("/dashboard/createstudents");
    },
    editStudent(student) {
      alert(`Editar aluno: ${student.name}`);
    },
    deleteStudent(student) {
      const confirmDelete = confirm(
        `Tem certeza que deseja excluir ${student.name}?`
      );
      if (confirmDelete) {
        this.students = this.students.filter((s) => s.id !== student.id);
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
