<template>
  <q-card class="col-4 rounded-borders-10 shadow-5" id="my-card-1">
        
      <q-card-section >
        <div class="text-h6 text-blue-8">Type : Printer</div>
        <div class="text-subtitle2">Machine code : 123456</div>
        <div class="text-subtitle2">Starting position : Manalab</div>
      </q-card-section>
       <q-card-section>
         <div class="text-subtitle3">Person to contract : Sorawut</div>
        <div class="text-subtitle3">Detail : Printer colors</div>
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
// <<<<<<< HEAD
//     props: ['fname','lname','tel','category','id_civiliz','contract','timeout'],
// =======
    props: ['data'],
}
</script>

<style>

</style>