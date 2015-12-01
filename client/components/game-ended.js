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
            <div className="col-xs-12">
              <h3>Spillet er slut!</h3>
              <p>Her skal der score vises (midlertidigt slået fra).</p>
              {startRoundControls}
            </div>
          </div>
        </div>
      </div>
    );
  }
});
// <p>{words}</p>
// <ScoreComponent game={game} />



module.exports = GameEndedComponent;
