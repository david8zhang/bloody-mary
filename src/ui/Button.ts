import { GameConstants } from '~/config/GameConstants'

export interface ButtonConfig {
  width: number
  height: number
  onPress: Function
  text: string
  position: {
    x: number
    y: number
  }
  fontSize: number
  depth?: number
  bgColor?: number
  textColor?: number
}

export class Button {
  public buttonRect: Phaser.GameObjects.Rectangle
  public buttonText: Phaser.GameObjects.Text

  constructor(scene: Phaser.Scene, buttonConfig: ButtonConfig) {
    this.buttonRect = scene.add
      .rectangle(
        0,
        0,
        buttonConfig.width,
        buttonConfig.height,
        buttonConfig.bgColor ? buttonConfig.bgColor : 0x000000
      )
      .setStrokeStyle(2, buttonConfig.textColor != undefined ? buttonConfig.textColor : 0xffffff)
      .setDepth(GameConstants.SORT_ORDER.ui)
    this.buttonRect
      .setPosition(buttonConfig.position.x, buttonConfig.position.y)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        document.getElementsByTagName('body')[0]?.setAttribute('style', 'cursor:pointer;')
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        document.getElementsByTagName('body')[0]?.setAttribute('style', 'cursor:default;')
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        buttonConfig.onPress()
      })
      .setDepth(buttonConfig.depth ? buttonConfig.depth : GameConstants.SORT_ORDER.ui)

    this.buttonText = scene.add
      .text(this.buttonRect.x, this.buttonRect.y, buttonConfig.text, {
        fontSize: `${buttonConfig.fontSize}px`,
      })
      .setDepth(buttonConfig.depth ? buttonConfig.depth : GameConstants.SORT_ORDER.ui)
    this.buttonText
      .setPosition(
        this.buttonRect.x - this.buttonText.displayWidth / 2,
        this.buttonRect.y - this.buttonText.displayHeight / 2
      )
      .setDepth(buttonConfig.depth ? buttonConfig.depth : GameConstants.SORT_ORDER.ui)
      .setColor(
        buttonConfig.textColor != undefined ? buttonConfig.textColor.toString(16) : '#ffffff'
      )
  }

  setVisible(isVisible: boolean) {
    this.buttonText.setVisible(isVisible)
    this.buttonRect.setVisible(isVisible)
  }
}
