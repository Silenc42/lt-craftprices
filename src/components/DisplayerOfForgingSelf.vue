<template>
  DIY Forging:
  <v-container>
    <v-row>
      <v-col> Item Name: </v-col>
      <v-col> {{ displayModel.itemDisplayName }} </v-col>
    </v-row>
    <v-row>
      <v-col> Forging time: </v-col>
      <v-col> {{ displayModel.forgingTimeInHours }} </v-col>
    </v-row>
    <v-row>
      <v-col> Base Item Material Cost: </v-col>
      <v-col> {{ displayModel.baseItemMaterialCost }} </v-col>
    </v-row>
    <v-row>
      <v-col> Manufacturing DC: </v-col>
      <v-col> {{ displayModel.manufacturingDC }} </v-col>
    </v-row>
    <v-row>
      <v-col> Manufacturing Skills: </v-col>
      <v-col>
        <ul>
          <li v-for="tool in displayModel.manufactureCheckChoices">
            {{ tool }}
          </li>
        </ul>
      </v-col>
    </v-row>
    <v-row>
      <v-col> Enchanting DC: </v-col>
      <v-col> {{ displayModel.enchantingDC }} </v-col>
    </v-row>
    <v-row>
      <v-col> Enchanting Skills: </v-col>
      <v-col>
        <ul>
          <li v-for="tool in displayModel.enchantingCheckChoices">
            {{ tool }}
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { forgeSelfDisplayModel, getForgeSelfDisplay } from '@/Calculators/CalculatorOfForgingSelf';
import { attunementEnum, attunementValidator } from '@/DataRepositoriesAndModels/attunementEnum';
import { ComputedRef, computed } from 'vue';

const props = defineProps({
  chosenBaseItemName: String,
  chosenMonsterType: String,
  chosenRarity: String,
  chosenAttunement: { type: String, attunementValidator },
});

const displayModel: ComputedRef<forgeSelfDisplayModel> = computed(() =>
  getForgeSelfDisplay(
    props.chosenBaseItemName,
    props.chosenMonsterType,
    props.chosenRarity,
    props.chosenAttunement as attunementEnum
  )
);
</script>

<style scoped></style>
