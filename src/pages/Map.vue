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
      <div class="room-1207 row q-gutter-y-md q-gutter-x-sm">
          <div v-for="item in dashbord.slice(0, 8)" :key="item.id" v-if="item.location == 1207" class="col-5">
              <icon-map v-if="item.type == 'visitor'" :visitor="item" ></icon-map>
              <icon-item v-if="item.type == 'item'" :item="item" ></icon-item>
          </div>
      </div>
      <!--------------------------- Location Room GEOLAB --------------------------------- -->
      <div class="room-GEOLAB row q-gutter-y-md q-gutter-x-md">
        <div v-for="item in dashbord.slice(0, 9)"  :key="item.id" v-if='item.location == "GEOLAB"' class="col-3">
          <icon-map v-if="item.type == 'visitor'" :visitor="item" ></icon-map>
          <icon-item v-if="item.type == 'item'" :item="item" ></icon-item>
        </div>
      </div>
    </div>
   <!--------------------------- ////////////////////////////////////////////floors 4--------------------------------- -->  
    <div v-if="this.models=='floors 4'" class="container">
      <q-img class="profile-image" src="~assets/map_4.jpg" native-context-menu>
      </q-img>
      <!--------------------------- Location 1405 --------------------------------- -->
      <div class="room-1405 row q-gutter-y-lg ">
         <div  v-for="item in dashbord.slice(0, 9)" :key="item.id" v-if='item.location == 1405' class="col-4">
           <icon-map v-if="item.type == 'visitor'" :visitor="item" ></icon-map>
           <icon-item v-if="item.type == 'item'" :item="item" ></icon-item>
         </div>
      </div>
      
      <!--------------------------- Location Room 1406 --------------------------------- -->
      <div class="room-1406 row q-gutter-y-lg">
          <div v-for="item in dashbord.slice(0, 6)" :key="item.id" v-if='item.location == 1406' class="col-4">
              <icon-map v-if="item.type == 'visitor'" :visitor="item" ></icon-map>
              <icon-item v-if="item.type == 'item'" :item="item" ></icon-item>
          </div>
      </div>
      <!--------------------------- Location Room 1408 --------------------------------- -->
      <div class="room-1408 row q-gutter-y-mb ">
        <div v-for="item in dashbord.slice(0, 9)" :key="item.id"  v-if='item.location == 1408' class="col-4">
            <icon-map v-if="item.type == 'visitor'" :visitor="item" ></icon-map>
            <icon-item v-if="item.type == 'item'" :item="item" ></icon-item>
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
      models:'floors 2',
      options:[
        'floors 2','floors 4'
      ]
    };
  },
  created(){
    if(this.$store.getters.admin==undefined){
        this.$router.push("/");
    }
      setInterval(() => this.time(),60000);
  }, 
  async mounted() {
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
      const newItem = {
             id: this.list[i].tag_id,
             tag_address: this.list[i].tag_address,
             fname: this.list[i].first_name,
             lname: this.list[i].last_name,
             tel: this.list[i].tel,
             contract: this.list[i].contract,
             category: this.list[i].category,
             visitor_id: this.list[i].visitor_id,
             time_start: this.list[i].time_start,
             time_out: '',
             colors:'',
             location: '',
             floors:'',
             type:"visitor",
      };
      this.dashbord.push(newItem);
    }
     for (var j = 0; j < this.list2.length; j++) {
      const newItem = {
              id: this.list2[j].tag_id,
              tag_address: this.list2[j].tag_address,
              tool_name:this.list2[j].tool_name,
              Owner:this.list2[j].Owner,
              parcel_number:this.list2[j].parcel_number,
              tool_person:this.list2[j].tool_person,
              detail:this.list2[j].detail,
              time_start: moment(this.list2[j].time_start).format(),
              item_id:this.list2[j].item_id,
              time_out: '',
              colors:'',
              location: '',
              floors:'',
              type: 'item'
      };
      this.dashbord.push(newItem);
    }
    console.warn("this dashbord")
    console.warn(this.dashbord);
    this.time()
  },
  methods: {
      async time(){
        for(var a = 0; a < this.dashbord.length; a++){
          let resp = await axios.get("https://diis.herokuapp.com/api/scanlog",{
            params: {
              tag_address: this.dashbord[a].tag_address,
              time_start: moment(this.dashbord[a].time_start).tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
              time_stop: moment().tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
            }});
      this.list = resp.data.result.rows;
      console.warn(this.list);
      this.dashbord[a].location=this.list[0].room;
      this.dashbord[a].floors=this.list[0].floor;
         //------------------------- send time out ------------------------------------------------
        var now_time = moment().tz('Asia/Bangkok')
        var last_time = moment(this.list[0].scan_timestamp).tz('Asia/Bangkok')
        var time_out =now_time.diff(last_time, 'minutes')
        console.warn(time_out)
        if(time_out>=30){
          this.dashbord[a].time_out="out 30 min"
          this.dashbord[a].colors = "#ffcc00"
          this.dashbord[a].showing=true
        }else if(time_out>=20){
          this.dashbord[a].time_out="out 20 min"
          this.dashbord[a].colors = "#ffcc00"
          this.dashbord[a].showing=true
        }else if(time_out>=10){
          this.dashbord[a].time_out="out 10 min"
          this.dashbord[a].colors = "#ffcc00"
          this.dashbord[a].showing=true
        }else if(time_out<10){
          this.dashbord[a].showing=false
          this.dashbord[a].colors = "#ffffff"
        }
        }
        console.warn(this.dashbord)
    }
  }
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
  top: 20%;
  left: 72%;
  width: 300px;
  height: 190px;
  overflow: hidden;
}
.room-1207 {
  position: absolute;
  top: 20%;
  left: 10%;
  width: 200px;
  height: 330px;
  overflow: hidden;
}
.room-1406 {
  position: absolute;
  top: 22%;
  left: 24.5%;
  width: 200px;
  height: 180px;
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
