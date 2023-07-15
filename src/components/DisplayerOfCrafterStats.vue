<template>
  Crafter stats:
  <v-container>
    <v-row>
      <v-col>
        Type:
      </v-col>
      <v-col>
        {{displayModel.name}}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Speed Increase:
      </v-col>
      <v-col>
        {{displayModel.speed}}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Modifier:
      </v-col>
      <v-col>
        {{displayModel.check}}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Hourly Rate:
      </v-col>
      <v-col>
        {{displayModel.hourlyRate}}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Overtime Rate:
      </v-col>
      <v-col>
        {{ displayModel.overtimeRate}}
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {crafterRankEnum, crafterRankValidator, crafterTypeEnum, crafterTypeValidator} from "@/DataRepositoriesAndModels/crafterChoices";
import {getCrafterStatsForDisplay} from "@/Calculators/CalculatorOfCrafters";
import {computed} from "vue";

const props = defineProps({
  chosenCrafterRank: {
    type: String,
    validator(value: string): boolean {
      return crafterRankValidator(value);
    }
  },
  chosenCrafterType: {
    type: String,
    validator(value: string): boolean {
      return crafterTypeValidator(value);
    }
  }
});

const displayModel = computed(_ => getCrafterStatsForDisplay(props.chosenCrafterRank as crafterRankEnum, props.chosenCrafterType as crafterTypeEnum))
</script>

<style scoped>

</style>
