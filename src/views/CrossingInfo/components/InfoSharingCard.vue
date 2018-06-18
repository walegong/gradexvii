<template>
  <v-card>
    <v-card-title>
      <div>
        <h3 class="title-text">Information Shring Details</h3>
      </div>
    </v-card-title>
    <v-data-table
      :headers="headers_info"
      :items="infoSharing"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.shareby }}</td>
        <td class="text-xs-right">{{ props.item.lastUpdated }}</td>
        <td class="text-xs-right">{{ props.item.subDate }}</td>
        <td class="text-xs-right">{{ props.item.reason }}</td>
        <td class="text-xs-right">{{ props.item.memo }}</td>
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
  name: 'InfoSharingCard',
  props: ['info'],
  data () {
    return {
      headers_info: [
        { text: 'Shared By', align: 'left', value: 'shareby' },
        { text: 'Last Updated Date', align: 'left', value: 'lastUpdated' },
        { text: 'Submission Date', align: 'left', value: 'subDate' },
        { text: 'Shared Reason', align: 'left', value: 'reason' },
        { text: 'Shared Memo', align: 'left', value: 'memo' }
      ],
      infoSharing: []
    }
  }
}
</script>

<style scoped>
</style>
