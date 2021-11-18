<template>
  <q-page class="q-pa-sm">
    <section-header
      title="Objects Time Line"
      subTitle="แสดงข้อมูลของสิ่งของ"
    ></section-header>
    <!-------------------------- Infomation User ------------------------------------>
    <q-layout view="hHh Lpr lFf">
      <q-page-container class="bg-grey-2">
              <div v-for="item in list" :key="item.item_id" >
                <div class="row justify-center" > 
                
                  <div class="col-md-8 col-xs-12 q-pa-md " >
                    <info-Objects
                      class="col-4"
                      :data='item'
                    />
                  </div>         
                    <div class="col-md-3 col-xs-12 q-pa-md text-blue-8" >
                        <q-card
                          class="col-3 rounded-borders-10 shadow-5 text-center"
                          id="my-card-2" 
                        >
                          <q-img height="auto" width="150px" 
                            placeholder-src="~assets/item.jpg"
                            src="~assets/item.jpg"
                            spinner-color="white"
                          ></q-img>

                          <q-card-section class="text-h5 text-center">
                            <div>Tag {{ item.tag_id }}</div>
                          </q-card-section>
                        </q-card>
                    </div>
                </div>
             </div>
             

        <!--------------------------- Timeline User ------------------------------------>
        <q-timeline color="secondary" style="padding-left: 4rem " >
          <q-timeline-entry heading> Timeline </q-timeline-entry>
                

          <q-timeline-entry
            v-for="time in timeline"
            :key="time.time"
            :title="'Room : ' + time[time.length - 2]"
            :subtitle="time[time.length - 1]"
          >
            Time : {{ time[time.length - 3] }} - {{ time[0] }}
          </q-timeline-entry>
          <q-timeline-entry title=" Start " subtitle=" " icon="watch_later">
          </q-timeline-entry>
        </q-timeline>
        <!---------------------------close Timeline User ------------------------------------>
      </q-page-container>
   </q-layout>
  </q-page>
</template>

<script>
import SectionHeader from "../components/SectionHeader.vue";
import infoObjects from "../components/infoObjects.vue";
import { axios } from "boot/axios";
const moment = require("moment");
export default {
  components: {
    SectionHeader,
    infoObjects,
  },

  data() {
    return {
      id: this.$route.params.id,
      timeline: [],
      time: [],
      list: [],
      tag: undefined,
      showing: false,
    };
  },
  async mounted() {
        const url = "http://localhost:3030/api/";
        let resp = await axios.get(url + "items",{
        params: {
            item_id: this.id,
        },
        });
        this.list = resp.data.result.rows;
        console.warn("list item items");
        console.warn(this.list);
        let resp2 = await axios.get(url + "selectlog", {
        params: {
            device_address: this.list[0].tag_address,
            time_start: moment(this.list[0].time_start).format(
            "YYYY-MM-DD hh:mm:ss A"
            ),
            time_stop: moment(this.list[0].time_stop).add(1, 'minute').format(
            "YYYY-MM-DD hh:mm:ss A"
            ),
        },
        });
        this.list2 = resp2.data.result.rows;
        console.warn("list2 scanerlog");
        console.warn(this.list2);
        //     //<------------------------- Create Timeline ----------------------------------->
        var rooms = this.list2[0].room;
        var times = moment(this.list2[0].scan_timestamp).format("hh:mm A")
        console.warn(moment(this.list2[0].scan_timestamp).format("hh:mm A"))
        if (this.list[0].time_stop == null) {
            this.time.push("In Use Now.");
        }
        for (var i = 0; i < this.list2.length; i++) {
            if (this.list2[i].room != rooms 
            ) {
                this.time.push(this.list2[i - 1].room);
                this.time.push(
                moment(this.list2[i].scan_timestamp).format("YYYY-MM-DD")
                );
                this.timeline.push(this.time);
                this.time = [];
                rooms = this.list2[i].room;
                times = moment(this.list2[i].scan_timestamp).format("hh:mm A")
                --i;
            } else {
                this.time.push(moment(this.list2[i].scan_timestamp).format("hh:mm A"));
            }
        }

        this.time.push(this.list2[this.list2.length - 1].room);
        this.time.push(
        moment(this.list2[this.list2.length - 1].scan_timestamp).format(
            "YYYY-MM-DD"
        )
        );
        this.timeline.push(this.time);
        console.warn(this.timeline);
  }
}
</script>

<style lang="sass" scoped>
#my-card-1
  height: 100%
  padding: 27px
#my-card-2
  padding: 30px
  height: 100%
#icon
  font-size: 9em
  display: inline-block
  width: 100%
</style>