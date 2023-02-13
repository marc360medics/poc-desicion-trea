<template>
  <div class="container">
    <form class="container-form">
      <label for="introduciton">add introduction</label>
      <TipTapEditor v-model="items.introduction" :placeholder="'editor'" :base-content="''"/>

      <label for="question">add question</label>
      <input v-model="items.question" type="text" name="question">

      <button class="container-form__btn" @click.prevent="items.responses.push(responseAdd)">add reponse in list</button>
      <button class="container-form__btn" @click.prevent="getTemplate()">generate template</button>

    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import TipTapEditor from '../titapEditor/TipTapEditor.vue'

export default {
  name: 'OptionIntroduction',
  components: { EditorContent, TipTapEditor },
  data() {
    return {
      items: {
        introduction: '',
        question: '',
      },
      editor: null,
      responseAdd: '',
    }
  },
  computed: {
    ...mapState(["choice"])
  },
  mounted() {
    this.editor = new Editor({
      content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
      extensions: [
        StarterKit,
      ],
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    getTemplate() {
      this.$store.commit('SET_CHOICE', this.items)
      this.$store.commit('SET_SHOW_MODAL', true)
    }
  },
}
</script>

<style scoped>
.container-form {
  display: flex;
  flex-direction: column;
}
.container-form__btn {
  margin: 1rem 1rem;
}
input {
  background-color: #2c2c2c;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 0.45em 0.75em;
}
label {
  margin: 0.3rem 0.3rem;
}
</style>
