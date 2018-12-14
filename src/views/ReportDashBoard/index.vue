<template>
  <v-app>
    <v-navigation-drawer
      fixed
      clipped
      app
      v-model="drawer"
      mobile-break-point="600"
      width="200"
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile>
            <v-avatar size="36" class="teal mr-3">
              <span class="white--text headline">{{ user_info.first_name.charAt(0) }}</span>
            </v-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ user_info.first_name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile>
          <v-list-tile-action>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link class="side-link" to='/dashboard'>Dashboard</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link class="side-link" to='/report-dashboard'>Report Center</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="info_dialog = true">
          <v-list-tile-action>
            <v-icon>fingerprint</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Edit Personal Info</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout_dialog = true">
          <v-list-tile-action>
            <v-icon>cloud_off</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-dialog v-model="logout_dialog" max-width="350">
      <v-card>
        <v-card-title class="headline">Are you sure to log out?</v-card-title>
        <v-card-text>*All changes will be saved automatically</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="logout_dialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native="logOut()">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="info_dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="First name" required v-model="user_info.first_name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Middle name" v-model="user_info.middle_name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Last name"
                  required
                  v-model="user_info.last_name"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  label="Organization"
                  required
                  v-model="user_info.organization"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  label="Position"
                  required
                  v-model="user_info.position"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="info_dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="updataInfo()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-toolbar color="primary" 
      dark 
      fixed 
      app 
      clipped-left
    >
      <v-btn icon @click="drawer = !drawer">
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-toolbar-title>DashBoard</v-toolbar-title>
    </v-toolbar>

    <v-content id="panel">
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex xs12 sm12>
            <v-card raised>
              <v-card id="table-title" raised>
                <div>
                  <h3 class="title-text">Crossings to Be Reported</h3>
                </div>
              </v-card>
              <v-data-table
                :headers="headers"
                :items="crossing_list"
                item-key="crossing_id"
                :loading="table_loading"
                class="elevation-1"
              >
                <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                <template slot="items" slot-scope="props">
                  <td class="text-xs-right">{{ props.item.crossing_info.crossing_id }}</td>
                  <td class="text-xs-right">{{ props.item.crossing_info.subdivision }}</td>
                  <td class="text-xs-right">
                    <v-chip :color="getLabelColor(props.item.crossing_info.type)" text-color="white" disabled>
                      <v-avatar>
                        <v-icon>label</v-icon>
                      </v-avatar>
                      {{ props.item.crossing_info.type }}
                    </v-chip>
                  </td>
                  <td class="text-xs-right">
                    <v-chip disabled :color="getStatusColor(props.item.crossing_info.status)" text-color="white">
                      <v-avatar>
                        <v-icon 
                          v-if="props.item.crossing_info.status === 'initial'"
                        >content_paste</v-icon>
                        <v-icon
                          v-else-if="props.item.crossing_info.status === 'incomplete'"
                        >info</v-icon>
                        <v-icon
                          v-else
                        >check_circle</v-icon>
                      </v-avatar>
                      {{ props.item.crossing_info.status }}
                    </v-chip>
                  </td>
                  <td class="justify-center layout px-0">
                    <v-btn 
                      color="primary"
                      dark
                      @click.stop="gotoReport(props.item.crossing_info.crossing_id)">See Report</v-btn>
                  </td>
                </template>
                <template v-if="!table_loading" slot="no-data">
                  <v-alert :value="true" color="warning" icon="warning">
                    {{ table_msg }}
                  </v-alert>
                </template>
              </v-data-table>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import crossingData from '@/views/MapList/temp_list.json'
import db from '@/utils/firestore'

export default {
  name: 'ReportDashBoard',
  data () {
    return {
      drawer: true,
      logout_dialog: false,
      info_dialog: false,
      user_info: {
        first_name: '',
        middle_name: '',
        last_name: '',
        organization: '',
        position: '',
        type: ''
      },
      // table data
      table_loading: true,
      table_msg: 'Your current list is empty, you can add from map',
      selected: [],
      headers: [
        { text: 'Crossing ID', align: 'right', value: 'crossing_id' },
        { text: 'Subdivision', align: 'right', value: 'subdivision' },
        { text: 'Crossing Type', align: 'right', value: 'type' },
        { text: 'Status', align: 'center', value: 'status' },
        { text: 'Actions', value: 'action', align: 'center', sortable: false }
      ],
      crossing_list: []
    }
  },
  methods: {
    logOut () {
      this.$store.dispatch('userSignOut')
    },
    updataInfo () {
      this.info_dialog = false
      this.$firestoreRefs.user_info.set({
        first_name: this.user_info.first_name,
        middle_name: this.user_info.middle_name,
        last_name: this.user_info.last_name,
        organization: this.user_info.organization,
        position: this.user_info.position,
        modify_date: new Date()
      })
    },
    gotoReport (id) {
      // this.$router.push(`/form?id=${id}&type=${type}`)
      this.$router.push({ path: `/report/${id}` })
    },
    getLabelColor (type) {
      if (type.includes('AWS')) {
        return 'orange darken-1'
      } else if (type.includes('WIS')) {
        return 'cyan darken-1'
      } else if (type.includes('WSS')) {
        return 'teal darken-1'
      } else {
        return 'purple darken-1'
      }
    },
    getStatusColor (status) {
      if (status === 'initial') {
        return 'primary'
      } else if (status === 'incomplete') {
        return 'amber'
      } else {
        return 'success'
      }
    }
  },
  created: function () {
    console.log(this.$store)
    const object = this
    db.collection('users').doc(this.$store.state.uid).get().then(function (doc) {
      object.user_info = doc.data()
      if (!object.user_info.type) {
        object.$bind('crossing_list', db.collection(`report_list/${object.$store.state.uid}/current_list`))
          .then((doc) => {
            object.table_loading = false
          })
          .catch((error) => {
            object.table_msg = 'There is a problem when feteching the data'
            console.log('error in loading: ', error)
          })
      } else {
        object.$bind('crossing_list', db.collection(`receive_list/${object.$store.state.email}/current_list`))
          .then((doc) => {
            object.table_loading = false
          })
          .catch((error) => {
            object.table_msg = 'There is a problem when feteching the data'
            console.log('error in loading: ', error)
          })
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#panel {
  background-color: #f6f7fd;
}

.title-text {
  color: rgba(255, 255, 255, 0.8);
  line-height: 60px;
  font-size: 24px;
}

.form-btn {
  width: 200px;
}

.crossing-title {
  height: 40px;
  line-height: 40px;
}

#table-title {
  width: 90%;
  margin: auto;
  text-align: center;
  border-radius: 10px;
  height: 60px !important;
  top: -30px;
  background-color: #03A9F4;
}

.side-link {
  color: inherit;
  text-decoration: none;
}
</style>
