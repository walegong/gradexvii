<template>
  <v-card  class="pl-2 pr-3">
    <v-layout wrap>

      <v-flex xs2 sm2>
        <v-subheader>Long English</v-subheader>
      </v-flex>
      <v-flex xs10 sm10>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Long French</v-subheader>
      </v-flex>
      <v-flex xs10 sm10>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Status</v-subheader>
      </v-flex>
      <v-flex xs10 sm10>
        <v-select single-line disabled></v-select>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Type</v-subheader>
      </v-flex>
      <v-flex xs10 sm10>
        <v-select single-line disabled></v-select>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>In Service</v-subheader>
      </v-flex>
      <v-flex xs3 sm3>
        <v-text-field single-line disabled></v-text-field>   
      </v-flex>
      <v-flex xs1 sm1>
        <v-subheader>To</v-subheader>
      </v-flex>
      <v-flex xs2 sm2>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>
      <v-flex xs1 sm1>
        <v-subheader>Key Rt</v-subheader>
      </v-flex>
      <v-flex xs3 sm3>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Railway</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>Jurisdiction</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-select single-line disabled></v-select>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Subdivision</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>              
      <v-flex xs2 sm2>
        <v-subheader>Mile</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Spur</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>              
      <v-flex xs2 sm2>
        <v-subheader>Mile</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Province</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-select single-line disabled></v-select>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>Region</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-select single-line disabled></v-select>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Latitude</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>              
      <v-flex xs2 sm2>
        <v-subheader>Longitude</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled></v-text-field>
      </v-flex> 

      <v-flex xs2 sm2>
        <v-subheader>Nearest Muni</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>               
      <v-flex xs2 sm2>
        <v-subheader>Road/Hwy #Eng</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>GEO Text</v-subheader>
      </v-flex>
      <v-flex xs10 sm10>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Updated by</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>               
      <v-flex xs2 sm2>
        <v-subheader>on</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Memo</v-subheader>
      </v-flex>
      <v-flex xs10 sm10>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'GeneralCard',
  props: ['info']
}
</script>

<style scoped>
</style>
