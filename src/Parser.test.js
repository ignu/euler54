import parser from './Parser'

it('can parse a line', () => {
  const line = '8C TS KC 9H 4S 7D 2S 5D 3S AC'
  const hands = parser.parseLine(line)

  expect(hands.length).toEqual(2)
  expect(hands[0].length).toEqual(5)
  expect(hands[0][0].order).toEqual(8)
})

it('getCard creates card data', () => {
  const cardString = '8C'
  const card = parser.getCard(cardString)
  expect(card.value).toEqual('8')
  expect(card.order).toEqual(8)
  expect(card.suit).toEqual('C')
})

it('getCard creates card data with face cards', () => {
  const cardString = 'KC'
  const card = parser.getCard(cardString)
  expect(card.value).toEqual('K')
  expect(card.order).toEqual(13)
  expect(card.suit).toEqual('C')
})
