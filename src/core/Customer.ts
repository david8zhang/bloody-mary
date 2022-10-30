import { BloodTypes, BLOOD_TYPE_TO_COLOR } from '~/config/BloodTypes'
import { GameConstants } from '~/config/GameConstants'
import {
  CocktailGrade,
  COCKTAIL_GRADE_LINES,
  LevelTypes,
  LEVEL_ADJECTIVES,
  LEVEL_TO_PERCENTAGE_MAPPING,
  PrefTypes,
  PREF_ADJECTIVES,
} from '~/config/PrefConstants'
import Game from '~/scenes/Game'

export interface CustomerConfig {
  position: {
    x: number
    y: number
  }
}

export class Customer {
  private static readonly MOVE_DURATION = 1250

  private game: Game
  private sprite!: Phaser.GameObjects.Sprite
  private eyes: Phaser.GameObjects.Arc[] = []
  private defaultPosition: { x: number; y: number }

  private affinityType!: BloodTypes
  private allergyType!: BloodTypes
  private preferenceMap: any = {}
  private preferenceLineText: Phaser.GameObjects.Text

  constructor(game: Game, config: CustomerConfig) {
    this.game = game
    const { position } = config
    this.defaultPosition = position
    this.createSprite(position)

    this.preferenceLineText = this.game.add
      .text(
        position.x + this.sprite.displayWidth / 2 - 50,
        position.y - this.sprite.displayHeight / 2 + 50,
        ''
      )
      .setStyle({
        fontSize: '18px',
        color: 'white',
      })
    this.reset()
  }

  createSprite(position: { x: number; y: number }) {
    const outfitColor = BLOOD_TYPE_TO_COLOR[this.affinityType]
    const eyeColor = BLOOD_TYPE_TO_COLOR[this.allergyType]

    this.sprite = this.game.add
      .sprite(position.x, position.y, 'sample-vampire')
      .setScale(1)
      .setTint(outfitColor)
    const leftEye = this.game.add.circle(
      position.x - 10,
      position.y - this.sprite.displayHeight / 2 + 90,
      8,
      eyeColor
    )
    const rightEye = this.game.add.circle(
      position.x + 35,
      position.y - this.sprite.displayHeight / 2 + 91,
      8,
      eyeColor
    )
    this.eyes.push(leftEye)
    this.eyes.push(rightEye)
  }

  evaluateDrink(recipe: BloodTypes[]) {
    // Map preferences to actual threshold values
    const prefToRawPercentageMap = {}
    Object.keys(this.preferenceMap).forEach((key: string) => {
      const prefType = key as PrefTypes
      const level = this.preferenceMap[key] as LevelTypes
      const rawExpectedPercentage = LEVEL_TO_PERCENTAGE_MAPPING[level]
      prefToRawPercentageMap[prefType] = rawExpectedPercentage
    })

    // Map served cocktail mixture to actual threshold values
    const percentages = {}
    recipe.forEach((bloodType) => {
      if (!percentages[bloodType]) {
        percentages[bloodType] = 0
      }
      percentages[bloodType]++
    })
    Object.keys(percentages).forEach((key) => {
      percentages[key] /= recipe.length
    })
    const actualToRawPercentageMap = {
      [PrefTypes.AFFINITY]: 0,
      [PrefTypes.ALLERGY]: 0,
      [PrefTypes.SELF]: 0,
    }
    Object.keys(percentages).forEach((key: string) => {
      const bloodType = key as BloodTypes
      if (bloodType === this.affinityType) {
        actualToRawPercentageMap[PrefTypes.AFFINITY] += percentages[key]
      }
      if (bloodType === this.allergyType) {
        actualToRawPercentageMap[PrefTypes.ALLERGY] += percentages[key]
      }
      if (bloodType === BloodTypes.HUMAN) {
        actualToRawPercentageMap[PrefTypes.SELF] += percentages[key]
      }
    })

    // Compare the preference percentage values with the cocktail percentage values
    let inaccuracyPct = 0
    const actualAllergyPct = actualToRawPercentageMap[PrefTypes.ALLERGY]
      ? actualToRawPercentageMap[PrefTypes.ALLERGY]
      : 0
    const prefAllergyPct = prefToRawPercentageMap[PrefTypes.ALLERGY]
      ? prefToRawPercentageMap[PrefTypes.ALLERGY]
      : 0
    let isDead: boolean = actualAllergyPct > prefAllergyPct
    Object.keys(prefToRawPercentageMap).forEach((key: string) => {
      const prefType = key as PrefTypes
      const expectedPct = prefToRawPercentageMap[prefType]
      const actualPct = actualToRawPercentageMap[prefType] ? actualToRawPercentageMap[prefType] : 0
      inaccuracyPct += Math.abs(actualPct - expectedPct)
    })
    return this.getGradeForThresholdDiff(1 - inaccuracyPct, isDead)
  }

