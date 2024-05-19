<template>
  <section v-editable="blok" class="fdb-block" :class="blok.section_style.join(' ')" :style="{'backgroundImage': `url(${blok.background})`}">

    <div class="container" :class="blok.container_style.join(' ')">
      <div class="row" :class="blok.row_style.join(' ')">

        <div :class="columnStyle">
          <div :class="boxStyle">
          <div>
            <b-card-group deck >
              <!-- <b-card title="Title" img-src="https://picsum.photos/300/300/?image=41" img-alt="Img" img-top>
                <p class="card-text">
                  This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                </p>
                <div slot="footer">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </div>
              </b-card>
              <b-card title="Title" img-src="https://picsum.photos/300/300/?image=41" img-alt="Img" img-top>
                <p class="card-text">
                  This card has supporting text below as a natural lead-in to additional content.
                </p>
                <div slot="footer">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </div>
              </b-card>
              <b-card title="Title" img-src="https://picsum.photos/300/300/?image=41" img-alt="Img" img-top>
                <p class="card-text">
                  This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.
                </p>
                <div slot="footer">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </div>
              </b-card> -->
              <component :key="blok._uid" v-for="blok in blok.cards" :blok="blok" :is="blok.component | dashify"></component>
            </b-card-group>
          </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
  export default {
    props: ['blok'],
    computed: {
      boxStyle() {
        if (this.blok.in_box) {
          return `fdb-box ${(this.box_style || []).join(" ")}`;
        }
        return "";
      },
      columnStyle() {
        let style = this.blok.column_style.join(" ") + " ";
        style += this.blok.width.xsmall ? `col-${this.blok.width.xsmall} ` : "";
        style += this.blok.width.small ? `col-sm-${this.blok.width.small} ` : "";
        style += this.blok.width.medium ?
          `col-md-${this.blok.width.medium} ` :
          "";
        style += this.blok.width.large ? `col-lg-${this.blok.width.large} ` : "";
        style += this.blok.width.xlarge ?
          `col-xl-${this.blok.width.xlarge} ` :
          "";
        return style;
      }
    }
  };
</script>
