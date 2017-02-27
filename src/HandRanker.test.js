import ranker from './HandRanker'
import parser from './Parser'

describe("high card", () => {
  it('can find a high card', () => {
    const line = '8C TS KC 9H 4S'
    const hand = parser.parseLine(line)[0]

    const rank = ranker.highCard(hand)

    expect(rank.rankOrder).toEqual(13)
  })
})

describe('flushRanker', () => {

  it("returns rank when a flush", () => {
    const line = '2C 9C 3C 5C 6C'

    const hand = parser.parseLine(line)[0]

    const rank = ranker.flush(hand)

    expect(rank).toBeTruthy()
    expect(rank.rankOrder).toEqual(509)
  });


  it("is falsey when not a flush", () => {
    const line = '8C TS KC 9H 4S'
    const hand = parser.parseLine(line)[0]

    const rank = ranker.flush(hand)

    expect(rank).toBeFalsy()
  })
})

describe("straightRanker", () => {
  it("returns rank when a straight", () => {
    const line = '4C 2S 3C 5H 6S'

    const hand = parser.parseLine(line)[0]

    const rank = ranker.straight(hand)

    expect(rank).toBeTruthy()
    expect(rank.rankOrder).toEqual(406)
  });


  it("returns falsy when not a straight", () => {
    const line = '8C 8S 7C 6H 5S'
    const hand = parser.parseLine(line)[0]

    const rank = ranker.straightFlush(hand)

    expect(rank).toBeFalsy()
  });
})

describe("straightFlushRanker", () => {
  it("returns rank when there's a royal flush", () => {
    const line = '7C TC 9C 8C 6C'
    const hand = parser.parseLine(line)[0]

    const rank = ranker.straightFlush(hand)

    expect(rank).toBeTruthy()
    expect(rank.rankOrder).toEqual(810)
    expect(rank.type).toEqual('straightFlush')
  })

  it('changes type for a royal flush', () => {
    const line = 'AS KS QS JS TS'
    const hand = parser.parseLine(line)[0]

    const rank = ranker.straightFlush(hand)

    expect(rank.type).toEqual('royalFlush')
  })


  it("is falsey when not a straight flush", () => {
    const line = '7C TC 9C 8C 3C'
    const hand = parser.parseLine(line)[0]

    const rank = ranker.straightFlush(hand)

    expect(rank).toBeFalsy()
  })
})
