<template>
  <v-layout>
    <v-toolbar color="blue-grey" dark fixed>
      <v-btn icon @click.stop="goBack()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>Record</v-toolbar-title>
    </v-toolbar>

    <v-flex xs10 sm10 id="panel">
      <v-card class="pb-3">
        <v-layout row wrap>
          <v-flex xs10 sm10 offset-xs1 offset-sm1>
            <v-text-field box multi-line label="Note" v-model="note_text"></v-text-field>
          </v-flex>
          <v-flex sm12 xs12 class="text-sm-center text-xs-center">
            <v-btn 
              v-if="isRecording"
              color="pink"
              dark
              large 
              class="form-btn"
              @click.native="stop()"
              >Stop</v-btn>
            <v-btn 
              v-else
              color="blue-grey"
              dark
              large 
              class="form-btn"
              @click.native="record()"
              >Start</v-btn>
          </v-flex>
          <v-flex sm12 xs12 class="text-sm-center text-xs-center">
            <v-btn color="primary" dark @click.stop="dialog = true">Calculation</v-btn>
          </v-flex>
          <v-flex sm12 xs12 class="text-sm-center text-xs-center">
            <v-btn color="primary" dark @click.stop="myAction">Upload</v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Calculation</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-layout row>
            <v-flex xs4>
              <v-subheader>Road Crossing Design Speed V (km/hr)</v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-select
                :items="speeds"
                v-model="design_speed"
                label="Road Crossing Design Speed"
                single-line
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs4>
              <v-subheader>Road Approach Gradient</v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-select
                :items="gradients"
                v-model="road_gradient"
                label="Road Approach Gradient"
                single-line
              ></v-select>
            </v-flex>
          </v-layout>
          <div class="info-block">
            Stopping Sight Distance (SSD):   <span class="stat">{{ ssd }}</span>
          </div>
          <v-layout row>
            <v-flex xs2>
              <v-subheader>J</v-subheader>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-model="D_stopped.J"
                label="Perception-reaction time"
              ></v-text-field>
            </v-flex>
            <v-flex xs2>
              <v-subheader>T</v-subheader>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-model="D_stopped.T"
                label="T"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs2>
              <v-subheader>CD</v-subheader>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-model="D_stopped.cd"
                label="the clearance distance, in meters"
              ></v-text-field>
            </v-flex>
            <v-flex xs2>
              <v-subheader>Vp</v-subheader>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-model="D_stopped.Vp"
                label="the average travel speed(m/s)"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs2>
              <v-subheader>Vt</v-subheader>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-model="D_stopped.Vt"
                label="railway design speed in km/h"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <div class="info-block">
            Sightlines from Stopped Position (Dstopped):   <span class="stat">{{ dstopped }}</span>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-layout>
</template>

<script>
import Recorder from '@/utils/recorder'
import firebase from 'firebase'
import 'firebase/firestore'
// import db from '@/utils/firestore'
// import data from '@/views/Dev/aws.json'

var recorder
var audioStream

