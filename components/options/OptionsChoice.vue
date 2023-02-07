<template>
  <div class="container">
    <form class="container-form">

      <label for="introduciton">add introduction</label>
      <input v-model="items.introduction" type="text" name="introduction">

      <label for="question">add question</label>
      <input v-model="items.question" type="text" name="question">

      <label for="response">add response</label>
      <input v-model="responseAdd" type="text" name="response">

      <button class="container-form__btn" @click.prevent="items.responses.push(responseAdd)">add reponse in list</button>
      <button class="container-form__btn" @click.prevent="getTemplate()">generate template</button>

      <div v-for="(response, i) of items.responses" :key="i">
        <label for="response">{{ response }}</label>
        <input type="checkBox" name="response">
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'OptionIntroduction',
  components: { },
  data() {
    return {
      items: {
        responses: ['malade', 'je veux mourir', 'je meurt'],
        introduction: '',
        question: '',
      },
      responseAdd: '',
    }
  },
  computed: {
    ...mapState(["choice"])
  },
  methods: {
    getTemplate() {
      this.$store.commit('SET_CHOICE', this.items)
      this.$store.commit('SET_SHOW_MODAL', true)
    }
  }
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
