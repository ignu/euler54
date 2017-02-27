import R from 'ramda'
import hands from './hands'

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

const getHands = () => {
  return R.map(parseLine)(hands.split('\n'))
}

export default {
  getHands,
  parseLine,
  getCard
}
