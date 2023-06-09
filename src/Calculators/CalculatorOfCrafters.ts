import {crafterRankEnum, crafterTypeEnum} from "@/DataRepositoriesAndModels/crafterChoices";
import {crafterStats, getCrafterStats} from "@/DataRepositoriesAndModels/RepoOfCrafterStats";

export interface crafterStatsDisplayModel {
  name: string,
  speed: string,
  check: string,
  hourlyRate: string,
  overtimeRate: string
}

export function getCrafterStatsForDisplay(crafterRank: crafterRankEnum, crafterType: crafterTypeEnum): crafterStatsDisplayModel {
  if (crafterRank == crafterRankEnum.diy) {
    return {
      name: 'Player Character',
      speed: 'check your sheet',
      check: 'check your sheet',
      hourlyRate: 'none',
      overtimeRate: 'none'
    }
  }
  const stats: crafterStats = getCrafterStats(crafterRank, crafterType);
  return {
    name: stats.rank + ' ' + stats.type,
    speed: 'x'+stats.speedFactor,
    check: '+' + stats.modifier,
    hourlyRate: stats.hourlyRate + 'gp',
    overtimeRate: stats.overtimeRate + 'gp',
  }
}
