<template>
  <v-app>
    <!-- Toolbar -->
    <v-toolbar 
      color="light-green darken-2" 
      dark 
      fixed
      clipped-left
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Grade X Inspection</v-toolbar-title>
    </v-toolbar>

    <!-- Store dialog -->
    <v-dialog v-model="confirm_dialog" max-width="500px">
      <v-card>
        <v-toolbar color="light-blue" dark>
          <v-toolbar-title>Finish Inspection Task</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click.stop="confirm_dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list three-line class="pa-0">
          <v-list-tile>
            <v-list-tile-content @click.stop="saveFormData()">
              <v-list-tile-title>{{ dialog_items[0].title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ dialog_items[0].subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-content @click.stop="saveFormData()">
              <v-list-tile-title>{{ dialog_items[1].title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ dialog_items[1].subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-dialog> 

    <!-- Left Panel: navigation drawer -->
    <v-navigation-drawer 
      id="crosslist"
      clipped
      floating
      app
      v-model="drawer"
      mobile-break-point=800
    >
      <!-- Site Info -->
      <v-card color="blue-grey lighten-5" id="crossing-info">
        <v-card-title primary-title>
          <div>
            <div class="headline"><strong>Crossing ID: </strong>{{ crossing.id }}</div>
            <div class="headline"><strong>Type: </strong>{{ crossing.component }}</div>
            <div class="info-text mt-3"><strong>RSI Name: </strong>{{ crossing.RSI_Name }}</div>
            <div class="info-text"><strong>RSI Region: </strong>{{ crossing.RSI_Region }}</div>
            <div class="info-text"><strong>Maintainer: </strong>{{ crossing.railway_Maintainer }}</div>
            <div class="info-text"><strong>Railway Emp: </strong>{{ crossing.attendign_railway_emp }}</div>
            <div class="info-text"><strong>Address: </strong>{{crossing.address }}</div>
            <div class="info-text"><strong>Last Inspection: </strong>{{ crossing.last_inspect_date }}</div>  
          </div>
        </v-card-title>
        <v-btn color="info">Overview</v-btn>
        <v-btn color="success" @click.native.stop="confirm_dialog = true">Finish Task</v-btn>
        <!-- <v-progress-circular
            :size="70"
            :width="10"
            :rotate="-90"
            :value="answer_number / question_list.length * 100"
            color="teal"
        >
          {{ answer_number +'/' + question_list.length }}
        </v-progress-circular> -->
        <div>
          <v-progress-linear id="progress-bar" :value="answer_number / question_list.length * 100" height="8" color="teal"></v-progress-linear>
          <div>{{ answer_number +'/' + question_list.length }}</div>
        </div>
      </v-card>
      
      <v-btn :color="getColor(question, index)" 
        :outline="question.answer==null && current_question != index" 
        fab 
        small 
        :dark="question.answer!=null" 
        v-for="(question, index) in question_list" 
        :key="index" 
        @click.stop="selectQuestion(index)"
      >
        {{ question.id }}
      </v-btn>
    </v-navigation-drawer>

    <!-- Content: Form List -->
    <v-content>
      <v-container fluid>
        <v-layout>
          <transition :name="transition" mode="out-in">
            <v-card id="right-panel" class="pa-3 text-xs-center text-sm-center" :key="current_question">
              <!-- <v-tabs
                slider-color="light-green darken-2"
                fixed-tabs
              >
                <v-tab v-for="item in tabs_text" :key="item.name" ripple>{{ item.name }}</v-tab>
              </v-tabs> -->
              
              <!-- dialog button -->
              <!-- <v-layout row justify-center>
                <v-btn color="primary" dark @click.native.stop="question_dialog = true">Open Dialog</v-btn>
                <v-dialog v-model="question_dialog" max-width="650">
                  <v-card>
                    <v-card-title class="headline">Select Question</v-card-title>
                    <v-card-text>Click on the question you want to jump to:</v-card-text>
                    <v-btn :color="getColor(question, index)" fab small :dark="question.answer!=null" v-for="(question, index) in question_list" :key="index" @click="selectQuestion(index)">
                      {{ question.id }}
                    </v-btn>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" flat="flat" @click.native="question_dialog = false">Confirm</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-layout> -->

              <!-- question details -->
              
                <div id="question-detail">
                  <div class="headline">
                    <strong>Question ID: </strong>
                    {{ question_list[current_question].id + ' (' + (current_question + 1) +'/' + question_list.length + ')'}}
                  </div>
                  <hr>
                  <div class="question-text mt-3">{{ question_list[current_question].text }}</div>
                </div>
              <v-layout row>
                <v-flex xs4 sm4>
                  <v-checkbox v-model="question_list[current_question].answer" value="ans1" label= "NC CA Required" ></v-checkbox>                              
                </v-flex>
                <v-flex xs4 sm4>
                  <v-checkbox v-model="question_list[current_question].answer" value="ans2" label= "NC CA Taken"></v-checkbox>                              
                </v-flex>
                <v-flex xs4 sm4>
                  <v-checkbox v-model="question_list[current_question].answer" value="ans3" label= "C CA Required" ></v-checkbox>                              
                </v-flex>                       
              </v-layout>
              <v-layout row>
                <v-flex xs4 sm4>
                  <v-checkbox v-model="question_list[current_question].answer" value="ans4" label= "C CA Taken"></v-checkbox>                              
                </v-flex>
                <v-flex xs6 sm6>
                  <v-checkbox v-model="question_list[current_question].answer" value="ans5" label= "C CA Developing Issue" ></v-checkbox>                              
                </v-flex>                                                      
              </v-layout>  
              <v-layout row>
                <v-flex xs4 sm4>
                  <v-checkbox v-model="question_list[current_question].answer" value="ans6" label= "No Issues Noted" ></v-checkbox>                              
                </v-flex> 
                <v-flex xs4 sm4>
                  <v-checkbox v-model="question_list[current_question].answer" value="ans7" label= "Not Applicable"></v-checkbox>                              
                </v-flex>
                <v-flex xs4 sm4>
                  <v-checkbox v-model="question_list[current_question].answer" value="ans8" label= "Not Inspected" ></v-checkbox>                              
                </v-flex>                                                        
              </v-layout>

              <v-text-field
                name="input-1"
                label="Notes about inspections"
                textarea
                v-model="question_list[current_question].note"
              ></v-text-field>

              <!-- question direct -->
              <v-layout row justify-space-between>
                <v-btn large color="blue-grey" class="white--text" :disabled="current_question == 0" @click="movePre()">
                  <v-icon left dark>chevron_left</v-icon>
                  Backward
                </v-btn>
                <v-btn large color="blue-grey" class="white--text" :disabled="current_question == question_list.length - 1" @click="moveNext()">
                  Forward
                  <v-icon right dark>chevron_right</v-icon>
                </v-btn>
              </v-layout>
            </v-card>
          </transition>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import QuestionData from './db.json'
import { sendFormData } from '@/api/form'

export default {
  name: 'Form',
  data () {
    return {
      // left drawer
      drawer: true,
      crossing: {
        id: '75453',
        component: 'AWS',
        last_inspect_date: '01-20-2017',
        RSI_Name: 'Jeffrey Young',
        RSI_Region: 'ONT',
        railway_Maintainer: 'Richky Klein',
        attendign_railway_emp: 'Jay Price',
        address: '8731 Leuschke Roads East Audie'
      },
      // pop-up dialog
      confirm_dialog: null,
      dialog_items: [
        {
          title: 'Mark As Completed',
          subtitle:
            'The End Time stamp will be added to the checklist information.'
        },
        {
          title: 'End Inspection For Now',
          subtitle:
            'Your inspection work will be saved. You may continue later to complete the inspection.'
        }
      ],
      // question panel
      transition: 'slide-right',
      current_question: 0,
      question_dialog: false,
      question_list: QuestionData
    }
  },
  methods: {
    selectQuestion (n) {
      this.current_question = n
    },

    getColor (question, index) {
      if (index === this.current_question) {
        return 'primary'
      } else if (question.answer == null) {
        return 'blue-grey'
      } else {
        return 'success'
      }
    },

    movePre () {
      this.transition = 'slide-left'
      this.current_question -= 1
    },

    moveNext () {
      this.transition = 'slide-right'
      this.current_question += 1
    },

    saveFormData () {
      sendFormData(this.question_list)
      this.confirm_dialog = false
    }
  },
  computed: {
    answer_number: function () {
      return this.question_list.filter(question => {
        return question.answer != null
      }).length
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#right-panel {
  width: 100%;
}

#crossing-info {
  width: 90%;
  margin-left: 5%;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
}

.info-text {
  font-size: 1.3em;
}

#question-detail {
  height: 200px;
  max-height: 200px;
}

#progress-bar {
  width: 90%;
  margin-left: 5%;
}

.question-text {
  font-size: 1.5em;
}

/* slide-fade effect */
.slide-left-enter-active, .slide-right-leave-active {
  transition: all .3s;
}
.slide-left-leave-active, .slide-right-enter-active {
  transition: all .3s;
}
.slide-left-enter, .slide-right-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
.slide-left-leave-to, .slide-right-enter{
  transform: translateX(30px);
  opacity: 0;
}
</style>