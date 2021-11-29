<template >
  <q-icon
    
    name="fas fa-user-tag"
    class="col-4 tag blink row q-gutter-sm"
    color="orange-8"
    size="30px"
  >
    <q-popup-proxy>
      <Map-card
        :item = "visitor"
      ></Map-card>
    </q-popup-proxy>
    
     <q-badge color="green-8" :label="'TAG '+visitor.id"  />
     <q-icon v-if="visitor.showing==true" class="warning text-red-9" name="warning" />
  </q-icon>

</template>

<script>
import MapCard from "../components/MapCard.vue";
const moment = require("moment");
export default {
  props: [
    "visitor"
  ],
  components: {
    MapCard,
  },
  data() {
    return {
    };
  },
};
</script>

<style>
.tag {
  width: 50px;
}
.blink {
  animation: blinker 5s linear infinite;
}
.warning {
  position: absolute;
  overflow: hidden;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>