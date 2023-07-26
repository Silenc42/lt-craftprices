<template>
  <v-container>
    <v-row>
      <v-col> Forging: </v-col>
      <v-col> coming soon&trade; ! </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { attunementEnum, attunementValidator } from '@/DataRepositoriesAndModels/attunementEnum';

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
