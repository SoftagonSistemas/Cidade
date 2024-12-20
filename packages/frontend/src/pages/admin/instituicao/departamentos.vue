<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function voltarParaSecretarias() {
  router.push('/admin/instituicao/secretarias');
}


const secretariaNome = ref("Nome da Secretaria");
const departamentos = ref([
  { id: 1, nome: "Departamento A", descricao: "AAAAAA", responsavel: "João", pai: null },
  { id: 2, nome: "Departamento B", descricao: "BBBBB", responsavel: "Maria", pai: null },
]);

const modalAberto = ref(false);
const modalModo = ref("criar"); // ou "editar"
const departamentoAtual = ref({
  id: 0,
  nome: "",
  descricao: "",
  responsavel: "",
  pai: null,
});

function abrirModalCriar() {
  modalModo.value = "criar";
  departamentoAtual.value = { id: 0, nome: "", descricao: "", responsavel: "", pai: null };
  modalAberto.value = true;
}

function abrirModalEditar(departamento: { id: number, nome: string, descricao: string, responsavel: string, pai: any }) {
  modalModo.value = "editar";
  departamentoAtual.value = { ...departamento };
  modalAberto.value = true;
}

function salvarDepartamento() {
  if (modalModo.value === "criar") {
    const novoDepartamento = { ...departamentoAtual.value, id: Date.now() };
    departamentos.value.push(novoDepartamento);
  } else if (modalModo.value === "editar") {
    const index = departamentos.value.findIndex(dep => dep.id === departamentoAtual.value.id);
    departamentos.value[index] = departamentoAtual.value;
  }
  modalAberto.value = false;
}

function confirmarExclusao(departamento: { id: number, nome: string }) {
  if (confirm(`Tem certeza de que deseja excluir o departamento "${departamento.nome}"?`)) {
    departamentos.value = departamentos.value.filter(dep => dep.id !== departamento.id);
  }
}
</script>

<template>
  <v-container>

    <v-row class="mb-4" align="center">
      <v-col class="d-flex align-center">
        <v-icon class="mr-2" @click="voltarParaSecretarias" >mdi-arrow-left</v-icon>
        <h1>{{ secretariaNome }}</h1>
      </v-col>
    </v-row>


    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="departamento in departamentos" :key="departamento.id">
        <v-card>
          <v-card-title>
            <span>{{ departamento.nome }}</span>
          </v-card-title>
          <v-card-subtitle>{{ departamento.descricao }}</v-card-subtitle>
          <v-card-actions>
            <v-btn color="primary" @click="abrirModalEditar(departamento)">Editar</v-btn>
            <v-btn color="error" size="x-small" @click="confirmarExclusao(departamento)">Excluir</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-btn
      fab
      color="primary"
      class="my-4 fab"
      size="small"
      @click="abrirModalCriar"
    >
      <v-icon>mdi-plus</v-icon>
      Adicionar Departamento
    </v-btn>

    <v-dialog v-model="modalAberto" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span>{{ modalModo === 'criar' ? 'Adicionar Departamento' : 'Editar Departamento' }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              label="Nome"
              v-model="departamentoAtual.nome"
              required
            />
            <v-text-field
              label="Descrição"
              v-model="departamentoAtual.descricao"
              required
            />
            <v-text-field
              label="Responsável"
              v-model="departamentoAtual.responsavel"
            />
            <v-select
              label="Departamento Pai"
              :items="departamentos"
              item-text="nome"
              item-value="id"
              v-model="departamentoAtual.pai"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="salvarDepartamento">Salvar</v-btn>
          <v-btn @click="modalAberto = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style>
  h1 {
    margin-bottom: 20px;
  }
</style>
