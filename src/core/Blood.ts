import { BloodTypes, BLOOD_TYPE_TO_COLOR } from '~/config/BloodTypes'
import { GameConstants } from '~/config/GameConstants'
import Game from '~/scenes/Game'

export interface BloodConfig {
  bloodType: BloodTypes
  position: {
    x: number
    y: number
  }
}

export class Blood {
  private game: Game
  public sprite: Phaser.GameObjects.Rectangle
  public bloodType: BloodTypes

  constructor(game: Game, config: BloodConfig) {
    this.game = game
    this.bloodType = config.bloodType
    this.sprite = this.createSprite(config)
  }

  createSprite(config: BloodConfig) {
    const { position } = config
    const mixBottleWidth = 60
    const mixBottleHeight = 120
    const sprite = this.game.add.rectangle(position.x, position.y, mixBottleWidth, mixBottleHeight)
    sprite.setFillStyle(BLOOD_TYPE_TO_COLOR[config.bloodType], 0.75)
    sprite.setStrokeStyle(2, 0xffffff)
    sprite.setInteractive()
    sprite.on('pointerdown', () => {
      this.selectBlood()
    })
    sprite.setDepth(GameConstants.SORT_ORDER.mix)
    return sprite
  }

  selectBlood() {
    this.sprite.setStrokeStyle(4, 0xffff00)
    this.game.selectBlood(this)
  }

  deselect() {
    this.sprite.setStrokeStyle(2, 0xffffff)
  }
}
