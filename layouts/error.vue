<template>
   <div>
    <h1 v-if="error.statusCode === 404">Whoops, we couldn't find that page</h1>
    <h1 v-else>An error occurred.</h1>
    <p>You can always <a href="/">start over</a>. Also, feel free to <a :href="'mailto:support@fazezero.com?subject=Error on GovDocs App website&body=There is an error on this page: https://www.govdocs.net' + $route.fullPath">let us know</a> about this error.</p>
  </div>
</template>

<script>

export default {
  name: 'ErrorPage',
  props: ['error'],

  components: {
  },

  mounted () {
    this.$mixpanel.track('Error page', { type: '404', resource: this.$route.fullPath })
  },

  data () {
    return {
      section: { title: 'Page Not Found', description: 'Please go back to safety' }
    }
  },
  head() {
    return {
      title: 'Sorry!!! - ' + this.section.title
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
    min-height: 100%;
    text-align: center;
    padding-top: 50px;
  }
</style>
