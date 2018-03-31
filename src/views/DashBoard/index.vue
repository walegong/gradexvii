<template>
  <v-layout>
    <v-toolbar color="purple" dark fixed>
      <v-btn icon>
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-toolbar-title>DashBoard</v-toolbar-title>
    </v-toolbar>

    <v-flex xs10 sm10 id="panel">
      <v-card>
        <v-layout row wrap>
          <v-flex sm12 xs12 class="text-sm-center text-xs-center">
            <v-btn 
              color="purple"
              dark
              large 
              class="form-btn"
              @click.stop="logOut()">Log Out</v-btn>
            <v-btn 
              color="purple"
              dark
              large 
              class="form-btn"
              @click.stop="jumpMap()">Map List</v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'DashBoard',
  data () {
    return {
    }
  },
  methods: {
    logOut () {
      this.$store.dispatch('userSignOut')
    },
    jumpMap () {
      this.$router.push('/maplist')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#panel {
  margin: auto;
}

.form-btn {
  width: 200px;
}
</style>
