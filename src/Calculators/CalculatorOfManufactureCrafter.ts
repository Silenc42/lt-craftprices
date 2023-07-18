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
      baseItemName: "",
      craftingTimeInHours: "",
      materialCost: "",
      dc: "",
      crafterCost: "",
      modifier: "",
    };
  }

  const item: baseItem = baseItemByName(itemName);
  const crafter: crafterStats = getCrafterStats(crafterRank, crafterType);
  return {
    baseItemName: item.itemName,
    materialCost: item.materialCost.toString() + " gp",
    dc: item.dc,
    craftingTimeInHours:
      roundForDisplay(item.timeInHours / crafter.speedFactor) + " hours",
    crafterCost:
      roundForDisplay(
        crafter.hourlyRate * (item.timeInHours / crafter.speedFactor)
      ) + " gp",
    modifier: "+" + crafter.modifier,
  };
}

function roundForDisplay(x: number): number {
  return Math.round(x * 100) / 100;
}
