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

export function crafterTypeValidator(value: string) {
  return value === '' || value === 'manufacturer' || value === 'enchanter' || value === 'forger'
}

export enum crafterTypeEnum {
  none = '',
  manufacturer = 'manufacturer',
  enchanter = 'enchanter',
  forger = 'forger'
}
