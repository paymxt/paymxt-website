<template>
<div>
  <li v-editable="blok"
      class="nav-item">
    <nuxt-link class="nav-link"
                @click.native="$mixpanel.track('Nav-Item')"
               :to="`/${blok.link.cached_url}`" exact>
      <i v-if="blok.icon && blok.icon.icon"
         :class="`${blok.icon.type} ${blok.icon.icon}`"></i>

      <img alt="image"
           :src="blok.image"
           height="40"
           v-if="blok.image">
      {{ blok.name }}
    </nuxt-link>
  </li>
  <!-- {{blok}} -->

  </div>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    isActive() {
      if (typeof window !== 'undefined' && window.location.pathname.indexOf(this.blok.link.cached_url) > -1) {
        return true
      }
      return false
    }
  }
}
</script>
