import {
  baseItem,
  baseItemByName,
} from "@/DataRepositoriesAndModels/RepoOfBaseItems";
import {
  crafterStats,
  getCrafterStats,
} from "@/DataRepositoriesAndModels/RepoOfCrafterStats";
import {
  essence,
  getEssenceDataByRarity,
} from "@/DataRepositoriesAndModels/RepoOfEnchantings";
import { attunementEnum } from "@/DataRepositoriesAndModels/attunementEnum";
import {
  crafterRankEnum,
  crafterTypeEnum,
} from "@/DataRepositoriesAndModels/crafterChoices";
import {
  toDCText,
  toGpPerHourText,
  toGpText,
  toHourText,
  toModifierText,
} from "./DisplayHelpers";

export interface enchantCrafterDisplayModel {
  itemDisplayName: string;
  baseItemCost: string;
  craftingTimeInHours: string;
  crafterCost: string;
  totalCost: string;
  hourlyRate: string;
  enchantingDC: string;
  modifier: string;
}

export function getEnchantCrafterDisplay(
  baseItemName: string | undefined,
  chosenRarity: string | undefined,
  attunement: attunementEnum,
  crafterRank: crafterRankEnum
): enchantCrafterDisplayModel {
  const crafter: crafterStats = getCrafterStats(crafterRank, crafterTypeEnum.enchanter);
  const baseItemData: baseItem | undefined = baseItemName
    ? baseItemByName(baseItemName)
    : undefined;
  const essenceData: essence | undefined = chosenRarity
    ? getEssenceDataByRarity(chosenRarity)
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
    baseItemCost: toGpText(baseItemData?.itemValue),
    craftingTimeInHours: toHourText(actualCraftingTime),
    enchantingDC: toDCText(essenceData?.enchantingDC),
    crafterCost: toGpText(crafterCost),
    totalCost: toGpText(totalCost),
    hourlyRate: toGpPerHourText(crafter.hourlyRate),
    modifier: toModifierText(crafter.modifier),
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
  const baseCraftingTime: number | undefined = essenceData
    ? calcBaseCraftingTime(attunement, essenceData)
    : undefined;
  const actualCraftingTime: number | undefined = baseCraftingTime
    ? baseCraftingTime / crafter.speedFactor
    : undefined;
  const crafterCost: number | undefined = actualCraftingTime
    ? crafter.hourlyRate * actualCraftingTime
    : undefined;
  const totalCost: number | undefined =
    crafterCost && baseItemData
      ? crafterCost + baseItemData.itemValue
      : undefined;
  return { actualCraftingTime, crafterCost, totalCost };
}

function calcBaseCraftingTime(
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

function calcItemDisplayName(
  attunement: attunementEnum,
  chosenRarity: string | undefined,
  baseItemData: baseItem | undefined
): string {
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
