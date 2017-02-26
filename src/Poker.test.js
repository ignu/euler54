import poker from './Poker'
import parser from './Parser'

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
  const hand = parser.parseLine(line)[0]

  expect(poker.handValue(hand, checkers)).toEqual(1)
})
