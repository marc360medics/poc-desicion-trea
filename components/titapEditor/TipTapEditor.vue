
<template>
  <div v-if="editor" class="editor relative">
      <menu-bar v-if="isEditorFocused" class="editor__header" :editor="editor"/>
      <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'

// base extensions
// import Image from '@tiptap/extension-image'

import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Link from '@tiptap/extension-link'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Color from '@tiptap/extension-color'
import Underline from '@tiptap/extension-underline'
import MenuBar from './MenuBar.vue'

export default ({
  name: 'TiTapEditor',
  components: {
      EditorContent,
      MenuBar
  },
  props: {
      placeholder: {
          type: String,
          default: 'Entrer le contenu …',
      },
      baseContent: {
          type: String,
          default: '',
      },
  },
  data() {
      return {
          editorContent: this.baseContent,
          isEditorFocused: false,
          blockBlurEditor: false,
          editor: null,
          linkUrl: '',
          textUrl: '',
          selection: '',
      }
  },
   beforeDestroy() {
      document.removeEventListener('click', this.handleEditorClick)
   },
  mounted() {
      document.addEventListener('click', this.handleEditorClick)
      this.editor = new Editor({
          extensions: [
              // Already contained in Starter Kit
              Document,
              StarterKit,
              Link,
              TaskList,
              TaskItem,
              TextStyle,
              TextAlign.configure({
                  defaultAlignment: 'left',
                  types: ['heading', 'paragraph'],
              }),
              Color,
              Table.configure({
                  resizable: true,
              }),
              TableRow,
              TableHeader,
              TableCell,
              Placeholder.configure({
                  placeholder: this.placeholder,
              }),
              Underline,
          ],
          content: this.editorContent,
          onUpdate: () => {
              this.$emit('input', this.editor.isEmpty ? null : this.editor.getHTML())
          },
      })
  },
  methods: {
      isTextSelected() {
          return document.getSelection().toString().length > 0
      },
      handleEditorClick(e) {
          const selection = document.getSelection()
          if (selection.toString().length > 0) {
              this.toggleMenu(this.$el.contains(selection.anchorNode))
              return
          }
          this.toggleMenu(this.$el.contains(e.target))
      },
      toggleMenu(bool) {
          this.isEditorFocused = bool
      },
      submitMediaModal({ linkUrl, textUrl, mediaType }) {
          // cancelled
          if (linkUrl === null) {
              return
          }

          // empty
          if (linkUrl === '') {
              this.editor
                  .chain()
                  .focus()
                  .extendMarkRange('link')
                  .unsetLink()
                  .run()

              return
          }

          // update link
          if (mediaType === 'link') {
              this.editor
                  .chain()
                  .focus()
                  .extendMarkRange('link')
                  .setLink({ href: linkUrl })
                  .run()
          }

          // update youtube
          if (mediaType === 'youtube') {
              this.editor
                  .chain()
                  .focus()
                  .setYoutubeIframe({ src: linkUrl })
                  .run()
          }

          // add text associated to link
          if (textUrl) {
              this.editor
                  .chain()
                  .focus()
                  .insertContent(`<a href="${linkUrl}">${textUrl}</a>`)
                  .run()
          }
      },
  },
})
</script>

<style lang="scss">
p.is-empty {
margin: 0;
}
</style>

// Care, this isn't scoped !
<style lang="scss">

.editor {
  &__header {
      display: flex;
      align-items: center;
      flex: 0 0 auto;
      flex-wrap: wrap;
      padding: 0.25rem;
      border: 1px solid #c4c4c4;
      border-radius: 2px;
      position: -webkit-sticky;
      position: sticky;
      top:0;
      background-color: #fafafa;
      z-index: 20;
  }
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.ProseMirror {
border: 1px dotted #c4c4c4;
border-radius: 0.375rem;
padding: 0 10px;
width: 100%;

&.without-border {
  border: none;
}
> * + * {
  margin-top: 0.75em;
}

iframe {
  max-width: 100%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;

  &.ProseMirror-selectednode {
    outline: 2px solid -webkit-focus-ring-color;
  }

  &.ProseMirror-selectednode {
    outline: 3px solid #F1CA4C;
  }
}

  .custom-image[data-size='small'] {
      width: 30%;
  }
  .custom-image[data-size='medium'] {
      width: 60%;
  }
  .custom-image[data-size='large'] {
      width: 100%;
  }

a {
  color: #0a90eb;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
    cursor: pointer;
  }

  &:visited {
    color: #0a90eb;
  }
}

p {
  text-align: left;
  margin: 1em 0;
  font-size: 15px;
}

ul,
ol {
  list-style: revert;
  margin: revert;
  padding: revert;

  p, h1, h2 {
    margin: 0;
  }
}
h1,
h2,
h3,
h4,
h5,
h6 {
  line-height: 1.1;
  text-align: left;
}

h2 {
  margin: 0.9em 0;
  font-size: 1.17em;
  -webkit-margin-before: 1em;
  margin-block-start: 1em;
  -webkit-margin-after: 1em;
  margin-block-end: 1em;
  -webkit-margin-start: 0;
  margin-inline-start: 0;
  -webkit-margin-end: 0;
  margin-inline-end: 0;
  font-weight: bold;
}
h3 {
  font-size: 16px;
}
code {
  background-color: rgba(#616161, 0.1);
  color: #616161;
}
pre {
  background: #0D0D0D;
  color: #FFF;
  font-family: 'JetBrainsMono', monospace;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  code {
    color: inherit;
    padding: 0;
    background: none;
    font-size: 0.8rem;
  }
}
mark {
  background-color: #FAF594;
}
img {
  max-width: 100%;
  height: auto;
}
hr {
  margin: 1rem 0;
}
blockquote {
  overflow: hidden;
  padding-right: 1.5em;
  padding-left: 1.5em;
  margin-left: 0;
  margin-right: 0;
  font-style: italic;
  border-left: 5px solid #ccc;
  margin: revert;

  p {
    margin: 0;
  }
}
hr {
  border: none;
  border-top: 2px solid rgba(#0D0D0D, 0.1);
  margin: 2rem 0;
}
ul[data-type="taskList"] {
  list-style: none;
  padding: 0;
  li {
    display: flex;
    align-items: center;
    > label {
      flex: 0 0 auto;
      margin-right: 0.5rem;
      user-select: none;
    }
    > div {
      flex: 1 1 auto;
    }
  }
}

// Table
table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 0;
  overflow: hidden;

  td,
  th {
    min-width: 1em;
    border: 2px solid #ced4da;
    padding: 3px 5px;
    vertical-align: top;
    box-sizing: border-box;
    position: relative;

    > * {
      margin-bottom: 0;
      margin-top: 0;
    }
  }

  th {
    font-weight: bold;
    text-align: left;
    background-color: #f1f3f5;
  }

  .selectedCell:after {
    z-index: 2;
    position: absolute;
    content: "";
    left: 0; right: 0; top: 0; bottom: 0;
    background: rgba(200, 200, 255, 0.4);
    pointer-events: none;
  }

  .column-resize-handle {
    position: absolute;
    right: -2px;
    top: 0;
    bottom: -2px;
    width: 4px;
    background-color: #adf;
    pointer-events: none;
  }

  p {
    margin: 0;
  }
}
}

.ProseMirror p.is-editor-empty:first-child::before {
content: attr(data-placeholder);
float: left;
color: #adb5bd;
pointer-events: none;
height: 0;
}

.tableWrapper {
padding: 1rem 0;
overflow-x: auto;
}

.resize-cursor {
cursor: col-resize;
}

</style>
