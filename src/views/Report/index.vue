<template>
    <v-app>
        <!-- Toolbar -->
        <v-toolbar 
        color="primary" 
        dark 
        fixed
        clipped-left
        app
        >
        <v-btn icon class="hidden-xs-only" @click.stop="goBack()">
            <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          outline
          @click.stop="save()"
          v-if="report.send === 'false'"
        >
          <v-icon left>save_alt</v-icon>
          Save
        </v-btn>
        <v-btn
          outline
          @click.stop="save()"
          v-else-if="report.respond === 'false' && user_type === 'B'"
        >
          <v-icon left>save_alt</v-icon>
          Respond
        </v-btn>
        <v-btn
          outline
          @click.stop="save()"
          v-else-if="report.respond === 'true' && user_type === 'A'"
        >
          <v-icon left>save_alt</v-icon>
          Store
        </v-btn>
        </v-toolbar>

        <v-content>
          <v-container fluid>
            <v-card class="text-xs-center pa-3">
              <h2 class="mb-3">LETTER OF NON-COMPLIANCE AND CONCERN</h2>
              <v-layout row>
                <v-flex xs10 class="text-xs-left">
                  <p v-if="report.send === 'false'" class="mb-0">
                      to: &nbsp;<input
                        type="email"
                        v-model="toEmail"
                        class="email-input"
                      >
                  </p>
                  <p v-else class="mb-0">to: {{ toEmail }}</p>
                </v-flex>
                <v-flex xs2 class="text-xs-right">
                  <v-btn
                      outline
                      v-if="report.send === 'false'"
                      @click.stop="send()"
                  >
                      <v-icon left>email</v-icon>
                      Send
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-text-field
                textarea
                v-model="emailContent"
                v-if="report.send === 'false'"
              ></v-text-field>
              <p v-else v-text="emailContent" class="text-xs-left mt-3"></p>
              <h2 class="mt-5">Transport Canada Rail Safety - Signals Inspection Resport</h2>
              <v-layout class="mt-5 text-xs-left">
                <v-flex xs-4><p><b>Railway Company:</b> {{ crossing_info.railway }}</p></v-flex>
                <v-flex xs-4><p><b>Summary:</b> {{ crossing_info.last_inspect_date }}, {{ crossing_info.region }}</p></v-flex>
                <v-flex xs-4><p><b>TC Inspector:</b> {{ crossing_info.last_inspector }}</p></v-flex>
              </v-layout>
              <v-data-table
                :headers="headers"
                :items="report.record"
                class="elevation-1 mt-4"
                hide-actions
              >
                <template slot="items" slot-scope="props" v-if="props.item.answer === 'ans7' || props.item.answer === 'ans5'">
                  <td class="text-xs-left">{{ report.crossing_info.type }}, Subdivision ({{ report.crossing_info.subdivision }}), CrossingID: {{ report.crossing_info.crossing_id }}</td>
                  <td class="text-xs-left"></td>
                  <td class="text-xs-left">
                    <p><u>{{ props.item.text }}</u></p>
                    <p>Details:</p>
                    <v-text-field class="question-detail pa-0" v-if="report.send === 'false'" v-model="report.record[props.index].note" textarea>
                    </v-text-field>
                    <p v-else v-text="report.record[props.index].note"></p>
                  </td>
                  <td class="text-xs-left">
                    <p>Response to Transport Canada - Enter corrective actions here</p>
                    <v-text-field v-model="report.record[props.index].respond" v-if="user_type === 'B' && report.respond === 'false'" textarea></v-text-field>
                    <p v-else v-text="report.record[props.index].respond"></p>
                  </td>
                  <td class="justify-center layout px-0"></td>
                </template>
                <template v-if="!table_loading" slot="no-data">
                  <v-alert :value="true" color="warning" icon="warning">
                    {{ table_msg }}
                  </v-alert>
                </template>
              </v-data-table>
            </v-card>
          </v-container>
      </v-content>
    </v-app>
</template>

<script>
import db from '@/utils/firestore'
import firebase from 'firebase'

export default {
  name: 'Report',
  data () {
    return {
      report: {},
      table_loading: true,
      headers: [
        { text: 'Location', align: 'center', value: 'location' },
        { text: 'Responsible Authority', align: 'center', value: 'responsible_authority' },
        { text: 'Description', align: 'center', value: 'description' },
        { text: 'Corrective Action', align: 'center', value: 'action' },
        { text: 'Ref. #', value: 'ref', align: 'center', sortable: false }
      ],
      toEmail: '',
      emailContent: '',
      table_msg: '',
      user_type: '',
      destination_uid: '',
      crossing_info: {}
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    save () {
      if (this.user_type === 'A') {
        db.doc(`/report_list/${this.$store.state.uid}/current_list/${this.$route.params.id}`).update({
          record: this.report.record,
          send: this.report.send,
          emailContent: this.emailContent
        })
      } else {
        this.report.respond = 'true'
        db.doc(`/report_list/${this.destination_uid}/current_list/${this.$route.params.id}`).update({
          record: this.report.record,
          send: this.report.send,
          emailContent: this.emailContent,
          respond: 'true'
        })
      }
    },
    emailValid (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    send () {
      if (this.emailValid(this.toEmail)) {
        db.doc(`/report_list/${this.$store.state.uid}/current_list/${this.$route.params.id}`).update({
          record: this.report.record,
          send: 'true',
          toEmail: this.toEmail,
          emailContent: this.emailContent,
          respond: 'false'
        })
        db.doc(`/receive_list/${this.toEmail}/current_list/${this.$route.params.id}`).set({
          from: this.$store.state.uid,
          crossing_info: this.report.crossing_info
        })
        var curDate = new Date()
        console.log(curDate.getMonth() + '/' + curDate.getDate() + '/' + curDate.getFullYear())
      }
    }
  },
  created: function () {
    const crossingId = this.$route.params.id
    const myId = this.$store.state.uid
    const object = this
    db.collection('crossing').where('crossing_id', '==', crossingId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          const data = doc.data()
          object.crossing_info = {
            id: crossingId,
            type: data.type,
            region: data.region,
            subdivision: data.subdivision,
            railway: data.railway,
            address: data.address,
            last_inspector: data.last_inspector,
            last_inspect_date: data.last_inspect_date
          }
        })
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error)
      })
    db.collection('users').doc(this.$store.state.uid).get().then(function (doc) {
      if (!doc.data().type) {
        object.destination_uid = object.$store.state.uid
        object.user_type = 'A'
        db.doc(`/report_list/${myId}/current_list/${crossingId}`).get().then((doc) => {
          object.report = doc.data()
          object.toEmail = doc.data().toEmail
          object.emailContent = doc.data().emailContent
        })
      } else {
        object.user_type = 'B'
        firebase.auth().onAuthStateChanged(function (user) {
          db.doc(`/receive_list/${user.email}/current_list/${crossingId}`).get().then((doc) => {
            const reporterId = doc.data().from
            object.destination_uid = reporterId
            db.doc(`/report_list/${reporterId}/current_list/${crossingId}`).get().then((doc) => {
              object.report = doc.data()
              object.toEmail = doc.data().toEmail
              object.emailContent = doc.data().emailContent
            })
          })
        })
      }
    })
  }
}
</script>

<style scoped>
.email-input {
  border: 1px solid black;
  font-size: 18px;
  margin: 10px 0;
  width: 60%;
  display: inline-block;
}
table.table tbody td, table.table tbody th {
  vertical-align: text-top;
}
</style>