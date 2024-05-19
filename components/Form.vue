<template>
  <section v-editable="blok" class="fdb-block" :class="blok.section_style.join(' ')" :style="{'backgroundImage': `url(${blok.background})`}">
  <div class="container" :class="blok.container_style.join(' ')">
    <div class="row" :class="blok.row_style.join(' ')">
      <div class="col-12 col-sm-6" v-if="blok.image && blok.image_position == 'left'">
        <img alt="Image" class="img-fluid" :src="blok.image" />
      </div>
      <div :class="columnStyle">
        <img :alt="blok.icon_alt_text" height="40" class="fdb-icon" :src="blok.icon" v-if="blok.icon">
        <div :class="boxStyle">
          <h1 v-if="blok.headline">
            {{ blok.headline }}
          </h1>
          <h2 v-if="blok.headline_2">
            {{ blok.headline_2 }}
          </h2>
          <h3 v-if="blok.subheadline">
            <strong>
                {{ blok.subheadline }}
              </strong>
          </h3>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="exampleInputGroup1" label="" label-for="exampleInput1" description="">
              <b-form-input id="exampleInput1" type="email" v-model="form.email" required placeholder="Email">
              </b-form-input>
            </b-form-group>
            <b-form-group id="exampleInputGroup2" label="" label-for="exampleInput2">
              <b-form-input id="exampleInput2" type="text" v-model="form.name" required placeholder="Name">
              </b-form-input>
            </b-form-group>
            <!-- <b-form-group id="exampleInputGroup3" label="Product:" label-for="exampleInput3">
              <b-form-select id="exampleInput3" :options="products" required v-model="form.products">
              </b-form-select>
            </b-form-group> -->
            <b-form-group id="exampleGroup4">
              <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
                <b-form-checkbox value="newsletter">Subscribe to Newsletter</b-form-checkbox>
                <b-form-checkbox value="demo">Request Demo</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
            <b-button type="submit" v-model="form.checked" variant="primary">Submit</b-button>
            <b-button type="reset" v-model="form.checked" variant="danger">Reset</b-button>
          </b-form>
        </div>
        <div class="col-12 col-sm-4 col-md-6 col-lg-4 m-auto pt-5" v-if="blok.image && blok.image_position == 'left'">
          <img alt="image" class="img-fluid br-0" :src="blok.image">
        </div>

      </div>
    </div>
  </div>
  </section>
</template>

<script>
export default {
  props: ['blok'],
  data() {
    return {
      form: {
        email: '',
        name: '',
        checked: []
      },
      products: [{
          text: 'Select One',
          value: null
        },
        'bx', 'ai', 'iot'
      ],
      show: true
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      // alert(JSON.stringify(this.form));
      // console.log('form', this.form)
      this.$store.dispatch('newsletterSubscribe', this.form)
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = '';
      this.form.name = '';
      this.form.products = null;
      this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true
      });
    }
  },
  computed: {
    boxStyle() {
      if (this.blok.in_box) {
        return `fdb-box ${(this.box_style || []).join(' ')}`
      }
      return ''
    },
    columnStyle() {
      let style = this.blok.column_style.join(' ') + ' '
      style += this.blok.width.xsmall ? `col-${this.blok.width.xsmall} ` : ''
      style += this.blok.width.small ? `col-sm-${this.blok.width.small} ` : ''
      style += this.blok.width.medium ? `col-md-${this.blok.width.medium} ` : ''
      style += this.blok.width.large ? `col-lg-${this.blok.width.large} ` : ''
      style += this.blok.width.xlarge ? `col-xl-${this.blok.width.xlarge} ` : ''
      return style
    }
}
}
</script>





