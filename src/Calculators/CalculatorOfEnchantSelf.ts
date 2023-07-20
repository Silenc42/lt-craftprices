import {
  baseItem,
  baseItemByName,
} from "@/DataRepositoriesAndModels/RepoOfBaseItems";
import {
  essence,
  getEssenceDataByRarity,
  getMonsterTypesDataByTypeName,
  monsterType,
} from "@/DataRepositoriesAndModels/RepoOfEnchantings";
import { attunementEnum } from "@/DataRepositoriesAndModels/attunementEnum";
import {
  noItemNamePlaceholder,
  nothingToDisplayPlaceholder,
  toDCText,
  toGpText,
  toHourText,
} from "./DisplayHelpers";

export interface enchantSelfDisplayModel {
  itemDisplayName: string;
  baseItemCost: string;
  timeInHours: string;
  enchantingDC: string;
  requiredSkill: string;
}

export function getEnchantSelfDisplay(
  baseItemName: string | undefined,
  chosenMonsterType: string | undefined,
  chosenRarity: string | undefined,
  attunement: attunementEnum
): enchantSelfDisplayModel {
  const baseItemData: baseItem | undefined = baseItemName
    ? baseItemByName(baseItemName)
    : undefined;
  const essenceData: essence | undefined = chosenRarity
    ? getEssenceDataByRarity(chosenRarity)
    : undefined;
  const monsterTypeData: monsterType | undefined = chosenMonsterType
    ? getMonsterTypesDataByTypeName(chosenMonsterType)
    : undefined;

  return {
    itemDisplayName: calcItemDisplayName(
      attunement,
      chosenRarity,
      baseItemData
    ),
    baseItemCost: toGpText(baseItemData?.itemValue),
    timeInHours: toHourText(calcBaseCraftingTime(attunement, essenceData)),
    enchantingDC: toDCText(essenceData?.enchantingDC),
    requiredSkill: calcEnchantingSkillDisplay(monsterTypeData),
  };
}

function calcEnchantingSkillDisplay(
  monsterTypeData: monsterType | undefined
): string {
  return monsterTypeData
    ? "Spellcasting Ability (" + monsterTypeData.skill + ")"
    : "Please, select a monster type!";
}

function calcBaseCraftingTime(
  attunement: attunementEnum,
  essenceData: essence | undefined
): number | undefined {
  if (!essenceData) {
    return undefined;
  }
  switch (attunement) {
    case attunementEnum.consumable:
      return essenceData.enchantingTimeConsumable;
    case attunementEnum.not:
      return essenceData.enchantingTimeNonAttunement;
    case attunementEnum.attunement:
      return essenceData.enchantingTimeAttunement;
    default:
      throw "Impossible choice of attunement";
  }
}

function calcItemDisplayName( //todo: maybe extract
  attunement: attunementEnum,
  chosenRarity: string | undefined,
  baseItemData: baseItem | undefined
) {
  const rarityText: string = chosenRarity ? chosenRarity + " " : " ";
  const itemTypeText: string = baseItemData?.itemName ?? "Item";

  let attunementText: string;
  switch (attunement) {
    case attunementEnum.consumable:
      attunementText = " (Consumable)";
      break;
    case attunementEnum.not:
      attunementText = " (Non-Attunement)";
      break;
    case attunementEnum.attunement:
      attunementText = " (Attunement)";
      break;
    default:
      throw "Impossible choice of attunement";
  }

  return rarityText + itemTypeText + attunementText;
}
