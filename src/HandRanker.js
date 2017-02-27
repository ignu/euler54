import R from 'ramda'

const handRanks = ['highCard', 'pair', 'twoPair', 'threeOfAKind', 'straight', 'flush', 'fullHouse', 'fourOfAKind', 'straightFlush', 'royalFlush']

const largetCard = (cards) => {
  let maxCard = {order: 0}

  const updateLargest = (card) => {
    if(card.order > maxCard.order) maxCard = card
  }

  R.forEach(updateLargest)(cards)

  return maxCard
}

const isFlush = (hand) => {
  return R.uniq(R.pluck('suit')(hand)).length == 1
}

const isStraight = (hand) => {
  if(R.uniq(R.pluck('order', hand)).length < 5) return false

  const orderedHand = R.reverse(R.sortBy(R.prop('order'))(hand))
  return orderedHand[0].order - orderedHand[4].order == 4
}

const royalFlushRanker = {
  check: (hand) => {
    return isFlush(hand) && largetCard(hand).order == "14"
  }
}

const getRankOrder = (type, hand) => {
  return handRanks.indexOf(type) * 100 + largetCard(hand).order
}

const straightRanker = {
  check: (hand) => {
    if(!isStraight(hand)) return undefined

    return {
      type: 'straight',
      rankOrder: getRankOrder('straight', hand)
    }
  }
}

const highCardRanker = {
  check: (hand) => {
    return {
      type: 'highCard',
      rankOrder: getRankOrder('highCard', hand)
    }
  }
}

const handCheckers = [
  royalFlushRanker,
  straightRanker,
  highCardRanker
]

export default {
  handCheckers,
  highCard : highCardRanker.check,
  straight: straightRanker.check,
  royalFlush: royalFlushRanker.check
}
