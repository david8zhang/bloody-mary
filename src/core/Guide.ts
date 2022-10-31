import { GameConstants } from '~/config/GameConstants'
import Game from '~/scenes/Game'
import { Button } from '~/ui/Button'

const GUIDE_PAGES = [
  {
    title: 'Guide to Vampire Bartending',
    lines: [
      '1. General tips',
      '2. How to pour orders',
      '3. Determining Allergies',
      '4. Determining Taste',
    ],
  },
  {
    title: '1. General tips',
    lines: [
      '- Speed is of the essence!',
      "- Don't overpour dangerous allergens!",
      '- Your reputation is everything!',
    ],
  },
  {
    title: '2. How to pour orders',
    lines: [
      'Pay attention to certain words! (not a comprehensive list)',
      'Quarter Glass: slightly, lightly, a bit, vaguely, a shade',
      'Half Glass: fairly, moderately, kind of, pretty, more or less',
      'Three Quarters Glass: heavily, intensely, mostly, seriously, very',
    ],
  },
  {
    title: '3. Determining Allergens',
    lines: [
      'Allergens match up with the eye color of the customer!',
      "Sometimes the customer might ask for blood they're allergic to. Again, pay attention to words!",
      'Examples: dangerous, spicy, adventurous, daring, risky, strong...',
      'BE CAREFUL! Too much of an allergen can kill the customer!',
    ],
  },
  {
    title: '4. Determining taste',
    lines: [
      'Tastes match up with the outfit of the customer!',
      'Customer might ask for something "delicious", "flavorful", or "pleasant"',
      'If they want something "normal" or "classic", serve up the standard human blood! It never fails to please the old-fashioned types...',
    ],
  },
]

export class Guide {
  private game: Game
  public currPageIndex: number = 0
  public page: Phaser.GameObjects.Rectangle
  public titleText!: Phaser.GameObjects.Text
  public contents!: Phaser.GameObjects.Text

  public exitButton: Button
  public prevPageButton: Button
  public nextPageButton: Button

  constructor(game: Game, isVisible: boolean) {
    this.game = game
    this.page = this.game.add
      .rectangle(
        GameConstants.WINDOW_WIDTH / 2,
        GameConstants.WINDOW_HEIGHT / 2,
        GameConstants.WINDOW_WIDTH,
        GameConstants.WINDOW_HEIGHT,
        0xebd5b3
      )
      .setDepth(GameConstants.SORT_ORDER.guide)
      .setVisible(isVisible)
    this.titleText = this.game.add
      .text(GameConstants.WINDOW_WIDTH / 2, 50, '')
      .setDepth(GameConstants.SORT_ORDER.guide)
      .setVisible(isVisible)
    this.contents = this.game.add
      .text(GameConstants.WINDOW_WIDTH / 2, 100, '')
      .setDepth(GameConstants.SORT_ORDER.guide)
      .setWordWrapWidth(GameConstants.WINDOW_WIDTH - 100)
      .setPadding(15)
      .setVisible(isVisible)
    this.renderPage()

    this.exitButton = new Button(this.game, {
      position: {
        x: 50,
        y: 30,
      },
      width: 80,
      height: 40,
      text: 'Exit',
      fontSize: 20,
      depth: GameConstants.SORT_ORDER.guide,
      bgColor: 0xebd5b3,
      textColor: 0x000000,
      onPress: () => {
        this.game.isShowingGuide = false
        this.hide()
      },
    })

    this.prevPageButton = new Button(this.game, {
      position: {
        x: 50,
        y: GameConstants.WINDOW_HEIGHT - 30,
      },
      width: 80,
      height: 40,
      text: 'Prev',
      fontSize: 20,
      depth: GameConstants.SORT_ORDER.guide,
      bgColor: 0xebd5b3,
      textColor: 0x000000,
      onPress: () => {
        this.currPageIndex--
        this.currPageIndex = Math.max(this.currPageIndex, 0)
        this.renderPage()
      },
    })

    this.nextPageButton = new Button(this.game, {
      position: {
        x: GameConstants.WINDOW_WIDTH - 50,
        y: GameConstants.WINDOW_HEIGHT - 30,
      },
      width: 80,
      height: 40,
      text: 'Next',
      fontSize: 20,
      depth: GameConstants.SORT_ORDER.guide,
      bgColor: 0xebd5b3,
      textColor: 0x000000,
      onPress: () => {
        this.currPageIndex++
        this.currPageIndex = Math.min(this.currPageIndex, GUIDE_PAGES.length - 1)
        this.renderPage()
      },
    })

    this.exitButton.setVisible(isVisible)
    this.nextPageButton.setVisible(isVisible)
    this.prevPageButton.setVisible(isVisible)
  }

  renderPage() {
    const page = GUIDE_PAGES[this.currPageIndex]
    this.titleText.setText(page.title).setStyle({
      fontSize: '40px',
      color: 'black',
    })
    this.titleText.setPosition(GameConstants.WINDOW_WIDTH / 2 - this.titleText.displayWidth / 2, 75)

    const contents = page.lines.join('\n\n')
    this.contents.setText(contents).setStyle({
      fontSize: '25px',
      color: 'black',
    })

    this.contents.setPosition(
      GameConstants.WINDOW_WIDTH / 2 - this.contents.displayWidth / 2,
      50 + this.titleText.displayHeight + 50
    )
  }

  hide() {
    this.page.setVisible(false)
    this.titleText.setVisible(false)
    this.contents.setVisible(false)
    this.exitButton.setVisible(false)
    this.nextPageButton.setVisible(false)
    this.prevPageButton.setVisible(false)
  }

  show() {
    this.page.setVisible(true)
    this.titleText.setVisible(true)
    this.contents.setVisible(true)
    this.exitButton.setVisible(true)
    this.nextPageButton.setVisible(true)
    this.prevPageButton.setVisible(true)
  }
}
