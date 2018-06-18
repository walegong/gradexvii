<template>
  <v-card>
    <v-card-title>
      <div>
        <h3 class="title-text">Vehicle / Pedestrain Accidents</h3>
      </div>
    </v-card-title>
    <v-data-table
      :headers="headers_accident"
      :items="vpAccident"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.occurNum }}</td>
        <td class="text-xs-right">{{ props.item.occurYear }}</td>
        <td class="text-xs-right">{{ props.item.occurDate }}</td>
        <td class="text-xs-right">{{ props.item.occurTime }}</td>
        <td class="text-xs-right">{{ props.item.occurType }}</td>
        <td class="text-xs-right">{{ props.item.occurIncType }}</td>
        <td class="text-xs-right">{{ props.item.operator1 }}</td>
        <td class="text-xs-right">{{ props.item.operator2 }}</td>
        <td class="text-xs-right">{{ props.item.train1 }}</td>
        <td class="text-xs-right">{{ props.item.train2 }}</td>
        <td class="text-xs-right">{{ props.item.involvedTrain }}</td>
        <td class="text-xs-right">{{ props.item.involvedCars }}</td>
        <td class="text-xs-right">{{ props.item.involvedDCars }}</td>
        <td class="text-xs-right">{{ props.item.nearestTown }}</td>
        <td class="text-xs-right">{{ props.item.trackType }}</td>
        <td class="text-xs-right">{{ props.item.derail }}</td>
        <td class="text-xs-right">{{ props.item.taInjuries }}</td>
        <td class="text-xs-right">{{ props.item.taFatal }}</td>
        <td class="text-xs-right">{{ props.item.taSerious }}</td>
        <td class="text-xs-right">{{ props.item.taMinor }}</td>
        <td class="text-xs-right">{{ props.item.tfEmp }}</td>
        <td class="text-xs-right">{{ props.item.tfPass }}</td>
        <td class="text-xs-right">{{ props.item.tfMoto }}</td>
        <td class="text-xs-right">{{ props.item.tfMotoPass }}</td>
        <td class="text-xs-right">{{ props.item.tfTrespass }}</td>
        <td class="text-xs-right">{{ props.item.tfOther }}</td>
        <td class="text-xs-right">{{ props.item.tsEmp }}</td>
        <td class="text-xs-right">{{ props.item.tsPass }}</td>
        <td class="text-xs-right">{{ props.item.tsMoto }}</td>
        <td class="text-xs-right">{{ props.item.tsMotoPass }}</td>
        <td class="text-xs-right">{{ props.item.tsTraspass }}</td>
        <td class="text-xs-right">{{ props.item.tsOthers }}</td>
        <td class="text-xs-right">{{ props.item.tmEmp }}</td>
        <td class="text-xs-right">{{ props.item.tmPass }}</td>
        <td class="text-xs-right">{{ props.item.tmMoto }}</td>
        <td class="text-xs-right">{{ props.item.tmMotoPass }}</td>
        <td class="text-xs-right">{{ props.item.tmTrespass }}</td>
        <td class="text-xs-right">{{ props.item.tmOthers }}</td>
        <td class="text-xs-right">{{ props.item.cause1 }}</td>
        <td class="text-xs-right">{{ props.item.cause2 }}</td>
        <td class="text-xs-right">{{ props.item.cause3 }}</td>
        <td class="text-xs-right">{{ props.item.occuSummary }}</td>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="cyan darken-1" icon="warning">
          Sorry, nothing to display here :(
        </v-alert>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'TSBCard',
  props: ['info'],
  data () {
    return {
      headers_accident: [
        { text: 'Occurence #', align: 'center', value: 'occurNum' },
        { text: 'Occurence Year', align: 'center', value: 'occurYear' },
        { text: 'Occurence Date', align: 'center', value: 'occurDate' },
        { text: 'Occurence Time', align: 'center', value: 'occurTime' },
        { text: 'Occurence Type', align: 'center', value: 'occurType' },
        { text: 'Occurence Acc. Inc. Type', align: 'center', value: 'occurIncType' },
        { text: 'Train Operator #1', align: 'center', value: 'operator1' },
        { text: 'Train Operator #2', align: 'center', value: 'operator2' },
        { text: 'Train Type #1', align: 'center', value: 'train1' },
        { text: 'Train Type #2', align: 'center', value: 'train2' },
        { text: 'Involved # of Trains', align: 'center', value: 'involvedTrain' },
        { text: 'Involved # of Cars', align: 'center', value: 'involvedCars' },
        { text: 'Involved # of Dangerous Goods Cars', align: 'center', value: 'involvedDCars' },
        { text: 'Nearest Town / City', align: 'center', value: 'nearestTown' },
        { text: 'Track Type', align: 'center', value: 'trackType' },
        { text: 'Derailment', align: 'center', value: 'derail' },
        { text: 'Total All Injuries', align: 'center', value: 'taInjuries' },
        { text: 'Total All Fatal', align: 'center', value: 'taFatal' },
        { text: 'Total All Serious', align: 'center', value: 'taSerious' },
        { text: 'Total All Minor', align: 'center', value: 'taMinor' },
        { text: 'Total Fatal Employees', align: 'center', value: 'tfEmp' },
        { text: 'Total Fatal Passengers', align: 'center', value: 'tfPass' },
        { text: 'Total Fatal Motorists', align: 'center', value: 'tfMoto' },
        { text: 'Total Fatal Motorist Passengers', align: 'center', value: 'tfMotoPass' },
        { text: 'Total Fatal Trespassers', align: 'center', value: 'tfTrespass' },
        { text: 'Total Fatal Others', align: 'center', value: 'tfOther' },
        { text: 'Total Serious Employees', align: 'center', value: 'tsEmp' },
        { text: 'Total Serious Passengers', align: 'center', value: 'tsPass' },
        { text: 'Total Serious Motorists', align: 'center', value: 'tsMoto' },
        { text: 'Total Serious Motorist Passengers', align: 'center', value: 'tsMotoPass' },
        { text: 'Total Serious Trespassers', align: 'center', value: 'tsTraspass' },
        { text: 'Total Serious Others', align: 'center', value: 'tsOthers' },
        { text: 'Total Minor Employees', align: 'center', value: 'tmEmp' },
        { text: 'Total Minor Passengers', align: 'center', value: 'tmPass' },
        { text: 'Total Minor Motorists', align: 'center', value: 'tmMoto' },
        { text: 'Total Minor Motorist Passengers', align: 'center', value: 'tmMotoPass' },
        { text: 'Total Minor Trespassers', align: 'center', value: 'tmTrespass' },
        { text: 'Total Minor Others', align: 'center', value: 'tmOthers' },
        { text: 'Primary Cause Level 1', align: 'center', value: 'cause1' },
        { text: 'Primary Cause Level 2', align: 'center', value: 'cause2' },
        { text: 'Primary Cause Level 3', align: 'center', value: 'cause3' },
        { text: 'Occurence Summary', align: 'center', value: 'occuSummary' }
      ],
      vpAccident: [
      ]
    }
  }
}
</script>

<style scoped>
</style>
