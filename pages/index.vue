<template>
  <div class="home">
    <HeaderComponent :title="'POC decision tree'"/>
    <div class="home_lib">
      <h3> choose your library</h3>
      <nav class="home_nav">
        <nuxt-link to="/BackLava">BackLava</nuxt-link>
        <nuxt-link to="/Flume">Flume</nuxt-link>
        <nuxt-link to="/GoJs">GoJs</nuxt-link>
      </nav>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "~/components/HeaderComponent.vue"

export default {
    components: { HeaderComponent },
}
</script>

<style scoped>
h3 {
  border-bottom: 1px solid black;
}
.home_lib {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #273640;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.29);
  max-width: 30rem;
  margin: auto;
  margin-top: 3rem;
}
.home_nav {
  display: flex;
  flex-direction: column;
}

a:after {
  content: '';
  display: block;
  margin: auto;
  height: 1px;
  width: 0;
  background: transparent;
  transition: width .5s ease, background-color .5s ease;
}
a:hover:after{
  width: 100%;
  background: #444;
}

</style>

<style>
a {
  color: black;
  text-decoration: none;
  margin-bottom: 0.4rem;
}
body {
  margin: 0;
}
</style>
