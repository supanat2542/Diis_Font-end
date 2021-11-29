import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
    },
    state: {
      admin: undefined,
    },
    getters: {
      admin: (state) => {
        return state.admin
      },
      // other getters
    },mutations: {
      SET_MESSAGE: (state, newValue) => {
        state.admin = newValue
      },
    },
    actions: {
      setMessage: ({commit, state}, newValue) => {
        commit('SET_MESSAGE', newValue)
        return state.admin
      },
      // other actions
    },
    plugins: [createPersistedState()],
    strict: process.env.DEBUGGING
  })

  return Store
}
