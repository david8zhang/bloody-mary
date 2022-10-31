/**
 * Preferences work as follows
 *
 * SELF: Normal Human blood
 * AFFINITY: Aligns with the color of the customer's outfit color
 * ALLERGY: Aligns with the color of the customer's eyes
 *
 * There are also levels:
 * LIGHT: 25%
 * MEDIUM: 50%
 * HIGH: 75%
 */

export enum PrefTypes {
  SELF = 'SELF', // Preference for same blood type
  AFFINITY = 'AFFINITY', // Preference for blood enjoyed by blood type
  ALLERGY = 'ALLERGY', // Preference for blood type toxic to blood type
}

export enum LevelTypes {
  LIGHT = 'LIGHT',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  FULL = 'FULL',
}

export const LEVEL_TO_PERCENTAGE_MAPPING = {
  [LevelTypes.LIGHT]: 0.25,
  [LevelTypes.MEDIUM]: 0.5,
  [LevelTypes.HIGH]: 0.75,
  [LevelTypes.FULL]: 1,
}

export const PREF_ADJECTIVES = {
  [PrefTypes.SELF]: ['classic', 'normal', 'basic', 'standard'],
  [PrefTypes.AFFINITY]: ['delicious', 'enjoyable', 'tasty', 'appetizing'],
  [PrefTypes.ALLERGY]: ['dangerous', 'adventurous', 'edgy', 'poisonous'],
}

export const LEVEL_ADJECTIVES = {
  [LevelTypes.FULL]: [''],
  [LevelTypes.LIGHT]: ['a quarter'],
  [LevelTypes.MEDIUM]: ['half'],
  [LevelTypes.HIGH]: ['three quarters'],
}
