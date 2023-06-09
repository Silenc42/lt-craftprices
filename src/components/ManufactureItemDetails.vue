<template>
  <div v-if="props.item">
    <v-row>
      <h3>Item Name: {{ props.item.itemName }}</h3>
    </v-row>
    <v-row>
      Manufacturing Check: DC {{ props.item.dc }} check with {{ toolsDisplay }}
    </v-row>
    <v-row>
      Crafting Time: {{ displayTimeFromHours(props.item.timeInHours) }}
    </v-row>
    <v-row>
      Material Cost: {{ props.item.materialCost }}gp
    </v-row>
    <v-row>
      Item Value: {{ props.item.itemValue }}gp
    </v-row>
  </div>
</template>

<script setup lang="ts">
import {manufacturableItem} from "@/DataJsons/manufacturedItemsModels";
import * as craftingTools from '../DataJsons/craftingTools.json'
import {computed, ComputedRef} from "vue";
import {craftingTool} from "@/DataJsons/craftingToolsModels";

const props = defineProps<{ item: manufacturableItem | null }>()

const toolsDisplay: ComputedRef<string> = computed(_ => {
  if (!props.item) return '';

  const toolNames: string[] = props.item.tools.map(toolId => toolChecksFromId(toolId));

  const toolNamesCommaSeparated: string = toolNames.reduce((carry, current) => carry + ', ' + current);
  return replaceLastCommaWithOr(toolNamesCommaSeparated);
});

function toolChecksFromId(toolId: string): string {
  const tool: craftingTool | undefined = craftingTools.craftingToolsList.find(t => t.id === toolId);

  if (!tool) {
    console.error('ERROR WHILE READING TOOL DATA');
    return 'ERROR';
  }
  return tool.ability + '(' + tool.toolName + ')';
}

function replaceLastCommaWithOr(commaSeparatedList: string) {
  return commaSeparatedList
    .split('').reverse().join('')
    .replace(',', 'ro ')
    .split('').reverse().join('');
}

function displayTimeFromHours(hours: number): string {
  return hours + ' hour' + (hours !== 1 ? 's' : '') + ' (' + hours / 8 + ' workday' + (hours / 8 !== 1 ? 's' : '') + ')';
}
</script>

<style scoped>

</style>
