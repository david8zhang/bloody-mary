import Phaser from 'phaser'
import { BloodTypes } from '~/config/BloodTypes'
import { GameConstants } from '~/config/GameConstants'
import { Goblet } from '~/core/Goblet'
import { Blood } from '~/core/Blood'
import { Button } from '~/ui/Button'
import { Customer } from '~/core/Customer'

export default class Game extends Phaser.Scene {
  private goblet!: Goblet

  // Bar
  private barTop!: Phaser.GameObjects.Rectangle
  private barBottom!: Phaser.GameObjects.Rectangle

  // Blood Types to choose from
  private bloods: Blood[] = []
  public selectedBlood: Blood | null = null

  constructor() {
    super('game')
  }

  initGameScale() {
    this.game.scale.setZoom(GameConstants.GAME_ZOOM_FACTOR)
  }

  createBar() {
    const height = GameConstants.WINDOW_HEIGHT * 0.4
    const width = GameConstants.WINDOW_WIDTH

    const yPos = GameConstants.WINDOW_HEIGHT * 0.5 + 210
    const xPos = GameConstants.WINDOW_WIDTH * 0.5
    this.barTop = this.add
      .rectangle(xPos, yPos, width, height, 0x964b00)
      .setDepth(GameConstants.SORT_ORDER.bar)
    this.barBottom = this.add
      .rectangle(xPos, this.barTop.y + this.barTop.displayHeight, width, height, 0x7b3f00)
      .setDepth(GameConstants.SORT_ORDER.bar)
  }

  createGoblet() {
    this.goblet = new Goblet(this, {
      position: {
        x: 165,
        y: GameConstants.WINDOW_HEIGHT / 2 + 60,
      },
    })
  }

  createBloods() {
    const bloodTypes = Object.keys(BloodTypes).filter((item) => {
      return isNaN(Number(item))
    })
    let xPos = 60
    const yPos = this.barTop.y + 60
    let padding = 5
    bloodTypes.forEach((bloodType: string) => {
      const blood = new Blood(this, {
        position: {
          x: xPos,
          y: yPos,
        },
        bloodType: bloodType as BloodTypes,
      })
      xPos += 75
    })
  }

  create() {
    this.initGameScale()
    this.initButtons()
    this.createBar()
    this.createGoblet()
    this.createBloods()
    this.createCustomer()
  }

  createCustomer() {
    const customer = new Customer(this, {
      position: {
        x: GameConstants.WINDOW_WIDTH / 2,
        y: GameConstants.WINDOW_HEIGHT / 2 + 80,
      },
    })
  }

  selectBlood(blood: Blood) {
    if (this.selectedBlood != null) {
      this.selectedBlood.deselect()
    }
    this.selectedBlood = blood
  }

  pourBlood() {
    if (this.selectedBlood) this.goblet.pour(this.selectedBlood)
  }

  initButtons() {
    const mixButton = new Button(this, {
      width: 240,
      height: 60,
      text: 'Mix',
      position: {
        x: 165,
        y: 60,
      },
      onPress: () => {
        this.goblet.mix()
      },
    })
    const serveButton = new Button(this, {
      width: 240,
      height: 60,
      text: 'Serve',
      position: {
        x: 165,
        y: 135,
      },
      onPress: () => {},
    })
  }
}
