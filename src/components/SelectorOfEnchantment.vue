<template>
  Select your enchantment
  <v-container>
    <v-row>
      <v-col>
        <v-switch
          v-model="doEnchanting"
          :label="`${doEnchantingLabel}`"
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
          v-model="essence"
          label="Select Rarity"
          :items="essencesForSelection"
          item-title="rarity"
          return-object
          @update:modelValue="updatedRaritySelection()"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Select Attunement:
        <v-radio-group
          inline
          v-model="attunement"
          @update:modelValue="updatedAttunementSelection()"
        >
          <v-radio label="Consumable" :value="attunementEnum.consumable" />
          <v-radio label="Non-Attunement" :value="attunementEnum.not" />
          <v-radio label="Attunement" :value="attunementEnum.attunement" />
        </v-radio-group>
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
import { attunementEnum } from "@/DataRepositoriesAndModels/attunementEnum";
import { UnwrapRef, computed } from "vue";
import { ComputedRef } from "vue";
import { Ref, ref } from "vue";

const monsterType: Ref<monsterTypes | null> = ref(null);
const essence: Ref<essence | null> = ref(null);
const monsterTypesForSelection: monsterTypes[] = getMonsterTypesList();
const essencesForSelection: essence[] = getEssenceTypesList();
const attunement: Ref<UnwrapRef<attunementEnum>> = ref(
  attunementEnum.consumable
);

const doEnchanting: Ref<boolean> = ref(false);

defineProps({
  doEnchanting: Boolean,
  selectedMonsterType: String,
  selectedRarity: String,
  selectedAttunement: String,
});
const emit = defineEmits([
  "update:selectedMonsterType",
  "update:selectedRarity",
  "update:selectedAttunement",
  "update:doEnchanting",
]);

function updatedMonsterTypeSelection(): void {
  emit("update:selectedMonsterType", monsterType.value);
}
function updatedRaritySelection(): void {
  emit("update:selectedRarity", essence.value?.rarity);
}
function updatedAttunementSelection(): void {
  emit("update:selectedAttunement", attunement.value);
}
function updatedDoEnchanting(): void {
  emit("update:doEnchanting", doEnchanting.value);
}

const doEnchantingLabel: ComputedRef<string> = computed(
  () => (doEnchanting.value ? "" : "Don't ") + "Enchant Item"
);
</script>

<style scoped></style>
