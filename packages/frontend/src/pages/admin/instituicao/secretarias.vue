<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function gerenciarDepartamentos() {
  router.push('/admin/instituicao/departamentos');
}

const instituicao = ref({
  nome: "Prefeitura de Araripina",
});

const secretarias = ref([
  { nome: "Secretaria de Saúde", descricao: "UBS", responsavel: "Maria",departamento: "Vigilância" },
  { nome: "Secretaria de Educação", descricao: "Escolas", responsavel: "Joao",departamento: "Educacao" },
  { nome: "Secretaria de Infraestrutura", descricao: "Obras", responsavel: "Gilberto",departamento: "Obras" },
]);

const modalAberto = ref(false);
const secretariaSelecionada = ref<number | null>(null);
const novaSecretaria = ref({
  nome: "",
  descricao: "",
  responsavel: "",
  departamento: "",
});

function abrirModalAdicionar() {
  resetarFormulario();
  modalAberto.value = true;
}

function abrirModalEditar(index: number) {
  secretariaSelecionada.value = index;
  novaSecretaria.value = { ...secretarias.value[index] };
  modalAberto.value = true;
}

function salvarSecretaria() {
  if (secretariaSelecionada.value !== null) {
    secretarias.value[secretariaSelecionada.value] = { ...novaSecretaria.value };
  } else {
    secretarias.value.push({ ...novaSecretaria.value });
  }
  fecharModal();
}

function excluirSecretaria(index: number) {
  if (confirm("Tem certeza que deseja excluir esta secretaria?")) {
    secretarias.value.splice(index, 1);
  }
}

function fecharModal() {
  modalAberto.value = false;
  secretariaSelecionada.value = null;
}

function resetarFormulario() {
  novaSecretaria.value = {
    nome: "",
    descricao: "",
    responsavel: "",
    departamento: "",
  };
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1 class="text-center">{{ instituicao.nome }}</h1>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card
          v-for="(secretaria, index) in secretarias"
          :key="index"
          class="my-4"
          @click="gerenciarDepartamentos"
        >
          <v-card-title>{{ secretaria.nome }}</v-card-title>
          <v-card-subtitle>{{ secretaria.descricao }}</v-card-subtitle>
          <v-card-actions>
            <v-btn
              color="primary"
              @click.stop="abrirModalEditar(index)"
            >
              Editar
            </v-btn>
            <v-btn
              color="error"
              @click.stop="excluirSecretaria(index)"
              size="x-small"
            >
              Excluir
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-btn
          class="ms-auto"
          color="primary"
          @click="abrirModalAdicionar"
        >
          <v-icon>mdi-plus</v-icon>
          Adicionar Secretaria
        </v-btn>
      </v-col>
    </v-row>


    <v-dialog v-model="modalAberto" max-width="600">
      <v-card>
        <v-card-title>
          {{ secretariaSelecionada !== null ? "Editar Secretaria" : "Nova Secretaria" }}
        </v-card-title>
        <v-card-text>
          <v-form ref="formSecretaria">
            <v-text-field
              v-model="novaSecretaria.nome"
              label="Nome"
              outlined
              dense
              required
            />
            <v-textarea
              v-model="novaSecretaria.descricao"
              label="Descrição"
              outlined
              dense
            />
            <v-text-field
              v-model="novaSecretaria.responsavel"
              label="Responsável"
              outlined
              dense
            />
            <v-text-field
              v-model="novaSecretaria.departamento"
              label="Departamento Principal (opcional)"
              outlined
              dense
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            @click="salvarSecretaria"
          >
            Salvar
          </v-btn>
          <v-btn
            @click="fecharModal"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
  .text-center {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
  }

  h1 {
    margin-bottom: 20px;
  }
</style>
