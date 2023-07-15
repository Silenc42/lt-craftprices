<template>
  Select crafter:
  <v-radio-group
    inline
    v-model="selectedCrafter"
    @update:modelValue="updatedCrafterSelection()">
    <v-radio label="Self-crafted" :value="crafterRankEnum.diy"/>
    <v-radio label="Journeyman" :value="crafterRankEnum.journeyman"/>
    <v-radio label="Expert" :value="crafterRankEnum.expert"/>
    <v-radio label="Master" :value="crafterRankEnum.master"/>
    <v-radio label="L'Arséne (simple)" :value="crafterRankEnum.larseneSimple"/>
  </v-radio-group>
</template>

<script setup lang="ts">
import {crafterRankEnum} from "@/DataRepositoriesAndModels/crafterChoices";
import {Ref, ref, UnwrapRef} from "vue";

const selectedCrafter: Ref<UnwrapRef<crafterRankEnum>> = ref(crafterRankEnum.diy);

defineProps({selectedCrafter: String});
const emit = defineEmits(['update:selectedCrafter'])
function updatedCrafterSelection(): void {
  emit('update:selectedCrafter', selectedCrafter.value)
}



</script>

<style scoped>

</style>
