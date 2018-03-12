<template>
  <v-layout>
    <!-- Toolbar -->
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Grade X Inspection</v-toolbar-title>
    </v-toolbar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer
      temporary
      v-model="drawer"
      light
      absolute
      width="400"
    >
      <v-layout row wrap id="user-info" class="pt-4 pb-4">
        <v-flex sm2 offset-sm1 class="mt-auto">
          <img :src="user_info.user_avatar" style="width: 60px; height: 60px; border-radius: 50%;"/>
        </v-flex>
        <v-flex sm8 offset-sm1 class="pt-2">
          <v-list-tile-title style="font-size: 1.5em;">{{ user_info.user_name }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ user_info.user_email }}</v-list-tile-sub-title>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex sm12>
          <v-card>
            <v-list>
              <v-list-group
                v-model="item.active"
                v-for="item in nav_items"
                :key="item.title"
                :prepend-icon="item.action"
                no-action
              >
                <v-list-tile slot="activator">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click="">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon>{{ subItem.action }}</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list-group>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>

    <!-- Left Panel -->
    <v-flex xs4 sm4 id="crosslist">
      <v-btn-toggle v-model="list_option" id="selection-toggle" class="mb-2 mt-2">
        <v-btn value="avail">
          <span>Avail. Crossings</span>
        </v-btn>
        <v-btn value="select">
          <span>Selected Crossings</span>
        </v-btn>
      </v-btn-toggle>

      <!-- Available List -->
      <v-layout v-if="list_option=='avail'">
        <v-flex xs12 sm12>
          <v-toolbar
            color="white"
            floating
            dense
          >
              <v-text-field prepend-icon="search" hide-details single-line></v-text-field>
              <v-btn icon>
                <v-icon>my_location</v-icon>
              </v-btn>
          </v-toolbar>
        </v-flex>
        <v-flex id="avail-panel">
          <v-container fluid grid-list-sm>
            <v-layout row wrap>
              <v-flex xs12 sm12 v-for="item in cross_list" :key="item.id">
                <!-- <img class="image" v-bind:src="cross_dict[item].image_path" width="90%" height="90%"> -->
                <cross-card v-bind:cross="item"></cross-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>

      <!-- Selected List -->
      <v-layout v-else>
        <v-flex sm12 xs12>
          <v-btn large color="indigo" class="white--text" id="submit-button" @click="make_inspection()">
            <v-badge left color="green">
              <span slot="badge">{{ select_list.length }}</span>
              <v-icon left dark>assignment</v-icon>
            </v-badge>
            Make Inspection List
            <v-icon right dark>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
        <v-flex id="select-panel">
          <v-container fluid grid-list-sm>
            <v-layout row wrap>
              <v-flex xs12 sm12 v-for="item in select_list" :key="item.id">
                <!-- <img class="image" v-bind:src="cross_dict[item].image_path" width="90%" height="90%"> -->
                <cross-card v-bind:cross="item"></cross-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-flex>

    <!-- Right Panel -->
    <v-flex xs8 sm8 id="mapview">
      <!-- <iframe width="100%" height="100%" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=Ontario%20Pharma%20Research%20Chemicals&key=AIzaSyDlqAAPoRCfA0Uy9qMsKB0ldlwQC8pdoJ0" allowfullscreen></iframe> -->
      <google-map :center="center" :zoom="6" style="width: 100%; height: 100%;">
        <google-cluster>
          <google-marker v-for="m in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position" :key="m.id"></google-marker>
        </google-cluster>
      </google-map>
    </v-flex>
  </v-layout>
</template>

<script>
import CrossCard from '@/views/MapList/components/CrossCard'
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import CrossData from './db.json'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBzlLYISGjL_ovJwAehh6ydhB56fCCpPQw'
  },
  // Demonstrating how we can customize the name of the components
  installComponents: false
})

Vue.component('google-map', VueGoogleMaps.Map)
Vue.component('google-marker', VueGoogleMaps.Marker)
Vue.component('google-cluster', VueGoogleMaps.Cluster)

