<template>
  Select your base item
  <v-container>
    <v-row>
      <v-col>
        <v-switch
          v-model="isCrafted"
          true-value="craft"
          false-value="buy"
          :label="`Craft Item: ${isCrafted}`"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          v-model="selectedCategory"
          label="Select Category"
          :items="categoriesForSelection"
          @update:modelValue="updatedCategorySelection()"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          id="itemSelector"
          v-model="selectedItem"
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
import { computed, ComputedRef, Ref, ref } from "vue";
import {
  baseItem,
  baseItemCategories,
  baseItemsByCategory,
} from "@/DataRepositoriesAndModels/RepoOfBaseItems";

const categoriesForSelection: string[] = baseItemCategories();
const selectedCategory: Ref<string | null> = ref(null);
const itemsForSelection: ComputedRef<baseItem[]> = computed((_) => {
  const selCat: string | null = selectedCategory.value;
  if (!selCat) {
    return [];
  }
  return baseItemsByCategory(selCat);
});

const selectedItem: Ref<baseItem | null> = ref(null);
const isCrafted: Ref<boolean> = ref(false);

defineProps({ selectedItemName: String });
const emit = defineEmits(["update:selectedItemName"]);

function updatedCategorySelection(): void {
  selectedItem.value = null;
}

function updatedItemSelection(): void {
  emit("update:selectedItemName", selectedItem.value?.itemName);
}
</script>

<style scoped></style>
