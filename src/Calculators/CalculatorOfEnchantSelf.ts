import {baseItem, baseItemByName} from "@/DataRepositoriesAndModels/RepoOfBaseItems";
import { getEssenceDataByRarity, getMonsterTypesDataByTypeName } from "@/DataRepositoriesAndModels/RepoOfEnchantings";
import { attunementEnum } from "@/DataRepositoriesAndModels/attunementEnum";

export interface enchantSelfDisplayModel {
  baseItemName: string;
  baseItemCost: string;
  timeInHours: string;
  dc: string;
  requiredSkill: string;
}

export function getEnchantSelfDisplay(
  baseItemName: string | undefined,
  chosenMonsterType: string | undefined,
  chosenRarity: string | undefined,
  attunement: attunementEnum | undefined
): enchantSelfDisplayModel {
  const enchantingDisplayData: enchantSelfDisplayModel = {
    baseItemName: "",
    baseItemCost: "",
    timeInHours: "",
    dc: "",
    requiredSkill: "",
  };

  if (baseItemName) {
    const item: baseItem = baseItemByName(baseItemName);
    enchantingDisplayData.baseItemName = (chosenRarity? chosenRarity:"") + " " + item.itemName;
    enchantingDisplayData.baseItemCost = item.itemValue.toString();
  }

  if (chosenMonsterType) {
    const monsterTypeData = getMonsterTypesDataByTypeName(chosenMonsterType);
    enchantingDisplayData.requiredSkill = "Spellcasting Ability ("+monsterTypeData.skill+")";
  }

  if (chosenRarity) {
    const essenceData = getEssenceDataByRarity(chosenRarity);
    enchantingDisplayData.dc = essenceData.enchantingDC.toString();
    switch (attunement) {
      case attunementEnum.consumable:
        enchantingDisplayData.timeInHours = essenceData.enchantingTimeConsumable + " hours";
        break;
      case attunementEnum.not:
        enchantingDisplayData.timeInHours = essenceData.enchantingTimeNonAttunement + " hours";
        break;
      case attunementEnum.attunement:
        enchantingDisplayData.timeInHours = essenceData.enchantingTimeAttunement + " hours";
        break;    
      default:
        throw "Impossible choice of attunement";
    }
  }

  return enchantingDisplayData;
}
