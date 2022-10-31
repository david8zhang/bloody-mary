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

export const TIMEOUT_LINES = [
  "Sorry ma'am, I don't have all day",
  "Could you be any slower? I'm out of here!",
  'You need some more practice!',
  'I have places to be.',
  "Sorry, I don't have time for this",
  'Come on! You need to hurry next time!',
  "I'm here to drink not to wait!",
]

export const COCKTAIL_GRADE_LINES = {
  [CocktailGrade.A]: [
    'Amazing! You have a talent for this!',
    "Oh yes, that's a 10 out of 10!",
    "Wow, that's perfect!",
    'This is absolutely delicious!',
    "Love it. You have my respect, ma'am!",
    "Bravo! Best thing I've tasted in a while!",
    "It's wonderful! I should tell my friends!",
    "Oh that's incredible!",
    "I love this! I'll be coming here a lot more from now on!",
  ],
  [CocktailGrade.B]: [
    'Nice, not bad!',
    'Pretty good!',
    "Yeah, that's not half bad!",
    'Good job!',
    'Great overall, just needs a tiny bit more',
    'A solid drink.',
    'Nicely done!',
    'Ooh, I like it.',
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
    "Ehh...I don't like it very much...",
    "Oh that's not great...",
    "Oof. You could've done better on that one.",
    'Bleh. Please do better next time...',
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
    "AAAGH! What have you done?! I'm dying!",
    "You've killed me you idiot!",
    "I'll get you for this!!!",
    "Y-you scum! You've poisoned me!",
    'What was in this?! Gahhhh...',
    "Look at my eyes! I'm allergic you fool! Ackkk",
  ],
}

export enum TimeGradeTypes {
  LIGHTNING = 'LIGHTNING',
  FAST = 'FAST',
  AVERAGE = 'AVERAGE',
  SLOW = 'SLOW',
}

export const TIME_BONUSES = {
  [TimeGradeTypes.LIGHTNING]: 100,
  [TimeGradeTypes.FAST]: 50,
  [TimeGradeTypes.AVERAGE]: 0,
  [TimeGradeTypes.SLOW]: -25,
}
