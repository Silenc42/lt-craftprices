<template>
  <v-container>
    <v-row align="start" justify="center">
      <v-col>
        <SelectorOfBaseItem v-model:selectedItemName="selectedBaseItemName"/>
      </v-col>
      <v-col>
        <SelectorOfEnchantment/>
      </v-col>
    </v-row>
    <v-row align="start" justify="center">
      <v-spacer/>
      <v-col cols="5">        
        <SelectorOfCrafter v-model:selectedCrafter="selectedCrafter"/>
      </v-col>
      <v-spacer/>
    </v-row>
    <v-row align="start" justify="center">
      <v-col>
        <DisplayerOfCrafterStats v-model:chosenCrafter="selectedCrafter"/>
      </v-col>
      <v-col>
        <DisplayerOfCraftingOffer v-model:chosenCrafter="selectedCrafter" v-model:chosenItemName="selectedBaseItemName"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import SelectorOfBaseItem from "@/components/SelectorOfBaseItem.vue";
import SelectorOfEnchantment from "@/components/SelectorOfEnchantment.vue";
import SelectorOfCrafter from "@/components/SelectorOfCrafter.vue";
import DisplayerOfCrafterStats from "@/components/DisplayerOfCrafterStats.vue";
import DisplayerOfCraftingOffer from "@/components/DisplayerOfCraftingOffer.vue";
import {Ref, ref, UnwrapRef} from "vue";
import {crafterRankEnum} from "@/DataRepositoriesAndModels/crafterChoices";

const selectedBaseItemName = ref();
const selectedCrafter: Ref<UnwrapRef<crafterRankEnum>> = ref(crafterRankEnum.diy);
</script>

<style scoped>
/*noinspection CssUnusedSymbol*/
.v-col {
  margin: 8px;
  padding: 8px;
  background: #212121;
}
</style>
