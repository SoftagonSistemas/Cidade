import type { BunFile } from 'bun'
import { mkdir, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const pdfDirectory = join(__dirname, '../../../private/pdfs')

export class FileService {
  static async initializeDirectory(): Promise<void> {
    try {
      await readdir(pdfDirectory)
    }
    catch (error) {
      if (error.code === 'ENOENT') {
        console.error('PDF directory does not exist:', error)
      }
      else {
        throw error
      }
    }
  }

  static async listPdfFiles(): Promise<string[]> {
    try {
      await this.initializeDirectory() // Garante que o diretório exista
      const files = await readdir(pdfDirectory)
      return files.filter(file => file.endsWith('.pdf'))
    }
    catch (error) {
      console.error('Error listing PDF files:', error)
      throw error
    }
  }

  static async getPdfFile(fileName: string): Promise<BunFile> {
    try {
      const filePath = join(pdfDirectory, fileName)
      const file = Bun.file(filePath)
      if (await file.exists()) {
        return file
      }
      else {
        throw new Error('File not found')
      }
    }
    catch (error) {
      console.error('Error retrieving PDF file:', error)
      throw error
    }
  }
}
