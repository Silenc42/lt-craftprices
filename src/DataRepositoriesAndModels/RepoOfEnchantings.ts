export interface essence {
  rarity: string,
  essenceType: string,
  enchantingDC: number,
  enchantingTimeConsumable: number,
  enchantingTimeNonAttunement: number,
  enchantingTimeAttunement: number
}
export interface monsterTypes {
  monsterType: string,
  skill: string
}

import * as enchantingsData from '@/DataRepositoriesAndModels/DataOfEnchantings.json'

export function getEssenceTypesList(): essence[] {
  return enchantingsData.essences;
}
export function getMonsterTypesList(): monsterTypes[] {
  return enchantingsData.monsterTypes;
}