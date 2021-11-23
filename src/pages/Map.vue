<template>
  <q-page class="q-pa-sm">
    <section-header
      title="Map"
      subTitle="แสดง Tag ติดตาม ณ เวลาปัจจุบัน"
    ></section-header>
    <div class="q-pa-md "  >
    <div class="q-gutter-md " style="max-width: 300px">
      <q-select standout="bg-secondary text-white" v-model="models" :options="options" label="Select floors" />
     </div>
  </div>
     <!--------------------------- ////////////////////////////////////////////floors 4--------------------------------- -->  
    <div v-if="this.models=='floors 2'" class="container">
      <q-img class="profile-image" src="~assets/map_2.jpg" native-context-menu>
      </q-img>
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
      <!--------------------------- Location Room GEOLAB --------------------------------- -->
      <div class="room-GEOLAB row q-gutter-y-md">
        <div v-for="item in dashbord"  :key="item.id">
          <icon-map class="col-4"
            v-if="item.location == 'GEOLAB'"
            :visitor="item"
          ></icon-map>
        </div>
      </div>
    </div>
   <!--------------------------- ////////////////////////////////////////////floors 4--------------------------------- -->  
    <div v-if="this.models=='floors 4'" class="container">
      <q-img class="profile-image" src="~assets/map_4.jpg" native-context-menu>
      </q-img>
      <!--------------------------- Location 1405 --------------------------------- -->
      <div class="room-1405 row q-gutter-y-lg ">
         <div v-for="item in dashbord" :key="item.id" class="col-4">
          <icon-map v-if="item.location == '1405' && item.type == 'visitor'" :visitor="item" ></icon-map>
          <icon-item v-if="item.location == '1405' && item.type == 'item'" :item="item" ></icon-item>
         </div>
      </div>
      
      <!--------------------------- Location Room 1406 --------------------------------- -->
      <div class="room-1406 row q-gutter-y-lg">
          <div v-for="item in dashbord" :key="item.id" class="col-4">
              <icon-map
              v-if="item.location == 1406" 
                :visitor="item"
              ></icon-map>
          </div>
      </div>
      <!--------------------------- Location Room 1408 --------------------------------- -->
      <div class="room-1408 row q-gutter-y-mb ">
        <template v-for="item in dashbord">
          <div v-if="item.location == 1408" :key="item.id" class="col-3">
            <icon-map
              
              :visitor="item"
            ></icon-map>
          </div>
        </template>
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
      models:'floors 2',
      options:[
        'floors 2','floors 4'
      ]
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
             type:"visitor",
             floors:"floors "+this.list3[0].floor,
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
.room-GEOLAB {
  position: absolute;
  top: 40%;
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
  top: 22%;
  left: 24.5%;
  width: 200px;
  height: 250px;
  overflow: hidden;
}
.room-1408 {
  position: absolute;
  top: 20%;
  left: 70%;
  width: 280px;
  height: 200px;
}
.container {
  position: relative;
}
</style>
