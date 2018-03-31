<template>
  <v-app>
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
      fixed
      width="400"
      app
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
                <v-list-tile v-for="subItem in item.items" :key="subItem.title">
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

    <v-content>
      <v-container fluid fill-height class="pa-0">
        <v-layout row wrap>
          <!-- Left Panel -->
          <v-flex xs4 sm4 md3 id="crosslist">
            <v-btn-toggle mandatory v-model="list_option" id="selection-toggle" class="mb-2 mt-2">
              <v-btn value="avail">
                <span>Avail. Crossings</span>
              </v-btn>
              <v-btn value="select">
                <span>Selected Crossings</span>
              </v-btn>
            </v-btn-toggle>

            <!-- Available List -->
            <div v-if="list_option=='avail'">
              <v-flex xs12 sm12>
                <v-toolbar
                  color="white"
                  floating
                  dense
                >
                    <v-text-field prepend-icon="search" hide-details single-line v-model="search_condition"></v-text-field>
                    <v-btn icon @click.stop="search_condition=''">
                      <v-icon>delete</v-icon>
                    </v-btn>
                </v-toolbar>
              </v-flex>
              <v-flex xs12 sm12 id="avail-panel">
                <cross-card v-for="item in search_list" :key="item.id" v-bind:cross="item" @click.native="selectCross(item)"></cross-card>
              </v-flex>
            </div>

            <!-- Selected List -->
            <div v-else>
              <v-flex sm12 xs12>
                <v-btn large color="indigo" class="white--text" id="submit-button" @click.stop="makeInspection()">
                  <v-badge left color="green">
                    <span slot="badge">{{ select_list.length }}</span>
                    <v-icon left dark>assignment</v-icon>
                  </v-badge>
                  Make Inspection List
                  <v-icon right dark>keyboard_arrow_right</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs12 sm12 id="select-panel">
                <cross-card v-for="item in select_list" :key="item.id" v-bind:cross="item" @click.native="selectCross(item)"></cross-card>
              </v-flex>
            </div>
          </v-flex>

          <!-- Right Panel -->
          <v-flex xs8 sm8 md9 id="mapview">
            <google-map :center="center" :zoom="zoom_level" style="width: 100%; height: 100%;">
              <google-cluster>
                <google-info-window 
                  :options="info_options"
                  :position="current_cross.position"
                  :opened="info_win_open"
                  @closeclick="info_win_open=false"
                >
                  <v-btn depressed small color="primary" @click.stop="addToList()">Add to List</v-btn>
                  <div class="info-window-text">ID: {{ current_cross.id }}</div>
                  <a class="info-window-text" :href="`https://www.google.com/maps/search/?api=1&query=${current_cross.position.lat},${current_cross.position.lng}`">Navigate to this place</a>
                </google-info-window>
                <google-marker 
                  v-for="item in cross_list" 
                  :position="item.position" 
                  :clickable="true"
                  :icon="require('@/assets/road.svg')"
                  @click="toggleInfoWindow(item)" 
                  :key="item.id">
                </google-marker>
              </google-cluster>
            </google-map>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
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
Vue.component('google-info-window', VueGoogleMaps.InfoWindow)

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
      search_condition: '',
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
      info_options: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      zoom_level: 6,
      current_cross: {
        id: '',
        position: {
          lat: 52.368011,
          lng: -109.924447
        }
      },
      info_win_open: false
    }
  },
  methods: {
    makeInspection () {
      this.$router.push({ path: '/form' })
    },
    selectCross (cross) {
      cross.select = !cross.select
      this.center = cross.position
      this.zoom_level = 16
      this.current_cross.id = cross.id
      this.current_cross.position = cross.position
    },
    addToList () {
      this.cross_list.find(cross => {
        return cross.id === this.current_cross.id
      }).select = true
    },
    toggleInfoWindow (cross) {
      this.center = cross.position
      this.zoom_level = 16
      this.current_cross.id = cross.id
      this.current_cross.position = cross.position
      this.info_win_open = true
    }
  },
  computed: {
    select_list: function () {
      return this.cross_list.filter(cross => {
        return cross.select === true
      })
    },
    search_list: function () {
      return this.cross_list.filter(cross => {
        return cross.id.startsWith(this.search_condition)
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
  text-align: center;
}

#mapview {
  background: linear-gradient(to bottom, #33ccff 0%, #ff99cc 100%);
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
  overflow-y: auto;
  height: 580px;
}

#select-panel {
  overflow-y: auto;
  height: 550px;
}

.info-window-text {
  font-size: 1.4em;
}
</style>
