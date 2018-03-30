<template>
  <v-layout>
    <v-toolbar color="indigo" dark fixed>
      <v-btn icon>
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-toolbar-title>Login</v-toolbar-title>
    </v-toolbar>

    <v-flex xs10 sm10 id="panel">
      <v-card>
        <!-- <v-card-media
          class="white--text"
          height="300px"
          src="/static/crossing.jpg"
        > -->
        <v-card-media
          class="white--text"
          height="200px"
          :src="require('@/assets/crossing.jpg')"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">Grade X by ITSS-Lab</span>
                <div class="mt-2">Transport Canada <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8v%0D%0Ad3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMDAiIGhlaWdodD0iNTAwIj48cmVjdCB3aWR0%0D%0AaD0iMTAwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiNmMDAiLz48cmVjdCB3aWR0aD0iNTAwIiBoZWln%0D%0AaHQ9IjUwMCIgZmlsbD0iI2ZmZiIgeD0iMjUwIi8+PHBhdGggZmlsbD0iI2ZmMDAwMCIgZD0ibSA0%0D%0AOTkuOTkyMjgsNDYuODc1IC0zNC4xMTMxMiw2My42MjUyOSBjIC0zLjg3MDg2LDYuOTE1MDEgLTEw%0D%0ALjgwNjI3LDYuMjczNjMgLTE3Ljc0MTY5LDIuNDExMzggbCAtMjQuNjk2OTksLTEyLjc4ODU4IDE4%0D%0ALjQwNzA1LDk3LjcyNzExIGMgMy44NzA4NiwxNy44NTQxOSAtOC41NDg1OSwxNy44NTQxOSAtMTQu%0D%0ANjc3NjUsMTAuMTM0MzUgbCAtNDMuMTAxMDUsLTQ4LjI1MDk5IC02Ljk5NzM4LDI0LjUwMyBjIC0w%0D%0ALjgwNjkyLDMuMjE3NzcgLTQuMzU0ODEsNi41OTc0NCAtOS42Nzc0OCw1Ljc5MjYxIGwgLTU0LjUw%0D%0AMTc3LC0xMS40NTkxMiAxNC4zMTUyNCw1Mi4wNDQ3NSBjIDMuMDY0NTEsMTEuNTgwNTQgNS40NTQ5%0D%0ALDE2LjM3NTI4IC0zLjA5Mzc1LDE5LjQyOTU5IGwgLTE5LjQyNjE5LDkuMTMwMjUgOTMuODIxMjcs%0D%0ANzYuMjA4MzggYyAzLjcxMzUsMi44ODE1MSA1LjU4OTcxLDguMDY3IDQuMjY3NjgsMTIuNzYyMSBs%0D%0AIC04LjIxMTM2LDI2Ljk0NzA3IGMgMzIuMzA0MDUsLTMuNzIzNzEgNjEuMjQ4OTgsLTkuMzI1OTQg%0D%0AOTMuNTY5MzksLTEyLjc3NjE5IDIuODUzMjMsLTAuMzA0NTkgNy42Mjk4OCw0LjQwNDA4IDcuNjEw%0D%0AMjksNy43MTA1OCBsIC00LjI4MDI0LDk4LjcyMzQyIDE1LjcwNjM5LDAgLTIuNDcyMzcsLTk4LjUx%0D%0AMTcgYyAtMC4wMTk3LC0zLjMwNjUgNC4zMTM3MiwtOC4yMjY4OSA3LjE2Njk1LC03LjkyMjMgMzIu%0D%0AMzIwNDEsMy40NTAyNiA2MS4yNjUzOCw5LjA1MjQ4IDkzLjU2OTQyLDEyLjc3NjE5IGwgLTguMjEx%0D%0AMzQsLTI2Ljk0NzA3IGMgLTEuMzIyMDMsLTQuNjk1MSAwLjU1NDE3LC05Ljg4MDU5IDQuMjY3Njcs%0D%0ALTEyLjc2MjEgbCA5My44MjEyNSwtNzYuMjA4MzggLTE5LjQyNjE3LC05LjEzMDI1IGMgLTguNTQ4%0D%0ANjcsLTMuMDU0MzEgLTYuMTU4MjgsLTcuODQ5MDUgLTMuMDkzNzcsLTE5LjQyOTU5IGwgMTQuMzE1%0D%0AMjcsLTUyLjA0NDc1IC01NC41MDE4LDExLjQ1OTEyIGMgLTUuMzIyNjcsMC44MDQ4MyAtOC44NzA1%0D%0ANiwtMi41NzQ4NCAtOS42Nzc1LC01Ljc5MjYxIGwgLTYuOTk3MzcsLTI0LjUwMyAtNDMuMTAxMDMs%0D%0ANDguMjUwOTkgYyAtNi4xMjkwOCw3LjcxOTg0IC0xOC41NDg1NCw3LjcxOTg0IC0xNC42Nzc2OCwt%0D%0AMTAuMTM0MzUgbCAxOC40MDcwMiwtOTcuNzI3MTEgLTI0LjY5Njk0LDEyLjc4ODU4IGMgLTYuOTM1%0D%0ANTksMy44NjIyNSAtMTMuODcwODMsNC41MDM2MyAtMTcuNzQxNywtMi40MTEzOCIvPjwvc3ZnPg==" style="width:28px;height:14px;"></div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <v-form v-model="valid" id="loginform">
            <v-text-field
              label="Email Address"
              v-model="username"
              :rules="usernameRules"
              required
            ></v-text-field>
            <v-text-field
              label="Password"
              v-model="password"
              :rules="passwordRules"
              required
            ></v-text-field>
          </v-form>
        </v-card-title>
        <v-layout row wrap>
          <v-flex sm12 xs12 class="text-sm-center text-xs-center">
            <v-btn color="indigo" large id="login" dark @click.stop="login()">Login</v-btn>
          </v-flex>
          <v-flex sm12 xs12 class="text-sm-center text-xs-center mb-4 mt-2">
            <a v-on:click="dialog=true;">Forget Password?</a>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>

    <!-- Modal Dialog -->
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Reset Password</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs10 sm10 offset-xs1 offset-sm1>
                <v-text-field label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs10 sm10 offset-xs1 offset-sm1>
                <p>*indicates required field</p>
                <p>An email with password reset link will be sent to your email address.</p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      // login part
      valid: false,
      username: '',
      usernameRules: [
        (v) => !!v || 'Email Address is required'
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required'
      ],
      dialog: false
    }
  },
  methods: {
    login () {
      this.$router.push({ path: '/maplist' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#panel {
  margin: auto;
}

.headline {
  font-weight: bold;
  font-size: 2em !important;
}

#loginform {
  width: 80%;
  margin: auto;
}

#login {
  width: 200px;
}
</style>
