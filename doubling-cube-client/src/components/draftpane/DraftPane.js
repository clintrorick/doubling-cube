import React from 'react';
import Card from '../card/Card';
import * as cardDraftedActions from '../../actions/card-drafted-actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class DraftPane extends React.Component{

    constructor(props){
        super(props);

        this.draftCard = this.draftCard.bind(this);
    }

    draftCard(event,card){
        event.preventDefault();
        this.props.actions.cardDrafted(card);
    }

    render(){
        //parent knows everything about child! child should be completely dumb.  Parent sets up child to call function blindly which contains state.
        return (
            <div className="draftpane">
            {this.props.undraftedCards.map(card=> {
                    return <Card card={card} displayType="imagepeekleft" onClick={(e) => this.draftCard(e,card)}/>;
            }
            )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        undraftedCards: state.undraftedCards
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(cardDraftedActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(DraftPane);