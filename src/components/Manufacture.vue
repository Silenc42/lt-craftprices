<template>
  <v-container>
    <v-row>
      <h2>Manufacturing</h2>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          v-model="selectedCategory"
          label="Select Category"
          :items="itemCategories"
          @update:modelValue="resetItemSelection()"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          id="itemSelector"
          v-model="selectedItem"
          label="Select Item"
          :items="manufacturedItemsList"
        />
      </v-col>
    </v-row>
  </v-container>


</template>

<script setup lang="ts">
import {computed, ref} from "vue";

//TODO move to / calculate from json file
const itemCategories = ['Armour', 'Simple Weapon', 'Martial Weapon', 'Magitech Firearm', 'Other Item']
const selectedCategory = ref();
const selectedItem = ref();

function resetItemSelection(): void {
  selectedItem.value = null;
}

const manufacturedItemsList = computed(_ => {
  if (selectedCategory.value === 'Armour') {
    return armourList;
  }
  if (selectedCategory.value === 'Simple Weapon') {
    return ['Simple Weapons', 'Simple Weapons2'];
  }
  if (selectedCategory.value === 'Martial Weapon') {
    return ['Martial Weapons', 'Martial Weapons2'];
  }
  if (selectedCategory.value === 'Magitech Firearm') {
    return ['Magitech Firearms', 'Magitech Firearms2'];
  }
});
const armourList = [
  'Padded',
  'hide',
  'shield',
  'Leather',
  'chain shirt',
  'ring mail',
  'Chain mail',
  'Studded leather',
  'scale mail',
  'Breastplate',
  'splint',
  'Half plate',
  'Plate',]
</script>

<style scoped>

</style>
