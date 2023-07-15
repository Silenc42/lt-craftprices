<template>
  Enchantment Selection: coming soon&trade;
  <v-container>
    <v-row>
      <v-col>
        <v-select
          v-model="selectedMonsterType"
          label="Select Category"
          :items="categoriesForSelection"
          @update:modelValue="updatedCategorySelection()"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          v-model="selectedRarity"
          label="Select Item"
          :items="itemsForSelection"
          item-title="itemName"
          return-object
          @update:modelValue="updatedItemSelection()"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {computed, ComputedRef, Ref, ref} from "vue";
const selectedMonsterType: Ref<string | null> = ref(null);
defineProps({'selectedMonsterType': String});
const emit = defineEmits(['update:selectedMonsterType'])
</script>
142-150, 165-180
<style scoped>

</style>
