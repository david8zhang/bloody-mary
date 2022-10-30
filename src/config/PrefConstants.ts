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

export enum CocktailGrade {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  F = 'F',
  DEAD = 'Dead',
}

export const COCKTAIL_GRADE_REP_BONUSES = {
  [CocktailGrade.A]: 100,
  [CocktailGrade.B]: 50,
  [CocktailGrade.C]: 20,
  [CocktailGrade.D]: -50,
  [CocktailGrade.F]: -100,
  [CocktailGrade.DEAD]: -200,
}

export const COCKTAIL_GRADE_LINES = {
  [CocktailGrade.A]: [
    'Amazing!',
    "Wow, that's great!",
    'This is delicious!',
    'You have my respect, sir!',
    'Bravo! What a drink!',
    'I need to tell somebody about this!',
    "Oh that's incredible!",
  ],
  [CocktailGrade.B]: [
    'Nice, not bad',
    'Pretty good!',
    "Yeah that's not half bad!",
    'Good!',
    'A solid drink.',
    'Nicely done.',
    'Very solid drink.',
  ],
  [CocktailGrade.C]: [
    "It's okay...was expecting more",
    "Meh. Could've been better",
    'Not bad, but not great',
    "Eh..it's alright I guess",
    "Hmm... It's average.",
    "It'll do for now.",
    'Pretty ok.',
    "It's average at best...",
    "Not the best thing I've had, but not the worst either I suppose.",
  ],
  [CocktailGrade.D]: [
    "Sorry but...it's pretty bad.",
    "Don't like it very much...",
    "Oh that's not great...",
    "Oof. You could've done better on that one.",
    'Bleh. Do better next time...',
    'Are you sure you heard me right?',
    "This isn't very good.",
    'Not great...Not great at all...',
  ],
  [CocktailGrade.F]: [
    'You trying to kill me?!',
    'This is terrible!',
    'Gah! Worst drink ever!',
    'What is this trash?!',
    'BLEGH! You might as well have given me holy water!',
    'Awful! I want a refund!',
    'What in the name of the devil is this garbage?!',
    "Give me that again and I'll stake you myself!",
  ],
  [CocktailGrade.DEAD]: [
    "AAAGH! I'm dying!",
    "You've killed me you idiot!",
    "I'll get you for this!!!",
    "Y-you scum! You've poisoned me!",
    'What was in this?! Gahhhh...',
  ],
}
