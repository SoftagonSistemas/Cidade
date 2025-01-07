import type { MaskitoOptions } from '@maskito/core'

export const zipMask: MaskitoOptions = {
  mask: [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/, // Primeiros 5 dígitos do CEP
    '-', // Separador
    /\d/,
    /\d/,
    /\d/, // Últimos 3 dígitos do CEP
  ],
}
