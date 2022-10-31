import { GameConstants } from '~/config/GameConstants'

export class GameOver extends Phaser.Scene {
  constructor() {
    super('game-over')
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0)
    const gameOverText = this.add
      .text(GameConstants.WINDOW_WIDTH / 2, GameConstants.WINDOW_HEIGHT / 2 - 50, 'Game Over')
      .setStyle({
        fontSize: '50px',
        color: 'white',
      })
      .setFontFamily('Alagard')
    gameOverText.setPosition(
      GameConstants.WINDOW_WIDTH / 2 - gameOverText.displayWidth / 2,
      GameConstants.WINDOW_HEIGHT / 2 - 50
    )
    const subtitleText = this.add
      .text(
        GameConstants.WINDOW_WIDTH / 2,
        gameOverText.y + gameOverText.displayHeight + 5,
        'You were fired'
      )
      .setStyle({
        fontSize: '30px',
        color: 'white',
      })
      .setFontFamily('Alagard')
    subtitleText.setPosition(
      GameConstants.WINDOW_WIDTH / 2 - subtitleText.displayWidth / 2,
      gameOverText.y + gameOverText.displayHeight + 5
    )
  }
}
