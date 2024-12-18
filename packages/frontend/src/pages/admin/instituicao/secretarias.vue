<script>
export default {
  data() {
    return {
      instituicao: {
        nome: "Prefeitura de Araripina",
      },
      secretarias: [
        { nome: "Secretaria de Saúde", descricao: "Cuida da saúde pública." },
        { nome: "Secretaria de Educação", descricao: "Responsável pelas escolas municipais." },
        { nome: "Secretaria de Infraestrutura", descricao: "Gerencia obras e serviços urbanos." },
      ],
      modalAberto: false,
      secretariaSelecionada: null,
      novaSecretaria: {
        nome: "",
        descricao: "",
        responsavel: "",
        departamento: "",
      },
    };
  },
  methods: {
    abrirModalAdicionar() {
      this.resetarFormulario();
      this.modalAberto = true;
    },
    abrirModalEditar(index) {
      this.secretariaSelecionada = index;
      this.novaSecretaria = { ...this.secretarias[index] };
      this.modalAberto = true;
    },
    salvarSecretaria() {
      if (this.secretariaSelecionada !== null) {
        this.secretarias[this.secretariaSelecionada] = { ...this.novaSecretaria };
      } else {
        this.secretarias.push({ ...this.novaSecretaria });
      }
      this.fecharModal();
    },
    excluirSecretaria(index) {
      if (confirm("Tem certeza que deseja excluir esta secretaria?")) {
        this.secretarias.splice(index, 1);
      }
    },
    fecharModal() {
      this.modalAberto = false;
      this.secretariaSelecionada = null;
    },
    resetarFormulario() {
      this.novaSecretaria = {
        nome: "",
        descricao: "",
        responsavel: "",
        departamento: "",
      };
    },
  },
};
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
        >
          <v-card-title>{{ secretaria.nome }}</v-card-title>
          <v-card-subtitle>{{ secretaria.descricao }}</v-card-subtitle>
          <v-card-actions>
            <v-btn
              color="primary"
              @click="abrirModalEditar(index)"
            >
              Editar
            </v-btn>
            <v-btn
              color="error"
              @click="excluirSecretaria(index)"
              size="x-small"
            >
              Excluir
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-btn
          class="ms-auto"
          color="primary"
          variant="fab"
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
            text
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
</style>
