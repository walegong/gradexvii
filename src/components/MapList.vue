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
          <img :src="user_avatar" style="width: 60px; height: 60px; border-radius: 50%;"/>
        </v-flex>
        <v-flex sm8 offset-sm1 class="pt-2">
          <v-list-tile-title style="font-size: 1.5em;">{{ user_name }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ user_email }}</v-list-tile-sub-title>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex sm12>
          <v-card>
            <v-list>
              <v-list-group v-for="item in nav_items" :value="item.active" v-bind:key="item.title">
                <v-list-tile slot="item" @click="">
                  <v-list-tile-action>
                    <v-icon>{{ item.action }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon>keyboard_arrow_down</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile v-for="subItem in item.items" v-bind:key="subItem.title" @click="">
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
          <v-btn large color="indigo" class="white--text" id="submit-button">
            <v-badge left color="green">
              <span slot="badge">{{ cross_list.filter(cross => {return cross.select === true}).length }}</span>
              <v-icon left dark>assignment</v-icon>
            </v-badge>
            Make Inspection List
            <v-icon right dark>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
        <v-flex id="select-panel">
          <v-container fluid grid-list-sm>
            <v-layout row wrap>
              <v-flex xs12 sm12 v-for="item in cross_list.filter(cross => {return cross.select === true})" :key="item.id">
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
      <google-map :center="center" :zoom="14" style="width: 100%; height: 100%;">
        <google-cluster>
          <google-marker v-for="m in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position" :key="m.id"></google-marker>
        </google-cluster>
      </google-map>
    </v-flex>
  </v-layout>
</template>

<script>
import CrossCard from '@/components/CrossCard'
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBzlLYISGjL_ovJwAehh6ydhB56fCCpPQw'
  },
  // Demonstrating how we can customize the name of the components
  installComponents: false,
});

Vue.component('google-map', VueGoogleMaps.Map);
Vue.component('google-marker', VueGoogleMaps.Marker);
Vue.component('google-cluster', VueGoogleMaps.Cluster);

export default {
  name: 'MapList',
  components: {
    CrossCard,
  },
  data () {
    return {
      drawer: null,
      select_list: [
        "87612",
        "02526",
        "14566",
      ],
      cross_list: [
        {
          id: "75453",
          component: "A",
          length: "56.3",
          cross_note: "AWS + WIS + WSS",
          people: "Jay Marsh",
          telephone: "479-097-3162",
          address: "8731 Leuschke Roaods",
          region: "East Audie",
          image_path: "/static/cross_1.jpg",
          select: false,
        },
        {
          id: "02526",
          component: "A",
          length: "17.3",
          cross_note: "PCI",
          people: "Jayden Collins",
          telephone: "418-859-2504",
          address: "940 Johnston Club",
          region: "North Clearborough",
          image_path: "/static/cross_2.jpg",
          select: false,
        },
        {
          id: "87612",
          component: "B",
          length: "247.4",
          cross_note: "AWS + WSS",
          people: "Allen Hughes",
          telephone: "177-485-3053",
          address: "62 Paucek Mews",
          region: "Cutkowskichester",
          image_path: "/static/cross_3.jpg",
          select: false,
        },
        {
          id: "14566",
          component: "C",
          length: "12.5",
          cross_note: "AWS",
          people: "Billy Wikins",
          telephone: "140-971-1800",
          address: "069 Brakus Burg",
          region: "West Jeanie",
          image_path: "/static/cross_4.jpg",
          select: false,
        },
      ],
      cross_dict: {
        "75453": {
          id: "75453",
          component: "A",
          length: "56.3",
          cross_note: "AWS + WIS + WSS",
          people: "Jay Marsh",
          telephone: "479-097-3162",
          address: "8731 Leuschke Roaods",
          region: "East Audie",
          image_path: "/static/cross_1.jpg",
          select: false,
        },
        "02526": {
          id: "02526",
          component: "A",
          length: "17.3",
          cross_note: "PCI",
          people: "Jayden Collins",
          telephone: "418-859-2504",
          address: "940 Johnston Club",
          region: "North Clearborough",
          image_path: "/static/cross_2.jpg",
          select: false,
        },
        "87612": {
          id: "87612",
          component: "B",
          length: "247.4",
          cross_note: "AWS + WSS",
          people: "Allen Hughes",
          telephone: "177-485-3053",
          address: "62 Paucek Mews",
          region: "Cutkowskichester",
          image_path: "/static/cross_3.jpg",
          select: false,
        },
        "14566": {
          id: "14566",
          component: "C",
          length: "12.5",
          cross_note: "AWS",
          people: "Billy Wikins",
          telephone: "140-971-1800",
          address: "069 Brakus Burg",
          region: "West Jeanie",
          image_path: "/static/cross_4.jpg",
          select: false,
        },
      },
      avail_list: [
        "75453",
        "02526",
        "87612",
        "14566",
      ],
      user_name: "Brian Smith",
      user_email: "brian.smith@transport.gc.ca",
      user_avatar: "https://randomuser.me/api/portraits/men/85.jpg",
      list_option: "avail",
      nav_items: [
        {
          action: "assessment",
          title: "Inspection List",
          active: true,
          items: [
            { title: "Refresh Inspection List" },
            { title: "Upload Completed Surveys" },
          ],
        },
        {
          action: "settings",
          title: "Settings",
          items: [
            { title: "Foo" },
            { title: "Bar" },
          ],
        },
        {
          action: "account_circle",
          title: "Account",
          items: [
            { title: "Log Out" },
          ],
        },
      ],
      // Map Data
      center: {
        lat: 43.470144,
        lng: -80.546129,
      },
      markers: [{
        id: 1,
        position: {
          lat: 43.472947,
          lng: -80.542191,
        }
      }, 
      {
        id: 2,
        position: {
          lat: 43.471623,
          lng: -80.542363,
        }
      },
      {
        id: 3,
        position: {
          lat: 43.472363,
          lng: -80.546794,
        }
      },
      {
        id: 4,
        position: {
          lat: 43.470954,
          lng: -80.540378,
        }
      },],
    }
  },
  methods: {
    addToList(cross_id) {
      this.select_list.push(cross_id);
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
  background-color: #EEE;
  min-height: 100%;
  max-height: 100%;
  margin-top: 64px;
  text-align: center;
}

#mapview {
  background: linear-gradient(to bottom, #33ccff 0%, #ff99cc 100%);; 
  min-height: 100%;
  max-height: 100%;
  margin-top: 64px;
}

#select-num {
  border-radius: 50%;
  background-color: #3F51B5;
  width: 32px;
  height: 32px;
  color: white;
}

#user-info {
  background-color: #EEE;
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
