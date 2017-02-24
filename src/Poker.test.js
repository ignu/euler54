import poker from './Poker'

it('can parse a line', () => {
  const line = '8C TS KC 9H 4S 7D 2S 5D 3S AC'
  const hands = poker.parseLine(line)

  expect(hands.length).toEqual(2)
  expect(hands[0].length).toEqual(5)
  expect(hands[0][0].order).toEqual(8)
})

it('can find a card value', () => {
  const cardString = '8C'
  const card = poker.getCard(cardString)
  expect(card.value).toEqual('8')
  expect(card.order).toEqual(8)
  expect(card.suit).toEqual('C')
})

it('can find a card value for face cards', () => {
  const cardString = 'KC'
  const card = poker.getCard(cardString)
  expect(card.value).toEqual('K')
  expect(card.order).toEqual(13)
  expect(card.suit).toEqual('C')
})

it('can find a high card', () => {
  const line = '8C TS KC 9H 4S'
  const hand = poker.parseLine(line)[0]

  const rank = poker.highCard(hand).value[0]

  expect(rank.order).toEqual(13)
})

it('can can compare hands of high cards', () => {
  const hand1 = {
    type: 'highCard',
    value: [{order: 2}]
  }

  const hand2 = {
    type: 'highCard',
    value: [{order: 3}]
  }

  expect(poker.winner(hand1, hand2)).toEqual(hand2)
})

it('can can compare royal flush to high card', () => {
  const hand1 = {
    type: 'royalFlush',
    rankOrder: 2
  }

  const hand2 = {
    type: 'highCard',
    rankOrder: 1
  }

  expect(poker.winner(hand1, hand2)).toEqual(hand1)
})

it('handValue returns the first truthy value', () => {
  const checkers = [
    { check: () => undefined},
    { check: () => 1 },
    { check: () => 2 }]

  const line = '8C TS KC 9H 4S'
  const hand = poker.parseLine(line)[0]

  expect(poker.handValue(hand, checkers)).toEqual(1)
})
