// plugins/vuetify.ts

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import type { ThemeDefinition } from 'vuetify'
import { createVuetify } from 'vuetify'

const softagon: ThemeDefinition = {
  dark: false, // Define como tema claro
  colors: {
    'background': '#bbdefb', // Cor de fundo claro
    'surface': '#FFFFFF', // Fundo para áreas com cards
    'primary': '#2196f3', // Cor primária para destaque
    'primary-darken-1': '#1976d2', // Cor primária escura
    'primary-lighten-1': '#bbdefb', // Cor primária clara
    'secondary': '#212121', // Texto principal
    'secondary-darken-1': '#757575', // Texto secundário
    'accent': '#ff5722', // Cor de destaque
    'error': '#B00020', // Cor de erro
    'info': '#2196F3', // Cor de informação
    'success': '#4CAF50', // Cor de sucesso
    'warning': '#FB8C00', // Cor de alerta

    // Específicos de cards
    'on-surface': '#757575', // Texto em cards (secundário)
    'on-primary': '#FFFFFF', // Texto em botões e ícones
    'surface-bright': '#212121', // Headline em cards
    'divider': '#BDBDBD', // Cor para divisores e bordas
  },
  variables: {
    'border-color': '#212121',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.60,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212121',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#212121',
  },
}

// Criação do Vuetify com o tema registrado
export default createVuetify({
  theme: {
    defaultTheme: 'softagon',
    themes: {
      softagon, // Adiciona o tema personalizado
    },
  },
})
