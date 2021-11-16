<template>
  <q-page class="q-pa-sm">
    <!-------------------------- From Register ---------------------------------------- -->
    <section-header
      title="Install Tool"
      subTitle="การลงทะเบียน Tool"
    ></section-header>
    <div class="row q-gutter-col-md justify-center">
      <div class="col-9">
        <q-card
          class="my-card bg-indigo-1 rounded-borders-20 shadow-20 q-ma-sm"
        >
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
                  <q-badge color="red-8" label="Disconnected" />
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section style="margin: 30px">
            <!-- -------------- form ----------------------------- -->
            <form
              @submit.prevent.stop="onSubmit"
              @reset.prevent.stop="onReset"
              method="post"
            >
              <div class="row">
                <div class="col-2">Tool Name</div>
                <div class="col-8">
                  <q-input
                    name="Tool"
                    v-model="posts.tool_name"
                    label="Tool"
                    lazy-rules
                    maxlength="15"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Please enter your last name',
                    ]"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-2">Owner room</div>
                <div class="col-8">
                  <q-input
                    name="room"
                    v-model="posts.Owner"
                    label="Room Install"
                    lazy-rules
                    maxlength="15"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Please enter your last name',
                    ]"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-2">Parcel number</div>
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
                        'Please enter your 13 Identification Number',
                      (val) =>
                        val.length >= 20 ||
                        'Please enter your real Identification Number',
                    ]"
                  />
                </div>
              </div>
              <div class="row" >
                <div class="col-2">Person Install</div>
                <div class="col-8">
                  <q-input
                    v-model="posts.tool_person"
                    label="Person Install"
                    lazy-rules
                    maxlength="30"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Please enter your person contract',
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
                        (val && val.length > 0) || 'Please enter your category',
                    ]"
                  />
                </div>
              </div>
              <div class="row justify-end" id_civiliz="topper">
                <div class="col-3">
                  <!-------------------------- Button Add Data ---------------------------------------- -->
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
import DeviceCard from "../components/DeviceCard.vue";
import AddCard from "../components/AddCard.vue";
import { axios } from "boot/axios";
export default {
  name: "PageIndex",
  components: {
    SectionHeader,
    DeviceCard,
    AddCard,
  },
  data() {
    return {
      posts: {
        tool_name: "",
        Owner: "",
        parcel_number: "",
        tool_person: "",
        detail: "",
        tag_address:"",
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

    for (var i = 0; i < this.list2.length; i++) {
      if (this.list2[i].tag_id == this.id) {
        this.posts.tag_address = this.list2[i].tag_address;
        console.warn("id address : " + this.posts.tag_address);
        break;
      }
    }
    console.warn("tag id : "+this.posts.tag_address);
  },
  methods: {
    //<------------------------- Fuction Add Data ------------------------------------------ -->
    async onSubmit() {
      // console.warn(" 1 : "+this.posts.first_name + " 2 : "+this.posts.last_name + " 3 : "+this.posts.tel + " 4 : "+this.posts.category +" 5 : "+ this.posts.id_civiliz  +" 6 : "+ this.posts.Person + " 7 : "+ this.posts.tel.length)
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
        let result = await axios.post(url+"items", [
          {
            tool_name: this.posts.tool_name,
            Owner: this.posts.Owner,
            parcel_number: this.posts.parcel_number,
            tool_person: this.posts.tool_person,
            detail: this.posts.detail,
            tag_address: this.posts.tag_address,
          },
        ]);
        console.warn(result);

        let result2 = await axios.post(url+"scanlog", [
          {
            device_address: this.posts.tag_address,
            scanner_id: "8e61a75d-12b7-4bda-8bc1-ed5983d33408-003",
          },
        ]);
        console.warn(result2);
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