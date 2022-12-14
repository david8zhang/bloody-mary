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
      'Speed is of the essence! As you become more reputable, customers will have higher expectations!',
      "Don't overpour poisonous allergens!",
      'Your reputation is everything!',
    ],
  },
  {
    title: '2. How to pour orders',
    lines: [
      "The customer's order will determine how much to pour",
      'Each pour(click) is 1/4 of a glass.',
      'You must fill the glass and mix it first in order to serve!',
    ],
  },
  {
    title: '3. Determining Allergens',
    lines: [
      "The customer's eye color will indicate which blood type is poisonous to them.",
      "Sometimes the customer might ask for blood that's poisonous. Pay attention to words like: 'dangerous', 'adventurous', 'edgy', or 'poisonous'",
      "Pro tip: Nobody's allergic to human blood!",
      'BE CAREFUL! Too much of an allergen can kill the customer!',
    ],
  },
  {
    title: '4. Determining taste',
    lines: [
      'Customers indicate their favorite blood type with their outfit color!',
      "Pour them their favorite if they ask for something 'delicious', 'enjoyable', 'tasty', or 'appetizing'",
      'If they want something "normal", "classic", "basic", or "standard" serve them human blood! (Fourth bottle from the left) It never fails to please the old-fashioned types.',
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
        this.game.handleCloseGuide()
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
      fontFamily: 'Alagard',
    })
    this.titleText.setPosition(GameConstants.WINDOW_WIDTH / 2 - this.titleText.displayWidth / 2, 75)

    const contents = page.lines.join('\n\n')
    this.contents.setText(contents).setStyle({
      fontSize: '25px',
      fontFamily: 'Alagard',
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
