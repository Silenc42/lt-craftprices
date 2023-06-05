export interface manufacturableItemCategory {
  categoryName: string;
  items: manufacturableItems[];
}

export interface manufacturableItems {
  tool: string[]; //TODO: change to tool enum?
  itemName: string;
  dc: string;
  timeInHours: number;
  "materialCost": number;
  "itemValue": number;
}
