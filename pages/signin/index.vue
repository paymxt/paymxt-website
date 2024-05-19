<template>
  <div id="signin">
    <div class="signin-form">
      <!-- <h1>Signin to Use the App</h1> -->
      <div class="sidebar-wrapper" id="style-3">
        <div class="logo" >
          <a href="https://www.evry.link" class="simple-text logo-mini">
            <div class="logo-img">
              <img
                src="https://a.storyblok.com/f/49880/311x311/45b46d53b8/logo_blue.png"
                alt="" style="height: 20px;"> Welcome back to EvryLink
            </div>
          </a>
          <a  class="simple-text logo-normal" style="font-size: 1.75rem">
            Signin to Use the App
          </a>
        </div>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="email">Enter Your Email</label>
          <input
                  type="email"
                  id="email"
                  v-model="email">
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  v-model="password">
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <br><br>
      <div v-if="!acct">
      <!-- <div > -->
        <button><router-link :to="{path:'/signup'}">Don't have an account?</router-link></button>
      </div>
    </div>


  </div>
</template>

<script>
import globalAxios from '../../helpers/axios-global.js'
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  mounted() {
    this.$store.dispatch('tryAutoLogin')
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password
      };
      globalAxios.get('/users.json?orderBy="email"&equalTo="' + formData.email + '"')
        .then(res => {
          if (Object.keys(res.data).length === 0) {
            alert('Authentication Failed: Please try again')
          } else {
              this.$store.dispatch('login', {
                email: formData.email,
                password: formData.password
              });
            }
        })
        .catch(error => {
          alert(error.message)
          throw error
        })
    }
  },
  computed: {
    acct () {
        return this.$store.getters.hasAccount
    }
  }
};
</script>

<style scoped>
.signin-form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}

.input {
  margin: 10px auto;
}

.input label {
  display: block;
  color: #4e4e4e;
  margin-bottom: 6px;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input input:focus {
  outline: none;
  border: 1px solid #521751;
  background-color: #eee;
}

.submit button {
  border: 1px solid #521751;
  color: #521751;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  background-color: #521751;
  color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #ccc;
  background-color: transparent;
  color: #ccc;
  cursor: not-allowed;
}
</style>
