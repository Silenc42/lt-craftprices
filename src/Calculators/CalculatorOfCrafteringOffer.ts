import {crafterRankEnum, crafterTypeEnum} from "@/DataRepositoriesAndModels/crafterChoices";
import {crafterStats, getCrafterStats} from "@/DataRepositoriesAndModels/RepoOfCrafterStats";
import {baseItem, baseItemByName} from "@/DataRepositoriesAndModels/RepoOfBaseItems";

export interface crafterStatsDisplayModel {
  dc: string,
  modifier: string,
  craftingTime: string,
  crafterCost: string,
  materialCost: string
}

export function getCraftingOfferForDisplay(crafterRank: crafterRankEnum, crafterType: crafterTypeEnum, itemName: string): crafterStatsDisplayModel {
  if (!itemName) {
    return {
      dc: '--',
      modifier: 'your modifier',
      craftingTime: '--',
      crafterCost: '--',
      materialCost: '--'
    }
  }

  const item: baseItem = baseItemByName(itemName);

  if (crafterRank == crafterRankEnum.diy) {
    return {
      dc: item.dc,
      modifier: 'your modifier',
      craftingTime: item.timeInHours + ', if you\'re not faster',
      crafterCost: 'none',
      materialCost: item.materialCost + 'gp'
    }
  }
  const crafter: crafterStats = getCrafterStats(crafterRank, crafterType);

  return {
    dc: item.dc,
    modifier: '+'+ crafter.modifier,
    craftingTime: roundForDisplay(item.timeInHours/crafter.speedFactor) + ' hours without overtime',
    crafterCost: roundForDisplay(crafter.hourlyRate * (item.timeInHours/crafter.speedFactor)) + 'gp',
    materialCost: item.materialCost + 'gp'
  }
}

function roundForDisplay(x: number): number{
  return Math.round(x*100)/100;
}
