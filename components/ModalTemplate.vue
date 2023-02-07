<template>
  <div class="modal">
    <div class="modal-items">
      <h4>introduction</h4>
      <p>{{ choice.introduction }}</p>
      <h4>Question</h4>
      <p>{{ choice.question }}</p>
    </div>
    <h4>response</h4>
    <div v-for="(response, i) of choice.responses" :key="i" class="modal-response">
      <label for="response">{{ response }}</label>
      <input type="checkBox" name="response">
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'ModalTemplate',
  data() {
    return {
      items: {}
    }
  },
  computed: {
   ...mapState(["choice"])
  },
  methods: {

  },
}
</script>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  max-width: 20rem;
  height: 50%;
  border-radius: 15px;
  margin: auto;
  margin-top: 25%;
  background-color: white;
  padding: 1rem;
}
.modal-items {
  display: flex;
  flex-direction: column;
  align-content: center;
}
h4 {
  text-align: center;
}
p {
  margin: 0
}
</style>
