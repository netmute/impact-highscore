# Highscore plugin for ImpactJS

This is a client library for my [online highscore backend](https://github.com/netmute/highscore). It provides a simple API for all backend functions.

## Requirements

* [highscore](https://github.com/netmute/highscore)
* [impact-ajax](https://github.com/netmute/impact-ajax)

## Usage

### Initialize the class:

    this.highscore = new ig.Highscore(gameName, endpointURL);

* **gameName**: The identifier for your game.
* **endpointURL**: The URL where the highscore backend is installed.

Example:

    this.highscore = new ig.Highscore('mygame', 'http://localhost:9292');

### Post a new score:

    this.highscore.submit(params, callback);

Params is an object with the following attributes:

* **player** (required)
* **score** (required)
* **scope** (optional)

Have a look at the [highscore docs](https://github.com/netmute/highscore#usage) for details.

Example:

    this.highscore.submit( {player:'simon', score:123}, function(result) {
      console.log(result);
    });


### Get scores from the backend:

#### Highest score first:

    this.highscore.getHighest(callback, amount, scope);

#### Lowest score first:

    this.highscore.getLowest(callback, amount, scope);

* **amount**: The amount of results to get. (optional, default is 10)
* **scope** (optional)

Have a look at the [highscore docs](https://github.com/netmute/highscore#usage) for details.

Example:

    init: function() {
      this.highscore.getHighest(function(results) {
        // 'this' isn't available in callbacks
        ig.game.fetchedScores = results;
      });
    },

    update: function() {
      if (this.fetchedScores) {
        for (var i=0; entry=this.fetchedScores[i]; i++) {
          console.log(entry.player, entry.score);
        }
      }
    }
