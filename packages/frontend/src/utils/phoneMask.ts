import type { MaskitoOptions } from '@maskito/core'

export const phoneMaskOptions: MaskitoOptions = {
  mask: [
    /\d/,
    /\d/, // Código de área
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/, // Prefixo
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/, // Sufixo
  ],
}
