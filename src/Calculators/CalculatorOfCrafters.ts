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
    throw "Crafter Calculator called for self crafting. Use CalculatorOfCraftSelf for that."
  }

  if(crafterType == crafterTypeEnum.none){
    return{
      name: "At this point, you\'re shopping",
      speed: '',
      check: '',
      hourlyRate: '',
      overtimeRate: '',
    }
  }

  const stats: crafterStats = getCrafterStats(crafterRank, crafterType);
  return {
    name: displayCrafterType(stats.rank, stats.type),
    speed: 'x' + stats.speedFactor,
    check: '+' + stats.modifier,
    hourlyRate: stats.hourlyRate + 'gp',
    overtimeRate: stats.overtimeRate + 'gp',
  }
}

function displayCrafterType(rank: crafterRankEnum, type: crafterTypeEnum): string {
  const builder: string[] = [];
  switch (type) {
    case crafterTypeEnum.manufacturer:
      builder.push("Manufactured");
      break;
    case crafterTypeEnum.enchanter:
      builder.push("Enchanted");
      break;
    case crafterTypeEnum.forger:
      builder.push("Forged");
      break;
  }
  builder.push(" by ");
  switch (rank) {
    case crafterRankEnum.journeyman:
      builder.push(" a Journeyman");
      break;
    case crafterRankEnum.expert:
      builder.push(" an Expert");
      break;
    case crafterRankEnum.master:
      builder.push(" a Master");
      break;
    case crafterRankEnum.larseneSimple:
      builder.push(" L'Arséne Upin");
      break;
  }
  return builder.join('');
}
