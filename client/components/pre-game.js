/** @jsx React.DOM */
var React = require('react'),
    game = require('../models/game');


var PreGameComponent = React.createClass({
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

  startRound: function(e) {
    e.preventDefault();
    game.appendWord(React.findDOMNode(this.refs.word).value.trim());
  },

  render: function() {
    var content = null,
        title = null;
    if (App.player().isJudge() === true) {
      title = 'Hej overdommer!';
      content = (
        <div className="judge-pre">
          <form onSubmit={this.startRound}>
            <input autoFocus="true" ref="word" placeholder="Skriv det første ord." />
            <button className="submit-button" />
          </form>
          <div className="style-select dropdown-toggle m-t-md">
            <select id="category-select">
              <option selected disabled>Vælg en kategori</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="m-t-md">Som dommer kan du til en hver tid afslutte
          sætning, når meningen udebliver.</div>
        </div>
      );
    } else {
      title = 'Hej Spiller!';
      content = (
        <div>Spillet starter, når overdommeren har defineret det første ord
        og valgt en kategori.<br/><br/>
        Når det er din tur, skriver du et ord, der i sammenhæng med de forrige
        forsat er meningsgivende og som du mener vil indgå i flest bogtitler.<br/><br/>
        Når det er din modspilleres tur, har du mulighed for at udfordre dem ved
        at blokere ord og dermed stjæle deres points.<br/><br/>
        Spillet slutter efter (tid/runder) eller når overdommeren lader sætter
        et punktum.</div>
      );
    }


    return (
      <div className="panel">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 m-t-lg">
              <h2>{title}</h2>
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
});


module.exports = PreGameComponent;
