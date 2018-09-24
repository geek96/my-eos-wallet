<template>
  <div class="ui grid">
    <div class="sixteen wide column">
      <div class="ui large form">
        <h3 class="ui dividing header">View account balance</h3>
        <div class="field">
         <input placeholder="eos account name" type="text" v-model="q">
        </div>
        <button @click.prevent="findAccount" class="ui submit positive button">Search</button>
      </div>      
    </div>
    <div class="eight wide column" v-if="info">
      <h3>Balance {{info.account_name}}</h3>
      <table class="ui compact celled striped table">
        <tbody>
          <tr>
            <th>DGH Balance:</th>
            <td>
              <p v-for="(token, i) in tokens" :key="i">{{token}}</p>
            </td>
          </tr>
          <tr>
            <th>Liqued EOS:</th>
            <td>{{info.core_liquid_balance}}</td>
          </tr>
          <tr>
            <th>Staked Network:</th>
            <td>{{info.total_resources.net_weight}}</td>
          </tr>
          <tr>
            <th>Staked CPU</th>
            <td>{{info.total_resources.net_weight}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="eight wide column" v-if="info">
      <h3>Resources</h3>
      
      <table class="ui compact celled striped table">
        <thead>
          <tr>
            <th>Ram Quota:</th>
            <td>
              <div class="ui left labeled button" tabindex="0">
                <a class="ui basic right pointing label">
                  {{info.ram_usage}}
                </a>
                <div class="ui icon button">
                  {{info.total_resources.ram_bytes}}
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>Network:</th>
            <td>
              <div class="ui left labeled button" tabindex="0">
                <a class="ui basic right pointing label">
                 {{info.net_limit.used}}
                </a>
                <div class="ui icon button">
                  {{info.net_limit.available}}
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>CPU:</th>
            <td>
              <div class="ui left labeled button" tabindex="0">
                <a class="ui basic right pointing label">
                 {{info.cpu_limit.used}}
                </a>
                <div class="ui icon button">
                  {{info.cpu_limit.available}}
                </div>
              </div>
            </td>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'viewBalance',
  data () {
    return {
      q: ''
    }
  },
  computed: {
    ...mapGetters({
      'info': 'getAccountInfo',
      'tokens': 'getTokens'
    })
  },
  methods: {
    findAccount() {
      this.$store.dispatch('fetchAccountInfo', this.q)
    }
  }
}
</script>

<style>

</style>
