<template>
  Shopping for a base items:
  <v-container>
    <v-row>
      <v-col> Item Name: </v-col>
      <v-col> {{ props.chosenItemName }} </v-col>
    </v-row>
    <v-row>
      <v-col> Price: </v-col>
      <v-col> {{ itemPrice }} </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { baseItemByName } from "@/DataRepositoriesAndModels/RepoOfBaseItems";
import { ComputedRef, computed } from "vue";

const props = defineProps({
  chosenItemName: String,
});

// This would be the whole of CalculatorOfShopping.ts. Kept direct connection here instead.
const itemPrice: ComputedRef<string> = computed((_) => {
  if (!props.chosenItemName) {
    return "";
  }
  return baseItemByName(props.chosenItemName).itemValue.toString() + " gp";
});
</script>

<style scoped></style>
