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
  public sprite: Phaser.GameObjects.Rectangle

  // Blood portions after pouring
  private bloodPortions: Phaser.GameObjects.Rectangle[] = []
  private currBloodPortionIndex: number = 0
  private maxBloodPortions: number = 8
  private recipe: BloodTypes[] = []

  constructor(game: Game, gobletConfig: GobletConfig) {
    this.game = game
    this.sprite = this.createSprite(gobletConfig.position)
    this.createBloodPortions()
  }

  createSprite(pos: { x: number; y: number }) {
    const sprite = this.game.add.rectangle(pos.x, pos.y, 90, 192)
    this.game.add
      .rectangle(sprite.x, sprite.y - sprite.displayHeight / 2, sprite.displayWidth * 2, 30)
      .setFillStyle(0x000, 1)
      .setDepth(GameConstants.SORT_ORDER.goblet + 1000)
    sprite.setStrokeStyle(6, 0xffffff)
    sprite.setFillStyle(0x000, 0.4)
    sprite.setInteractive()
    sprite.setDepth(GameConstants.SORT_ORDER.goblet)
    sprite.on('pointerdown', () => {
      this.game.pourBlood()
    })
    return sprite
  }

  createBloodPortions() {
    const height = (this.sprite.displayHeight - 12) / this.maxBloodPortions
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
      this.bloodPortions.forEach((portion) => {
        portion.setFillStyle(COCKTAIL_COLOR)
      })
    }
  }
}
