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

const royalFlushRanker = (hand) => {
  return isFlush(hand) && largetCard(hand).order == "14"
}

const getRankOrder = (type, hand) => {
  return handRanks.indexOf(type) * 100 + largetCard(hand).order
}

const straightRanker = (hand) => {
  if(!isStraight(hand)) return undefined

  return {
    type: 'straight',
    rankOrder: getRankOrder('straight', hand)
  }
}

const flushRanker = (hand) => {
  if(!isFlush(hand)) return undefined

  return {
    type: 'flush',
    rankOrder: getRankOrder('flush', hand)
  }
}

const highCardRanker = (hand) => {
  return {
    type: 'highCard',
    rankOrder: getRankOrder('highCard', hand)
  }
}

const handCheckers = [
  royalFlushRanker,
  straightRanker,
  highCardRanker
]

export default {
  handCheckers,
  highCard : highCardRanker,
  flush: flushRanker,
  straight: straightRanker,
  royalFlush: royalFlushRanker
}
