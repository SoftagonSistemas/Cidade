<script>
export default {
  data() {
    return {
      secretariaNome: "Nome da Secretaria",
      departamentos: [
        { id: 1, nome: "Departamento A", descricao: "Descrição A", responsavel: "João", pai: null },
        { id: 2, nome: "Departamento B", descricao: "Descrição B", responsavel: "Maria", pai: null },
      ],
      modalAberto: false,
      modalModo: "criar", // ou "editar"
      departamentoAtual: {
        id: null,
        nome: "",
        descricao: "",
        responsavel: "",
        pai: null,
      },
    };
  },
  methods: {
    abrirModalCriar() {
      this.modalModo = "criar";
      this.departamentoAtual = { id: null, nome: "", descricao: "", responsavel: "", pai: null };
      this.modalAberto = true;
    },
    abrirModalEditar(departamento) {
      this.modalModo = "editar";
      this.departamentoAtual = { ...departamento };
      this.modalAberto = true;
    },
    salvarDepartamento() {
      if (this.modalModo === "criar") {
        const novoDepartamento = { ...this.departamentoAtual, id: Date.now() };
        this.departamentos.push(novoDepartamento);
      } else if (this.modalModo === "editar") {
        const index = this.departamentos.findIndex(dep => dep.id === this.departamentoAtual.id);
        this.$set(this.departamentos, index, this.departamentoAtual);
      }
      this.modalAberto = false;
    },
    confirmarExclusao(departamento) {
      if (confirm(`Tem certeza de que deseja excluir o departamento "${departamento.nome}"?`)) {
        this.departamentos = this.departamentos.filter(dep => dep.id !== departamento.id);
      }
    },
  },
};
</script>

<template>
  <v-container>

    <v-row class="mb-4">
      <v-col>
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
            <v-btn color="error" @click="confirmarExclusao(departamento)">Excluir</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-btn
      fab
      color="primary"
      class="fab"
      @click="abrirModalCriar"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <!-- Modal para criar ou editar departamento -->
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
          <v-btn text @click="modalAberto = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style>
.fab {
  position: fixed;
  bottom: 16px;
  right: 16px;
}
</style>
