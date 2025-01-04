<script setup lang="ts">
import { AuthService } from '@/services/AuthService'
import { useRouter } from 'vue-router'
// State
const email = ref('')
const password = ref('') // z)Ii1z=M
const showPassword = ref(false)
const router = useRouter()
const authService = new AuthService()

// Login Function
async function login() {
  try {
    const user = await authService.login(email.value, password.value)
    if (user) {
      toast.success('Acesso concedido com sucesso!')
      setTimeout(() => {
        router.push('/auth/organization')
      }, 1000)
    }
    else {
      throw new Error('Token inválido ou expirado')
    }
  }
  catch (error: any) {
    toast.error(`Falha no login: ${error.message}`)
    console.error('Login failed:', error)
  }
}
</script>

<template>
  <v-app>
    <v-container class="fill-height d-flex justify-center align-center" dark>
      <v-card class="login-card" elevation="10">
        <v-card-text class="text-center">
          <v-img
            :width="99"
            aspect-ratio="1/1"
            cover
            src="@/assets/softagon.svg"
            class="mx-auto"
          />

          <!-- Login Heading -->
          <h2 class="text-h5 font-weight-bold">
            Cidade Transparente
          </h2>
        </v-card-text>

        <v-card-text>
          <!-- Email -->
          <v-text-field
            v-model="email"
            label="E-mail"
            hide-details
          />

          <!-- Password -->
          <v-text-field
            v-model="password"
            label="Senha"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            hide-details
            @click:append-inner="showPassword = !showPassword"
          />
          <v-row>
            <!-- Forgot Password -->
            <v-col cols="6" class="text-right mt-5">
              <v-btn variant="plain" color="primary" class="pa-0">
                Esqueceu senha
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="justify-center">
          <!-- Log In Button -->
          <v-btn variant="tonal" block color="primary" @click="login">
            Acessar
          </v-btn>
        </v-card-actions>

        <v-card-text class="text-center mt-4">
          <span>Sem acesso? </span>
          <v-btn variant="plain" class="pa-0">
            Criar agora
          </v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<style scoped>
.login-card {
  width: 400px;
  padding: 32px;
}
</style>
