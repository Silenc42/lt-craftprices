<template>
  {{ crafterName }} :
  <v-container>
    <v-row>
      <v-col> Item Name: </v-col>
      <v-col> {{ displayModel.baseItemName }} </v-col>
    </v-row>
    <v-row>
      <v-col> Crafting time: </v-col>
      <v-col> {{ displayModel.craftingTimeInHours }} </v-col>
    </v-row>
    <v-row>
      <v-col> Material Cost: </v-col>
      <v-col> {{ displayModel.materialCost }} </v-col>
    </v-row>
    <v-row>
      <v-col> Crafter's Cost: </v-col>
      <v-col> {{ displayModel.crafterCost }} </v-col>
    </v-row>
    <v-row>
      <v-col> Total Cost: </v-col>
      <v-col> {{ displayModel.totalCost }} </v-col>
    </v-row>
    <v-row>
      <v-col> Crafting DC: </v-col>
      <v-col> {{ displayModel.dc }} </v-col>
    </v-row>
    <v-row>
      <v-col> Crafter's Modifier: </v-col>
      <v-col>
        {{ displayModel.modifier }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { getcrafterNameDisplay } from "@/Calculators/CalculatorOfCraftersName";
import { getManufactureCrafterForDisplay, manufactureCrafterDisplayModel } from "@/Calculators/CalculatorOfManufactureCrafter";
import { crafterRankEnum, crafterRankValidator, crafterTypeEnum, crafterTypeValidator } from "@/DataRepositoriesAndModels/crafterChoices";
import { ComputedRef, computed } from "vue";

const props = defineProps({
  chosenCrafterRank: {
    type: String,
    validator(value: string): boolean {
      return crafterRankValidator(value);
    },
  },
  chosenCrafterType: {
    type: String,
    validator(value: string): boolean {
      return crafterTypeValidator(value);
    }
  },
  chosenItemName: String,
});

const displayModel: ComputedRef<manufactureCrafterDisplayModel> = computed(() =>
  getManufactureCrafterForDisplay(props.chosenCrafterRank as crafterRankEnum, props.chosenCrafterType as crafterTypeEnum, props.chosenItemName ?? "")
);

const crafterName: ComputedRef<string> = computed(() => getcrafterNameDisplay(props.chosenCrafterRank as crafterRankEnum, props.chosenCrafterType as crafterTypeEnum))
</script>

<style scoped></style>
