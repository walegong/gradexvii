<template>
  <v-card  class="pl-2 pr-3">
    <v-layout wrap>
      <v-flex xs2 sm2>
        <v-subheader>Type</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-select single-line disabled></v-select>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>TC ID</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Access </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-select single-line disabled></v-select>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>Railway </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-select single-line disabled></v-select>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Jurisdiction </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-select single-line disabled></v-select>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader> Prov. </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-select single-line disabled></v-select>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Subdivision </v-subheader>
      </v-flex>
      <v-flex xs1 sm1>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>
      <v-flex xs3 sm3>
        <v-select single-line disabled></v-select>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>Key Route </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-select single-line disabled></v-select>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Spur </v-subheader>
      </v-flex>
      <v-flex xs1 sm1>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>
      <v-flex xs3 sm3>
        <v-select single-line disabled></v-select>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>GCR Appl. </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-select single-line disabled></v-select>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Pedestrain Protection </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-select single-line disabled></v-select>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>Whis. Cess. </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-select single-line disabled></v-select>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Passive Protection </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-select single-line disabled></v-select>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>WC Prov. </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>AWS Protection </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-select single-line disabled></v-select>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>WC Auth. </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Track Circuit </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-select single-line disabled></v-select>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>Rd. Class 1 </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-select single-line disabled></v-select>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>LED Lights </v-subheader>
      </v-flex>
      <v-flex xs1 sm1>
        <v-select single-line disabled></v-select>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>Data Recorder </v-subheader>
      </v-flex>
      <v-flex xs1 sm1>
        <v-select single-line disabled></v-select>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>Rd. Type </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-select single-line disabled></v-select>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Road Name/Hwy# </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>Rd. Class 2 </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-select single-line disabled></v-select>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Road Auth. #1 </v-subheader>
      </v-flex>
      <v-flex xs8 sm8>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>
      <v-flex xs2 sm2>
        <v-checkbox label="private" single-line disabled></v-checkbox>
      </v-flex>
      
      <v-flex xs2 sm2>
        <v-subheader>Road Auth. #2 </v-subheader>
      </v-flex>
      <v-flex xs8 sm8>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>
      <v-flex xs2 sm2>
        <v-checkbox label="private" single-line disabled></v-checkbox>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Exemption </v-subheader>
      </v-flex>
      <v-flex xs2 sm2>
        <v-select single-line disabled></v-select>
      </v-flex>
      <v-flex xs8 sm8>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Last Inspected</v-subheader>
      </v-flex>
      <v-flex xs3 sm3>
        <v-text-field single-line disabled></v-text-field>         
      </v-flex>
      <v-flex xs1 sm1>
        <v-subheader>By </v-subheader>
      </v-flex>
      <v-flex xs6 sm6>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Last Comp.A Insp</v-subheader>
      </v-flex>
      <v-flex xs3 sm3>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>
      <v-flex xs1 sm1>
        <v-subheader>By </v-subheader>
      </v-flex>
      <v-flex xs6 sm6>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>In Service From</v-subheader>
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
        <v-subheader>Status </v-subheader>
      </v-flex>
      <v-flex xs3 sm3>
        <v-select single-line disabled></v-select>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'CrossingGeneralCard',
  props: ['info']
}
</script>

<style scoped>
</style>
