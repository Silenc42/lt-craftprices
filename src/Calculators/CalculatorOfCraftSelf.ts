import {baseItem, baseItemByName} from "@/DataRepositoriesAndModels/RepoOfBaseItems";
import {craftingToolStats, getCraftingTool} from "@/DataRepositoriesAndModels/RepoOfCraftingTools";

export interface craftSelfToolsDisplayModel {
  toolChoices: string[]
}

export function getManufactureSelfToolsForDisplay(itemName: string): craftSelfToolsDisplayModel {
  if (!itemName) {
    return {
      toolChoices: []
    }
  }

  const item: baseItem = baseItemByName(itemName);
  return {
    toolChoices: item.tools.flatMap(t => {
      const toolDetails: craftingToolStats = getCraftingTool(t);
      return toolDetails.abilities.map(a => a + "(" + toolDetails.toolName + ")")
    })
  }
}
