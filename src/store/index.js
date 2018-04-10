import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    uid: null,
    email: null,
    error: null,
    loading: false
  },
  mutations: {
    setUid (state, payload) {
      state.uid = payload
    },
    setEmail (state, payload) {
      state.email = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    userSignUp ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          router.push('/login')
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    userSignIn ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUid', firebaseUser.uid)
          commit('setEmail', firebaseUser.email)
          commit('setLoading', false)
          commit('setError', null)
          router.push('/dashboard')
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    autoSignIn ({commit}, payload) {
      commit('setUid', payload.uid)
      commit('setEmail', payload.email)
    },
    userSignOut ({commit}) {
      firebase.auth().signOut()
      commit('setUid', null)
      commit('setEmail', null)
      router.push('/login')
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.uid !== null && state.uid !== undefined
    }
  }
})
