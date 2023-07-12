export interface craftingToolStats {
  toolId: string,
  toolName: string,
  ability: string
  //itemTypes: string
}

import * as craftingToolsData from '@/DataRepositoriesAndModels/craftingTools.json'

export function getCraftingTool(toolId: string): craftingToolStats {
  const toolStats = craftingToolsData
    .craftingToolsList
    .find(tool => tool.id === toolId);
  if(!toolStats){
    // console.error('nonexistent crafter stat requested from crafter stats repo');
    throw 'nonexistent tool details requested from crafting tools repo: ' + toolId;
  }
  return {
    toolId: toolStats.id,
    toolName: toolStats.toolName,
    ability: toolStats.ability,
    //itemTypes: toolStats.itemTypes
  };
}
