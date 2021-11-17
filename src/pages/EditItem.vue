<template>
  <q-page class="q-pa-sm">
    <section-header title="Edit object tag"subTitle="แก้ไขข้อมูล Tag"></section-header>
    <div class="row q-gutter-col-md justify-center">
      <div class="col-9">
        <q-card class="my-card bg-indigo-1 rounded-borders-20 shadow-20 q-ma-sm">
          <q-card-section class="text-primary">
            <div class="row items-center no-wrap">
              <div class="col-3">
                <div class="text-center">
                  <q-avatar square size="150px">
                    <q-icon name="fas fa-box" color="blue-8" />
                  </q-avatar>
                </div>
              </div>
              <div class="col-7">
                <div class="text-h3">Tag {{ id }}</div>
                <div class="text-subtitle2">
                  <q-badge color="green-8" label="Connected" />
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section style="margin: 30px">
            <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" method="post">
              <div class="row">
                <div class="col-2">Type</div>
                <div class="col-8">
                  <q-input
                    type="text"
                    name="Tool"
                    v-model="posts.tool_name"
                    label="Type of object"
                    lazy-rules
                    maxlength="15"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Please enter type of object',
                    ]"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-2">Start position</div>
                <div class="col-8">
                  <q-input
                    type="text"
                    name="room"
                    v-model="posts.Owner"
                    label="Room Install"
                    lazy-rules
                    maxlength="15"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Please enter start position',
                    ]"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-2">Machine code</div>
                <div class="col-8">
                  <q-input
                    type="text"
                    v-model="posts.parcel_number"
                    label="xxxx-xxxxx-xxxxx"
                    mask="#### - ##### - #####"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Please enter machine code',
                      (val) =>
                        val.length >= 20 ||
                        'Please enter real machine code',
                    ]"
                  />
                </div>
              </div>
              <div class="row" >
                <div class="col-2">Person to contract</div>
                <div class="col-8">
                  <q-input
                    type="text"
                    v-model="posts.tool_person"
                    label="Person Install"
                    lazy-rules
                    maxlength="30"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Please enter person to contract',
                    ]"
                  />
                </div>
              </div>
              <div class="row" >
                <div class="col-2">Detail</div>
                <div class="col-8">
                  <q-input
                    v-model="posts.detail"
                    label="Detail of item"
                    lazy-rules
                    maxlength="50"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Please enter detail object',
                    ]"
                  />
                </div>
              </div>
              <div class="row justify-end" id_civiliz="topper">
                <div class="col-3">
                  <q-btn
                    icon="check"
                    color="primary-gradient"
                     label="Submit" type="submit"
                    clickable
                  />
                  <q-btn
                    icon="refresh"
                    label="Reset"
                  type="reset"
                    color="primary"
                    flat
                    class="q-ml-sm"
                  ></q-btn>
                </div>
              </div>
            </form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import SectionHeader from "../components/SectionHeader.vue";
import { axios } from "boot/axios";
import { ref } from 'vue'
export default {
  components: {
    SectionHeader,
  },
  data() {
    return {
      posts: {
        tool_name: [],
        Owner: [],
        parcel_number: [],
        tool_person: [],
        detail: [],
        tag_address:"",
        item_id:""
      },
      id: this.$route.params.id,
      list: undefined,
    };
  },
  async mounted() {
    //<------------------------- Connect Database ------------------------------------- -->
    const url = "http://localhost:3030/api/" 
    let resp2 = await axios.get(url+"tags");
    this.list2 = resp2.data.result.rows;
    console.warn(this.list2);
    console.warn(this.list2[this.id-1].tag_address)
    let respx = await axios.get(url+"editItem",{
      params: {
            tag_address: this.list2[this.id-1].tag_address,
          },
    });
    this.listx = respx.data.result.rows;
    console.warn(this.listx);
    console.warn(this.listx[0].tool_name);

    this.posts.tool_name=this.listx[0].tool_name;
    this.posts.Owner=this.listx[0].Owner;
    this.posts.parcel_number=this.listx[0].parcel_number;
    this.posts.tool_person=this.listx[0].tool_person;
    this.posts.detail=this.listx[0].detail;

    let resp = await axios.get(url+"items");
    this.count = resp.data.result.rows.length;
    this.list = resp.data.result.rows;
    console.warn(this.list);
    console.warn("id last "+this.list[this.count - 1].item_id + 1);
    this.posts.item_id = this.listx[0].item_id;
    console.warn("this.item"+this.posts.item_id);
    let resp4 = await axios.get(url + "scanlog");
    this.list4 = resp4.data.result.rows;
    console.warn("list4 scanerlog");
    console.warn(this.list4);
  },
  methods: {
    //<------------------------- Fuction Add Data ------------------------------------------ -->
    async onSubmit() {
      if (
        this.posts.tool_name !== "" &&
        this.posts.Owner !== "" &&
        this.posts.parcel_number !== "" &&
        this.posts.tool_person !== "" &&
        this.posts.detail !== "" 
      ) {
        console.warn("connect");
        console.warn(this.posts);
        const url = "http://localhost:3030/api/" 
        let result = await axios.put(url+"updateDataItem/"+this.posts.item_id,{
            tool_name: this.posts.tool_name,
            Owner: this.posts.Owner,
            parcel_number: this.posts.parcel_number,
            tool_person: this.posts.tool_person,
            detail: this.posts.detail,
            tag_address: this.posts.tag_address,
          });
        console.warn("Test")
        console.warn(result);
        this.$router.push("/index");
      } else {
        console.warn("Not connect");
         alert("Please inform your information before submit.");
      }
    },
    onReset () {
      this.posts.tool_name = null;
      this.posts.Owner = null;
      this.posts.parcel_number = null;
      this.posts.tool_person = null;
      this.posts.detail = null;
    }
  },
};
</script>

<style>
#top {
  margin-top: 10px;
}
#topper {
  margin-top: 50px;
  margin-bottom: 30px;
}
</style>