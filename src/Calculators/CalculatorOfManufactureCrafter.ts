import {
  baseItem,
  baseItemByName,
} from "@/DataRepositoriesAndModels/RepoOfBaseItems";
import {
  crafterStats,
  getCrafterStats,
} from "@/DataRepositoriesAndModels/RepoOfCrafterStats";
import {
  crafterRankEnum,
  crafterTypeEnum,
} from "@/DataRepositoriesAndModels/crafterChoices";

export interface manufactureCrafterDisplayModel {
  baseItemName: string;
  craftingTimeInHours: string;
  materialCost: string;
  crafterCost: string;
  totalCost: string;
  hourlyRate: string;
  dc: string;
  modifier: string;
}

export function getManufactureCrafterForDisplay(
  crafterRank: crafterRankEnum,
  crafterType: crafterTypeEnum,
  itemName: string
): manufactureCrafterDisplayModel {
  if (!itemName) {
    return {
      baseItemName: "Please, select an item",
      craftingTimeInHours: "--",
      materialCost: "--",
      dc: "--",
      crafterCost: "--",
      hourlyRate: "--",
      totalCost: "--",
      modifier: "--",
    };
  }

  const item: baseItem = baseItemByName(itemName);
  const crafter: crafterStats = getCrafterStats(crafterRank, crafterType);
  return {
    baseItemName: item.itemName,
    materialCost: item.materialCost.toString() + " gp",
    dc: item.dc,
    craftingTimeInHours:
      roundForDisplay(craftingTime(item, crafter)) + " hours",
    crafterCost: roundForDisplay(craftingCost(item, crafter)) + " gp",
    totalCost: roundForDisplay(totalCraftingCost(item, crafter)) + " gp",
    hourlyRate: crafter.hourlyRate + " gp / hour",
    modifier: "+" + crafter.modifier,
  };
}

function craftingTime(item: baseItem, crafter: crafterStats): number {
  return item.timeInHours / crafter.speedFactor;
}
function craftingCost(item: baseItem, crafter: crafterStats): number {
  return crafter.hourlyRate * craftingTime(item, crafter);
}
function totalCraftingCost(item: baseItem, crafter: crafterStats): number {
  return item.materialCost + craftingCost(item, crafter);
}

function roundForDisplay(x: number): number {
  return Math.round(x * 100) / 100;
}
