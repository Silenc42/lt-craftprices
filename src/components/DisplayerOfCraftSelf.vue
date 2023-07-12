<template>
  Crafter stats:
  <v-container>
    <v-row>
      <v-col>
        Type:
      </v-col>
      <v-col>
        Do it yourself
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Speed Increase:
      </v-col>
      <v-col>
        Depends on your feats
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Appliccable Skills:
      </v-col>
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
import {getCraftSelfToolsForDisplay, craftSelfToolsDisplayModel} from "@/Calculators/CalculatorOfCraftSelf";
import {ComputedRef, computed} from "vue";

const props = defineProps({
  chosenItemName: String
});

const displayModel: ComputedRef<craftSelfToolsDisplayModel> = computed(_ => getCraftSelfToolsForDisplay(props.chosenItemName ?? ''))
</script>

<style scoped>

</style>
