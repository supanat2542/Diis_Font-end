<template>
  <q-card  class="my-card bg-indigo-1 rounded-borders-20 shadow-20 q-ma-sm">
    <q-card-section class="text-primary">
      <div class="row items-center no-wrap">
        <div class="col" style="width:251px;">
        <div class="text-center">
          
        <q-avatar square size="176px">
          <q-icon name="fas fa-wifi" color="red-8" style="font-size: 5rem;"/>
        </q-avatar>
      </div>
      <div class="col">
          <div class="text-h5 text-center">Tag #{{id}}</div>
          <div class="text-subtitle2 text-center"><q-badge color="red-8" label="Disconnected" /></div>
          
        </div>    
        </div> 
      </div>
    </q-card-section>
    <q-card-section class="text-primary">
      <div class="row items-center no-wrap">

        <div class="col-auto">
          <q-btn color="primary" round flat icon="more_vert">
            <q-menu cover auto-close>
              <q-list>
                <q-item :to="'/register/' +id" clickable class="text-center">
                  <q-icon name="fas fa-user-tag" color="orange-8"  class="col-1"/><q-item-section >Register Person</q-item-section>
                </q-item>
              </q-list>
              <q-list>
                <q-item :to="'/install/' +id" clickable class="text-center">
                  <q-icon name="fas fa-box" color="blue-8" class="col-1"/><q-item-section >Register Object</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: ["id"],
};
</script>

<style>
</style>