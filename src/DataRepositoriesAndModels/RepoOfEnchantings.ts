export interface essence {
  rarity: string,
  essenceType: string,
  enchantingDC: number,
  enchantingTimeConsumable: number,
  enchantingTimeNonAttunement: number,
  enchantingTimeAttunement: number
}
export interface creatureTypes {
  creatureType: string,
  skill: string
}

import * as enchantingsData from '@/DataRepositoriesAndModels/DataOfEnchantings.json'

export function getEssencesList(): essence[] {
  return enchantingsData.essences;
}
export function getcreatureTypesList(): creatureTypes[] {
  return enchantingsData.creatureTypes;
}
