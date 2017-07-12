import React from 'react';
import Hashes from '../hashes/Hashes';
import Filters from '../filters/Filters';
import Cardlist from '../cardlist/Cardlist';
import {connect} from 'react-redux';

class Deckbuilder extends React.Component{

    constructor(props){
        super(props);
        this.state={
            sortStrategy : "sortByCMC",
            selectedComponent: "sortByCMC"
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event){
        event.preventDefault();
        if (event.target.value) {
            this.setState(
                {
                    sortStrategy: event.target.name,
                    selectedComponent: event.target.name
                },


            );
        }
    }

    render(){
        return (
            <div>
                <Hashes onChange={this.onChange}
                        selectedComponent={this.state.selectedComponent}/>
                <Cardlist cards={this.props.draftedCards}
                      sortStrategy={this.state.sortStrategy}
                      />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        draftedCards: state.draftedCards
    }
};

export default connect(mapStateToProps)(Deckbuilder);