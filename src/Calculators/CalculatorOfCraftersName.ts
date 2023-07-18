import {crafterRankEnum, crafterTypeEnum} from "@/DataRepositoriesAndModels/crafterChoices";

export function getcrafterNameDisplay(rank: crafterRankEnum, type: crafterTypeEnum): string {
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
