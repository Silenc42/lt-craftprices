<template>
  {{ crafterName }} :

  <v-container>
    <v-row>
      <v-col> Item Name: </v-col>
      <v-col> {{ displayModel.itemDisplayName }} </v-col>
    </v-row>
  </v-container>
  <hr />
  <v-container>
    <v-row>
      <v-col> Total Cost: </v-col>
      <v-col> {{ displayModel.totalCost }} </v-col>
    </v-row>
    <v-row>
      <v-col> Enchanting DC: </v-col>
      <v-col> {{ displayModel.enchantingDC }} </v-col>
    </v-row>
    <v-row>
      <v-col> Enchanter's Modifier: </v-col>
      <v-col>
        {{ displayModel.modifier }}
      </v-col>
    </v-row>
  </v-container>
  <hr />
  <v-container>
    <v-row>
      <v-col> Base Item Cost: </v-col>
      <v-col> {{ displayModel.baseItemCost }} </v-col>
    </v-row>
    <v-row>
      <v-col> Enchanting time: </v-col>
      <v-col> {{ displayModel.craftingTimeInHours }} </v-col>
    </v-row>
    <v-row>
      <v-col> Hourly Rate: </v-col>
      <v-col> {{ displayModel.hourlyRate }} </v-col>
    </v-row>
    <v-row>
      <v-col> Crafter's Cost: </v-col>
      <v-col> {{ displayModel.crafterCost }} </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { getcrafterNameDisplay } from "@/Calculators/CalculatorOfCraftersName";
import {
  enchantCrafterDisplayModel,
  getEnchantCrafterDisplay,
} from "@/Calculators/CalculatorOfEnchantCrafter";
import {
  attunementEnum,
  attunementValidator,
} from "@/DataRepositoriesAndModels/attunementEnum";
import {
  crafterRankEnum,
  crafterRankValidator,
  crafterTypeEnum,
  crafterTypeValidator,
} from "@/DataRepositoriesAndModels/crafterChoices";
import { ComputedRef, computed } from "vue";

const props = defineProps({
  chosenCrafterRank: { type: String, crafterRankValidator },
  chosenBaseItemName: String,
  chosenRarity: String,
  chosenAttunement: { type: String, attunementValidator },
});

const displayModel: ComputedRef<enchantCrafterDisplayModel> = computed(() =>
  getEnchantCrafterDisplay(
    props.chosenBaseItemName,
    props.chosenRarity,
    props.chosenAttunement as attunementEnum,
    props.chosenCrafterRank as crafterRankEnum
  )
);

const crafterName: ComputedRef<string> = computed(() =>
  getcrafterNameDisplay(
    props.chosenCrafterRank as crafterRankEnum,
    crafterTypeEnum.enchanter
  )
);
</script>

<style scoped></style>
