<script setup lang="ts">
import type { Department, User } from '@prisma/client'
import BaseService from '@/services/BaseService'
import InstitutionService from '@/services/InstitutionService'
import { useAuthStore } from '@/stores/AuthStore'
import { ref } from 'vue'

// Criação de um tipo customizado para o relacionamento
type DepartmentForm = Department & {
  contactInfos: { type: string, value: string }[] // Representação de contatos
}

const institutionService = new InstitutionService()
const institutionId = ref('')

// Dados do formulário com o tipo estendido
const form = ref<Partial<DepartmentForm>>({
  name: '',
  description: '',
  isSecretariat: false,
  parentDepartmentId: null,
  headId: null,
  institutionId: institutionId.value || '',
  addressId: null,
  tenantId: useAuthStore().user?.id || '',
  contactInfos: [{ type: 'Whatsapp', value: '' }],
})

// Contato inicial
function newContact() {
  return {
    type: '', // Tipo de contato
    value: '', // Valor do contato
  }
}

// Dados auxiliares
const parentDepartments = ref([])
const users = ref<User[]>([])

const isSaving = ref(false)

function addContact() {
  if (!form.value.contactInfos) {
    form.value.contactInfos = []
  }
  form.value.contactInfos.push(newContact())
}

function removeContact(index: number) {
  if (form.value.contactInfos) {
    form.value.contactInfos.splice(index, 1)
  }
}

// Função para validar o formulário
function validateForm() {
  if (!form.value.name) {
    toast.error('O nome do departamento é obrigatório.')
    return false
  }
  if (!form.value.addressId) {
    toast.error('O endereço é obrigatório.')
    return false
  }
  return true
}

// Função para salvar o departamento/secretaria
async function saveDepartment() {
  if (!validateForm())
    return

  isSaving.value = true
  const departmentService = new BaseService('department')
  const contactInfoService = new BaseService('contact_info')

  try {
    // Insere o departamento
    const createdDepartment = await departmentService.create({
      ...form.value,
      institutionId: institutionId.value,
      contactInfos: undefined, // Remova os contatos da inserção inicial
    })

    if (createdDepartment && form.value.contactInfos) {
      // Insere os contatos relacionados
      const contactInfos = form.value.contactInfos.map(contact => ({
        ...contact,
        departmentId: createdDepartment.id, // Associa ao departamento recém-criado
      }))
      await Promise.all(contactInfos.map(contact => contactInfoService.create(contact)))
    }

    toast.success('Departamento/Secretaria criado com sucesso!')
    resetForm()
  }
  catch (error) {
    toast.error('Erro ao salvar o departamento/secretaria.')
    console.error('Erro ao salvar departamento:', error)
  }
  finally {
    isSaving.value = false
  }
}

// Função para resetar o formulário
function resetForm() {
  form.value = {
    name: '',
    description: '',
    isSecretariat: false,
    parentDepartmentId: null,
    headId: null,
    addressId: null,
    contactInfos: [],
  }
}
async function getLocalUsers() {
  const userService = new BaseService('user')
  try {
    const usersResponse = await userService.getAll()
    users.value = usersResponse
  }
  catch (error) {
    console.error('Erro ao buscar usuários:', error)
  }
}
async function getLocalDepartments() {
  const departmentService = new BaseService('department')
  try {
    const departmentsResponse = await departmentService.getAll()
    parentDepartments.value = departmentsResponse as Department[]
  }
  catch (error) {
    console.error('Erro ao buscar departamentos:', error)
  }
}

async function getInstitutionId() {
  institutionId.value = await institutionService.getInstitutionId() as string
  console.log('Institution ID:', institutionId.value)
}
onMounted(async () => {
  getInstitutionId()
  getLocalUsers()
  getLocalDepartments()
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">
          Cadastro de Departamento ou Secretaria
        </h1>
      </v-col>
    </v-row>

    <v-form>
      <!-- Tipo e Departamento Pai -->
      <v-row>
        <v-col cols="12">
          <span class="text-caption">Secretaria ou um Departamento?</span>
          <v-switch
            v-model="form.isSecretariat"
            class="mb-n10 mx-auto"
            :label="form.isSecretariat ? 'Secretaria' : 'Departamento'"
            color="primary"
          />
        </v-col>
        <v-col v-if="!form.isSecretariat" cols="12">
          <v-select
            v-model="form.parentDepartmentId"
            label="Secretaria responsável"
            :items="parentDepartments"
            item-title="name"
            item-value="id"
            :return-object="false"
            hint="Departamento de qual secretaria?"
            outlined
            dense
            clearable
          />
        </v-col>
      </v-row>
      <!-- Nome -->
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="form.name"
            label="Nome"
            required
            outlined
            dense
          />
        </v-col>
      </v-row>

      <!-- Descrição -->
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="form.description"
            label="Descrição"
            outlined
            dense
          />
        </v-col>
      </v-row>

      <!-- Endereço -->
      <v-row>
        <v-col cols="12">
          <AddressDatabase
            v-model:address-id="form.addressId"
          />
        </v-col>
      </v-row>

      <!-- Contatos -->
      <v-row class="mt-14">
        <v-col cols="6">
          <h3>Contatos</h3>
          <span class="text-caption">
            Adicione os contatos da {{ form.isSecretariat ? 'secretaria' : 'departamento' }}
          </span>
        </v-col>
        <v-col cols="6" class="d-flex justify-end">
          <v-btn size="small" prepend-icon="mdi-plus" color="primary" @click="addContact">
            Contato
          </v-btn>
        </v-col>
        <v-col v-for="(contact, index) in form.contactInfos" :key="index" cols="12" class="mt-2">
          <v-row>
            <v-col cols="4">
              <v-combobox
                v-model="contact.type"
                :items="['Telefone', 'E-mail', 'Instagram']"
                label="Tipo de Contato"
                dense
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="contact.value"
                label="Contato"
                dense
              />
            </v-col>
            <v-col cols="2" class="d-flex justify-end">
              <v-btn icon="mdi-minus-thick" size="x-small" color="red" @click="removeContact(index)" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Chefe do Departamento -->
      <v-row>
        <v-col cols="12">
          <v-select
            v-model="form.headId"
            :label="form.isSecretariat ? 'Secretário(a) Municipal' : 'Responsável do Departamento'"
            :items="users"
            item-title="name"
            item-value="id"
            outlined
            dense
            clearable
          />
        </v-col>
      </v-row>
      <!-- Botões de Ação -->
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn color="secondary" @click="resetForm">
            Cancelar
          </v-btn>
          <v-btn :loading="isSaving" color="primary" @click="saveDepartment">
            Salvar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
