import {
  baseItem,
  baseItemByName,
} from "@/DataRepositoriesAndModels/RepoOfBaseItems";
import {
  crafterStats,
  getCrafterStats,
} from "@/DataRepositoriesAndModels/RepoOfCrafterStats";
import { getEssenceDataByRarity } from "@/DataRepositoriesAndModels/RepoOfEnchantings";
import { attunementEnum } from "@/DataRepositoriesAndModels/attunementEnum";
import {
  crafterRankEnum,
  crafterTypeEnum,
} from "@/DataRepositoriesAndModels/crafterChoices";
import { roundForDisplay } from "./Helpers";

export interface enchantCrafterDisplayModel {
  baseItemName: string;
  baseItemCost: string;
  craftingTimeInHours: string;
  crafterCost: string;
  totalCost: string;
  hourlyRate: string;
  dc: string;
  modifier: string;
}

export function getEnchantCrafterDisplay(
  baseItemName: string | undefined,
  chosenRarity: string | undefined,
  attunement: attunementEnum,
  crafterRank: crafterRankEnum,
  crafterType: crafterTypeEnum
): enchantCrafterDisplayModel {
  const enchantingDisplayData: enchantCrafterDisplayModel = {
    baseItemName: "",
    baseItemCost: "",
    craftingTimeInHours: "",
    dc: "",

    crafterCost: "",
    totalCost: "",
    hourlyRate: "",
    modifier: "",
  };

  const crafter: crafterStats = getCrafterStats(crafterRank, crafterType);
  const baseItemData: baseItem | null = baseItemName? baseItemByName(baseItemName) : null;

  enchantingDisplayData.modifier = "+" + crafter.modifier;
  enchantingDisplayData.hourlyRate = roundForDisplay(crafter.hourlyRate) + " gp / hour";

  

  if (baseItemData) {
    enchantingDisplayData.baseItemName =
      (chosenRarity ? chosenRarity : "") + " " + baseItemData.itemName;
    enchantingDisplayData.baseItemCost = baseItemData.itemValue + " gp";
  }

  if (chosenRarity) {
    const essenceData = getEssenceDataByRarity(chosenRarity);
    enchantingDisplayData.dc = essenceData.enchantingDC.toString();

    let baseCraftingTime: number;
    switch (attunement) {
      case attunementEnum.consumable:
        baseCraftingTime = essenceData.enchantingTimeConsumable;
        break;
      case attunementEnum.not:
        baseCraftingTime = essenceData.enchantingTimeNonAttunement;
        break;
      case attunementEnum.attunement:
        baseCraftingTime = essenceData.enchantingTimeAttunement;
        break;
      default:
        throw "Impossible choice of attunement";
    }

    const actualCraftingTime: number = baseCraftingTime / crafter.speedFactor;
    const crafterCost: number = crafter.hourlyRate * actualCraftingTime;

    enchantingDisplayData.craftingTimeInHours =
      roundForDisplay(actualCraftingTime) + " hours";
    enchantingDisplayData.crafterCost = roundForDisplay(crafterCost) + " gp";

    if (baseItemData) {
      const totalCost: number = crafterCost + baseItemData.itemValue;
      enchantingDisplayData.totalCost = roundForDisplay(totalCost) + " gp";
    }
  }

  return enchantingDisplayData;
}
