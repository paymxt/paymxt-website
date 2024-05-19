<template>
  <div class="body__wrap">
    <div class="body__other">
      <div v-if="!$store.state.settings.header.length"
           v-editable="$store.state.settings">
        Define header blocks here
      </div>
      <component :key="blok._uid"
                 v-for="blok in $store.state.settings.header"
                 :blok="blok"
                 :is="blok.component | dashify"></component>
    </div>
               <!-- {{$store.state}} -->

    <main id="main" role="main" class="body__content">
      <nuxt/>
    </main>
    <div class="body__other">
      <div v-if="!$store.state.settings.footer.length"
           v-editable="$store.state.settings">
        Define footer blocks here
      </div>

      <component :key="blok._uid"
                 v-for="blok in $store.state.settings.footer"
                 :blok="blok"
                 :is="blok.component | dashify"></component>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('tryAutoLogin')
  }
}
</script>



<style lang='scss'>
@import '../assets/scss/styles.scss';
</style>
