export interface manufacturableItemCategory {
  categoryName: string;
  items: manufacturableItem[];
}

export interface manufacturableItem {
  tools: string[];
  itemName: string;
  dc: string;
  timeInHours: number;
  materialCost: number;
  itemValue: number;
}
