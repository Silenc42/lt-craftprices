<template>
  Select your enchantment
  <v-container>
    <v-row>
      <v-col>
        <v-switch
          v-model="doEnchanting"
          true-value="yes"
          false-value="no"
          :label="`Enchant Item: ${doEnchanting}`"
          @update:model-value="updatedDoEnchanting()"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          v-model="monsterType"
          label="Select Monster Type"
          :items="monsterTypesForSelection"
          item-title="monsterType"
          @update:modelValue="updatedMonsterTypeSelection()"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          v-model="rarity"
          label="Select Rarity"
          :items="raritiesForSelection"
          item-title="rarity"
          return-object
          @update:modelValue="updatedRaritySelection()"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {
  getMonsterTypesList,
  getEssenceTypesList,
  monsterTypes,
  essence,
} from "@/DataRepositoriesAndModels/RepoOfEnchantings";
import { Ref, ref } from "vue";

const monsterType: Ref<monsterTypes | null> = ref(null);
const rarity: Ref<essence | null> = ref(null);
const monsterTypesForSelection: monsterTypes[] = getMonsterTypesList();
const raritiesForSelection: essence[] = getEssenceTypesList();

const doEnchanting: Ref<boolean> = ref(false);

defineProps({
  doEnchanting: Boolean,
  selectedMonsterType: String,
  selectedRarity: String,
});
const emit = defineEmits([
  "update:selectedMonsterType",
  "update:selectedRarity",
  "update:doEnchanting",
]);

function updatedMonsterTypeSelection(): void {
  emit("update:selectedMonsterType", monsterType.value);
}
function updatedRaritySelection(): void {
  emit("update:selectedRarity", rarity.value);
}
function updatedDoEnchanting(): void {
  emit("update:doEnchanting", doEnchanting.value);
  emit("update:selectedMonsterType", "");
  emit("update:selectedRarity", "");
}
</script>

<style scoped></style>
