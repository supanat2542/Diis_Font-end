<template>
  <q-card class="my-card">
    <q-card-section class="text-primary" :style='{background:item.colors}'>
      <div class="row items-center no-wrap">
        <div class="col">
        <div class="text-center">
        <q-avatar square size="80px">
          <q-icon name="fas fa-box" color="blue-8" />
        </q-avatar>
      </div>    
        </div> 
        <div class="col">
          <div class="text-h6">Item #{{ item.id }}</div>
          <div class="text-subtitle2 q-gutter-xs ">
            <q-badge color="green-8" class="justify-center" :label="item.location" />
            <q-badge v-if="item.showing==true" color="yellow-8" text-color="black" class="justify-center">
            <q-icon
              name="warning"
              size="14px"
              class="q-ml-xs"
            />
             {{item.time_out}}
          </q-badge>
          </div>
        </div>

        <div class="col-auto">
          <q-btn color="primary" round flat icon="more_vert">
            <q-menu cover auto-close>
              <q-list>
                <q-item :to="'/object/'+item.item_id" clickable>
                  <q-item-section >Check TimeLine</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none text-primary">
      <q-list separator>
        <q-item v-ripple>
          <q-item-section>
            <q-item-label overline>Type</q-item-label>
            <q-item-label>{{ item.tool_name }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section>
            <q-item-label overline>Starting position</q-item-label>
            <q-item-label>{{ item.Owner }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section>
            <q-item-label overline>Machine code</q-item-label>
            <q-item-label>{{ item.parcel_number }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section>
            <q-item-label overline>Person to contact</q-item-label>
            <q-item-label>{{ item.tool_person }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    
  </q-card>
  
  
</template>

<script>

export default {
  props: ["item"],
};
</script>

<style>
</style>