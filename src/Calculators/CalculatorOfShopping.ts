import {
  baseItem,
  baseItemByName,
} from "@/DataRepositoriesAndModels/RepoOfBaseItems";
import {
  noItemNamePlaceholder,
  nothingToDisplayPlaceholder,
  toGpText,
} from "./DisplayHelpers";

export interface shoppingDisplayModel {
  itemDisplayName: string;
  itemPrice: string;
}

export function getShoppingDisplay(
  itemName: string | undefined
): shoppingDisplayModel {
  if (!itemName) {
    return {
      itemDisplayName: noItemNamePlaceholder,
      itemPrice: nothingToDisplayPlaceholder,
    };
  }

  const item: baseItem = baseItemByName(itemName);
  return {
    itemDisplayName: item.itemName,
    itemPrice: toGpText(item.itemValue),
  };
}
