
if (Meteor.isClient) {
  Session.setDefault('state', 'welcome');

  Template.body.helpers({
    state: function() {
      return Session.get('state');
    }
  });

  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    TitleService.init(Meteor.settings.elasticsearch, 'titles');
    TitleService.indexExists().then(function(indexExists) {
      if(!indexExists) {
        throw new Error('The index is not created - go fix!');
      }
    });

    
  });
}


