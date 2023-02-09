<template>
  <ul>
    <li>{{ stage.category }} {{ `${stage.key}`.substring(1,2) }}</li>
  </ul>
</template>

<script>
export default {
  name: 'CollapseGoJs',
  components: {  },
  props: {
    stage: {
      type: Object,
      default: () => {},
      require: true
    }
   },
  methods: {


  }
}
</script>