export default {
  name: 'MapList',
  components: {
    CrossCard
  },
  data () {
    return {
      drawer: null,
      cross_list: CrossData,
      user_info: {
        user_name: 'Brian Smith',
        user_email: 'brian.smith@transport.gc.ca',
        user_avatar: 'https://randomuser.me/api/portraits/men/85.jpg'
      },
      list_option: 'avail',
      nav_items: [
        {
          action: 'assessment',
          title: 'Inspection List',
          active: true,
          items: [
            { title: 'Refresh Inspection List' },
            { title: 'Upload Completed Surveys' }
          ]
        },
        {
          action: 'settings',
          title: 'Settings',
          items: [{ title: 'Foo' }, { title: 'Bar' }]
        },
        {
          action: 'account_circle',
          title: 'Account',
          items: [{ title: 'Log Out' }]
        }
      ],
      // Map Data
      center: {
        lat: 52.368011,
        lng: -109.924447
      },
      markers: [
        {
          id: 0,
          position: {
            lat: 51.04472,
            lng: -114.08874
          }
        },
        {
          id: 1,
          position: {
            lat: 51.00135,
            lng: -114.065
          }
        },
        {
          id: 2,
          position: {
            lat: 50.99771,
            lng: -114.06557
          }
        },
        {
          id: 3,
          position: {
            lat: 51.0555,
            lng: -114.1408
          }
        },
        {
          id: 4,
          position: {
            lat: 51.0815,
            lng: -114.184
          }
        },
        {
          id: 5,
          position: {
            lat: 50.9515,
            lng: -114.0736
          }
        },
        {
          id: 6,
          position: {
            lat: 50.9107,
            lng: -114.0704
          }
        },
        {
          id: 7,
          position: {
            lat: 50.90316,
            lng: -114.07048
          }
        },
        {
          id: 8,
          position: {
            lat: 50.89982,
            lng: -114.06924
          }
        },
        {
          id: 9,
          position: {
            lat: 50.8984,
            lng: -114.06836
          }
        },
        {
          id: 11,
          position: {
            lat: 51.66622,
            lng: -114.13666
          }
        },
        {
          id: 12,
          position: {
            lat: 51.70764,
            lng: -114.16327
          }
        },
        {
          id: 13,
          position: {
            lat: 51.73679,
            lng: -114.14179
          }
        },
        {
          id: 14,
          position: {
            lat: 51.78784,
            lng: -114.10635
          }
        },
        {
          id: 15,
          position: {
            lat: 51.79189,
            lng: -114.10445
          }
        },
        {
          id: 16,
          position: {
            lat: 50.5375,
            lng: -103.885
          }
        },
        {
          id: 17,
          position: {
            lat: 50.5,
            lng: -104.206
          }
        },
        {
          id: 18,
          position: {
            lat: 53.2797,
            lng: -113.54457
          }
        },
        {
          id: 19,
          position: {
            lat: 50.4844,
            lng: -104.343
          }
        },
        {
          id: 20,
          position: {
            lat: 50.4755,
            lng: -104.458
          }
        },
        {
          id: 21,
          position: {
            lat: 53.4248,
            lng: -113.4854
          }
        },
        {
          id: 22,
          position: {
            lat: 50.4782,
            lng: -104.5589
          }
        },
        {
          id: 23,
          position: {
            lat: 50.4597,
            lng: -104.5723
          }
        },
        {
          id: 24,
          position: {
            lat: 53.4468,
            lng: -113.4897
          }
        },
        {
          id: 25,
          position: {
            lat: 50.85492,
            lng: -113.01686
          }
        },
        {
          id: 26,
          position: {
            lat: 50.86321,
            lng: -113.05165
          }
        },
        {
          id: 27,
          position: {
            lat: 50.8706,
            lng: -113.0744
          }
        },
        {
          id: 28,
          position: {
            lat: 51.6632,
            lng: -105.4466
          }
        },
        {
          id: 29,
          position: {
            lat: 51.675,
            lng: -105.4796
          }
        },
        {
          id: 30,
          position: {
            lat: 50.877,
            lng: -113.167
          }
        },
        {
          id: 31,
          position: {
            lat: 51.707,
            lng: -105.584
          }
        },
        {
          id: 32,
          position: {
            lat: 51.76746,
            lng: -105.74898
          }
        },
        {
          id: 33,
          position: {
            lat: 53.0871,
            lng: -111.76
          }
        },
        {
          id: 34,
          position: {
            lat: 53.1093,
            lng: -111.833
          }
        },
        {
          id: 35,
          position: {
            lat: 53.2308,
            lng: -112.237
          }
        },
        {
          id: 36,
          position: {
            lat: 53.2698,
            lng: -112.368
          }
        }
      ]
    }
  },
  methods: {
    make_inspection () {
      this.$router.push({ path: '/form' })
    }
  },
  computed: {
    select_list: function () {
      return this.cross_list.filter(cross => {
        return cross.select === true
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#submit-button {
  height: 60px;
  width: 90%;
}

#crosslist {
  background-color: #eee;
  min-height: 100%;
  max-height: 100%;
  margin-top: 64px;
  text-align: center;
}

#mapview {
  background: linear-gradient(to bottom, #33ccff 0%, #ff99cc 100%);
  min-height: 100%;
  max-height: 100%;
  margin-top: 64px;
}

#select-num {
  border-radius: 50%;
  background-color: #3f51b5;
  width: 32px;
  height: 32px;
  color: white;
}

#user-info {
  background-color: #eee;
}

.mt-auto {
  margin-top: auto;
}

#avail-panel {
  position: fixed;
  overflow-y: auto;
  height: 80%;
  width: 34%;
  margin-top: 60px;
}

#select-panel {
  position: fixed;
  overflow-y: auto;
  height: 75%;
  width: 34%;
  margin-top: 70px;
}
</style>
