<script>
export default {
  data() {
    return {
      editandoInstituicao: false,
      instituicao: {
        nome: "",
        endereco: "",
        responsavel: "",
        telefone: "",
      },
      secretarias: [
        { nome: "Secretaria de Esporte" },
        { nome: "Secretaria de Educação" },
        { nome: "Secretaria de Saúde" },
      ],
    };
  },
  methods: {
    toggleEdicaoInstituicao() {
      if (this.editandoInstituicao) {
        console.log("Dados da instituição salvos:", this.instituicao);
      }
      this.editandoInstituicao = !this.editandoInstituicao;
    },
    adicionarSecretaria() {
      const novaSecretaria = prompt("Digite o nome da nova secretaria:");
      if (novaSecretaria) {
        this.secretarias.push({ nome: novaSecretaria });
      }
    },
    editarSecretaria(index) {
      const nomeAtual = this.secretarias[index].nome;
      const novoNome = prompt("Edite o nome da secretaria:", nomeAtual);
      if (novoNome) {
        this.secretarias[index].nome = novoNome;
      }
    },
  },
};
</script>

<template>
  <v-container>
    <h1>Instituição</h1>

    <v-card class="my-4">
      <v-card-title>
        <v-text-field
          v-model="instituicao.nome"
          label="Nome da Prefeitura"
          outlined
          dense
          :readonly="!editandoInstituicao"
        />
      </v-card-title>
      <v-card-subtitle>
        <v-text-field
          v-model="instituicao.endereco"
          label="Endereço"
          outlined
          dense
          :readonly="!editandoInstituicao"
        />
      </v-card-subtitle>
      <v-card-subtitle>
        <v-text-field
          v-model="instituicao.responsavel"
          label="Responsável"
          outlined
          dense
          :readonly="!editandoInstituicao"
        />
      </v-card-subtitle>
      <v-card-subtitle>
        <v-text-field
          v-model="instituicao.telefone"
          label="Telefone"
          outlined
          dense
          :readonly="!editandoInstituicao"
        />
      </v-card-subtitle>

      <v-card-actions>
        <v-btn
          class="bg-primary ms-auto"
          @click="toggleEdicaoInstituicao"
        >
          {{ editandoInstituicao ? "Salvar" : "Editar" }}
        </v-btn>
      </v-card-actions>

      <v-card-text>
        <v-list>
          <v-list-subheader>Secretarias Subordinadas</v-list-subheader>
          <v-list-item
            v-for="(secretaria, index) in secretarias"
            :key="index"
            @click="editarSecretaria(index)"
          >
            <v-list-item-title>{{ secretaria.nome }}</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-btn
        class="ms-auto"
        color="primary"
        variant="fab"
          @click="adicionarSecretaria"
        >
          <v-icon>mdi-plus</v-icon>
          Adicionar Secretaria
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
  h1 {
    margin-bottom: 20px;
  }
</style>
