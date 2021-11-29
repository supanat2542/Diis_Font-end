<template>
  <q-page class="q-pa-sm">
    <section-header
      title="Report"
      subTitle="แสดงข้อมูลการใช้งานของ Users"
    ></section-header>
     <q-option-group class="text-right" style="margin-right:15px"
        v-model="panel"
        inline
        :options="[
          { label: 'Persons', value: 'persons' },
          { label: 'Objects', value: 'objects' }
        ]"
      />
    
<q-tab-panels v-model="panel" animated  transition-prev="fade" transition-next="fade" style="background-color: #eceff1">
        <q-tab-panel name="persons">
          <q-tabs v-model="tab" class="q-mb-lg">
            <q-tab class="text-purple" name="Daily" label="Daily" />
            <q-tab class="text-orange" name="Monthly" label="Monthly" />
            <q-tab class="text-teal" name="Select Date" label="Select Date" />
          </q-tabs>
          <q-tab-panels
            v-model="tab"
            animated
            transition-prev="fade"
            transition-next="fade"
            style="background-color: #eceff1"
          >
            <!-- =================================================== Print Day ==================================================================== -->
            <q-tab-panel name="Daily">
              <div class="q-pa-md">
                <q-table
                  :title="`Timeline Daily - ` + this.today"
                  :data="list_day"
                  :columns="columns"
                  row-key="name"
                  class="rounded-borders-10 shadow-5"
                >
                  <template v-slot:header="props">
                    <q-tr :props="props">
                      <q-th auto-width />
                      <q-th v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.label }}
                      </q-th>
                    </q-tr>
                  </template>

                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td auto-width>
                        <q-btn
                          size="md"
                          color="primary-gradient"
                          round
                          :to="'/timeline/' + props.row.id"
                          :icon="props.expand ? '' : 'person_pin_circle'"
                        />
                      </q-td>
                      <q-td v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.value }}
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </div>
            </q-tab-panel>
            <!-- =========================================== Print Mounthly =========================================================== -->
            <q-tab-panel name="Monthly">
              <div class="q-pa-md">
                <q-table
                  :title="`Timeline Monthly - ` + this.month"
                  :data="list_month"
                  :columns="columns"
                  row-key="name"
                  class="rounded-borders-10 shadow-5"
                >
                  <template v-slot:header="props">
                    <q-tr :props="props">
                      <q-th auto-width />
                      <q-th v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.label }}
                      </q-th>
                    </q-tr>
                  </template>

                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td auto-width>
                        <q-btn
                          size="md"
                          color="primary-gradient"
                          round
                          :to="'/timeline/' + props.row.id"
                          :icon="props.expand ? '' : 'person_pin_circle'"
                        />
                      </q-td>
                      <q-td v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.value }}
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </div>
            </q-tab-panel>
            <!-- ================================================ Print Select Date =============================================================== -->
            <q-tab-panel name="Select Date">
              <div class="col">
                <div class="row-4">Select Date</div>
                <div class="row">
                  <div class="q-pa-md col self-center" style="max-width: 300px">
                  <q-input filled v-model="date" mask="date" :rules="['date']" label="Select Date">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="date">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Select"
                                color="primary" 
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="q-pa-md col" style="max-width: 300px">
                <q-select filled v-model="select_room" :options="options" label="Select Room" />
                </div>
                <div class="q-gutter-md  self-center" style="max-width: 300px">
                  <q-btn
                  icon="check"
                  color="primary-gradient"
                  label="Submit" type="submit"
                  @click="select()"
                  clickable
                  />
                  <q-btn
                  color="primary-gradient"
                  label="Show all data" type="submit"
                  @click="showdata()"
                  clickable
                  />
                </div>
                
                </div>
              </div>

              <div class="q-pa-md">
                <q-table
                  title="Timeline"
                  :data="list_select"
                  :columns="columns"
                  row-key="name"
                  class="rounded-borders-10 shadow-5"
                >
                  <template v-slot:header="props">
                    <q-tr :props="props">
                      <q-th auto-width />
                      <q-th v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.label }}
                      </q-th>
                    </q-tr>
                  </template>
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td auto-width>
                        <q-btn
                          size="md"
                          color="primary-gradient"
                          round
                          :id="0"
                          :to="'/timeline/' + props.row.id"
                          :icon="props.expand ? '' : 'person_pin_circle'"
                        />
                      </q-td>
                      <q-td v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.value }}
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-tab-panel>
<!-- ================================================ Print Object =============================================================== -->
        <q-tab-panel name="objects">
              <div class="q-pa-md">
                <q-table
                  :title="`Timeline Objects `"
                  :columns="columnsObject"
                  :data="list_object"
                  row-key="type"
                  class="rounded-borders-10 shadow-5"
                >
                  <template v-slot:header="props">
                    <q-tr :props="props">
                      <q-th auto-width />
                      <q-th v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.name}}
                      </q-th>
                    </q-tr>
                  </template>

                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td auto-width>
                        <q-btn
                          size="md"
                          color="purple"
                          round
                          :id="0"
                          :to="'/object/' + props.row.item_id"
                          :icon="props.expand ? '' : 'inventory'"
                        />
                      </q-td>
                      <q-td v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.value }}
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </div>
        </q-tab-panel>
      </q-tab-panels>
  </q-page>
