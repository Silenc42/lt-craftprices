export function attunementValidator(value: string) {
  return value === 'consumable' || value === 'not' || value === 'attunement'
}

export enum attunementEnum {
  consumable = 'consumable',
  not = 'not',
  attunement = 'attunement'
}
