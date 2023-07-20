export interface craftingToolStats {
  toolId: string;
  toolName: string;
  abilities: string[];
  //itemTypes: string
}

import * as craftingToolsData from "@/DataRepositoriesAndModels/DataOfCraftingTools.json";

export function getCraftingTool(toolId: string): craftingToolStats {
  const toolStats = craftingToolsData.craftingToolsList.find(
    (tool) => tool.id === toolId
  );
  if (!toolStats) {
    throw (
      "nonexistent tool details requested from crafting tools repo: " + toolId
    );
  }
  return {
    toolId: toolStats.id,
    toolName: toolStats.toolName,
    abilities: toolStats.abilities,
    //itemTypes: toolStats.itemTypes
  };
}