  getGradeForThresholdDiff(accuracyPct: number, isDead: boolean) {
    if (isDead) {
      return CocktailGrade.DEAD
    }
    if (accuracyPct < 0.6) {
      return CocktailGrade.F
    }
    if (accuracyPct >= 0.6 && accuracyPct < 0.7) {
      return CocktailGrade.D
    }
    if (accuracyPct >= 0.7 && accuracyPct < 0.8) {
      return CocktailGrade.C
    }
    if (accuracyPct >= 0.8 && accuracyPct < 0.9) {
      return CocktailGrade.B
    }
    if (accuracyPct > 0.9) {
      return CocktailGrade.A
    }
  }

  generatePreferenceLines() {
    const prefLines: string[] = []
    const firstLineTemplates = [
      "I'm in the mood for something",
      'Give me something',
      "I'd like a drink that's",
      'Just something',
      'Serve me up something',
      'I want to drink something',
    ]
    const additionalLineTemplates = [
      'With something',
      'And also something',
      'Plus something',
      'As well as something',
      'Along with something',
    ]

    Object.keys(this.preferenceMap).forEach((key: string, index: number) => {
      const prefType = key as PrefTypes
      const level = this.preferenceMap[key] as LevelTypes
      const prefAdjectives = PREF_ADJECTIVES[prefType]
      const levelAdjectives = LEVEL_ADJECTIVES[level]
      const randPrefAdjective = prefAdjectives[Phaser.Math.Between(0, prefAdjectives.length - 1)]
      const randLevelAdjective = levelAdjectives[Phaser.Math.Between(0, levelAdjectives.length - 1)]

      let randTemplate = ''
      if (index === 0) {
        randTemplate = firstLineTemplates[Phaser.Math.Between(0, firstLineTemplates.length - 1)]
      } else {
        randTemplate =
          additionalLineTemplates[Phaser.Math.Between(0, additionalLineTemplates.length - 1)]
      }

      prefLines.push(`${randTemplate} ${randLevelAdjective} ${randPrefAdjective}.`)
    })
    return prefLines
  }

  displayPreferenceLines() {
    const preferenceLines = this.generatePreferenceLines().join('\n\n')
    this.preferenceLineText
      .setText(preferenceLines)
      .setPosition(
        this.defaultPosition.x + this.sprite.displayWidth / 2 - 50,
        this.defaultPosition.y - this.sprite.displayHeight / 2 + 50
      )
      .setVisible(true)
      .setWordWrapWidth(GameConstants.WINDOW_WIDTH - this.preferenceLineText.x - 20)
  }

