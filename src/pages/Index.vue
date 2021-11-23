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
      <div v-for="item in dashbord" :key="item.id" class="row q-gutter-row-md">
        <div v-if="item.type == 'visitor'" >
          <device-card
            :visitor="item"
          ></device-card>
        </div>
        <div v-if="item.type == 'add_card'">
          <add-card :id="item.id"></add-card>
        </div>
      </div>
    </div>
    <section-header
      title="Objects"
    ></section-header>
    </div>
    
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
const moment = require("moment");
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
    const url = "https://diis.herokuapp.com/api/";
    let resp = await axios.get(url + "visitors");
    this.list = resp.data.result.rows;
    console.warn("list item visitors");
    console.warn(this.list);
    let resp2 = await axios.get(url + "items");
    this.list2 = resp2.data.result.rows;
    console.warn("list item items");
    console.warn(this.list2);
    let resp4 = await axios.get(url + "scanlog");
    this.list4 = resp4.data.result.rows;
    console.warn("list4 scanerlog");
    console.warn(this.list4);
    let resp5 = await axios.get(url + "tags");
    this.list5 = resp5.data.result.rows;
    console.warn("list5 tags");
    console.warn(this.list5);
    var count =0;
    var i =0;
    for ( i = 0; i < this.list5.length; i++) {
      for (var j = 0; j < this.list.length; j++) {
        count++;
        if (
          this.list5[i].tag_address == this.list[j].tag_address &&
          this.list[j].time_stop == null
        ) {
          for (var k = 0; k < this.list4.length; k++) {
            
            if (this.list5[i].tag_address == this.list4[k].device_address) {
              const newItem = {
                id: this.list5[i].tag_id,
                visitor_id: this.list[j].visitor_id,
                fname: this.list[j].first_name,
                lname: this.list[j].last_name,
                tel: this.list[j].tel,
                contract: this.list[j].contract,
                category: this.list[j].category,
                location: this.list4[k].room,
                timestamp:moment(this.list4[k].scan_timestamp).format(),
                tag_address: this.list5[i].tag_address,
                time_start: moment(this.list[j].time_start).format(" hh:mm A"),
                id_civiliz: this.list[j].id_civiliz,
                type: 'visitor'
              };
              this.dashbord.push(newItem);
              break;
            }
          }
          break;
        } else if (j == this.list.length - 1) {
          for (var u = 0; u < this.list2.length; u++) {
            if(
              this.list5[i].tag_address == this.list2[u].tag_address &&
              this.list2[u].time_stop == null
            ){
              // console.warn(this.list2[u].tool_name);
              for (var k = 0; k < this.list4.length; k++) {
                 if (this.list2[u].tag_address == this.list4[k].device_address) {
                    const newItem = {
                      id: this.list5[i].tag_id,
                      item_id: this.list2[u].item_id,
                      tag_address: this.list5[i].tag_address,
                      tool_name:this.list2[u].tool_name,
                      Owner:this.list2[u].Owner,
                      parcel_number:this.list2[u].parcel_number,
                      tool_person:this.list2[u].tool_person,
                      detail:this.list2[u].detail,
                      location: this.list4[k].room,
                      time_start: moment(this.list2[u].time_start).format(" hh:mm A"),
                      type: 'item'
                    };
                    this.dashbord.push(newItem);
                    break;
                  } 
              }
              break;
            }else if(u == this.list2.length - 1){
              const newItem = {
                type: 'add_card',
                tag_address: this.list5[i].tag_address,
                id: this.list5[i].tag_id,
              };
              this.dashbord.push(newItem);
              break;
            }
          }
          
        }
        // if(this.dashbord[i].type=='add_card'){
        //   for (var u = 0; u < this.list2.length; u++) {
        //     if(
        //       this.list5[i].tag_address == this.list2[u].tag_address &&
        //       this.list2[u].time_stop == null
        //     ){
        //     console.warn(this.list2[u].tag_address);
        //     const newItem = {
        //         id: this.list5[i].tag_id,
        //         tag_address: this.list5[i].tag_address,
        //         tool_name:this.list2[u].tool_name,
        //         Owner:this.list2[u].Owner,
        //         parcel_number:this.list2[u].parcel_number,
        //         tool_person:this.list2[u].tool_person,
        //         detail:this.list2[u].detail,
        //         time_start: moment(this.list2[u].time_start).format(" hh:mm A"),
        //         type: 'item'
        //       };
        //       this.dashbord.push(newItem);
        //       break;
        //     }
        //   }
        // }
      }
    }
    // --------------------------------------------------
    console.warn("count : "+count)
    console.warn("This dash bord");
    console.warn(this.dashbord);
  },
  // methods: {
  //     click() {
  //        expansion-item.hide
  //     }
  //   }
};
</script>