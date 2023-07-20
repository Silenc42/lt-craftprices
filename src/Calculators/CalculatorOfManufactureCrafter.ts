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
import {
  noItemNamePlaceholder,
  nothingToDisplayPlaceholder,
  toDCText,
  toGpPerHourText,
  toGpText,
  toHourText,
  toModifierText,
} from "./DisplayHelpers";

export interface manufactureCrafterDisplayModel {
  itemDisplayName: string;
  craftingTimeInHours: string;
  materialCost: string;
  crafterCost: string;
  totalCost: string;
  hourlyRate: string;
  manufacturingDC: string;
  modifier: string;
}

export function getManufactureCrafterDisplay(
  crafterRank: crafterRankEnum,
  crafterType: crafterTypeEnum,
  itemName: string | undefined
): manufactureCrafterDisplayModel {
  if (!itemName) {
    return {
      itemDisplayName: noItemNamePlaceholder,
      craftingTimeInHours: nothingToDisplayPlaceholder,
      materialCost: nothingToDisplayPlaceholder,
      manufacturingDC: nothingToDisplayPlaceholder,
      crafterCost: nothingToDisplayPlaceholder,
      hourlyRate: nothingToDisplayPlaceholder,
      totalCost: nothingToDisplayPlaceholder,
      modifier: nothingToDisplayPlaceholder,
    };
  }

  const item: baseItem = baseItemByName(itemName);
  const crafter: crafterStats = getCrafterStats(crafterRank, crafterType);

  const craftingTime: number =
    item.manufacturingTimeInHours / crafter.speedFactor;
  const craftingCost: number = crafter.hourlyRate * craftingTime;
  const totalCraftingCost: number = item.materialCost + craftingCost;

  return {
    itemDisplayName: item.itemName,
    materialCost: toGpText(item.materialCost),
    manufacturingDC: toDCText(item.manufacturingDC),
    craftingTimeInHours: toHourText(craftingTime),
    crafterCost: toGpText(craftingCost),
    totalCost: toGpText(totalCraftingCost),
    hourlyRate: toGpPerHourText(crafter.hourlyRate),
    modifier: toModifierText(crafter.modifier),
  };
}
