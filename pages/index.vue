<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        laravel
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="links">
        <nuxt-link class="button--green" target="_blank" to="/topic/1">无人机社区</nuxt-link>
        <nuxt-link class="button--green" to="/topic/1/square">无人机广场</nuxt-link>
        <nuxt-link class="button--green" target="_blank" to="/topic/2">VR社区</nuxt-link>
        <nuxt-link class="button--green" target="_blank" to="/topic/3">苹果社区</nuxt-link>
        <nuxt-link class="button--green" target="_blank" to="/topic/4">大疆社区</nuxt-link>
        <nuxt-link class="button--green" target="_blank" to="/topic/5">手机社区</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
  import Logo from '~/components/Logo.vue'

  export default {
    components: {
      Logo
    }
  }
</script>

<style>
  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>
