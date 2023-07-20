<template>
  DIY Manufacuring:
  <v-container>
    <v-row>
      <v-col> Item Name: </v-col>
      <v-col> {{ displayModel.itemDisplayName }} </v-col>
    </v-row>
    <v-row>
      <v-col> Manufacturing time: </v-col>
      <v-col> {{ displayModel.timeInHours }} </v-col>
    </v-row>
    <v-row>
      <v-col> Material Cost: </v-col>
      <v-col> {{ displayModel.materialCost }} </v-col>
    </v-row>
    <v-row>
      <v-col> Manufacturing DC: </v-col>
      <v-col> {{ displayModel.manufacturingDC }} </v-col>
    </v-row>
    <v-row>
      <v-col> Appliccable Skills: </v-col>
      <v-col>
        <ul>
          <li v-for="tool in displayModel.toolChoices">
            {{ tool }}
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {
  getManufactureSelfToolsForDisplay,
  manufactureSelfDisplayModel,
} from "@/Calculators/CalculatorOfManufactureSelf";
import { ComputedRef, computed } from "vue";

const props = defineProps({
  chosenItemName: String,
});

const displayModel: ComputedRef<manufactureSelfDisplayModel> = computed((_) =>
  getManufactureSelfToolsForDisplay(props.chosenItemName ?? "")
);
</script>

<style scoped></style>
