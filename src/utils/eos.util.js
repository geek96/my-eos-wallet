import EosApi from 'eosjs-api'

const options = {
  httpEndpoint: 'http://dev.cryptolions.io:38888',
  chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
  verbose: false
}

export const eosutil =  EosApi(options)