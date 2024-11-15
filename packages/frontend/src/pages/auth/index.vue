<script setup lang="ts">
const email = ref('')
const password = ref('')
const rememberMe = ref(false)

function login() {
  // Implement login logic here
  console.log('Logging in with', email.value, password.value, rememberMe.value)
}

function forgotPassword() {
  // Implement forgot password logic here
  console.log('Forgot password')
}
</script>

<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center">
    <v-card class="pa-4">
      <v-card-title class="text-h5">
        Login
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            required
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
          />
          <v-checkbox
            v-model="rememberMe"
            label="Remember me"
          />
          <v-btn
            class="mt-4"
            color="primary"
            :disabled="!email || !password"
            @click="login"
          >
            Login
          </v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="forgotPassword">
          Forgot Password?
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
.fill-height {
    height: 100vh;
}
</style>
