<template>
  Crafting Offer:
  <v-container>
    <v-row>
      <v-col>
        DC:
      </v-col>
      <v-col>
        {{displayModel.dc}}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Crafter's Modifier:
      </v-col>
      <v-col>
        {{displayModel.modifier}}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Crafting Time:
      </v-col>
      <v-col>
        {{displayModel.craftingTime}}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Crafting Cost:
      </v-col>
      <v-col>
        {{displayModel.crafterCost}}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Material Cost:
      </v-col>
      <v-col>
        {{displayModel.materialCost}}
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {getCraftingOfferForDisplay} from "@/Calculators/CalculatorOfCrafteringOffer";
import {crafterRankEnum, crafterRankValidator, crafterTypeEnum} from "@/DataRepositoriesAndModels/crafterChoices";
import {computed} from "vue";

const props = defineProps({
  chosenCrafter: {
    type: String,
    validator(value: string): boolean {
      return crafterRankValidator(value);
    }
  },
  chosenItemName: String
});

const displayModel = computed(_ => getCraftingOfferForDisplay(props.chosenCrafter as crafterRankEnum, crafterTypeEnum.manufacturer, props.chosenItemName ?? ''))

</script>

<style scoped>

</style>
