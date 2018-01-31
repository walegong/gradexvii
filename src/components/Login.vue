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
        <v-card-media
          class="white--text"
          height="300px"
          src="/static/crossing.jpg"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">Grade X Inpection</span>
                <div class="mt-2">Transport Canada <img src="/static/canadian-flag.svg" style="width:28px;height:14px;"></div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <v-form v-model="valid" id="loginform">
            <v-text-field
              label="Username (Email Address)"
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
            <router-link to="/maplist">
              <v-btn color="indigo" large id="login" dark >Login</v-btn>
            </router-link>
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
                <v-text-field label="User Name"></v-text-field>
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
          (v) => !!v || 'Username is required',
      ],
      password: '',
      passwordRules: [
          (v) => !!v || 'Password is required',
      ],
      dialog: false,
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
