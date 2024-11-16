<script setup lang="ts">
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import ImageTool from '@editorjs/image'
import List from '@editorjs/list'
import Table from '@editorjs/table'
import { onBeforeUnmount, onMounted, ref } from 'vue'
// @ts-expect-error no types available
import LinkTool from '@editorjs/link'
// @ts-expect-error no types available
import Paragraph from '@editorjs/paragraph'
// @ts-expect-error no types available
import TextVariantTune from '@editorjs/text-variant-tune'
// @ts-expect-error no types available
import DragDrop from 'editorjs-drag-drop'
// @ts-expect-error no types available
import Undo from 'editorjs-undo'

const editorContainer = ref(null)
const editor = ref<EditorJS | null>(null)
const documentName = ref('')
const loading = ref(false)

function debounce(func: (...args: any[]) => void, wait: number): (...args: any[]) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return (...args: any[]) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}
function extractTextFromHTML(html: string): string {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || ''
}
async function saveContent() {
  if (editor.value) {
    loading.value = true
    const outputData = await editor.value.save()
    if (!documentName.value) {
      const firstParagraph = outputData.blocks.find(block => block.type === 'paragraph')
      documentName.value = firstParagraph ? firstParagraph.data.text : 'Documento sem título'

      documentName.value = firstParagraph ? extractTextFromHTML(firstParagraph.data.text) : 'Documento sem título'
    }
    console.warn('Conteúdo salvo:', outputData, 'Nome do Documento:', documentName.value)

    toast.success('Conteúdo salvo com sucesso!')
    loading.value = false
  }
}

const debouncedSaveContent = debounce(saveContent, 10000) // 10 segundos

onMounted(() => {
  if (editorContainer.value) {
    editor.value = new EditorJS({
      holder: editorContainer.value,
      tools: {
        header: {
          class: Header as any,
          inlineToolbar: true,
        },
        list: {
          class: List as any,
          inlineToolbar: true,
        },
        table: {
          class: Table as any,
          config: {
            rows: 3,
            cols: 3,
            withHeadings: true,
          },
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: 'http://localhost:8008/uploadFile',
              byUrl: 'http://localhost:8008/fetchUrl',
            },
          },
        },
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: 'http://localhost:8008/fetchUrl',
          },
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          tunes: ['textVariant'],
        },
        textVariant: TextVariantTune,
      },
      tunes: ['textVariant'],
      placeholder: 'Escreva algo incrível...',
      onReady: () => {
        const undoInstance = new Undo({ editor: editor.value })
        const dragDropInstance = new DragDrop(editor.value)

        console.warn('Undo and DragDrop initialized:', undoInstance, dragDropInstance)
      },

      onChange: () => {
        debouncedSaveContent()
      },
      i18n: {
        messages: {
          ui: {
            blockTunes: {
              toggler: {
                'Click to tune': 'Clique para ajustar',
                'or drag to move': 'ou arraste para mover',
              },
            },
            inlineToolbar: {
              converter: {
                'Convert to': 'Converter para',
              },
            },
            toolbar: {
              toolbox: {
                Add: 'Adicionar',
                filter: 'Filtro',
              },
            },
            popover: {
              'Filter': 'Pesquisar',
              'Nothing found': 'Não encontrado',
              'Convert to': 'Mudar',
            },
          },
          toolNames: {
            'Text': 'Parágrafo',
            'Heading': 'Cabeçalho',
            'List': 'Lista',
            'Ordered List': 'Lista Ordenada',
            'Unordered List': 'Marcadores',
            'Warning': 'Aviso',
            'Checklist': 'Lista de Verificação',
            'Quote': 'Citação',
            'Image': 'Imagem',
            'Code': 'Código',
            'Delimiter': 'Delimitador',
            'Raw HTML': 'HTML Bruto',
            'Table': 'Tabela',
            'Link': 'Link',
            'Marker': 'Marcador',
            'Bold': 'Negrito',
            'Italic': 'Itálico',
            'InlineCode': 'Código Inline',
            'Convert to': 'Converter para',
          },
          tools: {
            warning: {
              Title: 'Título',
              Message: 'Mensagem',
            },
            link: {
              'Add a link': 'Adicionar um link',
            },
            stub: {
              'The block can not be displayed correctly.': 'O bloco não pode ser exibido corretamente.',
            },
            header: {
              'Heading 1': 'Título 1',
              'Heading 2': 'Título 2',
              'Heading 3': 'Título 3',
              'Heading 4': 'Título 4',
              'Heading 5': 'Título 5',
              'Heading 6': 'Título 6',
            },
          },
          blockTunes: {
            delete: {
              Delete: 'Excluir',
            },
            moveUp: {
              'Move up': 'Mover para cima',
            },
            moveDown: {
              'Move down': 'Mover para baixo',
            },
            textVariant: {
              'Call-out': 'Atenção',
              'Citation': 'Citação',
              'Details': 'Detalhes',
            },
          },
        },
      },
    })
  }
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
    editor.value = null
  }
})
</script>

<template>
  <v-row class="align-items-center">
    <v-col cols="8">
      <v-text-field
        v-model="documentName"
        variant="underlined"
        label="Nome do Documento"
        class="mb-n4 mx-auto"
      />
    </v-col>

    <v-col
      cols="4"
      class="d-flex justify-end align-self-end"
    >
      <v-btn
        color="primary"
        variant="plain"
        :loading="loading"
        @click="saveContent"
      >
        Salvar
      </v-btn>
    </v-col>
  </v-row>
  <div ref="editorContainer" class="editor" />
</template>

<style scoped>
.editor {
  border: 1px solid #ddd;
  padding: 10px;
  min-height: 300px;
  background: white;
  border-radius: 4px;
}
</style>
