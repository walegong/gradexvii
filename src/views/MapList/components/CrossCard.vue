<template>
  <!-- <v-layout row wrap>
    <v-flex sm10 xs10 offset-xs1 offset-sm1>
      <v-card>
        <p>test</p>
        <p>test</p>
      </v-card>
    </v-flex>
  </v-layout> -->
  <v-flex>
    <v-card class="info-card" v-on:click.capture="cross.select = !cross.select;" v-bind:class="{ active: cross.select }">
      <!-- <v-checkbox v-model="cross.select" color="indigo" hide-details></v-checkbox> -->
      <v-layout row wrap>
        <v-flex sm10 xs10>
          <p class="cross-id">{{ cross.id }}</p>
        </v-flex>
        <v-flex sm1 xs1>
          <v-checkbox v-model="cross.select" color="indigo" hide-details></v-checkbox>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-list dense>
        <!-- <v-list-tile>
          <v-list-tile-avatar>
            <v-icon>directions_car</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ cross.length + 'km' }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->

        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon>label</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ cross.location_id }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon>map</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ cross.region }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon>traffic</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ cross.cross_note }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- <v-list-tile>
          <v-list-tile-avatar>
            <v-icon>account_circle</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ cross.people }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon>phone</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ cross.telephone }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->

        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon>place</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ cross.address }}</v-list-tile-title>
            <!-- <v-list-tile-sub-title>{{ cross.region }}</v-list-tile-sub-title> -->
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'CrossCard',
  props: ['cross'],
}
</script>

<style scoped>
.info-card {
  width: 90%;
  margin-left: 5%;
}

.active {
  background-color: rgb(197, 202, 233) !important;
}

.cross-id {
  margin: auto;
  font-weight: bold;
  font-size: 1.6em;
  color: rgb(40, 53, 147);
}
</style>
