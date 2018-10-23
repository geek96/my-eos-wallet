import Vue from 'vue'
import Vuex from 'vuex'
import {eosutil} from '@/utils/eos.util'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: null,
    scatter: null,
    identity: null,
    accountInfo: null,
    accountTokens: null
  },
  getters: {
    getMessage: state => state.message,
    getScatter: state => state.scatter,
    getIdentity: state => state.identity,
    getAccount: state => {
      if (state.identity  !== null) {
        return state.identity.accounts.find(b => b.blockchain === 'eos')        
      }
      return null
    },
    getAccountName: (state, getters) => {
      const account = getters.getAccount
      if ( account !== null) {
        return account.name
      }
      return null
    },
    getAccountInfo: state => state.accountInfo,
    getTokens: state => state.accountTokens
  },
  mutations: {
    setMessage (state, message) {
      state.message = message
    },
    setScatter (state, scatter) {
      state.scatter = scatter
    },
    setIdentity (state, identity) {
      state.identity = identity
    },
    setAccountInfo (state, payload) {
      state.accountInfo = payload
    },
    setAccountTokens (state, token) {
      state.accountTokens = token
    }
  },
  actions: {
    setMessage ({commit}, message) {
      commit('setMessage', message)
    },
    setScatter ({commit}, scatter) {
      commit('setScatter', scatter)
    },
    setIdentity ({commit}, identity) {
      commit('setIdentity', identity)
    },
    fetchCurrencyBalance ({commit}, opts) {
      eosutil.getCurrencyBalance(opts.code,opts.account, opts.symbol).then(res => {
        commit('setAccountTokens', res)
      }).catch((err) => {
        commit('setAccountTokens', null)
      })
    },
    fetchAccountInfo ({commit, dispatch}, account) {
      commit('setAccountInfo', null)
      commit('setAccountTokens', null)
      eosutil.getAccount(account).then(res => {
        commit('setAccountInfo', res)
        dispatch('fetchCurrencyBalance', {
          code: 'dhgtoken1111',
          account: account,
          symbol: 'DGH'
        })
      })
      
    }
  }
})