  generatePreferences() {
    const possibleLevelConfigurations = ['MM', 'MLL', 'HL']
    const randomLevelPrefIdx = Phaser.Math.Between(0, possibleLevelConfigurations.length - 1)
    const config = possibleLevelConfigurations[randomLevelPrefIdx]
    const allPrefTypes = Object.keys(PrefTypes).filter((type) => {
      return isNaN(Number(type))
    })
    Game.shuffle(allPrefTypes)
    let preferenceMap = {}
    switch (config) {
      case 'MM': {
        const medPrefType1 = allPrefTypes[0]
        const medPrefType2 = allPrefTypes[1]
        preferenceMap = {
          [medPrefType1]: LevelTypes.MEDIUM,
          [medPrefType2]: LevelTypes.MEDIUM,
        }
        break
      }
      case 'MLL': {
        const medPrefType = allPrefTypes[0]
        const lightPrefType1 = allPrefTypes[1]
        const lightPrefType2 = allPrefTypes[2]
        preferenceMap = {
          [medPrefType]: LevelTypes.MEDIUM,
          [lightPrefType1]: LevelTypes.LIGHT,
          [lightPrefType2]: LevelTypes.LIGHT,
        }
        break
      }
      case 'HL': {
        const highPrefType = allPrefTypes[0]
        const lightPrefType = allPrefTypes[1]
        preferenceMap = {
          [highPrefType]: LevelTypes.HIGH,
          [lightPrefType]: LevelTypes.LIGHT,
        }
        break
      }
    }
    this.preferenceMap = preferenceMap
  }

  die() {
    this.game.tweens.add({
      targets: [this.sprite, ...this.eyes],
      alpha: {
        from: 1,
        to: 0,
      },
      duration: 500,
      onComplete: () => {
        this.reset()
      },
    })
  }

  moveAlong() {
    this.game.tweens.add({
      targets: [this.sprite, ...this.eyes],
      x: `-=${GameConstants.WINDOW_WIDTH * 0.75}`,
      duration: Customer.MOVE_DURATION * 1.25,
      onComplete: () => {
        this.reset()
      },
    })
  }

  reset() {
    const offset = GameConstants.WINDOW_WIDTH / 2 + 150
    this.sprite.setPosition(this.defaultPosition.x + offset, this.defaultPosition.y).setAlpha(1)
    const leftEye = this.eyes[0]
    const rightEye = this.eyes[1]
    leftEye.setPosition(this.defaultPosition.x - 10 + offset, leftEye.y).setAlpha(1)
    rightEye.setPosition(this.defaultPosition.x + 35 + offset, rightEye.y).setAlpha(1)
    const bloodTypes = this.game
      .getAllBloodTypes()
      .filter((bloodType) => bloodType !== BloodTypes.HUMAN)
    const randomBloodTypeOrdering = Game.shuffle(bloodTypes)
    this.affinityType = randomBloodTypeOrdering[0]
    this.allergyType = randomBloodTypeOrdering[1]
    this.sprite.setTint(BLOOD_TYPE_TO_COLOR[this.affinityType])
    this.eyes.forEach((eye) => {
      eye.setFillStyle(BLOOD_TYPE_TO_COLOR[this.allergyType])
    })
    this.game.tweens.add({
      delay: 1000,
      targets: [this.sprite, ...this.eyes],
      x: `-=${offset}`,
      duration: Customer.MOVE_DURATION,
      onComplete: () => {
        this.preferenceLineText.setAlpha(1).setFontSize(18)
        this.generatePreferences()
        this.displayPreferenceLines()
      },
    })
  }

  displayReaction(grade: CocktailGrade, cb: Function) {
    const lines = COCKTAIL_GRADE_LINES[grade]
    const randLine = lines[Phaser.Math.Between(0, lines.length - 1)]
    this.preferenceLineText.setText(randLine).setFontSize(30)
    this.game.tweens.add({
      delay: 2000,
      targets: [this.preferenceLineText],
      alpha: {
        from: 1,
        to: 0,
      },
      y: {
        from: this.preferenceLineText.y,
        to: this.preferenceLineText.y - 10,
      },
      duration: 500,
      onComplete: () => {
        cb()
      },
    })
  }
}
