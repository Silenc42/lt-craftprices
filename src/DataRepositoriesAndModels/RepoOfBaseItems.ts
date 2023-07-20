export interface baseItem {
  itemName: string;
  manufacturingDC: number;
  manufacturingTimeInHours: number;
  materialCost: number;
  itemValue: number;
  tools: string[];
}

import * as baseItemData from "@/DataRepositoriesAndModels/DataOfBaseItems.json";

export function baseItemCategories(): string[] {
  return baseItemData.manufactureCategories.map(
    (category) => category.categoryName
  );
}

export function baseItemsByCategory(desiredCategory: string): baseItem[] {
  const category = baseItemData.manufactureCategories.find(
    (c) => c.categoryName === desiredCategory
  );
  if (!category) {
    throw "nonexistent category requested from repo of base items";
  }
  return category.items;
}

export function baseItemByName(itemName: string): baseItem {
  const item = baseItemData.manufactureCategories
    .flatMap((category) => category.items)
    .find((item) => item.itemName === itemName);
  if (!item) {
    throw (
      "nonexistent item was requested from base item repo by name: " + itemName
    );
  }
  return item;
}
