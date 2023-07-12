import {baseItem, baseItemByName} from "@/DataRepositoriesAndModels/RepoOfBaseItems";
import {craftingToolStats, getCraftingTool} from "@/DataRepositoriesAndModels/RepoOfCraftingTools";

export interface craftSelfToolsDisplayModel {
  toolChoices: string[]
}

export function getCraftSelfToolsForDisplay(itemName: string): craftSelfToolsDisplayModel {
  if (!itemName) {
    return {
      toolChoices: ['--']
    }
  }

  const item: baseItem = baseItemByName(itemName);

  return {
    toolChoices: item.tools.map(t => {
      const toolDetails: craftingToolStats = getCraftingTool(t);
      return toolDetails.ability + "(" + toolDetails.toolName + ")";
    })
  }
}
