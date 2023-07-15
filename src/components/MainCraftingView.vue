<template>
  <v-container>
    <v-row align="start" justify="center">
      <v-col>
        <SelectorOfBaseItem
          v-model:selectedItemName="selectedBaseItemName"
          v-model:craft-base-item="craftBaseItem"
        />
      </v-col>
      <v-col>
        <SelectorOfEnchantment
          v-model:do-enchanting="doEnchanting"
          v-model:selected-monster-type="monsterType"
          v-model:selected-rarity="itemRarity"
        />
      </v-col>
    </v-row>
    <v-row align="start" justify="center">
      <v-spacer />
      <v-col cols="5">
        <SelectorOfCrafter v-model:selectedCrafter="selectedCrafter" />
      </v-col>
      <v-spacer />
    </v-row>
    <v-row align="start" justify="center">
      <v-col>
        <DisplayerOfCraftSelf
          v-if="selectedCrafter === crafterRankEnum.diy"
          v-model:chosenItemName="selectedBaseItemName"
        />
        <DisplayerOfCrafterStats
          v-else
          v-model:chosenCrafterRank="selectedCrafter"
          v-model:chosenCrafterType="craftingType"
        />
      </v-col>
      <v-col>
        <DisplayerOfCraftingOffer
          v-model:chosenCrafter="selectedCrafter"
          v-model:chosenItemName="selectedBaseItemName"
        />
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
import { Ref, ref, UnwrapRef } from "vue";
import {
  crafterRankEnum,
  crafterTypeEnum,
} from "@/DataRepositoriesAndModels/crafterChoices";
import DisplayerOfCraftSelf from "./DisplayerOfCraftSelf.vue";
import { ComputedRef } from "vue";
import { computed } from "vue";

const craftBaseItem: Ref<boolean> = ref(false);
const doEnchanting: Ref<boolean> = ref(false);
const craftingType = computed(() => {
  if (craftBaseItem.value && doEnchanting.value) {
    return crafterTypeEnum.forger.toString();
  }
  if (!craftBaseItem.value && doEnchanting.value) {
    return crafterTypeEnum.enchanter.toString();
  }
  if (craftBaseItem.value && !doEnchanting.value) {
    return crafterTypeEnum.manufacturer.toString();
  }

  return crafterTypeEnum.none.toString();
});

const selectedBaseItemName: Ref<string | undefined> = ref();
const monsterType: Ref<string | undefined> = ref();
const itemRarity: Ref<string | undefined> = ref();
const selectedCrafter: Ref<UnwrapRef<crafterRankEnum>> = ref(
  crafterRankEnum.diy
);
</script>

<style scoped>
/*noinspection CssUnusedSymbol*/
.v-col {
  margin: 8px;
  padding: 8px;
  background: #212121;
}
</style>
