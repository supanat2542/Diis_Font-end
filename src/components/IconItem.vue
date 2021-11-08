<template>
<div>

  <q-icon
     name="fas fa-box" 
    class="tag blink row q-gutter-xs"
    color="blue-8"
    size="30px"
  >
    <q-popup-proxy>
      <Item-card
        :item = "item"
      ></Item-card>
    </q-popup-proxy>
    
     <q-badge color="orange-8" :label="'TAG '+item.id"  />
     <q-icon v-if="this.showing==true" class="warning text-red-9" name="warning_amber" />
  </q-icon>
  
  </div>
</template>

<script>
import ItemCard from "../components/ItemCard.vue";
const moment = require("moment");
export default {
  props: [
    "item"
  ],
  components: {
    ItemCard,
  },
  data() {
    return {
      showing: false,
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