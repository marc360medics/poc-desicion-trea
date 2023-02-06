<template>
  <div>
    <h1> {{ title }} </h1>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
h1 {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #273640;
  color: white;
  margin: -1px;
  height: 5rem;
}
</style>
