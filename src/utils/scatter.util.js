import ScatterJS from 'scatter-js/dist/scatter.esm'
import store from '@/store'
import eosjs from 'eosjs'

const network = {
  name: 'MyEosWallet Testnetwork',
  protocol: 'http',
  blockchain: 'eos',
  host: 'dev.cryptolions.io',
  port: 38888,
  chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
}
export default class ScatterUtil {

  getScatter() {
    return store.getters.getScatter
  }

  getEOS () {
    return this.getScatter().eos(network, eosjs, {
      chainId: network.chainId
    })
  }

  async detectScatter () {
    try {
      const connected = await ScatterJS.scatter.connect("MyEosWallet")
      if (!connected) {
        throw "Sorry! We are unable to detect the scatter plugin."  
      }

      store.dispatch('setScatter', ScatterJS.scatter)
      window.scatter = null

    }catch(err) {
      throw "Sorry! We are unable to detect the scatter plugin."
    }
  }

  suggestNetwork() {
    return new Promise(async (resolve, reject) => {
      try{
        const net = await this.getScatter().suggestNetwork(network)
        resolve(net)
      } catch(err) {
        reject(err)
      }
    })    
  }

  async getIdentity() {
    return new Promise(async (resolve, reject) => {
      const options = {
        accounts: [network]
      }
      try{
        const identity = await this.getScatter().getIdentity(options)
        store.dispatch('setIdentity', identity)
        resolve(identity)
      } catch(err) {
        reject(err)
      }
    })    
  }

  async forgetIdentity() {
    return new Promise(async (resolve, reject) => {
      try {
        await this.getScatter().forgetIdentity()
        store.dispatch('setIdentity', null)
        resolve(true)
      } catch (err) {
        reject (err)
      }
    })
  }

  getAuthOptions () {
    const acccount = store.getters.getAccount
    return {
      authorization: {
        'actor': acccount.name,
        'permission': acccount.authority
      }
    }
  }

  async callAction(opts) {
    return new Promise(async (resolve, reject) => {
      const eos = this.getEOS()
      try {
        const contract = await eos.contract(opts.contract)
        const qty =  `${parseFloat(opts.qty).toFixed(4)} ${opts.symbol}`
        const tx = await contract.issue({to: opts.to, quantity: qty, memo: opts.memo})
        resolve(tx)
      } catch(err) {
        reject(err)
      }
    })
  }

  async transfer(opts) {
    return new Promise(async (resolve, reject) => {
      try {
        const eos = this.getEOS()
        const acccount = store.getters.getAccount

        const actions = [
          {
            'account': 'dhgtoken1111',
            'name': 'transfer',
            'authorization': [{
              'actor': acccount.name,
              'permission': acccount.authority
            }],
            data: {
              'from':opts.from,
              'to': opts.to,
              'quantity':  `${parseFloat(opts.amount).toFixed(4)} ${opts.symbol}`,
              'memo': opts.memo
            }
          }
        ]
        
        eos.transaction({actions: actions}).then(r => {
          resolve(r)
        }).catch(r => {
          reject(r)
        })
      } catch(err) {        
        reject(err)
      }
    })
  }
}