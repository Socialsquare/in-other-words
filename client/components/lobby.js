/** @jsx React.DOM */
var React = require('react'),
    game = require('../models/game'),
    App = require('../app');

var READY_QUOTES = [
  'Hold knappen nede, rødbede!'
  // 'Press for success!',
  // 'Press to impress!',
  // 'Tiden er knap ...',
  // 'Lick to click',
  // 'Beam me up, Scotty!',
  // 'Pres lappen mod knappen',
  // 'Få luffen ud af muffen'
];

var LobbyComponent = React.createClass({
  getInitialState: function() {
    return {
      readyQuote: READY_QUOTES[Math.floor(READY_QUOTES.length * Math.random())]
    };
  },

  componentWillMount: function() {
    game.players.on('change add remove', () => {
      this.forceUpdate();
    });
  },

  componentWillUnmount: function() {
    game.players.off('change add remove');
  },

  setReady: function() {
    App.player().setReady(true);
  },

  setNotReady: function() {
    App.player().setReady(false);
  },

  render: function() {

    var playerColor = 'pcolor-' + (App.player() ? App.player().get('color') : 0);
    var buttonClasses = 'btn btn-startgame';
    buttonClasses += ' ' + playerColor;
    var pulseClass = 'pulse';
    pulseClass += ' ' + playerColor;
    if (App.player() && App.player().get('ready') === true) {
      buttonClasses += ' active';
      pulseClass += ' active';
    }

    var startMessage = '';
    if(game.players.length <= 1) {
      startMessage = 'Find mindst to andre spillere ...';
    }
    if(game.players.length === 2) {
      startMessage = 'En spiller til .. så kan spillet starte!';
    }
    if(game.players.length >= 3) {
      startMessage = 'Hold knapperne nede på samme tid!';
    }

    return (
      <div className="panel"
        onTouchEnd={this.setNotReady}
        onMouseUp={this.setNotReady}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 m-t-lg text-center">
              <h3>Spillere i venteværelset</h3>
              {game.players.map(function(player, i) {
                var classes = [];
                classes.push('player-icon');
                classes.push('pcolor-' + player.get('color'));
                if (player.get('ready') === true) { classes.push('ready'); }
                return ( <div key={i} className={classes.join(' ')}></div> );
              })}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 m-t-lg text-center">
              <h4>{startMessage}</h4>
            </div>
          </div>
        </div>
        <div id="onePulse" className={pulseClass}></div>
        <div id="twoPulse" className={pulseClass}></div>
        <button className={buttonClasses}
          onTouchStart={this.setReady}
          onMouseDown={this.setReady}>
            <span>{this.state.readyQuote}</span>
        </button>
      </div>
    );
  }
});


module.exports = LobbyComponent;
