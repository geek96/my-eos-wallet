<template>
  <div class="ui" id="app">    
    <NavBar />   
    <div class="ui container segment">
      <div class="ui grid">
        <div class="sixteen wide column">
          <sui-menu pointing secondary :widths="3">
            <router-link is="sui-menu-item" active-class="active" to="/transfer">Transfer Tokens</router-link>
            <router-link is="sui-menu-item" active-class="active" to="/view/balance">View Balance</router-link>
            <router-link is="sui-menu-item" active-class="active" to="/issue/tokens">Issue Tokens</router-link>            
          </sui-menu> 
          <transition name="fade" v-if="getMessage">
            <sui-message
              warning
              floating          
              attached="top"
              size="huge"
              :content="getMessage"
            />
          </transition>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import NavBar from '@/components/NavBar'
import Home from '@/views/Home'
import ScatterUtil from '@/utils/scatter.util'

export default {
  name: 'app',
  components: {
    NavBar,
    Home
  },
  computed: {
    ...mapGetters({
      'getMessage': 'getMessage'
    })
  },
  async mounted() {
    try {
      const su = new ScatterUtil()
      su.detectScatter()
    } catch (err) {
      this.$store.dispatch('setMessage', err)
    }
  }
}
</script>

<style>
</style>