export default {
  name: 'Test',
  data () {
    return {
      isRecording: false,
      interval: false,
      note_text: '',
      dialog: false,
      design_speed: 10,
      road_gradient: 0,
      speeds: [
        10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110
      ],
      gradients: [
        -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
      ],
      D_stopped: {
        J: 0,
        T: 0,
        cd: 0,
        Vp: 1,
        Vt: 0
      }
    }
  },
  methods: {
    // myAction () {
    //   // const data = require('@/views/Dev/aws.json')
    //   let count = 0
    //   data.forEach(element => {
    //     // console.log(element)
    //     db.collection('crossing_info').add(element)
    //     count += 1
    //     console.log(count)
    //   })
    // db.collection('info_sharing').where('locationID', '==', '34032')
    //   .get()
    //   .then(function (querySnapshot) {
    //     querySnapshot.forEach(function (doc) {
    //       // doc.data() is never undefined for query doc snapshots
    //       console.log(doc.id, ' => ', doc.data())
    //     })
    //   })
    //   .catch(function (error) {
    //     console.log('Error getting documents: ', error)
    //   })
    // },
    goBack () {
      this.$router.go(-1)
    },
    record () {
      // if (!this.interval) {
      //   this.interval = setInterval(() => {
      //     this.note_text = this.note_text + '12'
      //   }, 30)
      // }
      this.isRecording = true
      console.log(recorder)
      recorder && recorder.record()
      console.log('Recording...')
    },
    stop () {
      const self = this
      recorder && recorder.stop()
      audioStream.getAudioTracks()[0].stop()
      console.log('stop recording')
      recorder && recorder.exportWAV(function (blob) {
        self.uploadFile(blob)
        var url = URL.createObjectURL(blob)
        console.log(url)
        // Clear the Recorder to start again !
        recorder.clear()
      }, ('audio/wav'))
      this.isRecording = false
    },
    uploadFile (blob) {
      var timestamp = Date.now()
      var fileName = 'speech/' + timestamp + '.wav'
      var storageRef = firebase.storage().ref().child(fileName)
      storageRef.put(blob).then(function (snapshot) {
        console.log('uploaded')
      })
    }
  },
  computed: {
    ssd () {
      const ssdMap = {
        10: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        20: [21, 21, 21, 21, 21, 21, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 19, 19, 19, 19, 19],
        30: [33, 33, 32, 32, 32, 31, 31, 31, 30, 30, 30, 30, 30, 29, 29, 29, 29, 29, 29, 28, 28],
        40: [51, 50, 49, 49, 48, 48, 47, 46, 46, 45, 45, 45, 44, 44, 43, 43, 43, 42, 42, 42, 42],
        50: [76, 75, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 63, 62, 61, 61, 60, 60, 59, 59],
        60: [104, 101, 99, 97, 95, 93, 91, 89, 88, 86, 85, 84, 83, 81, 80, 79, 78, 77, 77, 76, 75],
        70: [140, 135, 132, 128, 125, 122, 119, 117, 114, 112, 110, 108, 106, 105, 103, 101, 100, 99, 97, 96, 95],
        80: [182, 176, 171, 166, 161, 157, 153, 149, 146, 143, 140, 137, 135, 132, 130, 128, 126, 124, 122, 121, 119],
        90: [223, 216, 209, 202, 197, 191, 186, 182, 178, 174, 170, 167, 163, 160, 157, 155, 152, 150, 148, 145, 143],
        100: [281, 271, 262, 253, 245, 238, 232, 226, 220, 215, 210, 205, 201, 197, 194, 190, 187, 184, 181, 178, 175],
        110: [345, 331, 318, 307, 296, 287, 278, 270, 263, 256, 250, 244, 239, 234, 229, 224, 220, 216, 307, 209, 205]
      }
      let index = this.gradients.indexOf(this.road_gradient)
      return ssdMap[this.design_speed][index]
    },
    dstopped () {
      let Td = this.D_stopped.J + this.D_stopped.T
      let Tp = this.D_stopped.cd / this.D_stopped.Vp
      let Ts = Math.max(Td, Tp)
      return (0.278 * this.D_stopped.Vt * Ts).toFixed(2)
    }
  },
  mounted: function () {
    var audioContext = new AudioContext()
    navigator.getUserMedia({audio: true}, stream => {
      audioStream = stream
      var input = audioContext.createMediaStreamSource(stream)
      recorder = new Recorder(input)
    }, err => {
      console.log(err)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#panel {
  margin: auto;
}

.headline {
  font-weight: bold;
  font-size: 2em !important;
}

#loginform {
  width: 80%;
  margin: auto;
}

.form-btn {
  width: 200px;
}

.info-block {
  text-align: center;
  font-size: 24px;
  background-color: #0D47A1;
  border-radius: 10px;
  color: #eee;
}

.stat {
  font-size: 36px;
  color: #F06292;
  margin-left: 10px;
}
</style>
