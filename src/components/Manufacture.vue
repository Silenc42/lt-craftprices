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
          :items="itemsInSelectedCategory"
        />
      </v-col>
    </v-row>
  </v-container>


</template>

<script setup lang="ts">
import {computed, ref} from "vue";

import * as tools from '../DataJsons/tools.json'
import * as manufacturableItems from '../DataJsons/manufacturedItems.json'
import {manufacturableItemCategory} from "@/DataJsons/manufacturedItemsModels";

const manufactureCategories: manufacturableItemCategory[] = manufacturableItems.manufactureCategories;

const itemCategories = computed(_ => {
  return manufactureCategories.map((category) => category.categoryName);
})


const selectedCategory = ref();
const selectedItem = ref();

function resetItemSelection(): void {
  selectedItem.value = null;
}

const itemsInSelectedCategory = computed(_ => {
  return manufactureCategories.find(category => category.categoryName === selectedCategory.value)?.items.map(item => item.itemName) ?? [];
});
</script>

<style scoped>

</style>
