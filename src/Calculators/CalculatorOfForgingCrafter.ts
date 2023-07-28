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
  toDCText,
  toGpPerHourText,
  toGpText,
  toHourText,
  toModifierText,
} from "./DisplayHelpers";
import {
  crafterRankEnum,
  crafterTypeEnum,
} from "@/DataRepositoriesAndModels/crafterChoices";
import {
  crafterStats,
  getCrafterStats,
} from "@/DataRepositoriesAndModels/RepoOfCrafterStats";

export interface forgeCrafterDisplayModel {
  itemDisplayName: string;
  totalCost: string;
  manufacturingDC: string;
  enchantingDC: string;
  modifier: string;
  baseItemMaterialCost: string;
  forgingTimeInHours: string;
  hourlyRate: string;
  crafterCost: string;
}

export function getForgeCrafterDisplay(
  baseItemName: string | undefined,
  chosenMonsterType: string | undefined,
  chosenRarity: string | undefined,
  attunement: attunementEnum,
  crafterRank: crafterRankEnum
): forgeCrafterDisplayModel {
  const baseItemData: baseItem | undefined = baseItemName
    ? baseItemByName(baseItemName)
    : undefined;
  const crafter: crafterStats = getCrafterStats(
    crafterRank,
    crafterTypeEnum.forger
  );
  const essenceData: essence | undefined = chosenRarity
    ? getEssenceDataByRarity(chosenRarity)
    : undefined;
  const monsterTypeData: monsterType | undefined = chosenMonsterType
    ? getMonsterTypesDataByTypeName(chosenMonsterType)
    : undefined;

  const {
    actualCraftingTime,
    crafterCost,
    totalCost,
  }: {
    actualCraftingTime: number | undefined;
    crafterCost: number | undefined;
    totalCost: number | undefined;
  } = calcCraftingCosts(essenceData, attunement, crafter, baseItemData);

  return {
    itemDisplayName: calcItemDisplayName(
      attunement,
      chosenRarity,
      baseItemData
    ),

    totalCost: toGpText(totalCost),
    manufacturingDC: toDCText(baseItemData?.manufacturingDC),
    enchantingDC: toDCText(essenceData?.enchantingDC),
    modifier: toModifierText(crafter.modifier),
    baseItemMaterialCost: toGpText(baseItemData?.materialCost),
    forgingTimeInHours: toHourText(actualCraftingTime),
    hourlyRate: toGpPerHourText(crafter.hourlyRate),
    crafterCost: toGpText(crafterCost),
  };
}

function calcCraftingCosts(
  essenceData: essence | undefined,
  attunement: attunementEnum,
  crafter: crafterStats,
  baseItemData: baseItem | undefined
): {
  actualCraftingTime: number | undefined;
  crafterCost: number | undefined;
  totalCost: number | undefined;
} {
  const baseEnchantingTime: number | undefined = essenceData
    ? calcBaseEnchantingTime(attunement, essenceData)
    : undefined;
  const baseManufactureTime: number | undefined =
    baseItemData?.manufacturingTimeInHours;
  const baseCraftingTime =
    baseManufactureTime && baseEnchantingTime
      ? Math.max(baseManufactureTime, baseEnchantingTime)
      : undefined;

  const actualCraftingTime: number | undefined = baseCraftingTime
    ? baseCraftingTime / crafter.speedFactor
    : undefined;
  const crafterCost: number | undefined = actualCraftingTime
    ? crafter.hourlyRate * actualCraftingTime
    : undefined;
  const totalCost: number | undefined =
    crafterCost && baseItemData
      ? crafterCost + baseItemData.materialCost
      : undefined;

  return { actualCraftingTime, crafterCost, totalCost };
}

function calcBaseEnchantingTime(
  attunement: attunementEnum,
  essenceData: essence
): number {
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
