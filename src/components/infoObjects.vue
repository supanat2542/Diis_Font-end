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
      </q-card-section>
      
      </q-card>
</template>

<script>
export default {
    props: ['fname','lname','tel','category','id_civiliz','contract','timeout'],
}
</script>

<style>

</style>