import React from 'react';
import Cardbucket from '../cardbucket/Cardbucket';
const Cardlist = ({cards,sortStrategy}) => {


    let arrayOfPiles = {};
    if (sortStrategy === 'sortByCMC' && Array.isArray(cards)){
        arrayOfPiles = Object.values(cards).reduce((cmcpiles, card) =>{
                if (cmcpiles[card.cmc]){
                    cmcpiles[card.cmc].push(card);
                }else{
                    cmcpiles[card.cmc] = [];
                    cmcpiles[card.cmc].push(card);
                }
                return cmcpiles;
            }
            ,{}
        )
    }

    if (sortStrategy==='sortByColor' && Array.isArray(cards)){
        arrayOfPiles = Object.values(cards).reduce((colorpiles, card) =>{
                if (colorpiles[card.colors]){
                    colorpiles[card.colors].push(card);
                }else{
                    colorpiles[card.colors] = [];
                    colorpiles[card.colors].push(card);
                }
                return colorpiles;
            }
            ,{}
        )
    }

    return (
        <div>
            <div className="cardlist">
                {
                    Object.values(arrayOfPiles).map(pilearray =>
                        <Cardbucket cards={pilearray} />
                        )
                }
            </div>
        </div>
    );
};
export default Cardlist;