</template>

<script>
import SectionHeader from "../components/SectionHeader.vue";
const moment = require("moment-timezone");
import { axios } from "boot/axios";
import { ref } from 'vue'

export default {
  components: {
    SectionHeader,
  },
  data() {
    return {
      panel:'persons',
      tab: "Daily",
      select_room: null,
      date:'',
      today: moment().format("[Date] DD"),
      month: moment().format("YYYY/MM"),
      list_month: [],
      list_day: [],
      list_select: [],
      list_object: [],
      dashbord: [],
      options: [],
      columns: [
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "date",
          align: "center",
          label: "Date",
          field: "date",
          sortable: true,
        },
        {
          name: "time-start",
          align: "center",
          label: "Time Start",
          field: "time_start",
          sortable: true,
        },
        {
          name: "time-stop",
          align: "center",
          label: "Time Stop",
          field: "time_stop",
          sortable: true,
        },
        {
          name: "type",
          align: "center",
          label: "Type",
          field: "type",
          sortable: true,
        },
        {
          name: "location",
          align: "center",
          label: "Location",
          field: "location",
          sortable: true,
        },
      ],
      columnsObject: [
        {
          name: "Tool Name",
          required: true,
          label: "tool_name",
          align: "center",
          field: (row) => row.tool_name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "Parcel number",
          align: "center",
          label: "parcel_number",
          field: "parcel_number",
          sortable: true,
        },
        {
          name: "Start position",
          align: "center",
          label: "Owner",
          field: "Owner",
          sortable: true,
        },
        {
          name: "Person to contract",
          align: "center",
          label: "tool_person",
          field: "tool_person",
          sortable: true,
        },
        {
          name: "location",
          align: "center",
          label: "Location",
          field: "location",
          sortable: true,
        },
      ],
      
    };
      
  },
  async mounted() {
    console.warn("outline "+this.$store.getters.admin)
    if(this.$store.getters.admin==undefined){
        this.$router.push("/");
    }
    //<------------------------- Connect Database ----------------------------------->
    const url = "http://localhost:3030/api/" 
    let resp1 = await axios.get("https://diis.herokuapp.com/api/visitors");
    this.list1 = resp1.data.result.rows;
    console.warn("Visitor ");
    console.warn(resp1.data.result.rows); 

    let resp3 = await axios.get("https://diis.herokuapp.com/api/locations");
    this.list3 = resp3.data.result.rows;
    console.warn("list3 room");
    console.warn(this.list3);
    for(var k = 0; k < this.list3.length; k++){
      this.options.push(this.list3[k].room)
    }

    ////item/////
    let resp4 = await axios.get("https://diis.herokuapp.com/api/items");
    this.list4 = resp4.data.result.rows;
    console.warn("list4 items");
    console.warn(this.list4);


      for (var i = 0; i < this.list1.length; i++) {
        if(this.list1[i].time_stop==null){
            const newItem = {
              id: this.list1[i].visitor_id,
              date: moment(this.list1[i].time_start).tz('Asia/Bangkok').format("YYYY-MM-DD"),
              location: "",
              name: this.list1[i].first_name + " " + this.list1[i].last_name,
              timestart:  moment(this.list1[i].time_start).tz('Asia/Bangkok').format(),
              time_start: moment(this.list1[i].time_start).tz('Asia/Bangkok').format("hh:mm"),
              time_stop: "In Use",
              type: this.list1[i].category,
              tag_address:this.list1[i].tag_address
            };
            this.dashbord.push(newItem);
        }else{
            const newItem = {
              id: this.list1[i].visitor_id,
              date: moment(this.list1[i].time_start).tz('Asia/Bangkok').format("YYYY-MM-DD"),
              location: "1405",
              name: this.list1[i].first_name + " " + this.list1[i].last_name,
              timestart:  moment(this.list1[i].time_start).tz('Asia/Bangkok').format(),
              timestop:  moment(this.list1[i].time_stop).tz('Asia/Bangkok').format(),
              time_start: moment(this.list1[i].time_start).tz('Asia/Bangkok').format("hh:mm"),
              time_stop: moment(this.list1[i].time_stop).tz('Asia/Bangkok').format("hh:mm"),
              type: this.list1[i].category,
              tag_address:this.list1[i].tag_address
            };
            this.dashbord.push(newItem);
        }
        console.warn(this.dashbord)
        this.time()
        this.time_object()
        
      }
        
      for (var i = 0; i < this.dashbord.length; i++) {
        //<------------------------- List Day ----------------------------------->
        if ( moment(this.dashbord[i].date).tz('Asia/Bangkok').format("YYYY-MM-DD") == moment().tz('Asia/Bangkok').format("YYYY-MM-DD") ) {
          const newItems = {
            id: this.dashbord[i].id,
            date: this.dashbord[i].date,
            location: this.dashbord[i].location,
            name: this.dashbord[i].name,
            time_start: this.dashbord[i].time_start,
            time_stop: this.dashbord[i].time_stop,
            type: this.dashbord[i].type,
          };
          this.list_day.push(newItems);
        }
        //<------------------------- List Mounth ----------------------------------->
        if ( moment(this.dashbord[i].date).tz('Asia/Bangkok').format("YYYY-MM") ==  moment().tz('Asia/Bangkok').format("YYYY-MM") ) {
          const newItems = {
            id: this.dashbord[i].id,
            date: this.dashbord[i].date,
            location: this.dashbord[i].location,
            name: this.dashbord[i].name,
            time_start: this.dashbord[i].time_start,
            time_stop: this.dashbord[i].time_stop,
            type: this.dashbord[i].type,
          };
          this.list_month.push(newItems);
        }
      }

     for(var i = 0; i < this.list4.length; i++){
       const newItem = {
            Owner: this.list4[i].Owner,
            item_id: this.list4[i].item_id,
            parcel_number: this.list4[i].parcel_number,
            tag_address: this.list4[i].tag_address,
            tag_id: this.list4[i].tag_id,
            time_start: this.list4[i].time_start,
            time_stop: this.list4[i].time_stop,
            tool_name: this.list4[i].tool_name,
            tool_person: this.list4[i].tool_person,
            location: "",
          };
          this.list_object.push(newItem);
     }
    console.warn("Object ")
    console.warn(this.list_object)
      this.list_select = this.dashbord;
      console.warn(this.list_select);
    },
    created(){
      this.time_object()
      this.time()
      setInterval(() => this.time(),120000);
      setInterval(() => this.time_object(),120000);

    },  
    methods: {
      //<------------------------- Select Date ----------------------------------->

      async select() {
        this.list_select = []
        if(this.date==''&&this.select_room==null){
          console.warn("case 1 = =")
          this.list_select = this.dashbord;
        }else if(this.date!=''&&this.select_room==null){
          console.warn("case 2 ! =")
          for(var i = 0; i < this.dashbord.length; i++){
            console.warn("cout "+this.dashbord.length)
            console.warn(i)
            if(moment(this.dashbord[i].date).tz('Asia/Bangkok').format("YYYY/MM/DD")==this.date){
              const newItems = {
                id: this.dashbord[i].id,
                date: this.dashbord[i].date,
                location: this.dashbord[i].location,
                name: this.dashbord[i].name,
                time_start: this.dashbord[i].time_start,
                time_stop: this.dashbord[i].time_stop,
                type: this.dashbord[i].type,
              };
              this.list_select.push(newItems);
            }
          }
        }else if(this.date==''&&this.select_room!=null){
          console.warn("case 3 = !")
          console.warn("select "+this.select_room)
          for(var i = 0; i < this.dashbord.length; i++){
            if(this.dashbord[i].time_stop=="In Use"){
              console.warn("null")
              let resp = await axios.get("https://diis.herokuapp.com/api/scanlog",{
                  params: {
                    tag_address: this.dashbord[i].tag_address,
                    time_start: moment(this.dashbord[i].timestart).tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
                    time_stop: moment().tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
                    room:this.select_room,
                  }});
               this.list = resp.data.result.rows;
               console.warn("this.list");
               console.warn(this.list);
               if(this.list.length>0){
                const newItems = {
                  id: this.dashbord[i].id,
                  date: this.dashbord[i].date,
                  location: this.dashbord[i].location,
                  name: this.dashbord[i].name,
                  time_start: this.dashbord[i].time_start,
                  time_stop: this.dashbord[i].time_stop,
                  type: this.dashbord[i].type,
                };
                this.list_select.push(newItems);
               }
               
            }else{
              console.warn("unnull")
               let resp = await axios.get("https://diis.herokuapp.com/api/scanlog",{
                  params: {
                    tag_address: this.dashbord[i].tag_address,
                    time_start: moment(this.dashbord[i].timestart).tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
                    time_stop: moment(this.dashbord[i].timestop).tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
                    room:this.select_room,
                  }});
               this.list = resp.data.result.rows;
               console.warn("this.list");
               console.warn(this.list);
               if(this.list.length>0){
                 const newItems = {
                    id: this.dashbord[i].id,
                    date: this.dashbord[i].date,
                    location: this.dashbord[i].location,
                    name: this.dashbord[i].name,
                    time_start: this.dashbord[i].time_start,
                    time_stop: this.dashbord[i].time_stop,
                    type: this.dashbord[i].type,
                  };
                  this.list_select.push(newItems);
               }
               
            }
          }
        }else if(this.date!=''&&this.select_room!=null){
          console.warn("case 4 ! !")
          for(var i = 0; i < this.dashbord.length; i++){
            console.warn("cout "+this.dashbord.length)
            console.warn(i)
            if(moment(this.dashbord[i].date).tz('Asia/Bangkok').format("YYYY/MM/DD")==this.date){
              if(this.dashbord[i].time_stop=="In Use"){
              console.warn("null")
              let resp = await axios.get("https://diis.herokuapp.com/api/scanlog",{
                  params: {
                    tag_address: this.dashbord[i].tag_address,
                    time_start: moment(this.dashbord[i].timestart).tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
                    time_stop: moment().tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
                    room:this.select_room,
                  }});
               this.list = resp.data.result.rows;
               console.warn("this.list");
               console.warn(this.list);
               if(this.list.length>0){
                const newItems = {
                  id: this.dashbord[i].id,
                  date: this.dashbord[i].date,
                  location: this.dashbord[i].location,
                  name: this.dashbord[i].name,
                  time_start: this.dashbord[i].time_start,
                  time_stop: this.dashbord[i].time_stop,
                  type: this.dashbord[i].type,
                };
                this.list_select.push(newItems);
               }
               
            }else{
              console.warn("unnull")
               let resp = await axios.get("https://diis.herokuapp.com/api/scanlog",{
                  params: {
                    tag_address: this.dashbord[i].tag_address,
                    time_start: moment(this.dashbord[i].timestart).tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
                    time_stop: moment(this.dashbord[i].timestop).tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
                    room:this.select_room,
                  }});
               this.list = resp.data.result.rows;
               console.warn("this.list");
               console.warn(this.list);
               if(this.list.length>0){
                 const newItems = {
                    id: this.dashbord[i].id,
                    date: this.dashbord[i].date,
                    location: this.dashbord[i].location,
                    name: this.dashbord[i].name,
                    time_start: this.dashbord[i].time_start,
                    time_stop: this.dashbord[i].time_stop,
                    type: this.dashbord[i].type,
                  };
                  this.list_select.push(newItems);
               }
              }
            }
          }
        }
      },
      async showdata() {
        this.select_room= null,
        this.date='',
        this.list_select = this.dashbord;
      },
      async time(){
       for(var i = 0; i < this.dashbord.length; i++){
         if(this.dashbord[i].time_stop=="In Use"){
           let resp = await axios.get("https://diis.herokuapp.com/api/scanlog",{
            params: {
              tag_address: this.dashbord[i].tag_address,
              time_start: moment(this.dashbord[i].timestart).tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
              time_stop: moment(this.dashbord[i].timestop).tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
            }});
          this.list = resp.data.result.rows;
          console.warn("this.list");
          console.warn(this.list);
          this.dashbord[i].location=this.list[0].room;
          for(var j = 0; j < this.list_day.length; j++){
            if(this.list_day[j].id==this.dashbord[i].id){
              this.list_day[i].location=this.list[0].room;
              break;
            }
          }
          for(var j = 0; j < this.list_month.length; j++){
            if(this.list_month[j].id==this.dashbord[i].id){
              this.list_month[i].location=this.list[0].room;
              break;
            }
          }
         }else{
           break;
         }
       }
      },
      async time_object(){
       for(var i = 0; i < this.list_object.length; i++){
         if(this.list_object[i].time_stop==null){
           console.warn("null is yes")
            let resp = await axios.get("https://diis.herokuapp.com/api/scanlog",{
            params: {
              tag_address: this.list_object[i].tag_address,
              time_start: moment(this.list_object[i].time_start).tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
              time_stop: moment().tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss"),
            }});
            this.list = resp.data.result.rows;
            console.warn("this.list");
            console.warn(this.list);
            this.list_object[i].location=this.list[0].room;
         }else{
           console.warn("un null is no")
           this.list_object[i].location="1405"
         }
         
       }
      }
  },
};
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 490px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #c1f4cd

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>