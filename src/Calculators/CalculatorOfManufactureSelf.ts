import {
  baseItem,
  baseItemByName,
} from "@/DataRepositoriesAndModels/RepoOfBaseItems";
import {
  craftingToolStats,
  getCraftingTool,
} from "@/DataRepositoriesAndModels/RepoOfCraftingTools";
import {
  noItemNamePlaceholder,
  nothingToDisplayPlaceholder,
  toDCText,
  toGpText,
  toHourText,
} from "./DisplayHelpers";

export interface manufactureSelfDisplayModel {
  itemDisplayName: string;
  timeInHours: string;
  materialCost: string;
  manufacturingDC: string;
  toolChoices: string[];
}

export function getManufactureSelfToolsForDisplay(
  itemName: string
): manufactureSelfDisplayModel {
  if (!itemName) {
    return {
      itemDisplayName: noItemNamePlaceholder,
      timeInHours: nothingToDisplayPlaceholder,
      materialCost: nothingToDisplayPlaceholder,
      manufacturingDC: nothingToDisplayPlaceholder,
      toolChoices: [],
    };
  }

  const item: baseItem = baseItemByName(itemName);
  return {
    itemDisplayName: item.itemName,
    timeInHours: toHourText(item.manufacturingTimeInHours),
    materialCost: toGpText(item.materialCost),
    manufacturingDC: toDCText(item.manufacturingDC),
    toolChoices: calcToolChoices(item),
  };
}

function calcToolChoices(item: baseItem): string[] {
  return item.tools.flatMap((t) => {
    const toolDetails: craftingToolStats = getCraftingTool(t);
    return toolDetails.abilities.map(
      (a) => a + "(" + toolDetails.toolName + ")"
    );
  });
}

