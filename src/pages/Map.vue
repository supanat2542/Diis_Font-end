<template>
  <q-page class="q-pa-sm">
    <section-header
      title="Map"
      subTitle="แสดง Tag ติดตาม ณ เวลาปัจจุบัน"
    ></section-header>
    <div class="row">
      <div class="col q-ma-md">
        <div class="text-h4 text-primary" style="margin-left: 30px">
          Floor 1
        </div>
      </div>
    </div>
    <div class="container">
      <q-img class="profile-image" src="~assets/map_1.jpg" native-context-menu>
      </q-img>
      <!--------------------------- Location 1405 --------------------------------- -->
      <div class="room-1405 row q-gutter-y-lg ">
         <div v-for="item in dashbord" :key="item.id">
          <icon-map v-if="item.location == '1405' && item.type == 'visitor'" :visitor="item" ></icon-map>
          <icon-item v-if="item.location == '1405' && item.type == 'item'" :item="item" ></icon-item>
         </div>
      </div>
      <!--------------------------- Location Room 1207 --------------------------------- -->
      <div class="room-1207 q-gutter-y-xl q-gutter-x-sm">
          <div v-for="item in dashbord" :key="item.id">
              <icon-map
              v-if="item.location == 1207" 
                class="col"
                :visitor="item"
              ></icon-map>
          </div>
      </div>
      <!--------------------------- Location Room 1406 --------------------------------- -->
      <div class="room-1406 q-gutter-y-xl q-gutter-x-sm">
          <div v-for="item in dashbord" :key="item.id ">
              <icon-map
              v-if="item.location == 1406" 
              class="col"
                :visitor="item"
              ></icon-map>
          </div>
      </div>
      <!--------------------------- Location Room 1407 --------------------------------- -->
      <div class="room-1407 row q-gutter-y-xl ">
        <template v-for="item in dashbord">
          <div v-if="item.location == 1407" :key="item.id" class="col-4">
            <icon-map
              :visitor="item"
            ></icon-map>
          </div>
        </template>
      </div>
      <!--------------------------- Location Room GEOLab --------------------------------- -->
      <div class="room-GEOLab row q-gutter-y-md">
        <div v-for="item in dashbord"  :key="item.id">
          <icon-map class="col-4"
            v-if="item.location == 'GEOLab'"
            :visitor="item"
          ></icon-map>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import IconMap from "src/components/IconMap.vue";
import IconItem from "src/components/IconItem.vue";
import SectionHeader from "../components/SectionHeader.vue";
const moment = require("moment-timezone");
import { axios } from "boot/axios";
export default {
  components: {
    SectionHeader,
    IconMap,
    IconItem,
  },
  data() {
    return {
      dashbord: [],
    };
  },
  async mounted() {
    // setTimeout(function () {
    //   location.reload(1);
    // }, 60000);
    //<------------------------- Connect Database ----------------------------------->

    let resp = await axios.get("https://diis.herokuapp.com/api/visitors",{
        params: {
            time_stop: 'index',
        },
    });
    this.list = resp.data.result.rows;
    console.warn("list item visitors");
    console.warn(this.list);

    let resp2 = await axios.get("https://diis.herokuapp.com/api/items",{
        params: {
            time_stop: 'index',
        },
    });
    this.list2 = resp2.data.result.rows;
    console.warn("list item items");
    console.warn(this.list2);

    //<-------------------------Create Dashbord ----------------------------------->
    for (var i = 0; i < this.list.length; i++) {
      let resp3 = await axios.get("https://diis.herokuapp.com/api/scanlog",{
      params: {
        tag_address: this.list[i].tag_address,
        time_start: moment(this.list[i].time_start).tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
        time_stop: moment().tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
      }});
      this.list3 = resp3.data.result.rows;
      console.warn(this.list3);
      const newItem = {
             id: this.list[i].tag_id,
             fname: this.list[i].first_name,
             lname: this.list[i].last_name,
             tel: this.list[i].tel,
             contract: this.list[i].contract,
             category: this.list[i].category,
             location: this.list3[0].room,
             visitor_id: this.list[i].visitor_id,
             timestamp:moment(this.list3[0].scan_timestamp).format(),
             type:"visitor"
      };
      this.dashbord.push(newItem);
    }
     for (var j = 0; j < this.list2.length; j++) {
      let resp3 = await axios.get("https://diis.herokuapp.com/api/scanlog",{
      params: {
        tag_address: this.list2[j].tag_address,
        time_start: moment(this.list2[j].time_start).tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
        time_stop: moment().tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
      }});
      this.list3 = resp3.data.result.rows;
      console.warn(this.list3);
      const newItem = {
              id: this.list2[j].tag_id,
              tag_address: this.list2[j].tag_address,
              tool_name:this.list2[j].tool_name,
              Owner:this.list2[j].Owner,
              parcel_number:this.list2[j].parcel_number,
              tool_person:this.list2[j].tool_person,
              detail:this.list2[j].detail,
              location: this.list3[0].room,
              time_start: moment(this.list2[j].time_start).format(" hh:mm A"),
              type: 'item'
      };
      this.dashbord.push(newItem);
    }
    console.warn("this dashbord")
    console.warn(this.dashbord);
  },
};
</script>

<style>
img {
  width: 65%;
  display: block;
  margin: 0 auto;
}
.room-1405 {
  position: absolute;
  top: 20%;
  left: 10%;
  width: 200px;
  height: 250px;
  overflow: hidden;
}
.room-GEOLab {
  position: absolute;
  top: 52.5%;
  left: 48%;
  width: 250px;
  height: 220px;
  overflow: hidden;
}
.room-1207 {
  position: absolute;
  top: 15%;
  left: 59%;
  width: 60px;
  height: 250px;
  overflow: hidden;
}
.room-1406 {
  position: absolute;
  top: 19.5%;
  left: 63.8%;
  width: 70px;
  height: 250px;
  overflow: hidden;
}
.room-1407 {
  position: absolute;
  top: 19.5%;
  left: 68.3%;
  width: 150px;
}
.container {
  position: relative;
}
</style>
