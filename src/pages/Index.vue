<template>
  <q-page class="q-pa-sm">
    <section-header
      title="Dashboard"
      subTitle="ศูนย์กลางการควบคุม"
    ></section-header>
    <!-------------------------- Driver Card ------------------------------------>
    <section-header
      title="Persons"
    ></section-header>
      <div class="row q-gutter-col-md">
      <a v-for="item in dashbord" :key="item.id" class="q-gutter-col-md">
          <device-card
            v-if="item.type == 'visitor'"
            :visitor="item"
          ></device-card>
          <add-card v-else-if="item.type == 'add_card'" :id="item.id"></add-card>
      </a>
    </div>
    <!-- <q-btn @click=onSubmits()>enter send data</q-btn> -->
    <section-header
      title="Objects"
    ></section-header>
    
    <div class="row q-gutter-col-md">
     <div v-for="item in dashbord" :key="item.id" class="row q-gutter-row-md">
        <div v-if="item.type == 'item'" >
          <item-card
          :item="item"
          ></item-card>
        </div>
     </div>
     
     </div>
  </q-page>
</template>

<script>
import SectionHeader from "../components/SectionHeader.vue";
import DeviceCard from "../components/DeviceCard.vue";
import ItemCard from "../components/ItemCard.vue";
import AddCard from "../components/AddCard.vue";
import { axios } from "boot/axios";
const moment = require("moment-timezone");
export default {
  name: "PageIndex",
  components: {
    SectionHeader,
    DeviceCard,
    AddCard,
    ItemCard,
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
    const url = "http://localhost:3030/api/";
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

    let resp5 = await axios.get("https://diis.herokuapp.com/api/tags");
    this.list5 = resp5.data.result.rows;
    console.warn("list5 tags");
    console.warn(this.list5);
    
    for(var i = 0; i < this.list5.length; i++){
      var count = 1 ;
      for (var j = 0; j < this.list.length; j++){
        if(this.list5[i].tag_address == this.list[j].tag_address){
            const newItem = {
              id: this.list[j].tag_id,
              visitor_id: this.list[j].visitor_id,
              fname: this.list[j].first_name,
              lname: this.list[j].last_name,
              tel: this.list[j].tel,
              contract: this.list[j].contract,
              category: this.list[j].category,
              location: '-',
              tag_address: this.list[j].tag_address,
              time_start: moment(this.list[j].time_start).tz('Asia/Bangkok').format(),
              id_civiliz: this.list[j].id_civiliz,
              type: 'visitor'
            };
          this.dashbord.push(newItem);
          count--
          break
        }
      }
      for (var u = 0; u < this.list2.length; u++){
        if(this.list5[i].tag_address == this.list2[u].tag_address){
            const newItem = {
              id: this.list5[i].tag_id,
              item_id: this.list2[u].item_id,
              tag_address: this.list5[i].tag_address,
              tool_name:this.list2[u].tool_name,
              Owner:this.list2[u].Owner,
              parcel_number:this.list2[u].parcel_number,
              tool_person:this.list2[u].tool_person,
              detail:this.list2[u].detail,
              location: '-',
              time_start: moment(this.list2[u].time_start).format(),
              type: 'item'
            };
            this.dashbord.push(newItem);
            count--
          break
        }
      }
      if(count==1){
        const newItem = {
        type: 'add_card',
        tag_address: this.list5[i].tag_address,
        id: this.list5[i].tag_id,
        };
        this.dashbord.push(newItem);
      }
      
    }
    console.warn("listh dahs");
    console.warn(this.dashbord);
    
  },
   methods: {
    async onSubmits() {
        console.warn("counctionss")
        let result = await axios.post("https://diis.herokuapp.com/api/eventsarr", [
          {
            scanner_id: '68:4d:6b:75:fe:b5',
            device_address: '2021-02-10 09:00:00',
            device_name : '2021-02-10 19:00:00',
            device_appearance: '2021-02-10 19:00:00',
            device_manufacturerdata: '2021-02-10 19:00:00',
            device_serviceuuid: '2021-02-10 19:00:00',
            device_txpower: '2021-02-10 19:00:00',
            device_rssi: '2021-02-10 19:00:00',
          },
        ]);
        console.warn(result);
     
    },
  }
};
</script>
