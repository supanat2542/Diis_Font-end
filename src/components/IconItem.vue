<template>
<div>

  <q-icon
     name="fas fa-box" 
    class="tag blink row q-gutter-xs"
    color="blue-8"
    size="30px"
  >
    <q-popup-proxy>
      <Object-card
        :item = "item"
      ></Object-card>
    </q-popup-proxy>
    
     <q-badge color="orange-8" :label="'TAG '+item.id"  />
     <q-icon v-if="item.showing==true" class="warning text-red-9" name="warning" />
  </q-icon>
  
  </div>
</template>

<script>
import ObjectCard from "../components/ObjectCard.vue";
const moment = require("moment");
export default {
  props: [
    "item"
  ],
  components: {
    ObjectCard,
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