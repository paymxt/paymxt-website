<template>
  <div v-editable="blok"
       class="col-12 col-sm-6 col-lg-4 pt-4 pt-lg-50">
    <img alt="image"
         class="fdb-icon"
         :src="blok.icon">
    <h3><strong>{{ blok.headline }}</strong></h3>
    <p>{{ blok.text }}</p>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>
