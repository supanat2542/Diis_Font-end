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
            let resp4 = await axios.get("https://diis.herokuapp.com/api/scanlog",{
            params: {
                tag_address: this.list[j].tag_address,
                time_start: moment(this.list[j].time_start).tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
                time_stop: moment().tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
            }});
            this.list4 = resp4.data.result.rows;
            console.warn(this.list4);
            const newItem = {
              id: this.list[j].tag_id,
              visitor_id: this.list[j].visitor_id,
              fname: this.list[j].first_name,
              lname: this.list[j].last_name,
              tel: this.list[j].tel,
              contract: this.list[j].contract,
              category: this.list[j].category,
              location: this.list4[0].room,
              timestamp:moment(this.list4[0].scan_timestamp).tz('Asia/Bangkok').format(),
              tag_address: this.list[j].tag_address,
              time_start: moment(this.list[j].time_start).tz('Asia/Bangkok').format(" hh:mm A"),
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
          let resp4 = await axios.get("https://diis.herokuapp.com/api/scanlog",{
            params: {
              tag_address: this.list5[i].tag_address,
              time_start: moment(this.list2[u].time_start).tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
              time_stop: moment().tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
            }});
            this.list4 = resp4.data.result.rows;
            const newItem = {
              id: this.list5[i].tag_id,
              item_id: this.list2[u].item_id,
              tag_address: this.list5[i].tag_address,
              tool_name:this.list2[u].tool_name,
              Owner:this.list2[u].Owner,
              parcel_number:this.list2[u].parcel_number,
              tool_person:this.list2[u].tool_person,
              detail:this.list2[u].detail,
              location: this.list4[0].room,
              time_start: moment(this.list2[u].time_start).format(" hh:mm A"),
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

    // for (var i = 0; i < this.list5.length; i++){
      
    //   if( this.list.length==0){
    //     if(this.list2.length==0){
    //       // add card[i]
    //       this.add_card(this.list5[i].tag_id,this.list5[i].tag_address)

    //     }else{
    //       // add item[i]
    //       // add card[i]
    //       this.item_card(this.list5[i].tag_id,this.list5[i].tag_address)
    //     }
    //   }
    //   if(this.list2.length==0){
    //     // add visitor[i]
    //     // add card[i]
    //     this.visiter_card(this.list5[i].tag_id,this.list5[i].tag_address)
    //   }else{
    //     // add visitor[i]
    //     // add item[i]
    //     // add card[i]
    //     this.visitor_item_card(this.list5[i].tag_id,this.list5[i].tag_address)
    //   }
      
    // }

    console.warn("listh dahs");
    console.warn(this.dashbord);
  },
//    methods: {
//     add_card: function (tag_id,tag_address) {
//       console.log("in add "+tag_id)
      // const newItem = {
      //      type: 'add_card',
      //      tag_address: tag_address,
      //      id: tag_id,
      // };
      // this.dashbord.push(newItem);
//     },
//     item_card: async function(tag_id,tag_address){
//       for(var u = 0; u < this.list2.length; u++){
//         if(tag_address == this.list2[u].tag_address){
//           console.log("in item "+tag_id)
            // let resp4 = await axios.get("https://diis.herokuapp.com/api/scanlog",{
            // params: {
            //   tag_address: tag_address,
            //   time_start: moment(this.list2[u].time_start).tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
            //   time_stop: moment().tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
            // }});
            // this.list4 = resp4.data.result.rows;
            // const newItem = {
            //   id: tag_id,
            //   item_id: this.list2[u].item_id,
            //   tag_address: tag_address,
            //   tool_name:this.list2[u].tool_name,
            //   Owner:this.list2[u].Owner,
            //   parcel_number:this.list2[u].parcel_number,
            //   tool_person:this.list2[u].tool_person,
            //   detail:this.list2[u].detail,
            //   location: this.list4[0].room,
            //   time_start: moment(this.list2[u].time_start).format(" hh:mm A"),
            //   type: 'item'
            // };
            // this.dashbord.push(newItem);
//             break;
//         }else if(u == this.list2.length-1){
          
//           this.add_card(tag_id,tag_address)
//           break;
//         }
//       }
//     },
//     visiter_card: async function(tag_id,tag_address){
//       for (var j = 0; j < this.list.length; j++){
//         if(tag_address == this.list[j].tag_address){
//           console.log("in visitor "+tag_id)
            // let resp4 = await axios.get("https://diis.herokuapp.com/api/scanlog",{
            //     params: {
            //     tag_address: tag_address,
            //     time_start: moment(this.list[j].time_start).tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
            //     time_stop: moment().tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
            //     }});
            // this.list4 = resp4.data.result.rows;
            // console.warn(this.list4);
            // const newItem = {
            //   id: tag_id,
            //   visitor_id: this.list[j].visitor_id,
            //   fname: this.list[j].first_name,
            //   lname: this.list[j].last_name,
            //   tel: this.list[j].tel,
            //   contract: this.list[j].contract,
            //   category: this.list[j].category,
            //   location: this.list4[0].room,
            //   timestamp:moment(this.list4[0].scan_timestamp).tz('Asia/Bangkok').format(),
            //   tag_address: tag_address,
            //   time_start: moment(this.list[j].time_start).tz('Asia/Bangkok').format(" hh:mm A"),
            //   id_civiliz: this.list[j].id_civiliz,
            //   type: 'visitor'
            // };
            // this.dashbord.push(newItem);
//             break
//         }else if(j == this.list.length-1){
//           this.add_card(tag_id,tag_address)
//           break
//         }
//       }
//     },
//     visitor_item_card: async function(tag_id,tag_address){

//       for (var j = 0; j < this.list.length; j++){
//         if(tag_address == this.list[j].tag_address){
//             console.log("in visitor "+tag_id)
//             let resp4 = await axios.get("https://diis.herokuapp.com/api/scanlog",{
//                 params: {
//                 tag_address: tag_address,
//                 time_start: moment(this.list[j].time_start).tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
//                 time_stop: moment().tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
//                 }});
//             this.list4 = resp4.data.result.rows;
//             console.warn(this.list4);
//             const newItem = {
//               id: tag_id,
//               visitor_id: this.list[j].visitor_id,
//               fname: this.list[j].first_name,
//               lname: this.list[j].last_name,
//               tel: this.list[j].tel,
//               contract: this.list[j].contract,
//               category: this.list[j].category,
//               location: this.list4[0].room,
//               timestamp:moment(this.list4[0].scan_timestamp).tz('Asia/Bangkok').format(),
//               tag_address: tag_address,
//               time_start: moment(this.list[j].time_start).tz('Asia/Bangkok').format(" hh:mm A"),
//               id_civiliz: this.list[j].id_civiliz,
//               type: 'visitor'
//             };
//             this.dashbord.push(newItem);
//             break;
//         }else if(j == this.list.length-1){
//           this.item_card(tag_id,tag_address)
//           break;
//         }
//       }
//     },
//   }
};
</script>