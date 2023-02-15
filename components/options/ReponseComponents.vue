<template>
  <div class="container">
    <form class="container-form">
      <label for="response">add response</label>
      <input v-model="items.response" type="text" name="question">
    </form>
    <button class="container-form__btn" @click.prevent="RegisterNode($event)">
        save step
      </button>
  </div>
</template>

<script>
export default {
  name: 'ResponseComponent',
  components: { },
  data() {
    return {
      items: {
        id: '',
        outputId: '',
        inputId: '',
        type: 'response',
        response: '',
        children: [],
      },
      editor: null,
    }
  },
  computed: {
  },
  methods: {
    RegisterNode(e) {
      this.items.id = e.target.closest('.node').id
      this.items.outputId = e.target.closest('.node').querySelector('.node-interface.--output').id
      this.items.inputId = e.target.closest('.node').querySelector('.node-interface.--input').id
      this.$nuxt.$emit('setJsonTree', this.items)
      this.$store.commit('SET_NODE_TREE', this.items)
    },
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
