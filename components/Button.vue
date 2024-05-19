<template>
  <component v-editable="blok"
             :is="blok.is_inline ? 'span' : 'p'"
             :class="blok.paragraph_style.join(' ')">
    <a :href="blok.link.cached_url"
        @click.native="$mixpanel.track('btn')"
       class="btn"
       :class="blok.style.join(' ')"
       :target="blok.target">
      {{ blok.text }}
    </a>
  </component>
</template>

<script>
export default {
  props: ['blok']
}
</script>
