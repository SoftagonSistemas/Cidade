<script setup lang="ts">
import type { Address } from '@prisma/client'
import AddressService from '@/services/AddressService'

const props = defineProps<{
  id: string | null
}>()
const emit = defineEmits<{
  (event: 'update:id', value: string | null): void
}>()

// Instância do serviço
const addressService = new AddressService()
// Estado
const address = ref<Partial<Address>>({
  street: '',
  number: '',
  complement: '',
  city: '',
  state: '',
  postalCode: '',
})
const addressSuggestions = ref<Partial<Address>[]>([])
const citySuggestions = ref<string[]>([])
const stateSuggestions = ref<string[]>([])
const postalCodeSuggestions = ref<string[]>([])

// Implementação de debounce
function debounce(func: (...args: any[]) => void, delay: number) {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

// Buscar sugestões de endereço conforme o usuário digita
async function fetchAddressSuggestions(keyword: string) {
  if (!keyword.trim()) {
    addressSuggestions.value = []
    return
  }

  try {
    const results = await addressService.searchStreets(keyword)
    addressSuggestions.value = results // Atualiza com os objetos completos
  }
  catch (error) {
    console.error('Erro ao buscar sugestões de endereço:', error)
    addressSuggestions.value = []
  }
}

// Buscar cidades únicas
async function fetchCitySuggestions() {
  try {
    citySuggestions.value = await addressService.getUniqueCities()
  }
  catch (error) {
    console.error('Erro ao buscar cidades:', error)
  }
}

// Buscar estados únicos
async function fetchStateSuggestions() {
  try {
    stateSuggestions.value = await addressService.getUniqueStates()
  }
  catch (error) {
    console.error('Erro ao buscar estados:', error)
  }
}

// Buscar códigos postais únicos
async function fetchPostalCodeSuggestions() {
  try {
    postalCodeSuggestions.value = await addressService.getUniquePostalCodes()
  }
  catch (error) {
    console.error('Erro ao buscar códigos postais:', error)
  }
}
async function addAddress() {
  // Se não houver sugestões, cria um novo endereço
  if (addressSuggestions.value.length === 0) {
    try {
      const addressInserted = address.value as Address
      const newAddress = await addressService.create(addressInserted) as Address
      emit('update:id', newAddress.id)
    }
    catch (error) {
      console.error('Erro ao adicionar endereço:', error)
    }
  }
}
// Lida com seleção ou criação de um novo endereço
function handleAddressSelection(selected: string | Partial<Address>) {
  if (typeof selected === 'string') {
    const formattedStreet = formatStreetName(selected)
    address.value = {
      street: formattedStreet,
      number: '', // Deixa número vazio
      complement: '', // Deixa complemento vazio
      city: '',
      state: '',
      postalCode: '',
    }
  }
  else {
    // Preenche os campos, exceto número e complemento
    if (selected.id)
      emit('update:id', selected.id)
    address.value = {
      street: selected.street,
      city: selected.city,
      state: selected.state,
      postalCode: selected.postalCode,
      number: '', // Deixa número vazio
      complement: '', // Deixa complemento vazio
    }
  }
}

// Debounce para busca
const debouncedFetchSuggestions = debounce(fetchAddressSuggestions, 300)

// Formatar o nome da rua
function formatStreetName(streetName: string): string {
  const exceptions = ['de', 'da', 'do', 'das', 'dos', 'e', 'em']
  return streetName
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (exceptions.includes(word) && index !== 0) {
        return word
      }
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

async function fetchAddressDetails() {
  const addressId = props.id as string
  try {
    const addressDetails = await addressService.getById(addressId)
    if (addressDetails) {
      address.value = {
        street: addressDetails.street || '',
        number: addressDetails.number || '',
        complement: addressDetails.complement || '',
        city: addressDetails.city || '',
        state: addressDetails.state || '',
        postalCode: addressDetails.postalCode || '',
      }
    }
  }
  catch (error) {
    console.error('Erro ao buscar detalhes do endereço:', error)
  }
}
watch(
  () => props.id,
  (newId, oldId) => {
    if (newId && newId !== oldId) {
      fetchAddressDetails()
    }
  },
  { immediate: true }, // Isso garante que `fetchAddressDetails` seja chamado ao montar, se `id` já estiver definido
)

// Inicialização
onMounted(() => {
  fetchCitySuggestions()
  fetchStateSuggestions()
  fetchPostalCodeSuggestions()
  fetchAddressDetails()
})
</script>

<template>
  <h4>Endereço</h4>
  <v-row>
    <v-col cols="12">
      <v-combobox
        v-model="address.street"
        :items="addressSuggestions"
        item-title="street"
        item-value="street"
        label="Rua / Travessa / Avenida"
        outlined
        dense
        hide-details
        return-object
        :hide-no-data="true"
        @update:model-value="handleAddressSelection"
        @update:search="debouncedFetchSuggestions"
      />
    </v-col>
  </v-row>
  <!-- Outros campos de endereço -->
  <v-row>
    <v-col cols="6">
      <v-text-field
        v-model="address.number"
        label="Número"
        outlined
        dense
        hide-details
      />
    </v-col>
    <v-col cols="6">
      <v-text-field
        v-model="address.complement"
        label="Complemento"
        outlined
        dense
        hide-details
      />
    </v-col>
    <v-col cols="8">
      <v-combobox
        v-model="address.city"
        :items="citySuggestions"
        label="Cidade"
        outlined
        dense
        hide-details
        :hide-no-data="false"
        :return-object="false"
      />
    </v-col>
    <v-col cols="4">
      <v-combobox
        v-model="address.state"
        :items="stateSuggestions"
        label="Estado"
        outlined
        dense
        hide-details
        :hide-no-data="false"
        :return-object="false"
      />
    </v-col>
    <v-col cols="12">
      <v-combobox
        v-model="address.postalCode"
        :items="postalCodeSuggestions"
        label="CEP"
        outlined
        dense
        hide-details
        :hide-no-data="false"
        :return-object="false"
        @update:model-value="addAddress"
      />
    </v-col>
  </v-row>
</template>
