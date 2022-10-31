import { GameConstants } from '~/config/GameConstants'
import { MENTOR_LINES } from '~/config/MentorConstants'
import Game from '~/scenes/Game'

export class Mentor {
  private game: Game
  private sprites: Phaser.GameObjects.Sprite[] = []
  private dialogText: Phaser.GameObjects.Text
  private dialogIndex: number = 0
  public tween!: Phaser.Tweens.Tween | null

  constructor(game: Game) {
    this.game = game
    this.dialogText = this.game.add
      .text(0, 0, '')
      .setVisible(false)
      .setFontFamily('Alagard')
      .setFontSize(25)
    this.createSprites()
    this.renderDialog()
    this.addClickListener()
  }

  addClickListener() {
    this.game.input.on('pointerdown', () => {
      this.dialogIndex++
      this.renderDialog()
      this.playEffects()
    })
  }

  playEffects() {
    if (this.dialogIndex === 4) {
      this.tween = this.game.tweens.add({
        targets: [this.game.bloods[3].sprite],
        repeat: 3,
        alpha: {
          from: 1,
          to: 0,
        },
        onStop: () => {
          this.game.bloods[3].sprite.setAlpha(1)
        },
        yoyo: true,
        duration: 500,
      })
    } else if (this.dialogIndex === 6) {
      this.tween = this.game.tweens.add({
        targets: [this.sprites[3], this.game.bloods[2].sprite],
        repeat: 3,
        alpha: {
          from: 1,
          to: 0.5,
        },
        onStop: () => {
          this.sprites[3].setAlpha(1)
          this.game.bloods[2].sprite.setAlpha(1)
        },
        yoyo: true,
        duration: 500,
      })
    } else if (this.dialogIndex === 11) {
      this.tween = this.game.tweens.add({
        targets: [this.game.bloods[0].sprite],
        repeat: 3,
        alpha: {
          from: 1,
          to: 0,
        },
        onStop: () => {
          this.game.bloods[0].sprite.setAlpha(1)
        },
        yoyo: true,
        duration: 500,
      })
    } else if (this.dialogIndex === 19) {
      this.tween = this.game.tweens.add({
        targets: [this.game.guideOnTable],
        repeat: 3,
        alpha: {
          from: 1,
          to: 0.5,
        },
        onStop: () => {
          this.game.guideOnTable.setAlpha(1)
        },
        yoyo: true,
        duration: 500,
      })
    } else if (this.dialogIndex === 23) {
      this.tween = this.game.tweens.add({
        targets: [this.game.timerText],
        repeat: 3,
        alpha: {
          from: 1,
          to: 0,
        },
        onStop: () => {
          this.game.timerText.setAlpha(1)
        },
        yoyo: true,
        duration: 500,
      })
    } else if (this.dialogIndex === 25) {
      this.tween = this.game.tweens.add({
        targets: [this.game.reputationText],
        repeat: 3,
        alpha: {
          from: 1,
          to: 0,
        },
        onStop: () => {
          this.game.reputationText.setAlpha(1)
        },
        yoyo: true,
        duration: 500,
      })
    } else {
      if (this.tween) {
        this.tween.stop()
        this.tween = null
      }
    }
  }

  createSprites() {
    const faceSprite = this.game.add.sprite(
      GameConstants.WINDOW_WIDTH / 2,
      GameConstants.WINDOW_HEIGHT / 2 - 60,
      'female-face'
    )
    const eyesSprite = this.game.add.sprite(
      GameConstants.WINDOW_WIDTH / 2,
      GameConstants.WINDOW_HEIGHT / 2 - 60,
      'female-eyes3-reptile'
    )
    const outfitSprite = this.game.add.sprite(
      GameConstants.WINDOW_WIDTH / 2,
      GameConstants.WINDOW_HEIGHT / 2 - 60,
      'bartender-fish'
    )
    const hairSprite = this.game.add.sprite(
      GameConstants.WINDOW_WIDTH / 2,
      GameConstants.WINDOW_HEIGHT / 2 - 60,
      'female-hair-1'
    )
    this.sprites.push(faceSprite)
    this.sprites.push(eyesSprite)
    this.sprites.push(hairSprite)
    this.sprites.push(outfitSprite)
  }

  public get sprite() {
    return this.sprites[0]
  }

  renderDialog() {
    const dialogToShow = MENTOR_LINES[this.dialogIndex]
    this.dialogText.setText(dialogToShow).setVisible(true)
    this.dialogText
      .setPosition(this.sprite.x + 150, this.sprite.y - 200)
      .setWordWrapWidth(GameConstants.WINDOW_WIDTH - this.dialogText.x - 20)
  }
}
