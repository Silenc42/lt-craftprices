<template>
  Select your base item
  <v-container>
    <v-row>
      <v-col>
        <v-switch
          v-model="isCrafted"
          :label="`${isCraftedLabel}`"
          @update:model-value="updatedCraftBaseItem()"
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
const itemsForSelection: ComputedRef<baseItem[]> = computed(() => {
  const selCat: string | null = selectedCategory.value;
  if (!selCat) {
    return [];
  }
  return baseItemsByCategory(selCat);
});

const selectedItem: Ref<baseItem | null> = ref(null);
const isCrafted: Ref<boolean> = ref(false);

defineProps({
  craftBaseItem: Boolean,
  selectedItemName: String,
});
const emit = defineEmits(["update:craftBaseItem", "update:selectedItemName"]);

function updatedCategorySelection(): void {
  selectedItem.value = null;
}

function updatedCraftBaseItem(): void {
  emit("update:craftBaseItem", isCrafted.value);
}
function updatedItemSelection(): void {
  emit("update:selectedItemName", selectedItem.value?.itemName);
}

const isCraftedLabel: ComputedRef<string> = computed(
  () => (isCrafted.value ? "Craft " : "Buy ") + "Base Item"
);
</script>

<style scoped></style>
