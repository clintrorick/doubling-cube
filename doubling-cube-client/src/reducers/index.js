
export default function cardReducer(state = [], action) {
    switch (action.type) {
        case 'CARD_DRAFTED':

            let newDraftedCards = Object.assign([],state.draftedCards);
            newDraftedCards.push(action.card);

            let udCardsNew = state.undraftedCards.filter(udCard=>
                 action.card.name !== udCard.name
            );

            return Object.assign({},state,{
                draftedCards:newDraftedCards,
                undraftedCards:udCardsNew
            });

        default:
            return state;
    }
}
/**
 state:{
    draftedCards:[],
    undraftedCards:[]

 }

 */