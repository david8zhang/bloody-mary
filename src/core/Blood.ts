import { BloodTypes } from '~/config/BloodTypes'
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
  public sprite: Phaser.GameObjects.Sprite
  public bloodType: BloodTypes

  constructor(game: Game, config: BloodConfig) {
    this.game = game
    this.bloodType = config.bloodType
    this.sprite = this.createSprite(config)
  }

  createSprite(config: BloodConfig) {
    const { position } = config
    const sprite = this.game.add.sprite(position.x, position.y, config.bloodType.toLowerCase())
    sprite.setInteractive()
    sprite.on('pointerdown', () => {
      if (!this.game.isShowingGuide) {
        this.selectBlood()
      }
    })
    sprite.setDepth(GameConstants.SORT_ORDER.mix)
    return sprite
  }

  selectBlood() {
    this.sprite.setScale(1.5)
    this.game.selectBlood(this)
  }

  deselect() {
    this.sprite.setScale(1)
  }
}
