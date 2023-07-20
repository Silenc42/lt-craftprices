<template>
  Shopping for a base item:
  <v-container>
    <v-row>
      <v-col> Item Name: </v-col>
      <v-col> {{ displayModel.itemDisplayName }} </v-col>
    </v-row>
    <v-row>
      <v-col> Price: </v-col>
      <v-col> {{ displayModel.itemPrice }} </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {
  getShoppingDisplay,
  shoppingDisplayModel,
} from "@/Calculators/CalculatorOfShopping";
import { ComputedRef, computed } from "vue";

const props = defineProps({
  chosenItemName: String,
});

const displayModel: ComputedRef<shoppingDisplayModel> = computed(() =>
  getShoppingDisplay(props.chosenItemName)
);
</script>

<style scoped></style>
