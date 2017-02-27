import R from 'ramda'
import parser from './Parser'
import ranker from './HandRanker'

const handCheckers = R.reverse(R.map(r => ranker[r])(ranker.handRanks))

const handValue = (hand, checkers = handCheckers) => {
  let value
  let index = 0

  while(!value) {
    if(typeof checkers[index] !== 'function') {
      console.log('checkers[index], index', checkers[index], index)
    }
    value = checkers[index](hand)
    index = index + 1
  }

  return value
}

const winner = (rank1, rank2) => {
  if(rank1.rankOrder !== rank2.rankOrder) {
    return rank1.rankOrder > rank2.rankOrder ? rank1 : rank2
  }

  return rank1.order > rank2.order ? rank1 : rank2
}

const getWinCount = () => {
  let count = 0

  const hands = parser.getHands()

  R.forEach((hands) => {
    const first = handValue(hands[0])
    const second = handValue(hands[1])

    if(winner(first, second) == first) count++

  })(hands)

  return count
}

export default {
  handValue,
  getWinCount,
  winner
}
