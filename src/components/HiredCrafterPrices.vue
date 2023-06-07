<template>
  <div>
    <v-radio-group :inline=true v-model="craftRankChoice">
      <v-radio label="Journeyman" :value="crafterRank.journeyman"></v-radio>
      <v-radio label="Expert" :value="crafterRank.expert"></v-radio>
      <v-radio label="Master" :value="crafterRank.master"></v-radio>
    </v-radio-group>
  </div>
</template>

<script setup lang="ts">
import {manufacturableItem} from "@/DataJsons/manufacturedItemsModels";
// import * as crafterStats from '../DataJsons/crafterStats.json'
import {crafterRank, crafterType} from "@/DataJsons/crafterStatsModels";
import {computed, ComputedRef, Ref, ref, UnwrapRef} from "vue";


const props = defineProps<{ item: manufacturableItem | null, type: crafterType }>()
const craftRankChoice: Ref<UnwrapRef<crafterRank | null>> = ref<crafterRank | null>(null);
// const ccc = computed(() => {
//   switch (craftRankChoice.value) {
//     case crafterRank.expert:
//       return 'exp';
//     case crafterRank.master:
//       return 'master';
//     case crafterRank.journeyman:
//       return 'journey';
//     default:
//       return 'nothing'
//   }
// });

//-----------below this goes into service --------------

// const crafters: ComputedRef<crafterStats[]> = computed(_ => {
//   switch (props.type) {
//     case crafterType.manufacturer:
//       return crafterStats.manufacturersStats;
//     case crafterType.enchanter:
//       return crafterStats.enchantersStats;
//     case crafterType.forger:
//       return crafterStats.forgersStats;
//   }
// });
</script>
<style scoped>

</style>
