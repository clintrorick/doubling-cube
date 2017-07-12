import React, { Component } from 'react';
import Deckbuilder from './components/deckbuilder/Deckbuilder';
import Header from './components/header/Header';
import DraftPane from './components/draftpane/DraftPane';
class App extends Component {
  render() {
    return (
      <div className="container-fluid">
          <div className="row">
              <div className="col-sm-1"/>
              <div className="col-sm-10">
                  <Header/>
              </div>
              <div className="col-sm-1"/>

          </div>
          <div className="row">
              <div className="col-sm-1"/>
              <div className="col-sm-10">
                  <DraftPane/>
              </div>
              <div className="col-sm-1"/>
          </div>
          <div className="row">
              <div className="col-sm-1"/>
              <div className="col-sm-10">
                  <Deckbuilder/>
              </div>
              <div className="col-sm-1"/>
          </div>
          
      </div>
    );
  }

    componentDidMount(){
        document.title = "Cube Demo";
    }
}

export default App;
