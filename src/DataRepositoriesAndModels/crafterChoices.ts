export function crafterRankValidator(value: string) {
  return value === 'diy' || value === 'journeyman' || value === 'expert' || value === 'master'
}

export enum crafterRankEnum {
  diy = 'diy',
  journeyman = 'journeyman',
  expert = 'expert',
  master = 'master'
}
export enum crafterTypeEnum {
  manufacturer = 'manufacturer',
  enchanter = 'enchanter',
  forger = 'forger'
}
