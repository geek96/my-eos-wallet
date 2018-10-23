<template>
  <div class="ui grid">
    <div class="ten wide column">
      <p v-if="tx">{{tx}}</p>
      <p v-if="err">{{err}}</p>
      <div class="ui large form">
        <div class="two fields">
          <div class="field">
            <label>Receiver:</label>
            <input placeholder="eos account name" type="text" v-model="opts.to">
          </div>
          <div class="field">
            <label>Quantity:</label>
            <input placeholder="number of tokens" type="number" v-model="opts.qty">
          </div>
        </div>
        <div class="field">
          <label>Memo:</label>
          <textarea rows="2" placeholder="memo" v-model="opts.memo"></textarea>
        </div>
        <button @click.prevent="issueToken" class="ui submit positive button">Issue Token</button>
      </div> 
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import ScatterUtil from '@/utils/scatter.util'
export default {
  data () {
    return {
      opts: {
        to: '',
        qty: 0,
        memo: ''
      },
      err: null,
      tx: null
    }
  },
  computed: {
    ...mapGetters({      
      'accountName': 'getAccountName',
    })
  },
  methods: {
    issueToken() {
      const opts = {
        contract: 'dhgtoken1111',
        symbol: 'DGH',
        ...this.opts
      }
      new ScatterUtil().callAction(opts).then(tx => {
        this.tx = tx
      }).catch(err => {
        this.err = err
      })
    }
  }
}
</script>

<style>

</style>
