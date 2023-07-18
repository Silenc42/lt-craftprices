import {baseItem, baseItemByName} from "@/DataRepositoriesAndModels/RepoOfBaseItems";
import {craftingToolStats, getCraftingTool} from "@/DataRepositoriesAndModels/RepoOfCraftingTools";

export interface manufactureSelfDisplayModel {
  baseItemName: string;
  timeInHours: string;
  materialCost: string;
  dc: string;
  toolChoices: string[];
}

export function getManufactureSelfToolsForDisplay(itemName: string): manufactureSelfDisplayModel {
  if (!itemName) {
    return {
      baseItemName:"",
      timeInHours: "",
      materialCost:"",
      dc: "",
      toolChoices: []
    }
  }

  const item: baseItem = baseItemByName(itemName);
  return {
    baseItemName: item.itemName,
    timeInHours: item.timeInHours.toString() + " hours",
    materialCost: item.materialCost.toString() + " gp",
    dc: item.dc,
    toolChoices: item.tools.flatMap((t) => {
      const toolDetails: craftingToolStats = getCraftingTool(t);
      return toolDetails.abilities.map(
        (a) => a + "(" + toolDetails.toolName + ")"
      );
    }),
  };
}
