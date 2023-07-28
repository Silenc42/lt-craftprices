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
      <v-col> Enchanting DC: </v-col>
      <v-col> {{ displayModel.enchantingDC }} </v-col>
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
      <v-col> Base Item Material Cost: </v-col>
      <v-col> {{ displayModel.baseItemMaterialCost }} </v-col>
    </v-row>
    <v-row>
      <v-col> Forging time: </v-col>
      <v-col> {{ displayModel.forgingTimeInHours }} </v-col>
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
import { getCrafterNameDisplay } from '@/Calculators/CalculatorOfCraftersName';
import { forgeCrafterDisplayModel, getForgeCrafterDisplay } from '@/Calculators/CalculatorOfForgingCrafter';
import { attunementEnum, attunementValidator } from '@/DataRepositoriesAndModels/attunementEnum';
import { crafterRankEnum, crafterRankValidator, crafterTypeEnum } from '@/DataRepositoriesAndModels/crafterChoices';
import { ComputedRef, computed } from 'vue';

const props = defineProps({
  chosenCrafterRank: { type: String, crafterRankValidator },
  chosenBaseItemName: String,
  chosenMonsterType: String,
  chosenRarity: String,
  chosenAttunement: { type: String, attunementValidator },
});

const displayModel: ComputedRef<forgeCrafterDisplayModel> = computed(() =>
  getForgeCrafterDisplay(
    props.chosenBaseItemName,
    props.chosenMonsterType,
    props.chosenRarity,
    props.chosenAttunement as attunementEnum,
    props.chosenCrafterRank as crafterRankEnum
  )
);

const crafterName: ComputedRef<string> = computed(() =>
  getCrafterNameDisplay(
    props.chosenCrafterRank as crafterRankEnum,
    crafterTypeEnum.forger
  )
);
</script>

<style scoped></style>
