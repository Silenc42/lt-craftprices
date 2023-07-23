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
      <v-col> Manufacturing DC: </v-col>
      <v-col> {{ displayModel.manufacturingDC }} </v-col>
    </v-row>
    <v-row>
      <v-col> Crafter's Modifier: </v-col>
      <v-col>
        {{ displayModel.modifier }}
      </v-col>
    </v-row>
  </v-container>
  <hr />
  <v-container>
    <v-row>
      <v-col> Material Cost: </v-col>
      <v-col> {{ displayModel.materialCost }} </v-col>
    </v-row>
    <v-row>
      <v-col> Manufacturing time: </v-col>
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
  getManufactureCrafterDisplay,
  manufactureCrafterDisplayModel,
} from "@/Calculators/CalculatorOfManufactureCrafter";
import {
  crafterRankEnum,
  crafterRankValidator,
  crafterTypeEnum,
  crafterTypeValidator,
} from "@/DataRepositoriesAndModels/crafterChoices";
import { ComputedRef, computed } from "vue";

const props = defineProps({
  chosenCrafterRank: { type: String, crafterRankValidator },
  chosenCrafterType: { type: String, crafterTypeValidator },
  chosenItemName: String,
});

const displayModel: ComputedRef<manufactureCrafterDisplayModel> = computed(() =>
  getManufactureCrafterDisplay(
    props.chosenCrafterRank as crafterRankEnum,
    props.chosenCrafterType as crafterTypeEnum,
    props.chosenItemName
  )
);

const crafterName: ComputedRef<string> = computed(() =>
  getcrafterNameDisplay(
    props.chosenCrafterRank as crafterRankEnum,
    props.chosenCrafterType as crafterTypeEnum
  )
);
</script>

<style scoped></style>
