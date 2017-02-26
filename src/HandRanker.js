import R from 'ramda'

const handRanks = ['highCard', 'royalFlush']

const royalFlushRanker = {
  rankOrder: 10,
  check: () => null
}

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

export default {
  handCheckers,
  highCard : highCardRanker.check
}
