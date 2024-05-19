<template>
          <!-- <b-card :img-src="blok.image | resize('100x100')" -->
          <b-card :img-src="blok.image"
                img-alt="Card image"
                img-top>
            <p class="card-text">
                {{blok.text}}
            </p>
        </b-card>
</template>

<script>
  export default {
    props: ['blok']
  }
</script>
