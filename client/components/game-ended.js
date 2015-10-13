/** @jsx React.DOM */
var React = require('react'),
    game = require('../models/game'),
    ScoreComponent = require('./score');


var GameEndedComponent = React.createClass({
  getInitialState: function() {
    return { };
  },

  componentWillMount: function() {
    game.players.on('change add remove', () => {
      this.forceUpdate();
    });
  },

  componentWillUnmount: function() {
    game.players.off('change add remove');
  },

  restart: function(e) {
    game.restart();
  },

  render: function() {
    var startRoundControls = null;
    if (App.player().isJudge() === true) {
      startRoundControls = (
        <button onClick={this.restart} 
          className="btn btn-startgame btn-default btn-judge">
        Start igen</button>
      );
    }

    var words = game.words.map(function(w) {
      return w.get('word');
    }).join(' ');

    if(words.length > 0) {
      var firstLetter = words[0].toUpperCase();
      words = firstLetter + words.substr(1);
    }

    return (
      <div className="panel">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 m-t-lg">
              <h2>Spillet er slut!</h2>

              <p>{words}</p>

              <ScoreComponent game={game} />

              {startRoundControls}
            </div>
          </div>
        </div>
      </div>
    );
  }
});


module.exports = GameEndedComponent;
