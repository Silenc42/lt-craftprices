import {craftableItem} from "@/DataJsons/craftableItem";

export interface manufacturableItemCategory {
  categoryName: string;
  items: manufacturableItem[];
}

export interface manufacturableItem extends craftableItem{
  tools: string[];
}
