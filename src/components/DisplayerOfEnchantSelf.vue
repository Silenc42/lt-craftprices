<template>
  DIY Enchanting:
  <v-container>
    <v-row>
      <v-col> Item: </v-col>
      <v-col> {{ displayModel.baseItemName }} </v-col>
    </v-row>
    <v-row>
      <v-col> Crafting time: </v-col>
      <v-col> {{ displayModel.timeInHours }} </v-col>
    </v-row>
    <v-row>
      <v-col> Base Item Cost: </v-col>
      <v-col> {{ displayModel.baseItemCost }} </v-col>
    </v-row>
    <v-row>
      <v-col> Enchanting DC: </v-col>
      <v-col> {{ displayModel.dc }} </v-col>
    </v-row>
    <v-row>
      <v-col> Appliccable Skills: </v-col>
      <v-col> {{ displayModel.requiredSkill }}</v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { enchantSelfDisplayModel, getEnchantSelfDisplay } from "@/Calculators/CalculatorOfEnchantSelf";
import { attunementEnum, attunementValidator } from "@/DataRepositoriesAndModels/attunementEnum";
import { ComputedRef, computed } from "vue";

const props = defineProps({
  chosenBaseItemName: String,
  chosenMonsterType: String,
  chosenRarity: String,
  chosenAttunement: {
    type: String,
    validator(value: string): boolean {
      return attunementValidator(value);
    },
  },
});

const displayModel: ComputedRef<enchantSelfDisplayModel> = computed((_) =>
  getEnchantSelfDisplay(props.chosenBaseItemName, props.chosenMonsterType, props.chosenRarity, props.chosenAttunement as attunementEnum | undefined)
);
</script>

<style scoped></style>

baseItemName: string,
chosenMonsterType: string,
chosenRarity: string,
attunement: attunementEnum