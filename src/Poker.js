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
  handValue,
  winner
}
