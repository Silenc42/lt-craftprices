<template>
  Select crafter:
  <v-radio-group
    inline=""
    v-model="selectedCrafter"
    @update:modelValue="updatedCrafterSelection()">
    <v-radio label="Self-crafted" :value="crafterChoice.self"/>
    <v-radio label="Journeyman" :value="crafterChoice.journeyman"/>
    <v-radio label="Expert" :value="crafterChoice.expert"/>
    <v-radio label="Master" :value="crafterChoice.master"/>
  </v-radio-group>
</template>

<script setup lang="ts">
import {crafterChoice} from "@/DataRepositoriesAndModels/crafterChoices";
import {Ref, ref, UnwrapRef} from "vue";

const selectedCrafter: Ref<UnwrapRef<crafterChoice>> = ref(crafterChoice.self);

defineProps({'selectedCrafter': String});
const emit = defineEmits(['update:selectedCrafter'])
function updatedCrafterSelection(): void {
  emit('update:selectedCrafter', selectedCrafter.value?.toString())
}



</script>

<style scoped>

</style>
