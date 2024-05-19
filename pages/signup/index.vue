<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <div class="sidebar-wrapper" id="style-3">
          <div class="logo" >
            <a href="https://www.evry.link" class="simple-text logo-mini">
              <div class="logo-img">
                <img
                  src="https://a.storyblok.com/f/49880/311x311/45b46d53b8/logo_blue.png"
                  alt="" style="height: 20px;">  Welcome to Paymxt -  BETA
              </div>
            </a>
            <a  class="simple-text logo-normal" style="font-size: 1.75rem">
              Sign Up Today
            </a>
          </div>
        </div>
        <div class="input" :class="{invalid: $v.email.$error}">
          <label for="email">Please Enter You Email</label>
          <input
                  type="email"
                  id="email"
                  @blur="$v.email.$touch()"
                  v-model="email">
          <p v-if="!$v.email.email">Please provide a valid email address.</p>
          <p v-if="!$v.email.required">This field must not be empty.</p>
        </div>
        <div class="input" :class="{invalid: $v.password.$error}">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  @blur="$v.password.$touch()"
                  v-model="password">
        </div>
        <div class="input" :class="{invalid: $v.passwordConfirm.$error}">
          <label for="confirm-password">Confirm Password</label>
          <input
                  type="password"
                  id="confirm-password"
                  @blur="$v.passwordConfirm.$touch()"
                  v-model="passwordConfirm">
        </div>
        <div class="input" :class="{invalid: $v.inviteCode.$error}">
          <label for="inviteCode">Your invite code (any number greater than 0)</label>
          <input
                  type="number"
                  id="inviteCode"
                  @blur="$v.inviteCode.$touch()"
                  v-model.number="inviteCode">
          <p v-if="!$v.inviteCode.minVal">Please enter a number greater than {{ $v.inviteCode.$params.minVal.min }} ...</p>
        </div>
        <div class="input">
          <label for="country">Country</label>
          <select id="country" v-model="country">
            <option value="usa">USA</option>
            <option value="canada">Canada</option>
            <option value="uk">UK</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div class="channels">
          <h4>How did you hear about Paymxt</h4>
          <button @click="onAddChannel" type="button">Add Channel</button>
          <div class="channel-list">
            <div
              class="input"
              v-for="(channelInput, index) in channelInputs"
              :class="{invalid: $v.channelInputs.$each[index].$error}"
              :key="channelInput.id">
              <label :for="channelInput.id">Channel # {{ index + 1 }}</label>
              <input
                type="text"
                :id="channelInput.id"
                @blur="$v.channelInputs.$each[index].value.$touch()"
                v-model="channelInput.value">
              <button @click="onDeleteChannel(channelInput.id)" type="button">X</button>
            </div>
            <!-- <p v-if="!$v.channelInputs.minLen">You have to specify at least {{ $v.channelInputs.$params.minLen.min }} channel.</p> -->
            <p v-if="!$v.channelInputs.required">Please add  at least one channel.</p>
          </div>
        </div>
        <div class="input inline" :class="{invalid: $v.terms.$invalid}">
          <input
                  type="checkbox"
                  id="terms"
                  @change="$v.terms.$touch()"
                  v-model="terms">
          <label for="terms">Accept Terms of Use</label>
        </div>
        <div class="submit">
          <button type="submit" :disabled="$v.$invalid">Submit</button>
        </div>
        <br>
        <div>
          <button><router-link :to="{path:'/signin'}">Do you already have an account?</router-link></button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { required, email, numeric, minValue, minLength, sameAs, requiredUnless } from 'vuelidate/lib/validators'
  import globalAxios from '../../helpers/axios-global'

  export default {
    data () {
      return {
        email: '',
        inviteCode: 123,
        password: '',
        passwordConfirm: '',
        country: 'usa',
        channelInputs: [],
        terms: false
      }
    },
    validations: {
      email: {
        required,
        email,
        unique: val => {
          if (val === '') return true
          return globalAxios.get('/users.json?orderBy="email"&equalTo="' + val + '"')
            .then(res => {
              return Object.keys(res.data).length === 0
            })
        }
      },
      inviteCode: {
        required,
        numeric,
        minVal: minValue(0)
      },
      password: {
        required,
        minLen: minLength(6)
      },
      passwordConfirm: {
        // sameAs: sameAs('password')
        sameAs: sameAs(vm => {
          return vm.password
        })
      },
      terms: {
        required: requiredUnless(vm => {
          return vm.country === 'canada'
        })
      },
      hobbyInputs: {
        // required,
        minLen: minLength(1),
        $each: {
          value: {
            required,
            minLen: minLength(5)
          }
        }
      },
      channelInputs: {
        // required,
        minLen: minLength(1),
        $each: {
          value: {
            required,
            minLen: minLength(5)
          }
        }
      }
    },
    methods: {
      onAddChannel () {
        const newChannel = {
          id: Math.random() * Math.random() * 1000,
          value: ''
        }
        this.channelInputs.push(newChannel)
      },
      onDeleteChannel (id) {
        this.channelInputs = this.channelInputs.filter(channel => channel.id !== id)
      },
      onSubmit () {
        const formData = {
          email: this.email,
          inviteCode: this.inviteCode,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
          country: this.country,
          channels: this.channelInputs.map(channel => channel.value),
          terms: this.terms
        }
        console.log(formData)
        this.$store.dispatch('signup', formData)
      }
    }
  }
</script>

<style scoped>
  .signup-form {
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

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input.invalid label {
    color: red;
  }

  .input.invalid input {
    border: 1px solid red;
    background-color: #ffc9aa;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .channels button {
    border: 1px solid #521751;
    background: #521751;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .channels button:hover,
  .channels button:active {
    background-color: #8d4288;
  }

  .channels input {
    width: 90%;
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
