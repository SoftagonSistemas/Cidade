<script setup lang="ts">
import type { DigitalCertificate } from '@prisma/client'
import stampImageUrl from '@/assets/softagon-logo.png'
import BaseService from '@/services/BaseService'
import FileService from '@/services/FileService'
import PdfService from '@/services/PdfService'

interface Props {
  show: boolean
  documentPath: string
  documentName: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:show', 'signed'])

const certificates = ref<DigitalCertificate[]>([])
const selectedCertificate = ref<string>('')
const password = ref('')
const loading = ref(false)
const step = ref(1)
const showPassword = ref(false)
const certificateService = new BaseService<DigitalCertificate>('digital_certificate')
const pdfFile = ref<File | null>(null)
const p12File = ref<File | null>(null)
const progress = ref(0)
const stampFile = ref<File | null>(null)

const fileService = new FileService()

async function loadCertificates() {
  try {
    certificates.value = await certificateService.getAll()
  }
  catch {
    toast.error('Erro ao carregar certificados')
  }
}

async function loadDocument() {
  try {
    const response = await fileService.viewFile(props.documentPath)
    const blob = await response.blob()
    const file = new File([blob], props.documentName, { type: 'application/pdf' })
    pdfFile.value = file
  }
  catch (error) {
    console.error('Erro ao carregar documento:', error)
    toast.error('Erro ao carregar documento')
  }
}

async function loadStampImage() {
  try {
    const response = await fetch(stampImageUrl)
    const blob = await response.blob()
    stampFile.value = new File([blob], 'softagon-logo.png', { type: 'image/png' })
  }
  catch (error) {
    console.error('Erro ao carregar stampImage:', error)
  }
}

async function signDocument() {
  if (!pdfFile.value || !p12File.value || !password.value) {
    toast.error('Preencha todos os campos obrigatórios')
    return
  }

  if (!stampFile.value)
    await loadStampImage()

  loading.value = true
  progress.value = 0

  try {
    const pdfService = new PdfService()

    const response = await pdfService.signPdf(
      pdfFile.value,
      p12File.value,
      password.value,
      { stampImage: stampFile.value! }, // opções do carimbo padrão
      {}, // opções da assinatura padrão
      (progressValue) => {
        progress.value = progressValue
      },
    )

    // Criar URL do blob e fazer download
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = props.documentName.replace('.pdf', '-assinado.pdf')

    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)

    step.value = 2
    toast.success('Documento assinado com sucesso!')
  }
  catch (error) {
    toast.error(`Erro ao assinar documento: ${error.message}`)
  }
  finally {
    loading.value = false
  }
}

async function loadP12File() {
  if (!selectedCertificate.value) {
    return
  }

  const certificate = certificates.value.find(cert => cert.id === selectedCertificate.value)
  if (!certificate) {
    return
  }

  try {
    const response = await fileService.viewFile(certificate.filePath)
    const blob = await response.blob()
    const file = new File([blob], `${certificate.alias}.p12`, { type: 'application/x-pkcs12' })
    p12File.value = file
  }
  catch (error) {
    console.error('Erro ao carregar certificado:', error)
    toast.error('Erro ao carregar certificado')
  }
}

// Adicionar watcher para selectedCertificate
watch(selectedCertificate, async () => {
  await loadP12File()
})

function downloadSignedDocument() {
  // Implementar download
  emit('signed')
  emit('update:show', false)
}

function shareDocument() {
  // Implementar compartilhamento
}

function closeDialog() {
  emit('update:show', false)
  setTimeout(() => {
    step.value = 1
    selectedCertificate.value = ''
    password.value = ''
  }, 300)
}

onMounted(async () => {
  await Promise.all([loadCertificates(), loadDocument()])
})
</script>

<template>
  <v-dialog
    :model-value="show"
    persistent
    width="100%"
    :scrim="true"
    class="sign-dialog"
    @update:model-value="$emit('update:show', $event)"
  >
    <v-card class="sign-card mx-auto" max-width="500">
      <v-toolbar
        :color="step === 1 ? 'primary' : 'success'"
        class="px-4"
        height="64"
      >
        <v-toolbar-title class="text-white text-truncate d-flex align-center">
          <span class="hidden-sm-and-down">{{ step === 1 ? 'Assinar Documento' : 'Documento Assinado' }}</span>
          <span class="hidden-md-and-up">{{ step === 1 ? 'Assinar Documento' : 'Assinado' }}</span>
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          icon="mdi-close"
          variant="text"
          color="white"
          @click="closeDialog"
        />
      </v-toolbar>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text class="pt-6">
            <v-sheet class="mb-6 pa-4 rounded-lg bg-grey-lighten-4">
              <div class="d-flex align-center">
                <v-icon
                  icon="mdi-file-document-outline"
                  size="32"
                  color="primary"
                  class="mr-3"
                />
                <div>
                  <div class="text-h6">
                    {{ documentName }}
                  </div>
                  <div class="text-caption text-grey-darken-1">
                    {{ documentPath }}
                  </div>
                </div>
              </div>
            </v-sheet>

            <v-select
              v-model="selectedCertificate"
              autocomplete="off"
              :items="certificates"
              item-title="alias"
              item-value="id"
              label="Selecione o Certificado Digital"
              variant="outlined"
              class="mb-4"
              :rules="[v => !!v || 'Selecione um certificado']"
            />

            <v-text-field
              v-model="password"
              label="Senha do Certificado"
              variant="outlined"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :rules="[v => !!v || 'Digite a senha']"
              @click:append-inner="showPassword = !showPassword"
              @keyup.enter="signDocument"
            />
          </v-card-text>

          <v-card-actions class="pa-4">
            <v-spacer />
            <v-btn
              color="primary"
              :loading="loading"
              :disabled="!selectedCertificate || !password"
              prepend-icon="mdi-file-sign"
              @click="signDocument"
            >
              Assinar Documento
            </v-btn>
          </v-card-actions>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text class="pt-6 text-center">
            <v-icon
              icon="mdi-check-circle"
              color="success"
              size="64"
              class="mb-4"
            />
            <h2 class="text-h5 mb-4">
              Assinatura concluída!
            </h2>
            <p class="text-body-1 mb-6">
              O documento foi assinado com sucesso. Você pode baixá-lo ou compartilhá-lo agora.
            </p>

            <v-row justify="center" class="mt-4">
              <v-col cols="auto">
                <v-btn
                  color="primary"
                  prepend-icon="mdi-download"
                  @click="downloadSignedDocument"
                >
                  Download
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn
                  color="secondary"
                  prepend-icon="mdi-share-variant"
                  @click="shareDocument"
                >
                  Compartilhar
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-window-item>
      </v-window>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.sign-card {
  border-radius: 16px;
  overflow: hidden;
  width: 95%;
  margin-top: 10vh;
}

.sign-dialog :deep(.v-overlay__content) {
  align-items: flex-start;
  width: 100%;
}

:deep(.v-text-field .v-field__outline__start) {
  border-radius: 8px 0 0 8px;
}

:deep(.v-text-field .v-field__outline__end) {
  border-radius: 0 8px 8px 0;
}
</style>
