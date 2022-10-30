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
  [PrefTypes.SELF]: [
    'classic',
    'old-fashioned',
    'tried and true',
    'conventional',
    'normal',
    'no-frills',
    'standard',
    'regular',
  ],
  [PrefTypes.AFFINITY]: [
    'delicious',
    'enjoyable',
    'tasty',
    'succulent',
    'scrumptious',
    'appetizing',
    'flavorful',
    'delightful',
    'pleasant',
  ],
  [PrefTypes.ALLERGY]: [
    'dangerous',
    'adventurous',
    'spicy',
    'edgy',
    'daring',
    'poisonous',
    'strong',
    'potent',
    'hard',
    'risky',
  ],
}

export const LEVEL_ADJECTIVES = {
  [LevelTypes.LIGHT]: [
    'slightly',
    'lightly',
    'faintly',
    'a bit',
    'vaguely',
    'a shade',
    'a touch',
    'a little',
  ],
  [LevelTypes.MEDIUM]: [
    'fairly',
    'moderately',
    'kind of',
    'pretty',
    'more or less',
    'modestly',
    'rather',
  ],
  [LevelTypes.HIGH]: [
    'heavily',
    'intensely',
    'mostly',
    'seriously',
    'very',
    'thoroughly',
    'extremely',
  ],
}
