<template>
  <div class="modal">
    <div class="modal-items">
      <img class="cross" src="@/assets/Vector.svg" @click="closeModal()">
      <h4>introduction</h4>
      <v-runtime-template :template="itemsRead.introduction"/>
      <h4>Question</h4>
      <p>{{ itemsRead.question }}</p>
      <h4>Reponse</h4>
      <div v-for="(response, i) of responses" :key="i">
        <label :for="response">{{ response }}</label>
        <input type="checkBox" :name="response">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VRuntimeTemplate from "v-runtime-template";

export default {
  name: 'ModalTemplate',
  components: { VRuntimeTemplate },
  data() {
    return {
      items: [],
      itemsIndex: 0,
      itemsRead: {},
      responses: []
    }
  },
  computed: {
   ...mapState("BakLavaStore",["nodeTree"])
  },
  mounted() {
   this.nodeTree.nodes.forEach((node) => {
    this.items.push(node)
    if(node.children) {
      node.children.forEach(({type, response}) => {
        if(type === 'response') {
          this.responses.push(response)
          console.log(this.responses)
        }
      } )
    }
   })
   this.itemsRead = this.items[this.itemsIndex]
  },
  methods: {
    closeModal() {
      this.$store.commit('BakLavaStore/SHOW_MODAL', false)
    }
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
  bottom: 0;
  backdrop-filter: blur(4px);
}
.modal-items {
  display: flex;
  flex-direction: column;
  align-content: center;
  min-width: 20rem;
  height: 50%;
  border-radius: 15px;
  margin: auto;
  background-color: white;
  padding: 1rem;
}
h4 {
  text-align: center;
}
p {
  margin: 0
}
.cross {
  position: relative;
  left: 18.6rem;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
