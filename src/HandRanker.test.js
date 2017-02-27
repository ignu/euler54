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

    const rank = ranker.royalFlush(hand)

    expect(rank).toBeFalsy()
  });
})

//describe("flushRanker")

describe("royalFlushRanker", () => {
  xit("returns rank when there's a royal flush", () => {
    const line = '8C TS KC 9H 4S'
    const hand = parser.parseLine(line)[0]

    const rank = ranker.royalFlush(hand)

    expect(rank).toBeTruthy()
  })

  it("is falsey when not a royal flush", () => {
    const line = '8C TS KC 9H 4S'
    const hand = parser.parseLine(line)[0]

    const rank = ranker.royalFlush(hand)

    expect(rank).toBeFalsy()
  })
})
