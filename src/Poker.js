import R from 'ramda'

const HAND_SIZE = 5

const orders = {
  'T' : 10,
  'J' : 11,
  'Q' : 12,
  'K' : 13,
  'A' : 14
}


const getCard = (card) => {
  const value = card[0]

  return {
    value,
    order: orders[value] || parseInt(card[0]),
    suit: card[1]
  }
}

const parseLine = R.compose(
  R.splitAt(HAND_SIZE),
  R.map(getCard),
  R.split(' ')
)

const royalFlushRanker = {
  rankOrder: 10,
  check: () => null
}

const handRanks = ['highCard', 'royalFlush']

const highCardRanker = {
  rankOrder: 1,

  check: (hand) => {
    let maxCard = {order: 0}

    const updateLargest = (card) => {
      if(card.order > maxCard.order) maxCard = card
    }

    R.forEach(updateLargest)(hand)

    return {
      type: 'highCard',
      rankOrder: handRanks.indexOf('highCard'),
      value: [maxCard]
    }
  }
}

const handCheckers = [
  royalFlushRanker,
  highCardRanker
]


const handValue = (hand, checkers = handCheckers) => {
  let value
  let index = 0

  while(!value) {
    value = checkers[index].check(hand)
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

export default {
  parseLine,
  highCard : highCardRanker.check,
  getCard,
  handValue,
  winner
}
