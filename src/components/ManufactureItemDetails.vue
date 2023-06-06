<template>
  <div v-if="props.item">
    <v-row>
      <h3>Item Name: {{ props.item.itemName }}</h3>
    </v-row>
    <v-row>
      Manufacturing Check: DC {{ props.item.dc }} check with {{ toolsDisplay }}
    </v-row>
    <v-row>
      Crafting Time: {{props.item.timeInHours}} hour{{ props.item.timeInHours !== 1 ? 's' : ''}} ({{props.item.timeInHours/8}} workday{{ props.item.timeInHours/8 !== 1 ? 's' : ''}})
    </v-row>
    <v-row>
      Material Cost: {{props.item.materialCost}}gp
    </v-row>
    <v-row>
      Item Value: {{props.item.itemValue}}gp
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
  const tool: craftingTool = craftingTools.craftingToolsList.find(t => t.id === toolId);
  return tool.ability + '(' + tool.toolName + ')';
}

function replaceLastCommaWithOr(commaSeparatedList: string) {
  return commaSeparatedList
    .split('').reverse().join('')
    .replace(',', 'ro ')
    .split('').reverse().join('');
}
</script>

<style scoped>

</style>
