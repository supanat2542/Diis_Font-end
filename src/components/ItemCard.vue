<template>
  <q-card class="my-card bg-indigo-1 rounded-borders-20 shadow-20 q-ma-sm">
    <q-card-section class="text-primary" :style='{background:colors}'>
      <div class="row items-center no-wrap">
        <div class="col" style="width:119px">
          <div class="text-center">
            <q-avatar square size="80px">
              <q-icon name="fas fa-box" color="blue-8" />
            </q-avatar>
          </div>
        </div>
        <div class="col">
          <div class="text-h6">Item #{{ item.id }}</div>
          <div class="text-subtitle2 q-gutter-xs ">
            <q-badge color="red-8" class="justify-center" :label="this.room" />
            <div class="col">
                  <q-badge v-if="this.showing==true" color="yellow-8" text-color="black" class="justify-center">
                  <q-icon
                    name="warning"
                    size="14px"
                    class="q-ml-xs"
                  />
                  {{ this.time_out}}
                  </q-badge>
              </div>
          </div>
        </div>

        <div class="col-auto">
          <q-btn color="primary" round flat icon="more_vert">
            <q-menu cover auto-close>
              <q-list>
                <q-item clickable>
                  <q-item-section @click="alert = true"
                    >View detail</q-item-section
                  >
                </q-item>
                <q-item clickable to="/map">
                  <q-item-section>Locate on map</q-item-section>
                </q-item>
                <q-item clickable @click="confirm = true">
                  <q-item-section>Return the tag</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none text-primary">
      <q-list separator>
        <q-item v-ripple>
          <q-item-section>
            <q-item-label overline>Type</q-item-label>
            <q-item-label>{{ item.tool_name }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section>
            <q-item-label overline>Starting position</q-item-label>
            <q-item-label>{{ item.Owner }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section>
            <q-item-label overline>Object code</q-item-label>
            <q-item-label>{{ item.parcel_number }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section>
            <q-item-label overline>Person to contact</q-item-label>
            <q-item-label>{{ item.tool_person }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

   
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h5">Detail</div>
        </q-card-section>
        <q-card-section class="q-pt-none" style="width: 350px; margin: 15px">
          Tool : {{ item.tool_name }} <br />
          Starting position : {{ item.Owner }} <br />
          Object code : {{ item.parcel_number }} <br />
          Person to contact : {{ item.tool_person }} <br />
          Detail : {{ item.detail }} <br />
        </q-card-section>
        <q-card-section class="q-pt-none" style="width: 350px; margin: 15px;font-size:18px">
          Time Start : {{ item.time_start }} <br />
        </q-card-section>

        <q-card-actions align="right">
          <q-item :to="'/editItem/' + item.id" clickable class="text-center">
                  <q-item-section>Edit</q-item-section>
          </q-item> 
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirm">
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Are you sure to resrt.</span>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            flat
            label="Reset"
            color="green-6"
            v-close-popup
            @click="resetTag()"
          />
          <q-btn flat label="Cancel" color="red-8" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import { axios } from "boot/axios";
const moment = require("moment-timezone");
export default {
  props: [
    "item"
  ],
  data() {
    return {
      alert: false,
      confirm: false,
      showing: false,
      time_out:"",
      colors:'',
      room:"-",
    };
  },created(){
      this.time()
      setInterval(() => this.time(),120000);
  }, 
  mounted() {
    this.item.time_start = moment(this.item.time_start).format('hh:mm a')
  },
  methods: {
    async resetTag() {
      const url = "http://localhost:3030/api/" 
      let result = await axios.put(
        "https://diis.herokuapp.com/api/items/" + this.item.item_id, {
          time_stop: moment().format(),
        }
      );
      console.warn(result);
      let result2 = await axios.post("https://diis.herokuapp.com/api/scanlog", [
        {
          device_address: this.item.tag_address,
          scanner_id: "8e61a75d-12b7-4bda-8bc1-ed5983d33408-003",
        },
      ]);
      console.warn("kans : "+ this.item.tag_address)
      console.warn(result2);
      location.reload();
    },
    
    async time(){
      let resp = await axios.get("https://diis.herokuapp.com/api/scanlog",{
            params: {
              tag_address: this.item.tag_address,
              time_start: moment(this.item.time_start).tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
              time_stop: moment().tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
            }});
      this.list = resp.data.result.rows;
      console.warn("this.list");
      console.warn(this.list);
      
      this.room=this.list[0].room;

      //------------------------- send time out ------------------------------------------------
    var now_time = moment().tz('Asia/Bangkok')
    var last_time = moment(this.list[0].scan_timestamp).tz('Asia/Bangkok')
    var time_out =now_time.diff(last_time, 'minutes')
    console.warn(time_out)
    if(time_out>=30){
      this.time_out="out 30 min"
      this.colors = "#ffcc00"
      this.showing=true
    }else if(time_out>=20){
      this.time_out="out 20 min"
      this.colors = "#ffcc00"
      this.showing=true
    }else if(time_out>=10){
      this.time_out="out 10 min"
      this.colors = "#ffcc00"
      this.showing=true
    }else if(time_out<10){
      this.showing=false
      this.colors = "#ffffff"
    }
    }
  },
};
</script>

<style>
</style>