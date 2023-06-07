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
          item-title="itemName"
          return-object
        />
      </v-col>
    </v-row>
    <v-row v-if="selectedItem != null">
        <v-col>
          <ManufactureItemDetails :item="selectedItem"></ManufactureItemDetails>
        </v-col>
        <v-col>
          <HiredCrafterPrices 
          :item="selectedItem" 
          :type="crafterType.manufacturer"></HiredCrafterPrices>
        </v-col>
    </v-row>
  </v-container>


</template>

<script setup lang="ts">
import {computed, ComputedRef, Ref, ref} from "vue";

import * as manufacturableItems from '../DataJsons/manufacturedItems.json'
import {manufacturableItem, manufacturableItemCategory} from "@/DataJsons/manufacturedItemsModels";
import {crafterType} from "@/DataJsons/crafterStatsModels";
import ManufactureItemDetails from "@/components/ManufactureItemDetails.vue";
import HiredCrafterPrices from "@/components/HiredCrafterPrices.vue";

const manufactureCategories: manufacturableItemCategory[] = manufacturableItems.manufactureCategories;

const itemCategories: ComputedRef<string[]> = computed(_ => {
  return manufactureCategories.map((category) => category.categoryName);
})

const selectedCategory: Ref<string | null> = ref(null);
const selectedItem: Ref<manufacturableItem | null> = ref(null);

function resetItemSelection(): void {
  selectedItem.value = null;
}

const itemsInSelectedCategory: ComputedRef<manufacturableItem[]> = computed(_ => {
  return manufactureCategories.find(category => category.categoryName === selectedCategory.value)?.items ?? [];
});
</script>

<style scoped>

</style>
