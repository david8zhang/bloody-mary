export enum BloodTypes {
  REPTILE = 'REPTILE',
  BIRD = 'BIRD',
  FISH = 'FISH',
  HUMAN = 'HUMAN',
  MAMMAL = 'MAMMAL',
}

export const BLOOD_TYPE_TO_COLOR = {
  [BloodTypes.BIRD]: 0xdf8a44,
  [BloodTypes.FISH]: 0x3c51ae,
  [BloodTypes.REPTILE]: 0x30e080,
  [BloodTypes.HUMAN]: 0xcc0000,
  [BloodTypes.MAMMAL]: 0xff7373,
}

export const COCKTAIL_COLOR = 0x9d2727
