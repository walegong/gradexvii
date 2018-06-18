<template>
  <v-app>
    <v-toolbar color="indigo" dark tabs app>
      <v-btn icon @click.stop="goBack()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>Crossing ID: {{ crossingId }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat @click.stop="saveChange()">
        save
      </v-btn>
      <v-tabs
        slot="extension"
        v-model="tab_index"
        color="indigo"
        grow
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-for="item in tab_name" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <v-tabs-items v-model="tab_index">
          <v-tab-item :key="tab_name[0]">
            <general-card :info="tab_name[0]"></general-card>
          </v-tab-item>

          <v-tab-item :key="tab_name[1]">
            <crossing-general-card :info="tab_name[1]"></crossing-general-card>
          </v-tab-item>

          <v-tab-item :key="tab_name[2]">
            <geometry-card :info="tab_name[2]"></geometry-card>
          </v-tab-item>

          <v-tab-item :key="tab_name[3]">
            <traffic-card></traffic-card>
          </v-tab-item>

          <v-tab-item :key="tab_name[4]">
            <t-s-b-card></t-s-b-card>
          </v-tab-item>

          <v-tab-item :key="tab_name[5]">
            <info-sharing-card></info-sharing-card>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import db from '@/utils/firestore'
// import firebase from 'firebase'
import GeneralCard from '@/views/CrossingInfo/components/GeneralCard'
import CrossingGeneralCard from '@/views/CrossingInfo/components/CrossingGeneralCard'
import GeometryCard from '@/views/CrossingInfo/components/GeometryCard'
import TrafficCard from '@/views/CrossingInfo/components/TrafficCard'
import TSBCard from '@/views/CrossingInfo/components/TSBCard'
import InfoSharingCard from '@/views/CrossingInfo/components/InfoSharingCard'

export default {
  name: 'CrossingInfo',
  components: {
    GeneralCard,
    CrossingGeneralCard,
    GeometryCard,
    TrafficCard,
    TSBCard,
    InfoSharingCard
  },
  data () {
    return {
      crossingId: null,
      crossing: null,
      tab_index: null,
      tab_name: [
        'General', 'Crossing General', 'Crossing Geometry', 'Crossing Traffic', 'Crossing TSB', 'Crossing Info Sharing'
      ]
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    saveChange () {
      this.$router.go(-1)
    }
  },
  created: function () {
    this.crossingId = this.$route.params.id
    const data = require('./mock.json')
    this.crossing = data.crossing
    // db.collection('crossing').where('crossing_id', '==', crossingId)
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach(function (doc) {
    //       const data = doc.data()
    //       // console.log(data)
    //       self.crossing_info = {
    //         id: crossingId,
    //         type: crossingType,
    //         region: data.region,
    //         subdivision: data.subdivision,
    //         railway: data.railway,
    //         address: data.address,
    //         last_inspector: data.last_inspector,
    //         last_inspect_date: data.last_inspect_date
    //       }
    //     })
    //   })
    //   .catch(function (error) {
    //     console.log('Error getting documents: ', error)
    //   })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>