<template>
  <div class="container">
    <form class="container-form">
      <label for="response">add response</label>
      <input v-model="items.responses" type="text" name="question">
    </form>
  </div>
</template>

<script>
export default {
  name: 'ResponseComponent',
  components: { },
  data() {
    return {
      items: {
        responses: '',
      },
      editor: null,
    }
  },
  computed: {
  },
  methods: {
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
