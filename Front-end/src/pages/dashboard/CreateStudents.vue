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
              />
            </template>

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
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'CreateStudents',
  setup() {
    const student = reactive({
      name: '',
      email: '',
      ra: '',
      cpf: '',
    });

    const errorMessage = ref('');

    const router = useRouter();

    const rules = {
      required: (value) => !!value || 'Campo obrigatório.',
      email: (value) => /.+@.+\..+/.test(value) || 'E-mail inválido.',
      cpf: (value) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value) || 'CPF inválido. Formato correto: 000.000.000-00',
    };

    const fields = [
      { model: 'name', label: 'Name', rules: [rules.required] },
      {
        model: 'email', label: 'E-mail', type: 'email', rules: [rules.required, rules.email],
      },
      { model: 'ra', label: 'Academic Record (RA)', rules: [rules.required] },
      { model: 'cpf', label: 'CPF', rules: [rules.required, rules.cpf] },
    ];

    const form = ref(null);

    const saveStudent = () => {
      const formValid = form.value.validate();
      if (formValid) {
        alert(`Aluno ${student.name} cadastrado com sucesso!`);
        student.name = '';
        student.email = '';
        student.ra = '';
        student.cpf = '';
      } else {
        errorMessage.value = 'Por favor, preencha todos os campos corretamente.';
      }
    };

    const cancel = () => {
      router.push('/');
    };

    return {
      student,
      errorMessage,
      rules,
      fields,
      form,
      saveStudent,
      cancel,
    };
  },
});
</script>

<style scoped>
.v-container {
  padding-top: 40px;
}
</style>
