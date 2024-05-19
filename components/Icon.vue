<template>
  <a v-editable="blok"
     :href="blok.link.cached_url"
      @click.native="$mixpanel.track('icon')"
     class="mr-2 ml-2"
     target="_blank">
    <i :class="`${blok.icon.type} ${blok.icon.icon}`">
    </i>
  </a>
</template>

<script>
export default {
  props: ['blok']
}
</script>
