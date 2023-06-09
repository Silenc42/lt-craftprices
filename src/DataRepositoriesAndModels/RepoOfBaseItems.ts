export interface baseItem {
  itemName: string;
  dc: string;
  timeInHours: number;
  materialCost: number;
  itemValue: number;
  tools: string[];
}

import * as baseItemData from '@/DataRepositoriesAndModels/baseItemsData.json'

export function baseItemCategories(): string[] {
  return baseItemData.manufactureCategories.map(category => category.categoryName);
}

export function baseItemsByCategory(desiredCategory: string): baseItem[] {
  const category = baseItemData.manufactureCategories.find(c => c.categoryName === desiredCategory);
  if (!category) {
    console.error('nonexistent category requested from repo of base items');
    throw 'nonexistent category requested from repo of base items';
  }
  return category.items;
}
