<script setup lang="ts">
import type { Address } from '@prisma/client'
import AddressService from '@/services/AddressService'

defineProps<{
  addressId: string | null
}>()
const emit = defineEmits<{
  (event: 'update:addressId', value: string | null): void
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
    emit('update:addressId', selected.id || null)
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

// Inicialização
onMounted(() => {
  fetchCitySuggestions()
  fetchStateSuggestions()
  fetchPostalCodeSuggestions()
})
</script>

<template>
  <v-container>
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
        />
      </v-col>
    </v-row>
  </v-container>
</template>
