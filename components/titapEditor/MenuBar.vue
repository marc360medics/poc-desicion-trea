<template>
  <div>
      <template v-for="(item, i) in items">
          <div v-if="item.type === 'divider'" :key="`divider${i}`" class="divider" />
          <menu-item-color v-else-if="item.type === 'font-color'" :key="`fontColor${i}`" v-bind="item" @input="colorSelected($event)" />
          <menu-item-table v-else-if="item.type === 'add-table'" :key="`addTable${i}`" v-bind="item" @tableRequested="tableRequested($event)" />
          <menu-item-text-align v-else-if="item.type === 'select-alignment'" :key="`selectAlign${i}`" v-bind="item" :icon="getCurrentAlignIcon()" @input="alignSelected($event)" />
          <menu-item-heading v-else-if="item.type === 'select-heading'" :key="`selectHead${i}`" v-bind="item" :icon="getCurrentHeadingIcon()" @input="headingSelected($event)" />
          <menu-item-font-size v-else-if="item.type === 'select-font-size'" :key="`selectFontSize${i}`" :size-display-value="getCurrentFontSize()" v-bind="item" :icon="'font-size'" @input="fontSizeSelected($event)" />
          <menu-item-add-media
              v-else-if="item.type === 'add-media'"
              :key="i"
              v-bind="item"
              icon="file-add-line"
              title="Ajouter un média"
              @uploadProgress="uploadProgressChanged($event)"
              @uploadStarted="uploadStarted()" @uploadImageEnded="uploadEnded('image', $event)"
              @uploadVideoEnded="uploadEnded('video', $event)"
              @media="addMedia($event)"
          />
          <menu-item-table-option
              v-else-if="item.type === 'select-table-option'"
              :key="`selectTable${i}`"
              v-bind="item"
              icon="split-cells-vertical"
              @action="editTable($event)"
          />
          <menu-item v-else :key="`idontknow${i}`" v-bind="item" />
      </template>
      <!-- <overlay-loader :active.sync="isUploading" :is-full-page="true">
          <slot slot="after">
              <p>{{uploadProgressMessage()}}</p>
          </slot>
      </overlay-loader> -->
  </div>
</template>

<script >
import Vue from 'vue'
import { Editor } from '@tiptap/vue-2'

import MenuItem from './MenuItem.vue'
import MenuItemColor from './MenuItem/MenuItemColor.vue'
import MenuItemTable from './MenuItem/MenuItemTable.vue'
import MenuItemTextAlign from './MenuItem/MenuItemTextAlign.vue'
import MenuItemHeading from './MenuItem/MenuItemHeading.vue'
import MenuItemFontSize from './MenuItem/MenuItemFontSize.vue'
import MenuItemAddMedia from './MenuItem/MenuItemAddMedia.vue'
import MenuItemTableOption from './MenuItem/MenuItemTableOption.vue'
// import OverlayLoader from '~/components/Loader/OverlayLoader.vue'
// import AlertModal from '~/components/modals/AlertModal.vue'

