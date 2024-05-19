import Vuex from 'vuex'
import Cookie from 'js-cookie'
import authAxios from '../helpers/axios-auth'
import publicAxios from '../helpers/axios-public'
import globalAxios from '../helpers/axios-global'

const bodyParser = require('body-parser')

const createStore = () => {
  return new Vuex.Store({
    state: {
      cacheVersion: '',
      idToken: null,
      userId: null,
      user: null,
      email: 'none',
      account: null,
      formSubmitSuccess: false,
      settings: {
        header: [],
        footer: []
      }
    },

    mutations: {
      SET_SETTINGS (state, settings) {
        state.settings = settings
      },
      SET_CACHE_VERSION (state, version) {
        state.cacheVersion = version
      },
      AUTH_USER (state, userData) {
        state.idToken = userData.token
        state.userId = userData.userId
        state.email = userData.email
      },
      EMAIL_EXIST (state, email) {
        state.emailExist = email != null
      },
      STORE_USER (state, user) {
        state.user = user
      },
      CLEAR_AUTH_DATA (state) {
        state.idToken = null
        state.userId = null
        state.email = null
      },
      FORM_SUBMIT (state) {
        state.formSubmitSuccess = true
      }
    },

    actions: {
      nuxtServerInit ({ commit }, context) {
        return this.$storyapi.get(`cdn/stories/blocks/global`, {
          version: context.version
        }).then((res) => {
          commit('SET_SETTINGS', res.data.story.content)
        })
      },
      loadCacheVersion ({ commit }) {
        return this.$storyapi.get(`cdn/spaces/me`).then((res) => {
          commit('SET_CACHE_VERSION', res.data.space.version)
        })
      },
      signup ({commit, dispatch, state}, authData) {
        return authAxios.post('/signupNewUser?key=AIzaSyCzChegtHjQsvfkT8VBLJ6sModIFkAIwqQ', {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
          .then(res => {
            console.log('res ====', res)

            commit('AUTH_USER', {
              idToken: res.data.idToken,
              userId: res.data.localId,
              email: res.data.email
            })
            const now = new Date()
            const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
            window.localStorage.setItem('token', res.data.idToken)
            window.localStorage.setItem('userId', res.data.localId)
            window.localStorage.setItem('email', res.data.email)
            window.localStorage.setItem('expirationDate', expirationDate)
            // commit('AUTH_USER', {
            //   token: res.data.idToken,
            //   userId: res.data.localId,
            //   email: res.data.email
            // })
            console.log('authData ---- ', authData)
            dispatch('storeUser', authData)
            dispatch('setLogoutTimer', res.data.expiresIn)
            alert('Thank you for signing up, you are being redirected to the sign in page')
            this.app.router.push('/signin')
          })
          .catch(error => console.log('iiii', error))
      },
      login ({commit, dispatch, state}, authData) {
        authAxios.post('/verifyPassword?key=AIzaSyCzChegtHjQsvfkT8VBLJ6sModIFkAIwqQ', {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log('response ==', res)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          window.localStorage.setItem('token', res.data.idToken)
          window.localStorage.setItem('userId', res.data.localId)
          window.localStorage.setItem('email', res.data.email)
          window.localStorage.setItem('expirationDate', expirationDate)
          commit('AUTH_USER', {
            token: res.data.idToken,
            userId: res.data.localId,
            email: res.data.email
          })
          this.app.router.replace('/')
          console.log(this.state)
          dispatch('setLogoutTimer', res.data.expiresIn)
        })
        .catch(error => {
          alert(error.message)
          // console.log(res)
          // throw error
        })
      },
      tryAutoLogin ({commit}) {
        console.log('trying to login again')
        const token = window.localStorage.getItem('token')
        console.log('state again', token)
        if (!token) {
          return
        }
        const expirationDate = window.localStorage.getItem('expirationDate')
        const now = new Date()
        if (now >= expirationDate) {
          return
        }
        const userId = window.localStorage.getItem('userId')
        const email = window.localStorage.getItem('email')
        commit('AUTH_USER', {
          token: token,
          userId: userId,
          email: email
        })
        alert('you have been autologin')
        this.app.router.push('/')
      },
      logout ({commit}) {
        commit('CLEAR_AUTH_DATA')
        window.localStorage.removeItem('expirationDate')
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('userId')
        window.localStorage.removeItem('email')
        alert('you have been logged out')
        this.app.router.replace('/')
      },
      setLogoutTimer ({ commit, dispatch }, expirationTime) {
        setTimeout(() => {
          dispatch('logout')
          commit('CLEAR_AUTH_DATA')
        }, expirationTime * 1000)
      },
      storeUser ({state}, userData) {
        const userCreateDate = new Date()
        const token = window.localStorage.getItem('token')
        const payload = { ...userData, userCreateDate}
        if (!token) {
          return
        }
        globalAxios.post('/users.json' + '?auth=' + token, payload)
          .then(res => {
            console.log('storeUser ==>', res)
            state.account = res.data.email
          })
          .catch(error => console.log(error))
      },
      newsletterSubscribe ({state, commit}, formData) {
        const formSubmitDate = new Date()
        // const formSubmitTime = new Date(now.getTime())
        let payload = {
          ...formData,
          loggedInEmail: state.email,
          formSubmitDate,
        }
        publicAxios.post('/newsletter-subs.json', payload)
          .then(result => {
            // console.log(form)
            commit('FORM_SUBMIT')
            this.$router.push('/form-submit')
          })
          .catch(e => console.log(e))
      }
    },

    getters: {
      user (state) {
        return state.email
      },
      isAuthenticated (state) {
        return state.idToken != null
      },
      hasAccount (state) {
        return state.account != null
      }
    }
  })
}

export default createStore
