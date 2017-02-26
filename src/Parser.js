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

export default {
  parseLine,
  getCard
}