export default Vue.extend({
  components: {
      MenuItemTableOption,
      MenuItem,
      MenuItemColor,
      MenuItemTable,
      MenuItemTextAlign,
      MenuItemHeading,
      MenuItemFontSize,
      MenuItemAddMedia,
  },

  props: {
      editor: {
          type: Editor,
          required: true,
      },
  },

  data() {
      return {
          isUploading: false,
          uploadProgress: undefined,
          items: [
              {
                  icon: 'font-color',
                  title: 'Couleur',
                  action: () => this.$emit('font-color'),
                  type: 'font-color',
              },
              {
                  type: 'select-font-size',
              },
              {
                  icon: 'bold',
                  title: 'Gras',
                  action: () => this.editor.chain().focus().toggleBold().run(),
                  isActive: () => this.editor.isActive('bold'),
              },
              {
                  icon: 'italic',
                  title: 'Italique',
                  action: () => this.editor.chain().focus().toggleItalic().run(),
                  isActive: () => this.editor.isActive('italic'),
              },
              {
                  icon: 'underline',
                  title: 'Souligné',
                  action: () => this.editor.chain().focus().toggleUnderline().run(),
                  isActive: () => this.editor.isActive('underline'),
              },
              {
                  type: 'select-alignment',
              },
              {
                  type: 'select-heading',
              },
              {
                  type: 'add-media',
              },
              {
                  icon: 'list-unordered',
                  title: 'Liste à point',
                  action: () => this.editor.chain().focus().toggleBulletList().run(),
                  isActive: () => this.editor.isActive('bulletList'),
              },
              {
                  icon: 'list-ordered',
                  title: 'Liste numérique',
                  action: () => this.editor.chain().focus().toggleOrderedList().run(),
                  isActive: () => this.editor.isActive('orderedList'),
              },
              {
                  icon: 'list-check-2',
                  title: 'Liste de tâche',
                  action: () => this.editor.chain().focus().toggleTaskList().run(),
                  isActive: () => this.editor.isActive('taskList'),
              },
              {
                  icon: 'table-2',
                  title: 'Ajouter un tableau',
                  type: 'add-table',
              },
              {
                  type: 'select-table-option',
              },
              {
                  icon: 'double-quotes-l',
                  title: 'Citation',
                  action: () => this.editor.chain().focus().toggleBlockquote().run(),
                  isActive: () => this.editor.isActive('blockquote'),
              },
              {
                  icon: 'separator',
                  title: 'Règle horizontale',
                  action: () => this.editor.chain().focus().setHorizontalRule().run(),
              },
              {
                  icon: 'format-clear',
                  title: 'Effacer le formatage',
                  action: () => this.editor.chain()
                      .focus()
                      .clearNodes()
                      .unsetAllMarks()
                      .run(),
              },
              {
                  icon: 'arrow-go-back-line',
                  title: 'Revenir en arrière',
                  action: () => this.editor.chain().focus().undo().run(),
              },
              {
                  icon: 'arrow-go-forward-line',
                  title: 'Aller vers l\'avant',
                  action: () => this.editor.chain().focus().redo().run(),
              },
          ],
      }
  },
  methods: {
      canEditTable() {
          return !!this.editor.chain().focus().addColumnBefore().run()
      },
      colorSelected(color) {
          this.editor.chain().focus().setColor(color).run()
      },
      alignSelected(align) {
          this.editor.chain().focus().setTextAlign(align).run()
      },
      fontSizeSelected(fontSize) {
          this.editor.chain().focus().setSize(fontSize).run()
      },
      getFontSize(fontSize) {
          return (fontSize)
      },
      headingSelected(heading) {
          if (heading === 4) {
              this.editor.chain().focus().setParagraph().run()
              return
          }
          this.editor.chain().focus().toggleHeading({ level: heading }).run()
      },
      addMedia(typeOfMedia) {
          this.$emit('media', typeOfMedia)
      },
      editTable(e) {
          let success = false
          const myModal = this.$refs.alertModal
          switch (e) {
          case 'addColumnBefore':
              success = this.editor.chain().focus().addColumnBefore().run()
              break
          case 'addColumnAfter':
              success = this.editor.chain().focus().addColumnAfter().run()
              break
          case 'deleteColumn':
              success = this.editor.chain().focus().deleteColumn().run()
              break
          case 'addRowTop':
              success = this.editor.chain().focus().addRowBefore().run()
              break
          case 'addRowBottom':
              success = this.editor.chain().focus().addRowAfter().run()
              break
          case 'deleteRow':
              success = this.editor.chain().focus().deleteRow().run()
              break
          case 'mergeCells':
              success = this.editor.chain().focus().mergeCells().run()
              break
          case 'splitCell':
              success = this.editor.chain().focus().splitCell().run()
              break
          case 'deleteTable':
              success = this.editor.chain().focus().deleteTable().run()
              break
          default:
              console.log('No option selected')
          }
          if (!success) {
              myModal.openModal()
          }
      },
      tableRequested(data) {
          this.editor.chain().focus().insertTable({ ...data, withHeaderRow: false }).run()
      },
      uploadStarted() {
          this.uploadProgress = undefined
          this.isUploading = true
      },
      uploadEnded(type) {
          this.isUploading = false
          this.uploadProgress = undefined

          if (type === 'video') {
              const extension = url.split('.').pop()
              this.editor.chain().focus().setVideo({ src: url, type: `video/${extension}` }).run()
          } else if (type === 'image') {
              this.editor.chain().focus().setImage({ src: url }).run()
          } else {
              throw new Error('uploaded file type must be one of video or image.')
          }
      },
      uploadProgressChanged(progress) {
          this.uploadProgress = progress
      },
      uploadProgressMessage() {
          if (this.uploadProgress === undefined) {
              return 'Envoi en cours...'
          }

          if (this.uploadProgress === 100) {
              return 'Envoi de votre fichier sur un serveur sécurisé...'
          }

          return `Envoi en cours... (${this.uploadProgress}%)`
      },
      getCurrentAlignIcon() {
          if (this.editor.isActive({ textAlign: 'left' })) {
              return 'align-left'
          } if (this.editor.isActive({ textAlign: 'right' })) {
              return 'align-right'
          } if (this.editor.isActive({ textAlign: 'center' })) {
              return 'align-center'
          } if (this.editor.isActive({ textAlign: 'justify' })) {
              return 'align-justify'
          }
          return 'align-left'
      },
      getCurrentHeadingIcon() {
          if (this.editor.isActive('heading', { level: 2 })) {
              return 'h-1'
          } if (this.editor.isActive('heading', { level: 3 })) {
              return 'h-2'
          } if (this.editor.isActive('paragraph')) {
              return 'text'
          }
          return 'text'
      },
      getCurrentFontSize() {
          const currentSize = (this.editor.getAttributes('textStyle').size ?? '15px').slice(0, -2)
          return currentSize
      },
  },
})
</script>

<style scoped lang="scss">
.divider {
width: 2px;
height: 1.25rem;
background-color: rgba(#000, 1);
margin-left: 0.5rem;
margin-right: 0.75rem;
}
</style>
