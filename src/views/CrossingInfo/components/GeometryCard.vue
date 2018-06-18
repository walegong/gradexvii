<template>
  <v-card  class="pl-2 pr-3">
    <v-layout wrap>
      <v-flex xs3 sm3>
        <v-subheader>#Track </v-subheader>
      </v-flex>
      <v-flex xs3 sm3>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>
      <v-flex xs3 sm3>
        <v-subheader>Rail Approach </v-subheader>
      </v-flex>
      <v-flex xs3 sm3>
        <v-select single-line disabled></v-select>
      </v-flex>

      <v-flex xs3 sm3>
        <v-subheader>#Lanes </v-subheader>
      </v-flex>
      <v-flex xs3 sm3>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>
      <v-flex xs3 sm3>
        <v-subheader>Raod Approach </v-subheader>
      </v-flex>
      <v-flex xs3 sm3>
        <v-select single-line disabled></v-select>
      </v-flex>

      <v-flex xs3 sm3>
        <v-subheader>Sildewalks(SW) </v-subheader>
      </v-flex>
      <v-flex xs3 sm3>
        <v-select single-line disabled></v-select>
      </v-flex>
      <v-flex xs3 sm3>
        <v-subheader>Approach Surface </v-subheader>
      </v-flex>
      <v-flex xs1 sm1>
        <v-select single-line disabled></v-select>
      </v-flex>     
      <v-flex xs1 sm1>
      </v-flex>                    
      <v-flex xs1 sm1>
        <v-select single-line disabled></v-select>
      </v-flex>

      <v-flex xs3 sm3>
        <v-subheader>SW for Assistive Dev. </v-subheader>
      </v-flex>
      <v-flex xs3 sm3>
        <v-select single-line disabled></v-select>
      </v-flex>
      <v-flex xs3 sm3>
        <v-subheader>Gradient SSD (Percentage) </v-subheader>
      </v-flex>
      <v-flex xs1 sm1>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>     
      <v-flex xs1 sm1>
      </v-flex>                    
      <v-flex xs1 sm1>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs3 sm3>
        <v-subheader>Area Lighting </v-subheader>
      </v-flex>
      <v-flex xs3 sm3>
        <v-select single-line disabled></v-select>
      </v-flex>
      <v-flex xs3 sm3>
        <v-subheader>Gradient Stopped (Percentage) </v-subheader>
      </v-flex>
      <v-flex xs1 sm1>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>     
      <v-flex xs1 sm1>
      </v-flex>                    
      <v-flex xs1 sm1>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs3 sm3>
        <v-subheader>Track Type </v-subheader>
      </v-flex>
      <v-flex xs3 sm3>
        <v-select single-line disabled></v-select>
      </v-flex>
      <v-flex xs3 sm3>
        <v-subheader>DSSD (Meters) </v-subheader>
      </v-flex>
      <v-flex xs1 sm1>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>     
      <v-flex xs1 sm1>
      </v-flex>                    
      <v-flex xs1 sm1>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs3 sm3>
        <v-subheader>Incr. Mile Direct. </v-subheader>
      </v-flex>
      <v-flex xs3 sm3>
        <v-select single-line disabled></v-select>
      </v-flex>
      <v-flex xs3 sm3>
        <v-subheader>DStoppped (Meters) </v-subheader>
      </v-flex>
      <v-flex xs1 sm1>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>     
      <v-flex xs1 sm1>
      </v-flex>                    
      <v-flex xs1 sm1>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs3 sm3>
        <v-subheader>Track Angle (Degree) </v-subheader>
      </v-flex>
      <v-flex xs3 sm3>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>
      <v-flex xs3 sm3>
        <v-subheader>Departure (Seconds) </v-subheader>
      </v-flex>
      <v-flex xs1 sm1>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>     
      <v-flex xs1 sm1>
      </v-flex>                    
      <v-flex xs1 sm1>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs3 sm3>
        <v-subheader>Prepare to Stop Sign </v-subheader>
      </v-flex>
      <v-flex xs3 sm3>
        <v-select single-line disabled></v-select>
      </v-flex>
      <v-flex xs3 sm3>
        <v-subheader>Advance Activation (Seconds) </v-subheader>
      </v-flex>
      <v-flex xs1 sm1>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>     
      <v-flex xs1 sm1>
      </v-flex>                    
      <v-flex xs1 sm1>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs3 sm3>
        <v-subheader>Intercon. Traffic Signal </v-subheader>
      </v-flex>
      <v-flex xs3 sm3>
        <v-select single-line disabled></v-select>
      </v-flex>
      <v-flex xs3 sm3>
        <v-subheader>Preemption Time (Seconds) </v-subheader>
      </v-flex>
      <v-flex xs1 sm1>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>     
      <v-flex xs1 sm1>
      </v-flex>                    
      <v-flex xs1 sm1>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs6 sm6>
      </v-flex>
      <v-flex xs3 sm3>
        <v-subheader>Distance to Intersections (Meters) </v-subheader>
      </v-flex>
      <v-flex xs1 sm1>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>     
      <v-flex xs1 sm1>
      </v-flex>                    
      <v-flex xs1 sm1>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs6 sm6>
      </v-flex>
      <v-flex xs3 sm3>
        <v-subheader>Clearance Distance (Meters) </v-subheader>
      </v-flex>
      <v-flex xs1 sm1>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>     
      <v-flex xs1 sm1>
      </v-flex>                    
      <v-flex xs1 sm1>
      </v-flex>

      <v-flex xs12 sm12>
        Comment for Approach Direction Column #1
      </v-flex>

      <v-flex xs12 sm12>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

      <v-flex xs12 sm12>
        Comment for Approach Direction Column #2
      </v-flex>

      <v-flex xs12 sm12>
        <v-text-field single-line disabled></v-text-field>
      </v-flex>

    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'GeometryCard',
  props: ['info']
}
</script>

<style scoped>
</style>
