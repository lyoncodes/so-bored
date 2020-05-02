import Cards from '../data/Cards'
const type1 = Cards.filter(el => el.type === 'type1')
const type2 = Cards.filter(el => el.type === 'type2')
export default {
  Cards,
  pinnedCards: [],
  allCards: [...Cards],
  type1,
  type2
}
