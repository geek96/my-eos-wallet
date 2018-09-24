<template>
  <div>
    <div class="ui borderless large menu">
      <div class="ui container">
        <div class="item ui header">MyEOSWallet</div>
        <div class="right menu">
          <div class="item">
            <div  v-if="identity" class="ui buttons">              
              <button class="ui button">{{account.name}}@{{account.authority}}</button>
              <div class="or"  data-text="+"></div>
              <button @click="signout" class="ui positive button" >Signout</button>              
            </div>            
            <div v-else class="ui buttons">
              <button @click="attachAccount" class="ui positive button" >Attach Account</button>
              <div class="or"></div>
              <button @click="suggestNetwork" class="ui button" >Suggest Network</button>
            </div>
          </div>
        </div>
      </div>      
    </div>
    <transition name="fade" v-if="message">
      <sui-message
        header="Warning!"
        :content="message"
      />
    </transition>
  </div>
</template>

<script>
import ScatterUtil from '@/utils/scatter.util'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      message: null,
    }
  },
  computed: {
    ...mapGetters({
      'scatter': 'getScatter',
      'identity': 'getIdentity',
      'account': 'getAccount'
    })
  }, 
  methods: {
    attachAccount: async function () {
      try {
        new ScatterUtil().getIdentity()
      } catch (err) {
        this.$store.dispatch('setMessage', err)
      }
    },
    signout: async function() {
      try {
        new ScatterUtil().forgetIdentity()
      } catch (err) {
        this.$store.dispatch('setMessage', err)
      }
    },
    suggestNetwork: async function() {      
      try{
        new ScatterUtil().suggestNetwork()
      } catch(err) {
        this.$store.dispatch('setMessage', err)
      }
    }
  },
}
</script>

<style>

</style>
