<script setup lang="ts">
  import { ref } from 'vue';

// Dados da instituição
const instituicao = ref({
  nome: "Prefeitura Municipal",
  descricao: "Organização central da cidade.",
  secretarias: [
    {
      id: 1,
      nome: "Secretaria de Saúde",
      descricao: "Gestão da saúde pública.",
      departamentos: [
        { id: 11, nome: "Departamento de Vigilância", descricao: "Cuidados preventivos." },
        { id: 12, nome: "Departamento de Atendimento", descricao: "Atendimento ao cidadão." },
      ],
    },
    {
      id: 2,
      nome: "Secretaria de Educação",
      descricao: "Gestão da educação municipal.",
      departamentos: [
        { id: 21, nome: "Departamento de Ensino", descricao: "Supervisão das escolas." },
        { id: 22, nome: "Departamento de Transporte Escolar", descricao: "Transporte para estudantes." },
      ],
    },
  ],
});

// Função para abrir os detalhes
function abrirDetalhes(tipo: string, item: any) {
  alert(`Abrir detalhes de ${tipo}: ${item.nome}`);
  // Implemente a navegação ou abertura de modal para edição aqui
}
</script>

<template>
  <v-container>
    <!-- Instituição -->
    <v-row justify="center" class="mb-4">
      <v-col cols="12" md="6">
        <v-card
          class="pa-4 text-center"
          color="primary"
          dark
          @click="abrirDetalhes('instituicao', instituicao)"
        >
          <v-card-title class="text-h4">{{ instituicao.nome }}</v-card-title>
          <v-card-subtitle>{{ instituicao.descricao }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Secretarias -->
    <v-row class="mb-4">
      <v-col
        cols="12"
        md="4"
        v-for="secretaria in instituicao.secretarias"
        :key="secretaria.id"
      >
        <v-card
          class="pa-3 text-center"
          color="secondary"
          dark
          @click="abrirDetalhes('secretaria', secretaria)"
        >
          <v-card-title class="text-h5">{{ secretaria.nome }}</v-card-title>
          <v-card-subtitle>{{ secretaria.descricao }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Departamentos -->
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
        v-for="secretaria in instituicao.secretarias"
        :key="'departamento-' + secretaria.id"
      >
        <v-row v-for="departamento in secretaria.departamentos" :key="departamento.id">
          <v-col>
            <v-card
              class="pa-2 text-center card-departamento"
              outlined
              @click="abrirDetalhes('departamento', departamento)"
            >
              <v-card-title class="text-h6">{{ departamento.nome }}</v-card-title>
              <v-card-subtitle>{{ departamento.descricao }}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
  .card-departamento {
    margin-bottom: 16px;
  }

  h1 {
    margin-bottom: 20px;
  }
</style>

