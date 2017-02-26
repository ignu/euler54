import ranker from './HandRanker'
import parser from './Parser'

it('can find a high card', () => {
  const line = '8C TS KC 9H 4S'
  const hand = parser.parseLine(line)[0]

  const rank = ranker.highCard(hand).value[0]

  expect(rank.order).toEqual(13)
})
