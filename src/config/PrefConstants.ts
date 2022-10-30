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
}

export const LEVEL_TO_PERCENTAGE_MAPPING = {
  [LevelTypes.LIGHT]: 0.25,
  [LevelTypes.MEDIUM]: 0.5,
  [LevelTypes.HIGH]: 0.75,
}

export const PREF_ADJECTIVES = {
  [PrefTypes.SELF]: ['Classic', 'Old-fashioned', 'Tried and true', 'Solid', 'Normal', 'No-frills'],
  [PrefTypes.AFFINITY]: ['Delicious', 'Enjoyable', 'Tasty', 'Succulent', 'Scurmptious'],
  [PrefTypes.ALLERGY]: ['Dangerous', 'Adventurous', 'Spicy', 'Edgy'],
}

export const LEVEL_ADJECTIVES = {
  [LevelTypes.LIGHT]: ['slightly', 'lightly', 'faintly'],
  [LevelTypes.MEDIUM]: ['fairly', 'moderately', 'kind of'],
  [LevelTypes.HIGH]: ['heavilty', 'intensely', 'mostly', 'seriously'],
}

export enum COCKTAIL_GRADE {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  F = 'F',
  DEAD = 'Dead',
}
