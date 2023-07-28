import {
  baseItem,
  baseItemByName,
} from "@/DataRepositoriesAndModels/RepoOfBaseItems";
import {
  essence,
  getEssenceDataByRarity,
  getMonsterTypesDataByTypeName,
  monsterType,
} from "@/DataRepositoriesAndModels/RepoOfEnchantings";
import { attunementEnum } from "@/DataRepositoriesAndModels/attunementEnum";
import {
  toDCText,
  toDisplayList,
  toGpText,
  toHourText,
} from "./DisplayHelpers";
import {
  craftingToolStats,
  getCraftingTool,
} from "@/DataRepositoriesAndModels/RepoOfCraftingTools";

export interface forgeSelfDisplayModel {
  itemDisplayName: string;
  baseItemMaterialCost: string;
  forgingTimeInHours: string;
  manufacturingDC: string;
  manufactureCheckChoices: string[];
  enchantingDC: string;
  enchantingCheckChoices: string[];
}

export function getForgeSelfDisplay(
  baseItemName: string | undefined,
  chosenMonsterType: string | undefined,
  chosenRarity: string | undefined,
  attunement: attunementEnum
): forgeSelfDisplayModel {
  const baseItemData: baseItem | undefined = baseItemName
    ? baseItemByName(baseItemName)
    : undefined;
  const toolChoices: craftingToolStats[] | undefined = baseItemData
    ? baseItemData.tools.map((t) => getCraftingTool(t))
    : undefined;
  const essenceData: essence | undefined = chosenRarity
    ? getEssenceDataByRarity(chosenRarity)
    : undefined;
  const monsterTypeData: monsterType | undefined = chosenMonsterType
    ? getMonsterTypesDataByTypeName(chosenMonsterType)
    : undefined;

  return {
    itemDisplayName: calcItemDisplayName(
      attunement,
      chosenRarity,
      baseItemData
    ),
    baseItemMaterialCost: toGpText(baseItemData?.itemValue),
    forgingTimeInHours: toHourText(
      calcCraftingTime(baseItemData, attunement, essenceData)
    ),
    manufacturingDC: toDCText(baseItemData?.manufacturingDC),
    manufactureCheckChoices: toDisplayList(
      calcManufactureCheckChoices(toolChoices)
    ),
    enchantingDC: toDCText(essenceData?.enchantingDC),
    enchantingCheckChoices: toDisplayList(
      calcEnchantingCheckChoices(toolChoices, monsterTypeData)
    ),
  };
}

function calcManufactureCheckChoices(
  toolChoices: craftingToolStats[] | undefined
): string[] | undefined {
  return toolChoices?.flatMap((t) =>
    t.abilities.map((a) => a + "(" + t.toolName + ")")
  );
}

function calcEnchantingCheckChoices(
  toolChoices: craftingToolStats[] | undefined,
  monsterTypeData: monsterType | undefined
): string[] | undefined {
  if (!toolChoices || !monsterTypeData) {
    return undefined;
  }
  const listWithDuplicates: string[] = toolChoices
    ?.flatMap((t) => t.abilities)
    .map((a) => a + "(" + monsterTypeData.skill + ")");
  const deduplicatedList: string[] = Array.from(new Set(listWithDuplicates));
  return deduplicatedList;
}

function calcCraftingTime(
  baseItemData: baseItem | undefined,
  attunement: attunementEnum,
  essenceData: essence | undefined
): number | undefined {
  const manufactureTime: number | undefined =
    baseItemData?.manufacturingTimeInHours;
  if (!manufactureTime) {
    return undefined;
  }
  const enchantTime: number | undefined = calcEnchantingTime(
    attunement,
    essenceData
  );
  if (!enchantTime) {
    return undefined;
  }

  return Math.max(manufactureTime, enchantTime);
}

function calcEnchantingTime(
  attunement: attunementEnum,
  essenceData: essence | undefined
): number | undefined {
  if (!essenceData) {
    return undefined;
  }
  switch (attunement) {
    case attunementEnum.consumable:
      return essenceData.enchantingTimeConsumable;
    case attunementEnum.not:
      return essenceData.enchantingTimeNonAttunement;
    case attunementEnum.attunement:
      return essenceData.enchantingTimeAttunement;
    default:
      throw "Impossible choice of attunement";
  }
}

function calcItemDisplayName( //todo: maybe extract
  attunement: attunementEnum,
  chosenRarity: string | undefined,
  baseItemData: baseItem | undefined
) {
  const rarityText: string = chosenRarity ? chosenRarity + " " : " ";
  const itemTypeText: string = baseItemData?.itemName ?? "Item";

  let attunementText: string;
  switch (attunement) {
    case attunementEnum.consumable:
      attunementText = " (Consumable)";
      break;
    case attunementEnum.not:
      attunementText = " (Non-Attunement)";
      break;
    case attunementEnum.attunement:
      attunementText = " (Attunement)";
      break;
    default:
      throw "Impossible choice of attunement";
  }

  return rarityText + itemTypeText + attunementText;
}
