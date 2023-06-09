import {crafterRankEnum, crafterTypeEnum} from "@/DataRepositoriesAndModels/crafterChoices";

export interface crafterStats {
  "type": crafterTypeEnum,
  "rank": crafterRankEnum,
  "speedFactor": number,
  "modifier": number,
  "hourlyRate": number,
  "overtimeRate": number
}

import * as crafterStatsData from '@/DataRepositoriesAndModels/crafterStatsData.json'

export function getCrafterStats(rank: crafterRankEnum, type: crafterTypeEnum): crafterStats {
  const crafterStats = crafterStatsData
    .crafterStats
    .find(crafter => crafter.type === type&& crafter.rank === rank);
  if(!crafterStats){
    // console.error('nonexistent crafter stat requested from crafter stats repo');
    throw 'nonexistent crafter stat requested from crafter stats repo: ' + type + ', ' + rank;
  }
  return {
    type: type,
    rank: rank,
    speedFactor: crafterStats.speedFactor,
    modifier: crafterStats.modifier,
    hourlyRate: crafterStats.hourlyRate,
    overtimeRate: crafterStats.overtimeRate
  };
}
