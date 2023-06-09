<template>
  <v-row>
    <div>
      <v-radio-group :inline=true v-model="craftRankChoice">
        <v-radio label="Journeyman" :value="crafterRank.journeyman"></v-radio>
        <v-radio label="Expert" :value="crafterRank.expert"></v-radio>
        <v-radio label="Master" :value="crafterRank.master"></v-radio>
      </v-radio-group>
    </div>
  </v-row>
  <div v-if="craftRankChoice">
  <v-row>
    Manufacturing check: DC {{ displayModel.dc }} check with +{{ displayModel.modifier }} modifier
  </v-row>
  <v-row>
    Crafting Time: {{ displayModel.craftingTime }}
  </v-row>
  <v-row>
    Crafter Cost: {{ displayModel.crafterCost }}
  </v-row>
  <v-row>
    Material Cost: {{ item.materialCost }}
  </v-row>
  <v-row>
    Crafter: {{ selectedCrafter?.speedFactor?? 'NULL' }}
  </v-row>
  </div>
</template>

<script setup lang="ts">
import * as craftersListData from '../DataJsons/crafterStats.json'
import {crafterRank, craftersList, craftersOfType, crafterStats, crafterType} from "@/DataJsons/crafterStatsModels";
import {computed, ComputedRef, Ref, ref, UnwrapRef} from "vue";
import {craftableItem} from "@/DataJsons/craftableItem";

const craftersList: craftersList = craftersListData;

const props = defineProps<{ item: craftableItem, type: crafterType }>()
const craftRankChoice: Ref<UnwrapRef<crafterRank | null>> = ref<crafterRank | null>(null);

const displayModel = computed(_ => ({
  dc: props.item?.dc,
  modifier: selectedCrafter.value?.modifier,
  craftingTime: (props.item.timeInHours / selectedCrafter.value?.speedFactor).toFixed(2),
  crafterCost: (props.item.timeInHours / selectedCrafter.value?.speedFactor * selectedCrafter.value?.hourlyRate).toFixed(2)
}));

const selectedCrafter: ComputedRef<crafterStats | null> = computed(_ => {
  const typedCrafter = getCraftersOfType(props.type);
  switch (craftRankChoice.value) {
    case crafterRank.journeyman:
      return typedCrafter.journeyman;
    case crafterRank.expert:
      return typedCrafter.expert;
    case crafterRank.master:
      return typedCrafter.master;
    default:
      return null;
  }
});

function getCraftersOfType(type: crafterType): craftersOfType {
  switch (type) {
    case crafterType.manufacturer:
      return craftersList.manufacturers;
    case crafterType.enchanter:
      return craftersList.enchanters;
    case crafterType.forger:
      return craftersList.forgers;
  }
}
</script>
<style scoped>

</style>
