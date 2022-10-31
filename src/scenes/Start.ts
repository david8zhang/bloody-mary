import { GameConstants } from '~/config/GameConstants'
import { Button } from '~/ui/Button'

export class Start extends Phaser.Scene {
  private assetMappings: any = {}
  constructor() {
    super('start')
  }

  init(data: { assetMappings: any }) {
    this.assetMappings = data.assetMappings
  }

  create() {
    const text = this.add
      .text(GameConstants.WINDOW_WIDTH / 2, GameConstants.WINDOW_HEIGHT / 2 - 50, 'Bloody Mary')
      .setFontFamily('Alagard')
      .setFontSize(150)
      .setDepth(1000)
      .setColor('#dc143c')
    text.setPosition(GameConstants.WINDOW_WIDTH / 2 - text.displayWidth / 2)

    const subtitleText = this.add
      .text(text.x, text.y + text.displayHeight + 25, 'Press any key to start')
      .setFontFamily('Alagard')
      .setColor('#dc143c')
      .setFontSize(30)
    subtitleText.setPosition(
      GameConstants.WINDOW_WIDTH / 2 - subtitleText.displayWidth / 2,
      subtitleText.y
    )
    this.tweens.add({
      targets: [subtitleText],
      alpha: {
        from: 1,
        to: 0,
      },
      yoyo: true,
      repeat: -1,
      duration: 1000,
    })
    this.createMarySprite()
    this.input.keyboard.on('keydown', () => {
      this.scene.start('game', { assetMappings: this.assetMappings })
    })
  }

  createMarySprite() {
    this.add
      .sprite(GameConstants.WINDOW_WIDTH / 2, GameConstants.WINDOW_HEIGHT * 0.75, 'female-face')
      .setDepth(1000)
    this.add
      .sprite(
        GameConstants.WINDOW_WIDTH / 2,
        GameConstants.WINDOW_HEIGHT * 0.75,
        'female-eyes2-mammal'
      )
      .setDepth(1000)
    this.add
      .sprite(GameConstants.WINDOW_WIDTH / 2, GameConstants.WINDOW_HEIGHT * 0.75, 'bartender')
      .setDepth(1000)
    this.add
      .sprite(GameConstants.WINDOW_WIDTH / 2, GameConstants.WINDOW_HEIGHT * 0.75, 'female-hair-2')
      .setDepth(1000)
  }
}
