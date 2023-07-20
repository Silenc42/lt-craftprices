export interface essence {
  rarity: string;
  essenceType: string;
  enchantingDC: number;
  enchantingTimeConsumable: number;
  enchantingTimeNonAttunement: number;
  enchantingTimeAttunement: number;
}
export interface monsterTypes {
  //todo: de-pluralize
  monsterType: string;
  skill: string;
}

import * as enchantingsData from "@/DataRepositoriesAndModels/DataOfEnchantings.json";

export function getEssenceTypesList(): essence[] {
  return enchantingsData.essences;
}
export function getMonsterTypesList(): monsterTypes[] {
  return enchantingsData.monsterTypes;
}

export function getEssenceDataByRarity(essenceRarity: string): essence {
  const essenceData = enchantingsData.essences.find(
    (t) => t.rarity === essenceRarity
  );
  if (!essenceData) {
    throw (
      "nonexistent essence data requested from enchanting repo: " + essenceData
    );
  }
  return essenceData;
}
export function getMonsterTypesDataByTypeName(
  monsterTypeName: string
): monsterTypes {
  const monsterTypeData = enchantingsData.monsterTypes.find(
    (t) => t.monsterType === monsterTypeName
  );
  if (!monsterTypeData) {
    throw (
      "nonexistent monster type data requested from enchanting repo: " +
      monsterTypeName
    );
  }
  return monsterTypeData;
}
