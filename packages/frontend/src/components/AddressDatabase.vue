<script setup lang="ts">
import type { Address } from '@prisma/client'
import AddressService from '@/services/AddressService'
import { onMounted, ref } from 'vue'

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

// Buscar endereços
async function fetchAddressSuggestions() {
  const results = await addressService.fetchAddresses()
  addressSuggestions.value = results.map((item, index) => ({
    ...item,
    id: item.id || `fetched-${index}-${Date.now()}`, // Gera IDs únicos se ausentes
  }))
}

function formatStreetName(streetName: string): string {
  const exceptions = ['de', 'da', 'do', 'das', 'dos', 'e', 'em'] // Palavras que permanecem minúsculas
  return streetName
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (exceptions.includes(word) && index !== 0) {
        // Mantém minúsculas as palavras de exceção, exceto a primeira palavra
        return word
      }
      // Converte a primeira letra para maiúscula
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

// Lógica de seleção
function handleExistingAddress(existingAddress: Partial<Address>) {
  address.value = {
    ...existingAddress,
    number: '',
    complement: '',
  }
}
// Defina um contador para IDs locais
let uniqueIdCounter = 0

function handleNewAddress(newStreet: string) {
  const formattedStreet = formatStreetName(newStreet)

  const existingAddress = addressSuggestions.value.find(
    item => item.street === formattedStreet,
  )
  if (existingAddress) {
    handleExistingAddress(existingAddress)
  }
  else {
    const newAddress = {
      id: crypto.randomUUID ? crypto.randomUUID() : `new-${uniqueIdCounter++}`, // IDs confiáveis
      street: formattedStreet,
      number: '',
      complement: '',
      city: '',
      state: '',
      postalCode: '',
    }
    addressSuggestions.value.push(newAddress)
    address.value = newAddress
  }
}
function handleAddressSelection(selected: string | Partial<Address>) {
  if (typeof selected === 'string') {
    handleNewAddress(selected)
  }
  else {
    const selectedAddress = addressSuggestions.value.find(item => item.id === selected.id)
    if (selectedAddress) {
      handleExistingAddress(selectedAddress)
    }
  }
}

// Inicialização
onMounted(fetchAddressSuggestions)
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
          item-value="id"
          label="Rua / Travessa / Avenida"
          outlined
          dense
          hide-details
          return-object
          :hide-no-data="false"
          @update:model-value="handleAddressSelection"
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
        <v-text-field
          v-model="address.city"
          label="Cidade"
          outlined
          dense
          hide-details
        />
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="address.state"
          label="Estado"
          outlined
          dense
          hide-details
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="address.postalCode"
          label="CEP"
          outlined
          dense
          hide-details
        />
      </v-col>
    </v-row>
  </v-container>
</template>
