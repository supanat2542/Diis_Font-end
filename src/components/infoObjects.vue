<template>
  <q-card class="col-4 rounded-borders-10 shadow-5" id="my-card-1">
        
      <q-card-section >
        <div class="text-h6 text-blue-8">Type : {{ data.tool_name }}</div>
        <div class="text-subtitle2">Machine code : {{ data.parcel_number }}</div>
        <div class="text-subtitle2">Starting position : {{ data.Owner }}</div>
      </q-card-section>
       <q-card-section>
         <div class="text-subtitle3">Person to contract : {{ data.tool_person }}</div>
        <div class="text-subtitle3">Detail : {{ data.detail }}</div>
      </q-card-section>
      
      </q-card>
</template>

<script>
export default {
    props: ['data'],
}
</script>

<style>

</style>