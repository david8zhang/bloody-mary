import { BloodTypes, BLOOD_TYPE_TO_COLOR } from '~/config/BloodTypes'
import {
  COCKTAIL_GRADE,
  LevelTypes,
  LEVEL_TO_PERCENTAGE_MAPPING,
  PrefTypes,
} from '~/config/PrefConstants'
import Game from '~/scenes/Game'

export interface CustomerConfig {
  position: {
    x: number
    y: number
  }
  affinityType: BloodTypes
  allergyType: BloodTypes
}

export class Customer {
  private game: Game
  private sprite!: Phaser.GameObjects.Sprite
  private affinityType: BloodTypes
  private allergyType: BloodTypes
  private preferenceMap: any = {}

  constructor(game: Game, config: CustomerConfig) {
    this.game = game
    const { position, affinityType, allergyType } = config
    this.affinityType = affinityType
    this.allergyType = allergyType

    console.log(this.affinityType, this.allergyType)

    this.createSprite(position)
    this.generatePreferences()
  }

  createSprite(position: { x: number; y: number }) {
    const outfitColor = BLOOD_TYPE_TO_COLOR[this.affinityType]
    const eyeColor = BLOOD_TYPE_TO_COLOR[this.allergyType]

    this.sprite = this.game.add
      .sprite(position.x, position.y, 'sample-vampire')
      .setScale(1)
      .setTint(outfitColor)
    this.game.add.circle(
      position.x - 10,
      position.y - this.sprite.displayHeight / 2 + 90,
      8,
      eyeColor
    )
    this.game.add.circle(
      position.x + 35,
      position.y - this.sprite.displayHeight / 2 + 91,
      8,
      eyeColor
    )
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
    let isDead: boolean = false
    Object.keys(prefToRawPercentageMap).forEach((key: string) => {
      const prefType = key as PrefTypes
      const expectedPct = prefToRawPercentageMap[prefType]
      const actualPct = actualToRawPercentageMap[prefType] ? actualToRawPercentageMap[prefType] : 0
      inaccuracyPct += Math.abs(actualPct - expectedPct)
      if (prefType === PrefTypes.ALLERGY) {
        if (actualPct > expectedPct) {
          isDead = true
        }
      }
    })
    return this.getGradeForThresholdDiff(1 - inaccuracyPct, isDead)
  }

  getGradeForThresholdDiff(accuracyPct: number, isDead: boolean) {
    if (isDead) {
      return COCKTAIL_GRADE.DEAD
    }
    if (accuracyPct >= 0 && accuracyPct < 0.6) {
      return COCKTAIL_GRADE.F
    }
    if (accuracyPct >= 0.6 && accuracyPct < 0.7) {
      return COCKTAIL_GRADE.D
    }
    if (accuracyPct >= 0.7 && accuracyPct < 0.8) {
      return COCKTAIL_GRADE.C
    }
    if (accuracyPct >= 0.8 && accuracyPct < 0.9) {
      return COCKTAIL_GRADE.B
    }
    if (accuracyPct > 0.9) {
      return COCKTAIL_GRADE.A
    }
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
}
