<template>
  <q-page class="q-pa-sm">
    <section-header
      title="Map"
      subTitle="แสดง Tag ติดตาม ณ เวลาปัจจุบัน"
    ></section-header>

  <div class="q-pa-md "  >
    <div class="q-gutter-md " style="max-width: 300px">
      <q-select standout="bg-secondary text-white" v-model="model" :options="options" label="Select floor" />
     </div>
  </div>
  <div v-if="this.model=='floor2'" class="container">
      <q-img class="profile-image" src="~assets/map_2.jpg" native-context-menu>
      </q-img>
      <!--------------------------- Location Hall --------------------------------- -->
      <div class="hall-1 row q-gutter-y-lg ">
         <div v-for="item in dashbord" :key="item.id">
          <icon-map v-if="item.location == 'Hall' && item.type == 'visitor'" :visitor="item" ></icon-map>
          <icon-item v-if="item.location == 'Hall' && item.type == 'item'" :item="item" ></icon-item>
         </div>
      </div>
      <!--------------------------- Location Room 103 --------------------------------- -->
      <div class="room-103 q-gutter-y-xl q-gutter-x-sm">
          <div v-for="item in dashbord" :key="item.id">
              <icon-map
              v-if="item.location == 103" 
                class="col"
                :visitor="item"
              ></icon-map>
          </div>
      </div>
      <!--------------------------- Location Room 105 --------------------------------- -->
      <div class="room-105 q-gutter-y-xl q-gutter-x-sm">
          <div v-for="item in dashbord" :key="item.id ">
              <icon-map
              v-if="item.location == 105" 
              class="col"
                :visitor="item"
              ></icon-map>
          </div>
      </div>
      <!--------------------------- Location Room 107 --------------------------------- -->
      <div class="room-107 row q-gutter-y-xl ">
        <template v-for="item in dashbord">
          <div v-if="item.location == 107" :key="item.id" class="col-4">
            <icon-map
              :visitor="item"
            ></icon-map>
          </div>
        </template>
      </div>
      <!--------------------------- Location Room 102 --------------------------------- -->
      <div class="room-102 row q-gutter-y-md">
        <div v-for="item in dashbord"  :key="item.id">
          <icon-map class="col-4"
            v-if="item.location == 102"
            :visitor="item"
          ></icon-map>
        </div>
      </div>
    </div>
    <div v-if="this.model=='floor4'" class="container">
      <q-img class="profile-image" src="~assets/map_4.jpg" native-context-menu>
      </q-img>
      <!--------------------------- Location Hall --------------------------------- -->
      <div class="hall-1 row q-gutter-y-lg ">
         <div v-for="item in dashbord" :key="item.id">
          <icon-map v-if="item.location == 'Hall' && item.type == 'visitor'" :visitor="item" ></icon-map>
          <icon-item v-if="item.location == 'Hall' && item.type == 'item'" :item="item" ></icon-item>
         </div>
      </div>
      <!--------------------------- Location Room 103 --------------------------------- -->
      <div class="room-103 q-gutter-y-xl q-gutter-x-sm">
          <div v-for="item in dashbord" :key="item.id">
              <icon-map
              v-if="item.location == 103" 
                class="col"
                :visitor="item"
              ></icon-map>
          </div>
      </div>
      <!--------------------------- Location Room 105 --------------------------------- -->
      <div class="room-105 q-gutter-y-xl q-gutter-x-sm">
          <div v-for="item in dashbord" :key="item.id ">
              <icon-map
              v-if="item.location == 105" 
              class="col"
                :visitor="item"
              ></icon-map>
          </div>
      </div>
      <!--------------------------- Location Room 107 --------------------------------- -->
      <div class="room-107 row q-gutter-y-xl ">
        <template v-for="item in dashbord">
          <div v-if="item.location == 107" :key="item.id" class="col-4">
            <icon-map
              :visitor="item"
            ></icon-map>
          </div>
        </template>
      </div>
      <!--------------------------- Location Room 102 --------------------------------- -->
      <div class="room-102 row q-gutter-y-md">
        <div v-for="item in dashbord"  :key="item.id">
          <icon-map class="col-4"
            v-if="item.location == 102"
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
const moment = require("moment");
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
      model: 'floor2',
      options: [
        'floor2', 'floor4'
      ]
    };
  },
  async mounted() {
    // setTimeout(function () {
    //   location.reload(1);
    // }, 60000);
    //<------------------------- Connect Database ----------------------------------->
    const url = "http://localhost:3030/api/" 
    let resp = await axios.get(url+"visitors");
    this.list = resp.data.result.rows;
    console.warn("list visitors");
    console.warn(this.list);

    let resp2 = await axios.get(url+"scanlog");
    this.list2 = resp2.data.result.rows;
    console.warn("list2 scanerlog");
    console.warn(this.list2);

    let resp3 = await axios.get(url + "items");
    this.list3 = resp3.data.result.rows;
    console.warn("list3 items");
    console.warn(this.list3);
    //<-------------------------Create Dashbord ----------------------------------->
      for (var i = 0; i < this.list.length; i++) {
        for (var j = 0; j < this.list2.length; j++) {
         if (this.list[i].tag_address == this.list2[j].device_address&& this.list[i].time_stop == null) {
           const newItem = {
             id: this.list[i].tag_id,
             fname: this.list[i].first_name,
             lname: this.list[i].last_name,
             tel: this.list[i].tel,
             contract: this.list[i].contract,
             category: this.list[i].category,
             location: this.list2[j].room,
             visitor_id: this.list[i].visitor_id,
             timestamp:moment(this.list2[j].scan_timestamp).format(),
             type:"visitor"
           };
           this.dashbord.push(newItem);
           break;
         }
       }
      }
      for (var u = 0; u < this.list3.length; u++) {
        for (var j = 0; j < this.list2.length; j++) {
          console.warn(i+" "+j+" kan "+this.list2[j].device_address +" : "+ this.list3[u].tag_address )
          if(
            this.list2[j].device_address == this.list3[u].tag_address &&
            this.list3[u].time_stop == null
          ){   
            console.warn(this.list3[u].tag_id)   
            const newItem = {
              id: this.list3[u].tag_id,
              tag_address: this.list3[u].tag_address,
              tool_name:this.list3[u].tool_name,
              Owner:this.list3[u].Owner,
              parcel_number:this.list3[u].parcel_number,
              tool_person:this.list3[u].tool_person,
              detail:this.list3[u].detail,
              location: this.list2[j].room,
              time_start: moment(this.list3[u].time_start).format(" hh:mm A"),
              type: 'item'
             };
            this.dashbord.push(newItem);
            break;
          }
        }
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
.hall-1 {
  position: absolute;
  top: 30%;
  left: 34.6%;
  width: 250px;
  height: 250px;
  overflow: hidden;
}
.room-102 {
  position: absolute;
  top: 52.5%;
  left: 48%;
  width: 250px;
  height: 220px;
  overflow: hidden;
}
.room-103 {
  position: absolute;
  top: 15%;
  left: 59%;
  width: 60px;
  height: 250px;
  overflow: hidden;
}
.room-105 {
  position: absolute;
  top: 19.5%;
  left: 63.8%;
  width: 70px;
  height: 250px;
  overflow: hidden;
}
.room-107 {
  position: absolute;
  top: 19.5%;
  left: 68.3%;
  width: 150px;
}
.container {
  position: relative;
}
</style>
