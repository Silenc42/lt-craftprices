export interface craftingTools {
  craftingToolsList: craftingTool[];
}

export interface craftingTool {
  id: string,
  toolName: string,
  ability: string,
  itemTypes: string
}
