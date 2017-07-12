import React from 'react';
import Card from '../card/Card';
const Cardbucket = ({cards}) => {
    return (
        <div>
            {
                Object.values(cards).map(card =>
                    <Card card={card} displayType="imagepeek" cardDrafted={()=>()=>null}/>
                )
            }
        </div>
    );
}

export default Cardbucket;