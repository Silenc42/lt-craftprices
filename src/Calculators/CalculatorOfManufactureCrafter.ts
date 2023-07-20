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
import { roundForDisplay } from "./Helpers";

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

  const craftingTime: number = item.timeInHours / crafter.speedFactor;
  const craftingCost: number = crafter.hourlyRate * craftingTime;
  const totalCraftingCost: number = item.materialCost + craftingCost;

  return {
    baseItemName: item.itemName,
    materialCost: item.materialCost.toString() + " gp",
    dc: item.dc,
    craftingTimeInHours: roundForDisplay(craftingTime) + " hours",
    crafterCost: roundForDisplay(craftingCost) + " gp",
    totalCost: roundForDisplay(totalCraftingCost) + " gp",
    hourlyRate: crafter.hourlyRate + " gp / hour",
    modifier: "+" + crafter.modifier,
  };
}
