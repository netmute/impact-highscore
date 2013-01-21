ig.module(
  'plugins.highscore'
)
.requires(
  'impact.impact',
  'plugins.ajax'
)
.defines(function() {
  ig.Highscore = ig.Class.extend({

    init: function(gameName, endpointURL) {
      if (!gameName || !endpointURL) {
        throw {
          name: "MissingParameters",
          message: "Missing gameName or endpointURL.",
          toString: function(){return "[ig.Highscore] Missing gameName or endpointURL.";}
        }
      }
      this.ajax = new ig.Ajax();
      this.endpoint = endpointURL + '/' + gameName;
    },

    submit: function(params, callback) {
      this.ajax.post(this.endpoint, params, callback);
    },

    getHighest: function(callback, amount, scope) {
      this.fetch(callback, amount, scope);
    },

    getLowest: function(callback, amount, scope) {
      this.fetch(callback, amount, scope, true);
    },

    fetch: function(callback, amount, scope, reverse) {
      params = {};
      params.cachebuster = new Date().getTime();
      if (amount) params.limit = amount;
      if (scope) params.scope = scope;
      if (reverse) params.reverse = reverse;
      this.ajax.getJSON(this.endpoint + '?' + this.ajax.serialize(params), callback);
    }

  });
});
