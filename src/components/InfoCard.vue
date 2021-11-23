<template>
  <q-card class="col-4 rounded-borders-10 shadow-5" id="my-card-1">
        <q-card-section >
        <div class="text-h6 text-blue-8">Name : {{info.first_name+' '+info.last_name}}</div>
        <div class="text-subtitle2">Tel : {{ info.tel }}</div>
        <div class="text-subtitle2">ID card number : {{info.id_civiliz}}</div>
      </q-card-section>
       <q-card-section>
         <div class="text-subtitle3">Category : {{info.category}}</div>
        <div class="text-subtitle3">Person to contact : {{info.contract}}</div>
      </q-card-section>
      
      </q-card>
</template>

<script>
export default {
    props: ['info'],
}
</script>

<style>

</style>