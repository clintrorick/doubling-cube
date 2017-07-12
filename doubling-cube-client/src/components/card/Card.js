import React from 'react';
import snakecase from 'snake-case';
import ImageLoader from 'react-imageloader';
import $ from 'jquery';


class Card extends React.Component {
//USE COMPONENT WILL MOUNT TO setup observables on card for mousedown
//     constructor({card,displayType}){
//         super();
//         this.card = card;
//         this.displayType = displayType;
//     }
    /***
     * Need to learn why z-index on outside div worked for hover but z-index on imageloader div and imageloader itself
     * did not.
     */
    render () {
        return <div onClick={
                        (e)=>{
                                this.props.onClick(e);
                                enlargeCard(e)
                            }
                        }
                    id={snakecase(this.props.card.name)}
                    className="card">
            <ImageLoader className={this.props.displayType}
                         src={process.env.PUBLIC_URL + '/images/'+snakecase(this.props.card.name)+'.jpg'}
                         wrapper={React.DOM.div}
                         imgProps={{
                    alt: this.props.card.name
                }}

            />
        </div>
    }


}

function enlargeCard(e){
    $(e.target).animate({height:'400px'});
}

export default Card;