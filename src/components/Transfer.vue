<template>
  <form class="ui large form warning">
    <h3 class="ui dividing header">Transfer</h3>
    <div v-if="err" class="ui warning message">
      <div class="header">Error.</div>
      <pre>{{err}}</pre>
    </div>
    <div v-if="tx" class="ui warning message">
      <div class="header">Transaction Accepted By Network.</div>
      <pre>{{tx.transaction_id}}</pre>
    </div>    
    <div class="field">
      <label>Sender:</label>
      <input type="text" placeholder="from" v-model.trim="transfer.from"/>
    </div>
    <div class="field">
      <label>Receiver:</label>
      <input type="text" placeholder="to" v-model.trim="transfer.to"/>
    </div>
    <div class="two fields">
      <div class="twelve wide field">
        <label>Amount:</label>      
        <input type="text" v-model.trim="transfer.amount" placeholder="amount to send" />
      </div>
      <div class="four wide  field">
        <label>Symbol:</label>
        <select class="ui dropdown">
          <option v-for="sym in symbols" :key="sym" :value="sym">{{sym}}</option>
        </select>
      </div>
    </div>
    <div class="field">
      <label>Memo:</label>
      <textarea rows="2" v-model.trim="transfer.memo"></textarea>
    </div>
    <button v-if="identity" type="button" @click.prevent="doTransfer" class="ui submit primary button">Transfer</button>
    <div v-else class="ui warning message">
      <div class="header">Attach your account.</div>
      Attach your account to perform this action.
    </div>
      
  </form>
</template>

<script>
import {mapGetters} from 'vuex'
import ScatterUtil from '@/utils/scatter.util'

export default {
  data () {
    return {
      symbols: ['DGH'],
      transfer: {
        from: '',
        to: '',
        amount: 0,
        symbol: 'DGH',
        memo: ''
      },
      tx: null,
      err: null
    }
  },
  computed: {
    ...mapGetters({
      'accountName': 'getAccountName',
      'identity': 'getIdentity'
    })
  },
  watch: {
    accountName: function(newVal) {
      this.transfer.from = newVal
    }
  },
  methods: {
    doTransfer() {
      this.tx = null
      this.err = null
      new ScatterUtil().transfer(this.transfer).then(res=> {
        this.tx = res
      }).catch(err => {
        this.err = err
      })
    }
  }
}
</script>

<style>

</style>
