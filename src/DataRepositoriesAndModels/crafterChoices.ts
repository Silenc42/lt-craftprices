export function crafterRankValidator(value: string) {
  return value === 'diy' || value === 'journeyman' || value === 'expert' || value === 'master' || value === 'LArseneSimple'
}

export enum crafterRankEnum {
  diy = 'diy',
  journeyman = 'journeyman',
  expert = 'expert',
  master = 'master',
  larseneSimple = 'LArseneSimple'
}
export enum crafterTypeEnum {
  manufacturer = 'manufacturer',
  enchanter = 'enchanter',
  forger = 'forger'
}
