import { BloodTypes, BLOOD_TYPE_TO_COLOR, COCKTAIL_COLOR } from '~/config/BloodTypes'
import { GameConstants } from '~/config/GameConstants'
import Game from '~/scenes/Game'
import { Blood } from './Blood'

export interface GobletConfig {
  position: {
    x: number
    y: number
  }
}

export class Goblet {
  private game: Game

  // TODO: Replace with actual sprite of a goblet
  public sprite!: Phaser.GameObjects.Rectangle
  public defaultPosition: { x: number; y: number }

  // Blood portions after pouring
  private bloodPortions: Phaser.GameObjects.Rectangle[] = []
  private currBloodPortionIndex: number = 0
  private maxBloodPortions: number = 8
  private recipe: BloodTypes[] = []

  // Only allow serving after the drink has been mixed
  public isMixed: boolean = false

  constructor(game: Game, gobletConfig: GobletConfig) {
    this.game = game
    this.defaultPosition = gobletConfig.position
    this.createSprite(gobletConfig.position)
    this.createBloodPortions()
  }

  createSprite(pos: { x: number; y: number }) {
    this.sprite = this.game.add.rectangle(pos.x, pos.y, 90, 192)
    this.sprite.setStrokeStyle(6, 0xffffff)
    this.sprite.setFillStyle(0x000, 0.4)
    this.sprite.setInteractive()
    this.sprite.setDepth(GameConstants.SORT_ORDER.goblet)
    this.sprite.on('pointerdown', () => {
      this.game.pourBlood()
    })
  }

  createBloodPortions() {
    const height = (this.sprite.displayHeight - 3) / this.maxBloodPortions
    const width = this.sprite.displayWidth - 6
    let yPos = this.sprite.y + this.sprite.displayHeight / 2 - height / 2 - 1
    const xPos = this.sprite.x
    for (let i = 0; i < this.maxBloodPortions; i++) {
      const portion = this.game.add
        .rectangle(xPos, yPos, width, height)
        .setVisible(false)
        .setDepth(GameConstants.SORT_ORDER.goblet + 5)
      yPos -= height
      this.bloodPortions.push(portion)
    }
  }

  pour(blood: Blood) {
    if (this.currBloodPortionIndex < this.maxBloodPortions) {
      const bloodPortion = this.bloodPortions[this.currBloodPortionIndex]
      bloodPortion.setVisible(true)
      bloodPortion.setFillStyle(BLOOD_TYPE_TO_COLOR[blood.bloodType])
      this.recipe.push(blood.bloodType)
      this.currBloodPortionIndex++
    }
  }

  mix() {
    if (this.recipe.length === this.maxBloodPortions) {
      this.isMixed = true
      this.bloodPortions.forEach((portion) => {
        portion.setFillStyle(COCKTAIL_COLOR)
      })
    }
  }

  serve() {
    if (this.isMixed) {
      this.game.tweens.add({
        targets: [this.sprite, ...this.bloodPortions],
        x: {
          from: this.sprite.x,
          to: GameConstants.WINDOW_WIDTH / 2,
        },
        duration: 1000,
        onComplete: () => {
          this.game.tweens.add({
            delay: 1000,
            targets: [this.sprite, ...this.bloodPortions],
            alpha: {
              from: 1,
              to: 0,
            },
            duration: 1000,
            onComplete: () => {
              this.game.evaluateDrink(this.recipe, () => {
                this.clearGlassAndReset()
              })
            },
          })
        },
      })
    }
  }

  clearGlassAndReset() {
    this.currBloodPortionIndex = 0
    this.recipe = []
    this.sprite.setPosition(-100, this.defaultPosition.y).setVisible(false).setAlpha(1)
    this.bloodPortions.forEach((portion) => {
      portion.setVisible(false)
      portion.setAlpha(1)
      portion.setX(-100)
    })
    this.game.tweens.add({
      targets: [this.sprite, ...this.bloodPortions],
      x: {
        from: -100,
        to: this.defaultPosition.x,
      },
      duration: 1000,
      onStart: () => {
        this.sprite.setVisible(true)
      },
    })
  }
}
