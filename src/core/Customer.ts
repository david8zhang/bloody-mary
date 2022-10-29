import Game from '~/scenes/Game'

export interface CustomerConfig {
  position: {
    x: number
    y: number
  }
}

export class Customer {
  private game: Game
  private sprite: Phaser.GameObjects.Sprite

  constructor(game: Game, config: CustomerConfig) {
    this.game = game
    const { position } = config
    this.sprite = this.game.add.sprite(position.x, position.y, 'sample-vampire').setScale(1)
  }
}
