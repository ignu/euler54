import R from 'ramda'

// we don't need a royal flush ranker. getRankOrder of straightFlush will order royalFlushes correctly
const handRanks = ['highCard', 'pair', 'twoPair', 'threeOfAKind', 'straight', 'flush', 'fullHouse', 'fourOfAKind', 'straightFlush']

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


const getRankOrder = (type, hand) => {
  return handRanks.indexOf(type) * 100 + largetCard(hand).order
}

const straightFlushRanker = (hand) => {
  if(!isStraight(hand)) return undefined
  if(!isFlush(hand)) return undefined

  const rankOrder = getRankOrder('straightFlush', hand)
  const royalFlushRank = 814

  return {
    type: 'straightFlush',
    rankOrder: rankOrder,
    type: rankOrder == royalFlushRank ? 'royalFlush' : 'straightFlush'
  }
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

export default {
  handRanks,
  highCard : highCardRanker,
  flush: flushRanker,
  straight: straightRanker,
  straightFlush: straightFlushRanker
}
